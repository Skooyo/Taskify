"use client";

import React from 'react'; // Make sure to import React
import MemberDetailsCard from "@/components/MemberDetailsCard";
import { getAllUsers } from '@/lib/actions/user.actions';
import { IUser } from '@/lib/database/models/user.model';
import { useState } from 'react';
import TeamBoardDateSelect from '@/components/TeamBoardDateSelect';

// Correct the function definition and export
const AdminTeamBoard = ({users}: {users:IUser[]}) => {

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [dateSelectIsOpen, setDateSelectIsOpen] = useState<boolean>(true);

    return (
        <>
          <TeamBoardDateSelect isOpen={dateSelectIsOpen} setIsOpen={setDateSelectIsOpen} setStartDate={setStartDate} setEndDate={setEndDate}/>

            <div className="flex-col h-full overflow-y-auto w-full gap-8 flex">
                {users.map((user: IUser) => {
                    return(
                        <MemberDetailsCard user={user} key={user._id} startDate={startDate} endDate={endDate}/>
                    )
                })}
            </div>
        </>
    );
}

export default AdminTeamBoard;
