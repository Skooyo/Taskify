"use client";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { handleError } from "@/lib/utils";
import CreateSprintForm from "./CreateSprintForm";

const SprintButton = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleClick = async () => {
    try {
      setCreateModalOpen(true);
    } catch (error) {
      handleError(error);
    }
  };

  //Create sprint button
  //Deadpool:#FFE97F
  //Ocean: #E1DDC5
  //Nature:#C6A280
  //Default:#A7B6B3

  return (
    <>
      <CreateSprintForm
        isOpen={createModalOpen}
        setIsOpen={setCreateModalOpen}
      />
      <div className="bg-button rounded-lg drop-shadow-xl">
        <button
          type="button"
          className="p-2 rounded-lg border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2"
          onClick={handleClick}
        >
          <FaPlus />
          <p>Create Sprint</p>
        </button>
      </div>
    </>
  );
};

export default SprintButton;
