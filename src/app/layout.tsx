// src/app/layout.tsx
"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserGroupIcon,
  RectangleStackIcon,
  StarIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const navItems = [
  { name: "Users", href: "/users", icon: UserGroupIcon },
  { name: "Collections", href: "/collections", icon: RectangleStackIcon },
  { name: "Reviews", href: "/reviews", icon: StarIcon },
  { name: "Transactions", href: "/transactions", icon: BanknotesIcon },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100 font-inter min-h-screen flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex items-center gap-2 text-xl font-bold text-[var(--menu-text)]">
              <span className="text-blue-600">SkillHub</span> Admin
            </div>

            {/* Middle: Navigation */}
            <nav className="flex gap-6">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive
                        ? "bg-[var(--menu-active-bg-start)] border border-[var(--menu-active-border)] text-[var(--icon-active)]"
                        : "text-gray-600 hover:bg-[var(--menu-hover-bg)] hover:text-[var(--icon-default)]"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Profile */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Admin</span>
              <Image
                src="/images/image1.jpeg"
                alt="Admin Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
