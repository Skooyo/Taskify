import { BiTask } from "react-icons/bi";
import { BiSolidDashboard } from "react-icons/bi";
import { TbFileStack } from "react-icons/tb";
import { FaUser, FaUserTie } from "react-icons/fa6";
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
    icon: FaUser  
  },
  {
    name: "Admin Dashboard",
    href: "/admin",
    icon: FaUserTie
  },
];
