import { ISprint } from "@/lib/database/models/sprint.model";
import { formatDateTime } from "@/lib/utils";
import React from "react";

const SprintCard = ({ sprint }: { sprint: ISprint }) => {
  return (
    <div className="min-w-full min-h-[25vh] flex bg-white shadow-xl rounded-2xl custom-shadow cursor-pointer">
      <span className="bg-[#BA0000] rounded-l-2xl w-[40px] flex-shrink-0"></span>
      <div className="rounded-r-2xl flex flex-col p-10 overflow-hidden">
        <p className="font-bold text-2xl truncate max-w-full">{sprint.title}</p>
        <div className="flex mt-4">
          <p className="font-semibold">Sprint starts:</p>
          <p className="text-black text-opacity-50 ml-3">
            {formatDateTime(sprint.startDate).dateTime}
          </p>
        </div>
        <div className="flex">
          <p className="font-semibold">Sprint ends:</p>
          <p className="text-black text-opacity-50 ml-3">
            {formatDateTime(sprint.endDate).dateTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SprintCard;
