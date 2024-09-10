"use client";

import { useEffect, useState } from "react";
import FocusedTaskView from "./FocusedTaskView";
import { getAllProductBacklogItems } from "@/lib/actions/product_backlog_item.actions";
import { ProductBacklogItem } from "@/types";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";
import { ITag } from "@/lib/database/models/tag.model";
import { getTagById } from "@/lib/actions/tag.actions";

const tags = ["Backend", "Database", "Framework", "API", "Frontend", "Bugfix"];

const TaskCard = ({ pbItem }: { pbItem: IProductBacklogItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tagIds = pbItem.tags.map((tag) => tag._id);
      const res = await Promise.all(tagIds.map((id) => getTagById(id)));
      setTags(res);
    };

    fetchTags();
  }, [pbItem.tags]);

  return (
    <>
      <div>
        <div
          className="shadow-xl w-full h-full bg-[#BA0000] rounded-2xl hover:cursor-pointer drop-shadow-xl"
          onClick={() => setIsModalOpen(true)}
        >
          <p className="opacity-0">color</p>
          <div className="bg-white h-full rounded-b-2xl flex-col istems-center p-4 pb-8">
            <p className="font-bold text-xl mb-2 line-clamp-3">
              {pbItem.title}
            </p>
            <div className="flex gap-6 items-center">
              <div className="flex bg-green-400 w-fit px-2 h-fit p-1 items-center justify-center text-white gap-2 rounded-md drop-shadow-xl">
                <div className="bg-white rounded-full w-fit px-2 h-fit">
                  <p className="text-xl font-semibold text-green-400">P</p>
                </div>
                <p className="font-semibold text-lg">{pbItem.storyPoints}</p>
              </div>
              <div className="flex bg-[#FF0000] w-fit px-2 h-full pt-[6px] pb-[6px] items-center justify-center text-sm text-white rounded-lg">
                <p>{"Urgent {!}"}</p>
              </div>
              <div className="flex bg-[#FF0000] w-fit px-2 h-full pt-[6px] pb-[6px] items-center justify-center text-sm text-white rounded-lg">
                <p>{pbItem.status}</p>
              </div>
            </div>
            <div className="flex-col gap-4 mt-4">
              <p className="font-semibold text-lg">Tags</p>
              <div className="grid grid-cols-3 my-4 gap-2 gap-y-6 text-md items-center justify-center">
                {tags.map((tag) => (
                  <div
                    key={tag._id}
                    className="flex text-sm bg-[#FFD400] opacity-80 w-full px-2 h-full pt-1 items-center justify-center rounded-2xl"
                  >
                    <p>{tag.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <FocusedTaskView isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </div>
    </>
  );
};

export default TaskCard;
