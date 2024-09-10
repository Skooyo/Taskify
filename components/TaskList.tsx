"use client";

import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import { usePathname, useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";

enum Priority {
  Low = 0,
  Medium = 1,
  High = 2,
  Urgent = 3,
}

const TaskList = ({ tasks }: { tasks: IProductBacklogItem[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tagQuery = searchParams.get("filter");
  const sortQuery = searchParams.get("sortBy");
  const [newTasks, setNewTasks] = useState<IProductBacklogItem[]>([]);
  const allTags = tagQuery ? tagQuery.split("+") : [];

  useEffect(() => {
    console.log(tagQuery, sortQuery);
    let filteredTasks = tasks.filter((task) => {
      const taskTags = task.tags.map((tag) => tag._id);
      return allTags.every((tag) => taskTags.includes(tag));
    });

    if (sortQuery) {
      const [dateSort, prioritySort] = sortQuery.split("+");
      filteredTasks = filteredTasks.sort(
        (a: IProductBacklogItem, b: IProductBacklogItem) => {
          // First, sort by date
          if (dateSort === "newest") {
            const dateDiff =
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (dateDiff !== 0) return dateDiff;
          } else if (dateSort === "oldest") {
            const dateDiff =
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            if (dateDiff !== 0) return dateDiff;
          }

          // Then, sort by priority
          if (prioritySort === "most-urgent") {
            return (
              Priority[b.priority as keyof typeof Priority] -
              Priority[a.priority as keyof typeof Priority]
            );
          } else if (prioritySort === "least-urgent") {
            return (
              Priority[a.priority as keyof typeof Priority] -
              Priority[b.priority as keyof typeof Priority]
            );
          }

          return 0;
        },
      );
    }

    console.log(filteredTasks);
    setNewTasks(filteredTasks);
  }, [pathname, searchParams, tasks]);

  return (
    <div className="w-full h-fit p-4 grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
      {newTasks.map((task) => (
        <TaskCard key={task._id} pbItem={task} />
      ))}
    </div>
  );
};

export default TaskList;
