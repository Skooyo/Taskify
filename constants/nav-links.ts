import { BiTask } from "react-icons/bi";
import { BiSolidDashboard } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
export const links = [
  {
    name: "Product Backlog",
    href: "/",
    icon: BiTask
  },
  {
    name: "Sprint Board",
    href: "/sprints",
    icon: BiSolidDashboard 
  },
  {
    name: "Team Dashboard",
    href: "/team",
    icon: AiOutlineTeam  
  },
  {
    name: "Admin Dashboard",
    href: "/admin",
    icon: RiAdminLine
  },
];
