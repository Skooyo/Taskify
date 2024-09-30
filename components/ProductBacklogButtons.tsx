import React from "react";
import TaskButton from "./TaskButton";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";

const ProductBacklogButtons = () => {
  return (
    <div className="h-full w-full mr-4 flex-col">
      <div className="p-4 m-4 flex w-full h-fit gap-6 items-center">
        <h1 className="text-4xl font-bold text-white">Product Backlog</h1>
        <TaskButton />
        <FilterButton />
        <SortButton />
      </div>
    </div>
  );
};
//Title colour:
//Deadpool:#FFFFFF
//Ocean: #FFFFFF

export default ProductBacklogButtons;
