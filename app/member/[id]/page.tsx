"use client";

import MemberDetailsCard from "@/components/MemberDetailsCard";
import TeamBoardDateSelect from "@/components/TeamBoardDateSelect";
import React, { useState } from "react";

type Params = {
  id: string;
};

const TeamMemberView = ({ params: { id } }: { params: Params }) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [dateSelectIsOpen, setDateSelectIsOpen] = useState<boolean>(true);
  return (
    <div>
      <TeamBoardDateSelect
        isOpen={dateSelectIsOpen}
        setIsOpen={setDateSelectIsOpen}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <MemberDetailsCard userId={id} startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default TeamMemberView;
