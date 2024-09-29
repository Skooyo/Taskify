"use client";

import React, { useEffect, useState } from "react";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import { usePathname, useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";
import KanbanCard from "./KanbanCard";
import { Draggable } from "@hello-pangea/dnd";

enum Priority {
  Low = 0,
  Medium = 1,
  High = 2,
  Urgent = 3,
}

const KanbanTaskList = ({
  tasks,
  isDraggable,
}: {
  tasks: IProductBacklogItem[];
  isDraggable: boolean;
}) => {
  return (
    <div className="w-full h-[90vh] p-2 flex items-center justify-center">
      <div
        className={`w-full h-full overflow-auto ${
          tasks.length > 1 ? "grid grid-cols-1" : "pt-4"
        } items-center justify-center gap-10 gap-y-8 scrollbar-hide px-4 pb-60`}
      >
        {tasks.map((task, index) => (
          <Draggable
            key={task._id}
            draggableId={task._id}
            index={index}
            isDragDisabled={!isDraggable}
          >
            {(provided, snapshot) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={{
                  ...provided.draggableProps.style,
                  left: "auto !important",
                  zIndex: `${1000} !important`,
                }}
              >
                <KanbanCard pbItem={task} />
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default KanbanTaskList;
