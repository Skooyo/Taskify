"use client";

import React, { useEffect } from "react"; // Make sure to import React
import MemberDetailsCard from "@/components/MemberDetailsCard";
import { getAllUsers, getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { useState } from "react";
import TeamBoardDateSelect from "@/components/TeamBoardDateSelect";
import AdminChooseBoard from "./AdminChooseBoard";

// Correct the function definition and export
const AdminTeamBoard = ({ users }: { users: IUser[] }) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [dateSelectIsOpen, setDateSelectIsOpen] = useState<boolean>(false);
  const [adminChooseBoardIsOpen, setAdminChooseBoardIsOpen] = useState(false);
  const [user, setUser] = useState<IUser>();

  const userIsAdmin = sessionStorage.getItem("userIsAdmin");
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(userId!);
      setUser(user);
    };

    fetchUser();

    if (userIsAdmin === "true") {
      setAdminChooseBoardIsOpen(true);
    } else {
      setDateSelectIsOpen(true);
    }
  }, [userIsAdmin, userId]);

  console.log("logged in user:", userIsAdmin, user);

  return (
    <>
      <AdminChooseBoard
        isOpen={adminChooseBoardIsOpen}
        setIsOpen={setAdminChooseBoardIsOpen}
        setIsTeamDateOpen={setDateSelectIsOpen}
      />
      <TeamBoardDateSelect
        isOpen={dateSelectIsOpen}
        setIsOpen={setDateSelectIsOpen}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {userIsAdmin === "true" ? (
        <div className="flex-col h-full overflow-y-auto w-full gap-8 flex">
          {users.map((user: IUser) => {
            return (
              <MemberDetailsCard
                userId={user._id}
                key={user._id}
                startDate={startDate}
                endDate={endDate}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex-col h-full overflow-y-auto w-full gap-8 flex">
          <MemberDetailsCard
            userId={userId!}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      )}
    </>
  );
};

export default AdminTeamBoard;
