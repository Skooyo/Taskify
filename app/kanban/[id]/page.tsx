"use client";

import React, { useEffect, useState } from "react";

import {
  getAllProductBacklogItems,
  getProductBacklogItemById,
  updateProductBacklogItemStatus,
} from "@/lib/actions/product_backlog_item.actions";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import KanbanTaskList from "@/components/KanbanTaskList";
import {
  getSprintById,
  updateSprintTasks,
} from "@/lib/actions/sprints.actions";
import { ISprint } from "@/lib/database/models/sprint.model";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { reorder } from "@/lib/utils";
import KanbanCard from "@/components/KanbanCard";

interface Params {
  id: string;
}

export default function KanbanView({ params: { id } }: { params: Params }) {
  const [notStarted, setNotStarted] = useState<IProductBacklogItem[]>([]);
  const [inProgress, setInProgress] = useState<IProductBacklogItem[]>([]);
  const [completed, setCompleted] = useState<IProductBacklogItem[]>([]);
  const [sprint, setSprint] = useState<ISprint>();
  const idToList = new Map<string, IProductBacklogItem[]>();
  idToList.set("notStarted", notStarted);
  idToList.set("inProgress", inProgress);
  idToList.set("completed", completed);

  useEffect(() => {
    const fetchSprint = async () => {
      const res = await getSprintById(id);
      setSprint(res);
    };

    fetchSprint();
  }, []);

  useEffect(() => {
    if (sprint) {
      const fetchSprintTasks = async () => {
        const notStartedTasks = await Promise.all(
          sprint.notStartedTasks.map((task) =>
            getProductBacklogItemById(task._id),
          ),
        );

        const inProgressTasks = await Promise.all(
          sprint.inProgressTasks.map((task) =>
            getProductBacklogItemById(task._id),
          ),
        );

        const completedTasks = await Promise.all(
          sprint.completedTasks.map((task) =>
            getProductBacklogItemById(task._id),
          ),
        );
        console.log("sprint", sprint);
        console.log("notStartedTasks", notStartedTasks);
        console.log("inProgressTasks", inProgressTasks);
        console.log("completedTasks", completedTasks);
        setNotStarted(notStartedTasks);
        setInProgress(inProgressTasks);
        setCompleted(completedTasks);
      };

      fetchSprintTasks();
    }
  }, [sprint]);

  const updateState = (droppableId: string, list: IProductBacklogItem[]) => {
    switch (droppableId) {
      case "notStarted":
        setNotStarted(list);
        break;
      case "inProgress":
        setInProgress(list);
        break;
      case "completed":
        setCompleted(list);
        break;
      default:
        break;
    }
  };

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
    const sourceList = idToList.get(source.droppableId);
    const destinationList = idToList.get(destination.droppableId);

    if (!sourceList || !destinationList) return;

    if (source.droppableId === destination.droppableId) {
      const reorderedCards = reorder(
        sourceList,
        source.index,
        destination.index,
      );

      if (source.droppableId === "notStarted") {
        setNotStarted(reorderedCards);
      } else if (source.droppableId === "inProgress") {
        setInProgress(reorderedCards);
      } else if (source.droppableId === "completed") {
        setCompleted(reorderedCards);
      }
    } else {
      // moving from one list to another
      const [removed] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, removed);

      if (destination.droppableId === "notStarted") {
        removed.status = "Not Started";
      } else if (destination.droppableId === "inProgress") {
        removed.status = "In Progress";
      } else {
        removed.status = "Completed";
      }

      const updateTask = async () => {
        const res = await updateProductBacklogItemStatus({
          productBacklogItem: {
            ...removed,
            totalLoggedHours: removed.totalLoggedHours?.toString() || "0",
          },
          status: removed.status,
        });
      };

      updateState(source.droppableId, sourceList);
      updateState(destination.droppableId, destinationList);

      const updateSprint = async () => {
        console.log("notStarted in udpateSprint", notStarted);
        console.log("inProgress in updateSPrint", inProgress);
        console.log("completed in uipdateSprunt", completed);
        const res = await updateSprintTasks({
          sprint,
          notStarted: notStarted.map((task: IProductBacklogItem) => task._id),
          inProgress: inProgress.map((task: IProductBacklogItem) => task._id),
          completed: completed.map((task: IProductBacklogItem) => task._id),
        });
      };

      updateTask();
      updateSprint();
      console.log("notStarted in dragend", sprint?.notStartedTasks);
      console.log("inProgress in dragend", sprint?.inProgressTasks);
      console.log("completed in dragedn", sprint?.completedTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mt-5 flex flex-col gap-5 pr-7">
        <h1 className="w-full text-4xl font-semibold pb-5 border-b-2">
          {sprint?.title}
        </h1>
        <div className="w-full h-[90vh] flex flex-row gap-2">
          <div className="flex-1 rounded-lg bg-white flex flex-col gap-3">
            <h1 className="text-3xl font-semibold ml-10 pt-5">Not Started</h1>
            <Droppable
              droppableId="notStarted"
              type="group"
              direction="vertical"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-full h-full overflow-y-auto pb-48 p-2 grid grid-cols-1 gap-7`}
                >
                  {notStarted.map((task, index) => (
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
                          className="mx-4"
                        >
                          <KanbanCard pbItem={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="flex-1 rounded-lg bg-white flex flex-col gap-3">
            <h1 className="text-3xl font-semibold ml-10 pt-5">In Progress</h1>
            <Droppable
              droppableId="inProgress"
              type="group"
              direction="vertical"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-full h-full overflow-y-auto pb-48 p-2 grid grid-cols-1 gap-7`}
                >
                  {inProgress.map((task, index) => (
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
                          className="mx-4"
                        >
                          <KanbanCard pbItem={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="flex-1 rounded-lg bg-white flex flex-col gap-3">
            <h1 className="text-3xl font-semibold ml-10 pt-5">Completed</h1>
            <Droppable
              droppableId="completed"
              type="group"
              direction="vertical"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-full h-full overflow-y-auto pb-48 p-2 grid grid-cols-1 gap-7`}
                >
                  {completed.map((task, index) => (
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
                          className="mx-4"
                        >
                          <KanbanCard pbItem={task} />
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
    </DragDropContext>
    // <DragDropContext onDragEnd={onDragEnd}>
    //   <div className="flex w-full h-full">
    //     {/* Not Started */}
    //     <div className="w-1/3 h-full">
    //       <div className="flex-col justify-between items-center flex pt-8 gap-4 bg-gray-200 m-8 rounded-3xl drop-shadow-2xl z-[-1] h-full">
    //         <h1 className="text-4xl font-bold text-black">Not Started</h1>
    //         <Droppable
    //           droppableId="notStarted"
    //           type="group"
    //           direction="vertical"
    //         >
    //           {(provided) => (
    //             <div ref={provided.innerRef} {...provided.droppableProps}>
    //               <KanbanTaskList tasks={notStarted} />
    //               {provided.placeholder}
    //             </div>
    //           )}
    //         </Droppable>
    //       </div>
    //     </div>

    //     {/* In Progress */}
    //     <div className="w-1/3 h-full">
    //       <div className="flex-col justify-between items-center flex pt-8 gap-4 bg-gray-200 m-8 rounded-3xl drop-shadow-2xl z-[-1] h-full">
    //         <h1 className="text-4xl font-bold text-black">In Progress</h1>
    //         <Droppable
    //           droppableId="inProgress"
    //           type="group"
    //           direction="vertical"
    //         >
    //           {(provided) => (
    //             <div ref={provided.innerRef} {...provided.droppableProps}>
    //               <KanbanTaskList tasks={inProgress} />
    //               {provided.placeholder}
    //             </div>
    //           )}
    //         </Droppable>
    //       </div>
    //     </div>

    //     {/* Done */}
    //     <div className="w-1/3 h-full">
    //       <div className="flex-col justify-between items-center flex pt-8 gap-4 bg-gray-200 m-8 rounded-3xl drop-shadow-2xl z-[-1] h-full">
    //         <h1 className="text-4xl font-bold text-black">Done</h1>
    //         <Droppable
    //           droppableId="completed"
    //           type="group"
    //           direction="vertical"
    //         >
    //           {(provided) => (
    //             <div ref={provided.innerRef} {...provided.droppableProps}>
    //               <KanbanTaskList tasks={completed} />
    //               {provided.placeholder}
    //             </div>
    //           )}
    //         </Droppable>
    //       </div>
    //     </div>
    //   </div>
    // </DragDropContext>
  );
}
