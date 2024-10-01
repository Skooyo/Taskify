"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaSortAmountDown } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SortButton = () => {
  const [selectedDateSort, setSelectedDateSort] = useState("no-date");
  const [selectedPrioritySort, setSelectedPrioritySort] = useState("no-urgent");
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (dateSort: string, prioritySort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const sortBy = `${dateSort}+${prioritySort}`;
    params.set("sortBy", sortBy);

    // Construct the new URL
    if (dateSort === "no-date" && prioritySort === "no-urgent") {
      params.delete("sortBy");
      router.push(window.location.pathname);
    } else {
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl);
    }
  };

  const handleDateSortChange = (value: string) => {
    setSelectedDateSort(value);
    updateSearchParams(value, selectedPrioritySort);
    console.log("Selected Date Sort:", value);
  };

  const handlePrioritySortChange = (value: string) => {
    setSelectedPrioritySort(value);
    updateSearchParams(selectedDateSort, value);
    console.log("Selected Priority Sort:", value);
  };

  //Sort button:
  //Deadpool:#FFE97F
  //Ocean:#E1DDC5
  //Default:#A7B6B3

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="bg-button rounded-lg drop-shadow-xl p-2 border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2">
            <FaSortAmountDown />
            <p>Sort By</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-3 pr-10">
          <h1 className="font-semibold mb-2">Date Created</h1>
          <RadioGroup
            value={selectedDateSort}
            onValueChange={handleDateSortChange}
            defaultValue="no-date"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="newest" id="r1" />
              <Label htmlFor="r1">Newest to Oldest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oldest" id="r2" />
              <Label htmlFor="r2">Oldest to Newest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no-date" id="r3" />
              <Label htmlFor="r3">None</Label>
            </div>
          </RadioGroup>
          <h1 className="font-semibold mb-2 mt-4">Priority</h1>
          <RadioGroup
            value={selectedPrioritySort}
            onValueChange={handlePrioritySortChange}
            defaultValue="no-urgent"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="most-urgent" id="r4" />
              <Label htmlFor="r4">Most Urgent to Least Urgent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="least-urgent" id="r5" />
              <Label htmlFor="r5">Least Urgent to Most Urgent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no-urgent" id="r6" />
              <Label htmlFor="r6">None</Label>
            </div>
          </RadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SortButton;
