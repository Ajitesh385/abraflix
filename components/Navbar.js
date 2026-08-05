"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const pathname = usePathname();

  // Hide navbar on watch pages
  if (pathname.startsWith("/watch")) return null;

  return (
    <nav className="navbar new-navbar">
      <Link href="/" className="navbar-logo new-logo">
        ABRAFLIX
      </Link>
      <ul className="navbar-links new-links">
        <li>
          <Link
            href="/"
            className={`navbar-link new-link ${pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/search?type=movie"
            className={`navbar-link new-link ${
              pathname.startsWith("/movie") ? "active" : ""
            }`}
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            href="/search?type=tv"
            className={`navbar-link new-link ${
              pathname.startsWith("/tv") ? "active" : ""
            }`}
          >
            TV Shows
          </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <ThemeSwitcher />
        <div className="navbar-avatar">A</div>
      </div>
    </nav>
  );
}
