"use client";

import TaskCard from "@/components/TaskCard";
import TaskList from "@/components/TaskList";
import {
  getAllProductBacklogItems,
  getProductBacklogItemById,
} from "@/lib/actions/product_backlog_item.actions";
import {
  getSprintById,
  updateSprintTasks as updateSprintTasks,
} from "@/lib/actions/sprints.actions";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import { ISprint } from "@/lib/database/models/sprint.model";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FaSave } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

interface Params {
  id: string;
}

function reorder<T>(list: T[], st: number, en: number) {
  const result = Array.from(list);
  const [removed] = result.splice(st, 1);
  result.splice(en, 0, removed);

  return result;
}

const TaskDragAndDrop = ({ params: { id } }: { params: Params }) => {
  const [sprint, setSprint] = useState<ISprint>();
  const [pbItems, setPbItems] = useState<IProductBacklogItem[]>([]);
  const [sprintItems, setSprintItems] = useState<IProductBacklogItem[]>([]);

  const router = useRouter();

  useEffect(() => {
    // get sprint by id
    const fetchSprint = async () => {
      const res = await getSprintById(id);
      setSprint(res);
    };

    // get all pb items
    const fetchPbItems = async () => {
      const res = await getAllProductBacklogItems();
      setPbItems(res);
    };

    fetchSprint();
    fetchPbItems();
  }, []);

  useEffect(() => {
    if (sprint) {
      const fetchSprintTasks = async () => {
        const res = await Promise.all(
          sprint.notStartedTasks.map((task) =>
            getProductBacklogItemById(task._id),
          ),
        );
        setSprintItems(res);
      };

      fetchSprintTasks();
    }
  }, [sprint]);

  useEffect(() => {
    const newPbItems = pbItems.filter(
      (task) => !sprintItems.map((sTask) => sTask._id).includes(task._id),
    );
    setPbItems(newPbItems);
  }, [sprintItems]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) return;

    // if dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // user moves task card
    if (type === "card") {
      const sourceList =
        source.droppableId === "pbBoard" ? pbItems : sprintItems;
      const destinationList =
        destination.droppableId === "pbBoard" ? pbItems : sprintItems;

      if (!sourceList || !destinationList) return;

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList,
          source.index,
          destination.index,
        );

        if (source.droppableId === "pbBoard") {
          setPbItems(reorderedCards);
        } else {
          setSprintItems(reorderedCards);
        }
      } else {
        const [movedCard] = sourceList.splice(source.index, 1);
        destinationList.splice(destination.index, 0, movedCard);

        if (source.droppableId === "pbBoard") {
          setPbItems(sourceList);
          setSprintItems(destinationList);
        } else {
          setPbItems(destinationList);
          setSprintItems(sourceList);
        }
      }
    }
  };

  const handleSaveClick = async () => {
    // save sprint items
    try {
      const updatedSprint = await updateSprintTasks({
        sprint,
        tasks: sprintItems.map((task) => task._id),
      });

      router.push("/sprints");
    } catch (error) {
      console.error("Error updating sprint tasks in page.tsx:", error);
    }
  };

  // spaghetti code
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mt-5 flex flex-col gap-5 pr-7">
        <h1 className="w-full text-4xl font-semibold pb-5 border-b-2">
          {sprint?.title}
        </h1>
        <div className="w-full h-[90vh] flex flex-row gap-2">
          <div className="flex-1 rounded-lg bg-white flex flex-col gap-3">
            <h1 className="text-3xl font-semibold ml-10 pt-5">
              Product Backlog
            </h1>
            <Droppable droppableId="pbBoard" type="card" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-full h-full overflow-y-auto pb-48 p-2 grid grid-cols-2 gap-7`}
                >
                  {pbItems.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard pbItem={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="flex-1 bg-white rounded-lg flex flex-col gap-3">
            <h1 className="text-3xl font-semibold ml-10 pt-5">
              Sprint Backlog
            </h1>
            <Droppable
              droppableId="sprintBoard"
              type="card"
              direction="horizontal"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-full h-full overflow-y-auto pb-48 p-2 grid grid-cols-2 gap-7`}
                >
                  {sprintItems.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          className="h-fit"
                        >
                          <TaskCard pbItem={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
      <div className="fixed bottom-5 right-20 w-4/5 flex items-end justify-end">
        <button
          onClick={handleSaveClick}
          className="bg-[#FFD400] rounded-lg drop-shadow-xl p-5 flex gap-2 items-center"
        >
          <FaSave />
          <p className="font-semibold text-lg">Save</p>
        </button>
      </div>
    </DragDropContext>
  );
};

export default TaskDragAndDrop;
