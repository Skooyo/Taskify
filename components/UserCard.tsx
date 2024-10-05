"use client";

import React, { useMemo } from "react";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IUser } from "@/lib/database/models/user.model";

const UserCard = ({user}: {user: IUser}) => {

  return (
      <div
        onDoubleClick={() => {}}
        className="min-w-full min-h-[10vh] max-h-[10vh] flex bg-white shadow-xl rounded-2xl custom-shadow cursor-pointer"
      >
        <span className="bg-accent rounded-l-2xl w-[40px] flex-shrink-0"></span>
        <div className="rounded-r-2xl flex flex-col p-10 overflow-hidden w-full">
          <div className="flex gap-3 items-center">
            <p className="font-bold text-2xl truncate max-w-full">
              {user.name}
            </p>
          </div>
        </div>
      </div>
  );
};

export default UserCard;
