import React from "react"; // Make sure to import React
import MemberDetailsCard from "@/components/MemberDetailsCard";
import { getAllUsers } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import AdminTeamBoard from "@/components/AdminTeamBoard";

// Correct the function definition and export
const TeamView = async () => {
  const users = await getAllUsers();

  return (
    <>
      <AdminTeamBoard users={users} />
    </>
  );
};

export default TeamView;
