import TaskButton from "@/components/TaskButton";
import FilterButton from "@/components/FilterButton";
import SortButton from "@/components/SortButton";
import TaskCard from "@/components/TaskCard";
"use client"

import { getAllProductBacklogItems } from "@/lib/actions/product_backlog_item.actions";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const a = await getAllProductBacklogItems();
      console.log(a);
    }
    
    fetchData();
  }, [])

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
          <div className="w-full h-fit p-4 grid grid-cols-4 gap-16">
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
