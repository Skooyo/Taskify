"use client";

import { ISprint } from "@/lib/database/models/sprint.model";
import { formatDateTime } from "@/lib/utils";
import React, { useMemo } from "react";
import SprintStatus from "./SprintStatus";
import StartSprint from "./StartSprint";
import StopSprint from "./StopSprint";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import SprintDeleteModal from "./SprintDeleteModal";
import { useRouter } from "next/navigation";
import { Button, Divider, notification, Space } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const Context = React.createContext({ name: "Default" });

const SprintCard = ({
  sprint,
  clickable = true,
  startedSprint,
}: {
  sprint: ISprint;
  clickable?: boolean;
  startedSprint?: ISprint;
}) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Error",
      description: `Sprint ${startedSprint?.title} either has already started or already has tasks planned in it. Please stop the sprint or empty the tasks before planning for another sprint.`,
    });
  };

  const handleClick = () => {
    if (clickable || sprint.status === "Completed") {
      if (sprint.status === "Not Started") {
        router.push(`/sprints/${sprint._id}`);
      } else {
        router.push(`/kanban/${sprint._id}`);
      }
      return;
    } else {
      openNotificationWithIcon("error");
    }
  };

  const contextValue = useMemo(() => ({ name: "Taskify" }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div
        onDoubleClick={handleClick}
        className="min-w-full min-h-[15vh] flex bg-white shadow-xl rounded-2xl custom-shadow cursor-pointer"
      >
        <span className="bg-[#6B6F72] rounded-l-2xl w-[40px] flex-shrink-0"></span>
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
              {sprint.status == "Not Started" && (
                <StartSprint sprint={sprint} />
              )}

              {sprint.status == "Active" && <StopSprint sprint={sprint} />}

              <SprintDeleteModal
                isOpen={deleteModalIsOpen}
                setIsOpen={setDeleteModalIsOpen}
                sprint={sprint}
              />
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
    </Context.Provider>
  );
};

export default SprintCard;
