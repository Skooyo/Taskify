import SprintCard from "@/components/SprintCard";
import { ISprint } from "@/lib/database/models/sprint.model";
import React from "react";
import SprintButton from "@/components/SprintButton";
import {
  getAllSprints,
  updateSprintTasks,
} from "@/lib/actions/sprints.actions";
import {
  getProductBacklogItemById,
  updateProductBacklogItemStatus,
} from "@/lib/actions/product_backlog_item.actions";

export default async function SprintView() {
  const sprints = await getAllSprints();

  const sprintWithTasks = sprints.find(
    (sprint: ISprint) =>
      sprint.notStartedTasks.length > 0 || sprint.inProgressTasks.length > 0 || sprint.status == "Active",
  );

  //Title colour
  //Deadpool:#FFFFFF
  //Ocean:#FFFFFF
  //Nature:#000000
  //Default:#000000

  return (
    <div className="flex flex-col mt-[70px] mx-4 gap-6 h-screen sprints">
      <div className="flex w-full gap-8 items-center">
        <h1 className="text-4xl font-semibold ml-10 text-text">Sprints</h1>
        <SprintButton />
      </div>
      <div className="flex flex-col gap-10 overflow-y-auto pb-24">
        {sprints.map((sprint: ISprint) => {
          return (
            <div key={sprint._id} className="bg-red min-w-full pr-4">
              <SprintCard
                sprint={sprint}
                clickable={
                  sprintWithTasks
                    ? sprintWithTasks._id === sprint._id
                      ? true
                      : false
                    : true
                }
                startedSprint={sprintWithTasks}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
