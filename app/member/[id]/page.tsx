import React from "react";

type Params = {
  id: string;
};

const TeamMemberView = ({ params: { id } }: { params: Params }) => {
  return <div>TeamMemberView {id}</div>;
};

export default TeamMemberView;
