import { BiTask } from "react-icons/bi";
import { BiSolidDashboard } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
export const links = [
  {
    name: "Product Backlog",
    href: "/productbacklog",
    icon: BiTask,
  },
  {
    name: "Sprint Board",
    href: "/sprints",
    icon: BiSolidDashboard,
  },
  {
    name: "Team Board",
    href: "/team",
    icon: AiOutlineTeam,
  },
  // {
  //   name: "Admin Dashboard",
  //   href: "/admin",
  //   icon: RiAdminLine,
  // },
];
