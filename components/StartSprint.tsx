"use client";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { handleError } from "@/lib/utils";
import { ISprint } from "@/lib/database/models/sprint.model";
import { startSprint } from "@/lib/actions/sprints.actions";
import StartSprintModal from "./StartSprintModal";

const StartSprint = ({ sprint }: { sprint: ISprint }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    try {
      setIsOpen(true);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <StartSprintModal isOpen={isOpen} setIsOpen={setIsOpen} sprint={sprint} />
      <div className="bg-[#FFE97F] rounded-lg drop-shadow-xl mx-4">
        <button
          type="button"
          className="p-2 rounded-lg border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2"
          onClick={handleClick}
        >
          <p>Start Sprint</p>
        </button>
      </div>
    </>
  );
};

export default StartSprint;
