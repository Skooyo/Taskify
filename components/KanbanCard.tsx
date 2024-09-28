"use client";

import { useEffect, useState } from "react";
import FocusedTaskView from "./FocusedTaskView";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import { ITag } from "@/lib/database/models/tag.model";
import { getTagById } from "@/lib/actions/tag.actions";
import KanbanFocused from "./KanbanFocused";

const KanbanCard = ({ pbItem }: { pbItem: IProductBacklogItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleTags, setVisibleTags] = useState<ITag[]>([]);

  // console.log("in task card", pbItem);

  const updateVisibleTags = () => {
    if (window.innerWidth >= 1536) {
      setVisibleTags(pbItem.tags.slice(0, 2));
    } else {
      setVisibleTags(pbItem.tags.slice(0, 3));
    }
  };

  useEffect(() => {
    updateVisibleTags();
    window.addEventListener("resize", updateVisibleTags);
    return () => window.removeEventListener("resize", updateVisibleTags);
  }, [pbItem.tags]);

  const priorityBGColor = () => {
    if (pbItem.priority == "Urgent") {
      return "bg-red-500";
    } else if (pbItem.priority == "High") {
      return "bg-[#FF8C00]";
    } else if (pbItem.priority == "Medium") {
      return "bg-[#FFC300]";
    } else if (pbItem.priority == "Low") {
      return "bg-[#52b322]";
    }
  };

  const statusBGColor = () => {
    if (pbItem.status == "Completed") {
      return "bg-[#7EFE40]";
    } else if (pbItem.status == "In Progress") {
      return "bg-[#FF8C00]";
    } else if (pbItem.status == "Not Started") {
      return "bg-[#BEBEBF]";
    }
  };

  return (
    <>
      <div>
        <div
          className="shadow-xl w-full h-full bg-[#BA0000] rounded-2xl hover:cursor-pointer drop-shadow-xl"
          onDoubleClick={() => setIsModalOpen(true)}
        >
          <p className="opacity-0">color</p>
          <div className="bg-white h-full rounded-b-2xl flex-col istems-center p-4 pb-8 z-[1000]">
            <p className="font-bold text-xl mb-2 line-clamp-3">
              {pbItem.title}
            </p>
            <div className="flex items-center gap-2 justify-start">
              <div className="flex bg-green-400 w-fit px-2 h-fit p-1 items-center justify-center text-white gap-2 rounded-md drop-shadow-xl">
                <div className="bg-white rounded-full w-fit px-2 h-fit">
                  <p className="text-xl font-semibold text-green-400">P</p>
                </div>
                <p className="font-semibold text-lg">{pbItem.storyPoints}</p>
              </div>
              <div
                className={`flex ${priorityBGColor()} w-fit px-2 h-full pt-[6px] pb-[6px] items-center justify-center text-sm text-white rounded-lg`}
              >
                <p>{pbItem.priority}</p>
              </div>
              <div
                className={`flex ${statusBGColor()} w-fit px-2 h-full pt-[6px] pb-[6px] items-center justify-center text-sm text-white rounded-lg`}
              >
                <p>{pbItem.status}</p>
              </div>
            </div>
            <div className="flex-col gap-4 mt-4">
              <p className="font-semibold text-lg">Tags</p>
              <div className="flex gap-2 my-4 gap-y-6 text-md items-center justify-start">
                {visibleTags.map((tag) => (
                  <div
                    key={tag._id}
                    className="flex text-sm bg-[#FFD400] opacity-80 h-full w-fit px-4 py-2 items-center justify-center rounded-2xl"
                  >
                    <p>{tag.name}</p>
                  </div>
                ))}
                {pbItem.tags.length > visibleTags.length && (
                  <div>+{pbItem.tags.length - visibleTags.length}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <KanbanFocused
          isFocusedTaskOpen={isModalOpen}
          setIsFocusedTaskOpen={setIsModalOpen}
          pbItem={pbItem}
        />
      </div>
    </>
  );
};

export default KanbanCard;
