import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Styles } from "react-modal";
import DevelopmentStage from "./DevelopmentStage";
import TaskStatus from "./TaskStatus";
import TaskType from "./TaskType";
import TaskPriority from "./TaskPriority";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import DeleteModal from "./DeleteModal";
import UpdateForm from "./UpdateForm";
import LogHours from "./LogHours";

type ModalProps = {
  isFocusedTaskOpen: boolean;
  setIsFocusedTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pbItem: IProductBacklogItem;
  isTaskUpdated: boolean;
  setIsTaskUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const KanbanFocused = ({
  isFocusedTaskOpen,
  setIsFocusedTaskOpen,
  pbItem,
  isTaskUpdated,
  setIsTaskUpdated,
}: ModalProps) => {
  const [isDeleteModalOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);
  const [isLogHoursOpen, setIsLogHoursOpen] = useState<boolean>(false);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      maxWidth: "1000px",
      width: "1000px",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      border: "none",
      padding: "0px",
      borderRadius: "16px",
    },
  };

  //Kanban Focused top colour
  //Deadpool:#6B6F72
  //Ocean:#223648
  //Nature:#226560
  //Default:#0F101A

  //Kanban Focused tags colour
  //Deadpool:#FFE97F
  //Ocean:#E1DDC5
  //Nature:#C6A280
  //Default:#A7B6B3

  return (
    <div className="gap-4 flex-col">
      <Modal
        isOpen={isFocusedTaskOpen}
        ariaHideApp={false}
        onRequestClose={() => setIsFocusedTaskOpen(false)}
        style={customStyles as Styles}
      >
        <div className="shadow-xl w-full h-fit bg-accent rounded-xl">
          <p className="opacity-0">color</p>

          {/* Heading */}
          <div className="bg-white h-full rounded-b-2xl flex-col items-center justify-center w-full py-4 px-16">
            <div className="w-full justify-center items-center flex">
              <p className="font-bold text-2xl mb-2 justify-center line-clamp-3">
                {pbItem.title}
              </p>
            </div>
            <div className="flex-col gap-4 mt-4">
              <p className="font-semibold text-base">Tags:</p>

              {/* Task Tags */}
              <div>
                <div
                  className={`flex flex-wrap my-4 gap-y-6 gap-4 text-md w-full justify-start items-center`}
                >
                  {pbItem.tags.map((tag) => (
                    <div
                      key={tag._id}
                      className={`flex bg-secondary opacity-80 px-4 py-2 w-fit h-fit items-center justify-center rounded-full text-sm`}
                    >
                      <p>{tag.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collection of sub-components (below tags) */}
              <div className="grid grid-cols-3 w-full h-full py-8 gap-10 gap-y-16">
                {/* TODO add conditional rendering for "hours worked" when card is opened in sprint board */}
                {/* Assigned Member */}
                <div className="w-full">
                  <p className="pl-1">Assigned Member:</p>
                  <div className="flex flex-col bg-[#FFD400] opacity-80 w-[95%] h-[70%] items-center justify-center rounded-md drop-shadow-xl">
                    <p className="pl-2 items-center justify-center font-semibold">
                      Assignee: {pbItem.assignee.name}
                    </p>
                  </div>
                  <div className="flex flex-col bg-white opacity-80 w-[95%] items-center justify-center drop-shadow-xl py-1">
                    <p>Hours Worked: {pbItem.totalLoggedHours}</p>
                  </div>
                </div>

                {/* Development Stage */}
                <div className="w-full">
                  <p className="pl-1">Development Stage</p>
                  <DevelopmentStage
                    developmentPhase={`${pbItem.developmentPhase}`}
                  />
                </div>

                {/* Task Status */}
                <div className="w-full">
                  <p className="pl-1">Task Status:</p>
                  <TaskStatus status={`${pbItem.status}`} />
                </div>

                {/* Story Points */}
                <div className="w-full">
                  <p className="pl-1">Story Points:</p>
                  <div className="flex bg-green-400 opacity-80 w-[95%] px-2 h-fit py-2 rounded-md drop-shadow-xl text-white gap-4">
                    <div className="bg-white rounded-full w-fit px-2 h-fit">
                      <p className="text-xl font-semibold text-green-400">P</p>
                    </div>
                    <p className="font-semibold text-lg items-center justify-center">
                      {" "}
                      {pbItem.storyPoints} Point
                      {pbItem.storyPoints && pbItem.storyPoints > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* Priority */}
                <div className="w-full">
                  <p className="pl-1">Priority:</p>
                  <TaskPriority priority={pbItem.priority || ""} />
                </div>

                {/* Task Type */}
                <div className="w-full">
                  <p className="pl-1">Task Type:</p>
                  <TaskType taskType={pbItem.taskType || ""} />
                </div>
              </div>

              {/* Description */}
              <div className="flex-col w-full mt-4">
                <div className="border border-black p-2 rounded-lg">
                  <p className="font-semibold text-lg pl-1">Task Description</p>
                  <div className="m-2 rounded-lg">
                    <p className="text-md">{pbItem.description}</p>
                  </div>
                </div>

                <div className="w-full mt-4 py-4 flex justify-between">
                  <button
                    type="button"
                    className="items-center justify-center py-2 px-6 bg-red-500
                                    text-background rounded-lg flex gap-2 text-white opacity-80"
                    onClick={() => setDeleteModalIsOpen(true)}
                  >
                    <FaRegTrashAlt size={16} />
                    <p>Delete</p>
                  </button>

                  {/* TODO: add logic for adding log hours */}
                  <button
                    type="button"
                    className="items-center justify-center py-2 px-6 bg-[#FFD400] rounded-lg drop-shadow-xl
                                    text-background flex gap-2 text-black font-semibold opacity-80"
                    onClick={() => setIsLogHoursOpen(true)}
                  >
                    <p>Log Hours</p>
                  </button>

                  <button
                    type="button"
                    className="items-center justify-center py-2 px-6 bg-[#2fd42a]
                                    text-background rounded-lg flex gap-2 text-white opacity-80"
                    onClick={() => setIsUpdateFormOpen(true)}
                  >
                    <FaEdit size={24} />
                    <p>Edit</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <DeleteModal
        isFocusedTaskOpen={isFocusedTaskOpen}
        setIsFocusedTaskOpen={setIsFocusedTaskOpen}
        isOpen={isDeleteModalOpen}
        setIsOpen={setDeleteModalIsOpen}
        pbItem={pbItem}
      />

      <LogHours
        isOpen={isLogHoursOpen}
        setIsOpen={setIsLogHoursOpen}
        pbItem={pbItem}
        focusTaskIsOpen={isFocusedTaskOpen}
        setFocusTaskIsOpen={setIsFocusedTaskOpen}
        isTaskUpdated={isTaskUpdated}
        setIsTaskUpdated={setIsTaskUpdated}
      />

      <UpdateForm
        isOpen={isUpdateFormOpen}
        setIsOpen={setIsUpdateFormOpen}
        pbItem={pbItem}
        isFocusedTaskOpen={isFocusedTaskOpen}
        setIsFocusedTaskOpen={setIsFocusedTaskOpen}
      />
    </div>
  );
};

export default KanbanFocused;
