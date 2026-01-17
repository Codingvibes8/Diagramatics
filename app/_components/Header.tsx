"use client";

import Image from "next/image";
import { navItems } from "../_constants/navItems";
import React from "react";
import Link from "next/link";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-black relative">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Image src="/logo-1.png" alt="logo" width={100} height={100} className="brightness-0 invert" />

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.url}
                    className="text-white transition hover:text-gray-100/75"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4 hidden">
              <Link
                href="/auth/login"
                className="block rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:text-gray-100/75"
              >
                Login
              </Link>

              <Link
                href="/auth/signup"
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:text-slate-800 sm:block"
              >
                Register
              </Link>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 p-4 md:hidden z-50">
          <nav className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4 text-sm">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.url}
                    className="text-white block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mt-4 border-t border-white/10 pt-4">
              <Link
                href="/auth/login"
                className="block text-center rounded-md border border-white px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="block text-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
