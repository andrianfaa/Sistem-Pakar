"use server";

import { logout } from "@/app/action/auth";
import { verifySession } from "@/libs/dal";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

import { PiBrainDuotone } from "react-icons/pi";

const navLinksAuthenticated = [
  { href: "/admin/gejala", label: "Gejala" },
  { href: "/admin/penyakit", label: "Penyakit" },
  { href: "/admin/aturan", label: "Aturan Pakar" },
  { href: "/admin/tentang", label: "Tentang" }
];

const navLinksUnauthenticated = [
  { href: "/diagnosa", label: "Diagnosa Penyakit" },
  { href: "/penyakit", label: "Daftar Penyakit" },
  { href: "/tentang", label: "Tentang" },
  { href: "/login", label: "Login" }
];

export default async function NavigationBar() {
  const session = await verifySession();
  const navLinks = session.isAuthenticated ? navLinksAuthenticated : navLinksUnauthenticated;

  return (
    <header className="w-full h-20 bg-primary fixed top-0 z-50">
      <nav className="container h-full flex items-center justify-between">
        <Link
          href={session.isAuthenticated ? "/admin" : "/"}
          className="text-white font-medium flex items-center gap-2"
        >
          <PiBrainDuotone size={24} />
          Sistem Pakar
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex gap-6 text-white font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}

          {session.isAuthenticated && (
            <li>
              <form action={logout}>
                <button className="hover:underline">Logout</button>
              </form>
            </li>
          )}
        </ul>

        {/* Mobile */}
        <MobileMenu navLinks={navLinks} isAuthenticated={session.isAuthenticated} />
      </nav>
    </header>
  );
}
