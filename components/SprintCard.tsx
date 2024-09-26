"use client"

import { ISprint } from "@/lib/database/models/sprint.model";
import { formatDateTime } from "@/lib/utils";
import React from "react";
import SprintStatus from "./SprintStatus";
import StartSprint from "./StartSprint";
import StopSprint from "./StopSprint";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import SprintDeleteModal from "./SprintDeleteModal";

const SprintCard = ({ sprint }: { sprint: ISprint }) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  return (
    <div className="min-w-full min-h-[15vh] flex bg-white shadow-xl rounded-2xl custom-shadow cursor-pointer">
      <span className="bg-[#BA0000] rounded-l-2xl w-[40px] flex-shrink-0"></span>
      <div className="rounded-r-2xl flex flex-col p-10 overflow-hidden w-full">
        <div className="flex gap-3 items-center">
          <p className="font-bold text-2xl truncate max-w-full">
            {sprint.title}
          </p>
          <SprintStatus status={sprint.status} />
        </div>
        <div className="flex items-center w-full justify-between">

          <div className="w-full">
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

          <div className="flex w-full h-full items-center justify-end gap-6">
            {sprint.status == "Not Started" && <StartSprint sprint={sprint}/>}

            {sprint.status == "Active" && <StopSprint sprint={sprint}/>}


            <SprintDeleteModal isOpen={deleteModalIsOpen} setIsOpen={setDeleteModalIsOpen} sprint={sprint}/>
            <button
                    type="button"
                    className="items-center justify-center py-2 px-6 bg-red-500
                                    text-background rounded-lg flex gap-2 text-white opacity-80"
                    onClick={() => setDeleteModalIsOpen(true)}
                  >
                    <FaRegTrashAlt size={16} />
                    <p>Delete</p>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintCard;
