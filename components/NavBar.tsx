"use client";

import Link from "next/link";
import { links } from "@/constants/nav-links";
import { usePathname } from "next/navigation";

const NavBar = () => {
  return (
    <nav className="h-full w-1/6 rounded-xl p-5 bg-[#FAFAFF] drop-shadow-2xl">
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
          <div className="">
            <Link
              key={link.name}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-[#962333] font-semibold text-2xl"
                  : "font-semibold text-2xl"
              }`}
            >
              <h2>{link.name}</h2>
            </Link>
          </div>
        );
      })}
    </>
  );
}
