"use client";

import TaskButton from "@/components/TaskButton";
import FilterButton from "@/components/FilterButton";
import SortButton from "@/components/SortButton";
import TaskCard from "@/components/TaskCard";
import { useState } from "react";

import { getAllProductBacklogItems } from "@/lib/actions/product_backlog_item.actions";
import { useEffect } from "react";
import FocusedTaskView from "@/components/FocusedTaskView";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";

export default function Home() {
  const [tasks, setTasks] = useState<IProductBacklogItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProductBacklogItems();
      setTasks(data);
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
            <TaskButton tasks={tasks} setTasks={setTasks} />
            <FilterButton />
            <SortButton />
          </div>

          {/* Task Cards */}
          <div className="w-full h-fit p-4 grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            {tasks.map((task) => (
              <TaskCard key={task._id} pbItem={task} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
