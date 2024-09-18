"use client";

import SprintCard from "@/components/SprintCard";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import { ISprint } from "@/lib/database/models/sprint.model";
import React, { useEffect, useState } from "react";

const mockData = [
  {
    _id: "1",
    title: "Sprint 1",
    status: "Completed",
    startDate: new Date(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    createdAt: new Date(),
    notStartedTasks: [] as IProductBacklogItem[],
    inProgressTasks: [] as IProductBacklogItem[],
    completedTasks: [] as IProductBacklogItem[],
  },
  {
    _id: "2",
    title:
      "Sprint 2 very very long name for a sprint title that should be truncated at some point in the UI to prevent overflow so that it doesn't look ugly",
    status: "Active",
    startDate: new Date(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    createdAt: new Date(),
    notStartedTasks: [] as IProductBacklogItem[],
    inProgressTasks: [] as IProductBacklogItem[],
    completedTasks: [] as IProductBacklogItem[],
  },
  {
    _id: "3",
    title: "Sprint 3",
    status: "Not Started",
    startDate: new Date(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    createdAt: new Date(),
    notStartedTasks: [] as IProductBacklogItem[],
    inProgressTasks: [] as IProductBacklogItem[],
    completedTasks: [] as IProductBacklogItem[],
  },
  {
    _id: "4",
    title: "Sprint 4",
    status: "Not Started",
    startDate: new Date(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    createdAt: new Date(),
    notStartedTasks: [] as IProductBacklogItem[],
    inProgressTasks: [] as IProductBacklogItem[],
    completedTasks: [] as IProductBacklogItem[],
  },
  {
    _id: "5",
    title: "Sprint 5",
    status: "Not Started",
    startDate: new Date(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    createdAt: new Date(),
    notStartedTasks: [] as IProductBacklogItem[],
    inProgressTasks: [] as IProductBacklogItem[],
    completedTasks: [] as IProductBacklogItem[],
  },
  {
    _id: "6",
    title: "Sprint 6",
    status: "Not Started",
    startDate: new Date(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    createdAt: new Date(),
    notStartedTasks: [] as IProductBacklogItem[],
    inProgressTasks: [] as IProductBacklogItem[],
    completedTasks: [] as IProductBacklogItem[],
  },
] as ISprint[];

const SprintView = () => {
  const [sprints, setSprints] = useState<ISprint[]>([]);

  useEffect(() => {
    setSprints(mockData);
  }, []);

  return (
    <div className="flex flex-col mt-[70px] mx-4 gap-6">
      <div>
        <h1 className="text-4xl font-semibold ml-10">Sprints</h1>
      </div>
      <div className="flex flex-col gap-10">
        {mockData.map((sprint) => {
          return (
            <div key={sprint._id} className="bg-red min-w-full">
              <SprintCard sprint={sprint} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SprintView;
