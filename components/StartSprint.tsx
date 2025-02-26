"use client";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { handleError } from "@/lib/utils";
import { ISprint } from "@/lib/database/models/sprint.model";
import { startSprint } from "@/lib/actions/sprints.actions";
import StartSprintModal from "./StartSprintModal";

const StartSprint = ({ sprint, startedSprint }: { sprint: ISprint, startedSprint?: ISprint }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    try {
      setIsOpen(true);
    } catch (error) {
      handleError(error);
    }
  };

  console.log(startedSprint);

  //Start sprint button
  //Deadpool:#FFE97F
  //Ocean: #E1DDC5
  //Nature:#C6A280
  //Default:#A7B6B3
 // ${startedSprint ? 'bg-gray-500 pointer-events-none cursor-not-allowed' : 'bg-yellow'}
  return (
    <>
      <StartSprintModal isOpen={isOpen} setIsOpen={setIsOpen} sprint={sprint} />
      <div className="bg-button rounded-lg drop-shadow-xl mx-4">
        <button
          type="button"
          className={`p-2 rounded-lg border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2`}
          onClick={handleClick}
        >
          <p>Start Sprint</p>
        </button>
      </div>
    </>
  );
};

export default StartSprint;
