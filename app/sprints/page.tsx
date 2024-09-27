import SprintCard from "@/components/SprintCard";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import Sprint, { ISprint } from "@/lib/database/models/sprint.model";
import React, { useEffect, useState } from "react";
import SprintButton from "@/components/SprintButton";
import { getAllSprints } from "@/lib/actions/sprints.actions";

export default async function SprintView() {
  const sprints = await getAllSprints();

  return (
    <div className="flex flex-col mt-[70px] mx-4 gap-6 h-screen sprints">
      <div className="flex w-full gap-8 items-center">
        <h1 className="text-4xl font-semibold ml-10">Sprints</h1>
        <SprintButton />
      </div>
      <div className="flex flex-col gap-10 overflow-y-auto pb-24">
        {sprints.map((sprint: ISprint) => {
          return (
            <div key={sprint._id} className="bg-red min-w-full pr-4">
              <SprintCard sprint={sprint} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
