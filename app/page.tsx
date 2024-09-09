"use client";

import TaskButton from "@/components/TaskButton";
import FilterButton from "@/components/FilterButton";
import SortButton from "@/components/SortButton";
import TaskCard from "@/components/TaskCard";
import { useState } from "react";

import { getAllProductBacklogItems } from "@/lib/actions/product_backlog_item.actions";
import { useEffect } from "react";
import FocusedTaskView from "@/components/FocusedTaskView";

const Task = [
  {
    title: "short task",
    description:
      "this is a short task this is a short task this is a short taskthis is a short task this is a short task this is a short taskthis is a short task",
    priority: "Urgent",
    storyPoints: 1,
    status: "In Progress",
    developmentPhase: "Development",
    totalLoggedHours: "0",
    loggedHours: ["Member 1"],
    taskType: "Story",
    createdAt: new Date(),
    assignee: {
      _id: "1",
      name: "Member 1",
    },
    tags: [
      {
        _id: "1",
        name: "Frontend",
      },
      {
        _id: "2",
        name: "Framework",
      },
      {
        _id: "3",
        name: "Database",
      },
      {
        _id: "4",
        name: "API",
      },
      {
        _id: "5",
        name: "UI",
      },
      {
        _id: "6",
        name: "Backend",
      },
      {
        _id: "7",
        name: "UI/UX",
      },
      {
        _id: "8",
        name: "Testing",
      },
    ],
  },
  {
    title: "long task",
    description:
      "this is a long task this is a long task this is a long taskthis is a long task this is a long task this is a long taskthis is a long task",
    priority: "High",
    storyPoints: 3,
    status: "To Do",
    developmentPhase: "Design",
    totalLoggedHours: "2",
    loggedHours: ["Member 2", "Member 3"],
    taskType: "Bug",
    createdAt: new Date(),
    assignee: {
      _id: "2",
      name: "Member 2",
    },
    tags: [
      {
        _id: "2",
        name: "Framework",
      },
      {
        _id: "3",
        name: "Database",
      },
      {
        _id: "4",
        name: "API",
      },
    ],
  },
];

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const backlogItems = await getAllProductBacklogItems();
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="h-screen w-full flex gap-8 pt-5">
        {/* navbar place holder */}
        <div className="h-[98%] justify-start items-start w-1/6 rounded-xl p-5 bg-[#FAFAFF] drop-shadow-2xl">
          <p className="text-xl font-semibold">Navigation</p>
        </div>

        {/* Page Header */}
        <div className="h-full w-full mr-4 flex-col">
          <div className="p-4 m-4 flex w-full h-fit gap-6 items-center">
            <h1 className="text-4xl font-bold">Product Backlog</h1>
            <TaskButton />
            <FilterButton />
            <SortButton />
          </div>

          {/* Task Cards */}
          <div className="w-full h-fit p-4 grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </div>
      </div>
    </main>
  );
}
