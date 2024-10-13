"use client";

import { useState } from "react";
import BurndownModal from "./BurndownModal";
import { ISprint } from "@/lib/database/models/sprint.model";

const BurndownButton = ({
  sprintStatus,
  sprint,
}: {
  sprintStatus: string;
  sprint: ISprint;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    try {
      setIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BurndownModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        sprintStatus={sprintStatus}
        sprint={sprint}
      />
      <div className="bg-button rounded-lg drop-shadow-xl">
        <button
          type="button"
          className="p-2 rounded-lg border-solid text-base font-semibold px-3 flex items-center justify-center gap-2"
          style={{ backgroundColor: "#6B6F72", color: "#FFFFFF" }}
          onClick={handleClick}
        >
          <p>Show Burndown Chart</p>
        </button>
      </div>
    </>
  );
};

export default BurndownButton;
