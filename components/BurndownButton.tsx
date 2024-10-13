"use client";

import { useState } from "react";
import BurndownModal from "./BurndownModal";

const BurndownButton = ({ sprintStatus }: { sprintStatus: string }) => {
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
      <BurndownModal isOpen={isOpen} setIsOpen={setIsOpen} sprintStatus={sprintStatus} />
      <div className="bg-button rounded-lg drop-shadow-xl">
        <button
          type="button"
          className="p-2 rounded-lg border-solid text-base font-semibold px-3 flex items-center justify-center"
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
