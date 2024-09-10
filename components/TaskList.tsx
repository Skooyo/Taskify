"use client";

import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import { usePathname, useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";

const TaskList = ({ tasks }: { tasks: IProductBacklogItem[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tagQuery = searchParams.get("tags");
  const sortQuery = searchParams.get("sortBy");
  const [newTasks, setNewTasks] = useState<IProductBacklogItem[]>([]);
  const allTags = tagQuery ? tagQuery.split("+") : [];

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      const taskTags = task.tags.map((tag) => tag._id);
      return allTags.every((tag) => taskTags.includes(tag));
    });

    setNewTasks(filteredTasks);
  }, [pathname, searchParams]);

  return (
    <div className="w-full h-fit p-4 grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
      {newTasks.map((task) => (
        <TaskCard key={task._id} pbItem={task} />
      ))}
    </div>
  );
};

export default TaskList;
