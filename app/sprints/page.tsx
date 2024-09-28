import SprintCard from "@/components/SprintCard";
import { ISprint } from "@/lib/database/models/sprint.model";
import React from "react";
import SprintButton from "@/components/SprintButton";
import { getAllSprints } from "@/lib/actions/sprints.actions";

export default async function SprintView() {
  const sprints = await getAllSprints();

  const sprintWithTasks = sprints.find(
    (sprint: ISprint) =>
      sprint.notStartedTasks.length > 0 || sprint.inProgressTasks.length > 0,
  );

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
