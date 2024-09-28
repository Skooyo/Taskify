"use client";

import Link from "next/link";
import { links } from "@/constants/nav-links";
import { usePathname } from "next/navigation";
import { BiTask } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

const NavBar = () => {
  return (
    <nav className="h-full w-1/6 rounded-xl p-5 bg-[#21282F] drop-shadow-2xl">
      <div className="flex flex-col gap-4">
        <NavLinks />
      </div>
    </nav>
  );
};

export default NavBar;

function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${
              pathname === link.href
                ? "text-[#FFE97F] font-semibold text-2xl"
                : "font-semibold text-2xl text-white"
            }`}
          >
            <div
              className="w-56.25 h-40 border-2 border-#ccc-300 shadow-lg rounded-lg flex flex-col items-center justify-center">
                {link.href === "/" && <BiTask className="text-5xl" />}
                {link.href === "/sprints" && <BsListTask className="text-5xl" />}
                {link.href === "/team" && <AiOutlineTeam className="text-5xl" />}
                {link.href === "/admin" && <RiAdminLine className="text-5xl" />}
                <h2>{link.name}</h2>
            </div>
          </Link>
        );
      })}
    </>
  );
}
