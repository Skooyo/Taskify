"use client";

import React, { useEffect, useState } from "react";

import { getAllProductBacklogItems } from "@/lib/actions/product_backlog_item.actions";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import KanbanTaskList from "@/components/KanbanTaskList";
import { getSprintById } from "@/lib/actions/sprints.actions";
import { ISprint } from "@/lib/database/models/sprint.model";
import { DragDropContext } from "@hello-pangea/dnd";

interface Params {
  id: string;
}

export default function KanbanView({ params: { id } }: { params: Params }) {
  const [notStarted, setNotStarted] = useState<IProductBacklogItem[]>([]);
  const [inProgress, setInProgress] = useState<IProductBacklogItem[]>([]);
  const [completed, setCompleted] = useState<IProductBacklogItem[]>([]);
  const [sprint, setSprint] = useState<ISprint>();

  useEffect(() => {
    const fetchSprint = async () => {
      const res = await getSprintById(id);
      setSprint(res);
    };

    fetchSprint();
  }, []);

  useEffect(() => {
    setNotStarted(sprint?.notStartedTasks || []);
    setInProgress(sprint?.inProgressTasks || []);
    setCompleted(sprint?.completedTasks || []);
  }, [sprint]);

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
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex w-full h-full">
        {/* Not Started */}
        <div className="w-1/3 h-full">
          <div className="flex-col justify-between items-center flex pt-8 gap-4 bg-gray-200 m-8 rounded-3xl drop-shadow-2xl h-full">
            <h1 className="text-4xl font-bold text-black">Not Started</h1>
            <KanbanTaskList tasks={notStarted} />
          </div>
        </div>

        {/* In Progress */}
        <div className="w-1/3 h-full">
          <div className="flex-col justify-between items-center flex pt-8 gap-4 bg-gray-200 m-8 rounded-3xl drop-shadow-2xl h-full">
            <h1 className="text-4xl font-bold text-black">In Progress</h1>
            <KanbanTaskList tasks={inProgress} />
          </div>
        </div>

        {/* Done */}
        <div className="w-1/3 h-full">
          <div className="flex-col justify-between items-center flex pt-8 gap-4 bg-gray-200 m-8 rounded-3xl drop-shadow-2xl h-full">
            <h1 className="text-4xl font-bold text-black">Done</h1>
            <KanbanTaskList tasks={completed} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
