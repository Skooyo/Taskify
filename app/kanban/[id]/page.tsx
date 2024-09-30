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
  const [isTaskUpdated, setIsTaskUpdated] = useState(false)
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
        if (sprint.status !== "Completed") {
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

          setNotStarted(notStartedTasks);
          setInProgress(inProgressTasks);
        }

        const completedTasks = await Promise.all(
          sprint.completedTasks.map((task) =>
            getProductBacklogItemById(task._id),
          ),
        );

        setCompleted(completedTasks);
      };

      fetchSprintTasks();
    }
  }, [sprint, isTaskUpdated]);

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
            totalLoggedHours: removed.totalLoggedHours || 0,
          },
          status: removed.status,
        });
      };

      updateState(source.droppableId, sourceList);
      updateState(destination.droppableId, destinationList);

      const updateSprint = async () => {
        const res = await updateSprintTasks({
          sprint,
          notStarted: notStarted.map((task: IProductBacklogItem) => task._id),
          inProgress: inProgress.map((task: IProductBacklogItem) => task._id),
          completed: completed.map((task: IProductBacklogItem) => task._id),
        });
      };

      updateTask();
      updateSprint();
    }
  };

  const isDraggable = sprint?.status !== "Completed";

  //Title colour
  //Deadpool: #FFFFFF
  //Ocean: #FFFFFF
  //Nature:#000000
  //Default:#000000

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mt-5 flex flex-col gap-5 pr-7">
        <h1 className="w-full text-4xl font-semibold pb-5 border-b-2 text-white">
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
                      isDragDisabled={!isDraggable}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          className="mx-4"
                        >
                          <KanbanCard pbItem={task} isTaskUpdated={isTaskUpdated} setIsTaskUpdated={setIsTaskUpdated} />
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
                      isDragDisabled={!isDraggable}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          className="mx-4"
                        >
                          <KanbanCard pbItem={task} isTaskUpdated={isTaskUpdated} setIsTaskUpdated={setIsTaskUpdated} />
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
                      isDragDisabled={!isDraggable}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          className="mx-4"
                        >
                          <KanbanCard pbItem={task} isTaskUpdated={isTaskUpdated} setIsTaskUpdated={setIsTaskUpdated} />
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
  );
}
