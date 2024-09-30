"use client";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { handleError } from "@/lib/utils";
import { ISprint } from "@/lib/database/models/sprint.model";
import { stopSprint } from "@/lib/actions/sprints.actions";
import StopSprintModal from "./StopSprintModal";

const StopSprint = ({ sprint }: { sprint: ISprint }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    try {
      setIsOpen(true);
    } catch (error) {
      handleError(error);
    }
  };

  //Stop sprint button
  //Deadpool:#FFE97F
  //Ocean: #E1DDC5
  //Nature:#C6A280
  //Default:#A7B6B3

  return (
    <>
      <StopSprintModal isOpen={isOpen} setIsOpen={setIsOpen} sprint={sprint} />
      <div className="bg-[#FFE97F] rounded-lg drop-shadow-xl">
        <button
          type="button"
          className="p-2 rounded-lg border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2"
          onClick={handleClick}
        >
          <p>Stop Sprint</p>
        </button>
      </div>
    </>
  );
};

export default StopSprint;
