"use client";

import TaskCard from "@/components/TaskCard";
import TaskList from "@/components/TaskList";
import { getAllProductBacklogItems } from "@/lib/actions/product_backlog_item.actions";
import { getSprintById } from "@/lib/actions/sprints.actions";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import { ISprint } from "@/lib/database/models/sprint.model";
import React, { useEffect, useState } from "react";

interface Params {
  id: string;
}

const TaskDragAndDrop = ({ params: { id } }: { params: Params }) => {
  const [sprint, setSprint] = useState<ISprint>();
  const [pbItems, setPbItems] = useState<IProductBacklogItem[]>([]);

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

  return (
    <div className=" mt-5 flex flex-col gap-5 pr-7">
      <h1 className="w-full text-4xl font-semibold pb-5 border-b-2">
        {sprint?.title}
      </h1>
      <div className="w-full h-screen flex flex-row gap-2">
        <div className="flex-1 bg-white rounded-lg">
          <h1 className="text-3xl font-semibold ml-10 pt-5">Product Backlog</h1>
          <div
            className={`w-full h-screen overflow-y-auto pb-60 p-4 grid grid-cols-2 gap-10`}
          >
            {pbItems.map((task) => (
              <TaskCard key={task._id} pbItem={task} />
            ))}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg">
          <h1 className="text-3xl font-semibold ml-10 pt-5">Sprint Backlog</h1>
        </div>
      </div>
    </div>
  );
};

export default TaskDragAndDrop;
