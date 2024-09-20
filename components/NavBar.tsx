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
          <Link
            key={link.name}
            href={link.href}
            className={`${
              pathname === link.href
                ? "text-[#962333] font-semibold text-2xl"
                : "font-semibold text-2xl"
            }`}
          >
            <div
              className={
                "w-56.25 h-40 border-2 border-#ccc-300 shadow-lg rounded-lg flex flex-col items-center justify-center"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={link.svg.viewBox}
                className={link.svg.className}
              >
                (
                <>
                  {link.icon.map((x, index) => {
                    return <path key={index} d={x.d} className={x.className} />;
                  })}
                </>
                )
              </svg>
              <h2>{link.name}</h2>
            </div>
          </Link>
        );
      })}
    </>
  );
}
