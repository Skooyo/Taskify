import { getAllUsers } from "@/lib/actions/user.actions";
import React from "react";
import UserCard from "@/components/UserCard";
import { IUser } from "@/lib/database/models/user.model";
import CreateUserButton from "@/components/CreateUserButton";

export default async function AdminView() {
  const users = await getAllUsers();

  //Title colour
  //Deadpool:#FFFFFF
  //Ocean:#FFFFFF
  //Nature:#000000
  //Default:#000000

  return (
    <div className="flex flex-col mt-[70px] mx-4 gap-6 h-screen sprints">
      <div className="flex w-full gap-8 items-center">
        <h1 className="text-4xl font-semibold ml-10 text-text">Users</h1>
        <CreateUserButton />
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto pb-24">
        {users.map((user: IUser) => {
          return <UserCard key={user._id} user={user} />;
        })}
      </div>
    </div>
  );
}
