"use client";

import React from "react";
import Modal from "react-modal";
import BurndownChart from "./BurndownChart";
import { ISprint } from "@/lib/database/models/sprint.model";
import { format, addDays, eachDayOfInterval } from "date-fns";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";

// Utility function to generate dates array
const generateDatesArray = (startDate: string, endDate: string): string[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = eachDayOfInterval({ start, end }).map((date) =>
    format(date, "yyyy-MM-dd"),
  );
  return dates;
};

interface BurndownModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sprintStatus: string;
  sprint: ISprint;
}

const BurndownModal: React.FC<BurndownModalProps> = ({
  isOpen,
  setIsOpen,
  sprintStatus,
  sprint,
}) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "70%",
      height: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Example data
  const dates = generateDatesArray(
    sprint.startDate.toString(),
    sprint.endDate.toString(),
  );

  const sortedTasks = sprint.completedTasks.sort(
    (a: IProductBacklogItem, b: IProductBacklogItem) =>
      new Date(a.dateCompleted!).getTime() -
      new Date(b.dateCompleted!).getTime(),
  );

  let cur = sprint.totalStoryPoints;
  let sortedTasksIdx = 0;
  const actualData: number[] = [];
  for (let i = 0; i < dates.length; ++i) {
    if (
      sortedTasksIdx < sortedTasks.length &&
      format(sortedTasks[sortedTasksIdx].dateCompleted!, "yyyy-MM-dd") ===
        dates[i]
    ) {
      cur -= sortedTasks[sortedTasksIdx].storyPoints || 0;
      actualData.push(cur);
      sortedTasksIdx++;
    } else {
      actualData.push(cur);
    }
  }

  // console.log(sprint);
  console.log(actualData);
  console.log(dates);

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h2>Burndown Chart</h2>
      <BurndownChart
        totalStoryPoints={sprint.totalStoryPoints}
        dates={dates}
        actualData={actualData}
        sprintStatus={sprintStatus}
      />

      <button
        onClick={closeModal}
        className="mt-4 p-2 bg-red-500 text-white rounded-lg"
      >
        Close
      </button>
    </Modal>
  );
};

export default BurndownModal;
