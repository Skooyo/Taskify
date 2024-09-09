"use effect";

import { createProductBacklogItem } from "@/lib/actions/product_backlog_item.actions";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import CreateForm from "./CreateForm";
import { handleError } from "@/lib/utils";
import { createTag } from "@/lib/actions/tag.actions";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";

type TaskButtonProps = {
  tasks: IProductBacklogItem[];
  setTasks: (tasks: IProductBacklogItem[]) => void;
};

const TaskButton = ({ tasks, setTasks }: TaskButtonProps) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleClick = async () => {
    try {
      setCreateModalOpen(true);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <CreateForm
        isOpen={createModalOpen}
        setIsOpen={setCreateModalOpen}
        tasks={tasks}
        setTasks={setTasks}
      />
      <div className="bg-[#FFD400] rounded-lg drop-shadow-xl">
        <button
          type="button"
          className="p-2 rounded-lg border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2"
          onClick={handleClick}
        >
          <FaPlus />
          <p>Add Card</p>
        </button>
      </div>
    </>
  );
};

export default TaskButton;
