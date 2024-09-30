"use client";

import { IoFilter } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TagCheckBox from "./TagCheckBox";
import { useEffect, useState } from "react";
import { Tag } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

const FilterButton = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [checkedTags, setCheckedTags] = useState<Tag[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortByParams = searchParams.get("sortBy");

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
    const params = new URLSearchParams(searchParams.toString());
    if (checkedTags.length > 0) {
      const filters = checkedTags.map((tag) => tag._id).join("+");
      params.set("filter", filters);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl);
    } else {
      if (sortByParams) {
        router.push(`${window.location.pathname}?${sortByParams.toString()}`);
      } else {
        router.push(window.location.pathname);
      }
    }
  }, [checkedTags]);

  //Filter button:
  //Deadpool:#FFE97F
  //Ocean:#E1DDC5
  //Nature:#C6A280
  //Default:#A7B6B3

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="bg-[#FFE97F] rounded-lg drop-shadow-xl p-2 border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2">
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
