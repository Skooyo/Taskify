"use client";

import { IoFilter } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TagCheckBox from "./TagCheckBox";
import { useEffect, useState } from "react";
import { getAllTags } from "@/lib/actions/tag.actions";
import { Tag } from "@/types";
import { usePathname, useRouter } from "next/navigation";

const FilterButton = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [checkedTags, setCheckedTags] = useState<Tag[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags");
        const gottenTags = await response.json();
        setTags(gottenTags);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    if (checkedTags.length > 0) {
      const newUrl =
        pathname + "?tags=" + checkedTags.map((tag) => tag._id).join("+");
      router.push(newUrl);
    } else {
      router.push(pathname);
    }
  }, [checkedTags]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="bg-[#FFD400] rounded-lg drop-shadow-xl p-2 border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2">
            <IoFilter />
            <p>Filters</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-3 pr-10">
          <TagCheckBox
            tags={tags}
            checkedTags={checkedTags}
            setCheckedTags={setCheckedTags}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FilterButton;
