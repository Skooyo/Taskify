import React, { useEffect, useState } from "react";

import { getAllProductBacklogItems } from "@/lib/actions/product_backlog_item.actions";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import KanbanTaskList from "@/components/KanbanTaskList";

export default async function KanbanView() {
  const tasks: IProductBacklogItem[] = await getAllProductBacklogItems();

  return (
    <>
    <div className="flex w-full h-full">

      {/* Not Started */}
      <div className="w-1/3 h-full">
        <div className="flex-col justify-between items-center flex pt-8 gap-4 bg-gray-200 m-8 rounded-3xl drop-shadow-2xl h-full">
          <h1 className="text-4xl font-bold text-black">Not Started</h1>
          <KanbanTaskList tasks={tasks} />
        </div>
      </div>

      {/* In Progress */}
      <div className="w-1/3 h-full">
        <div className="flex-col justify-between items-center flex pt-8 gap-4 bg-gray-200 m-8 rounded-3xl drop-shadow-2xl h-full">
          <h1 className="text-4xl font-bold text-black">In Progress</h1>
          {/* <KanbanTaskList tasks={tasks} /> */}
        </div>
      </div>

      {/* Done */}
      <div className="w-1/3 h-full">
        <div className="flex-col justify-between items-center flex pt-8 gap-4 bg-gray-200 m-8 rounded-3xl drop-shadow-2xl h-full">
          <h1 className="text-4xl font-bold text-black">Done</h1>
          {/* <KanbanTaskList tasks={tasks} /> */}
        </div>
      </div>

    </div>
    </>
  );
};
