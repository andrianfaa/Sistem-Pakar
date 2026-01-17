"use client";

import { logout } from "@/app/action/auth";
import Link from "next/link";
import { useCallback, useState } from "react";

type NavLink = {
  href: string;
  label: string;
};

export default function MobileMenu({ navLinks, isAuthenticated }: { navLinks: NavLink[]; isAuthenticated: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  async function handleLogout() {
    setIsOpen(false);
    await logout();
  }

  return (
    <div className="lg:hidden">
      <button aria-label="Toggle menu" className="text-white p-2" onClick={toggle}>
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-20 w-full bg-primary flex flex-col items-center gap-4 py-6 text-white font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={closeMenu} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}

          {isAuthenticated && (
            <li>
              <form action={handleLogout}>
                <button className="hover:underline">Logout</button>
              </form>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
