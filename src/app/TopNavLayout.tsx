"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Users", href: "/users" },
  { name: "Collections", href: "/collections" },
  { name: "Reviews", href: "/reviews" },
  { name: "Transactions", href: "/transactions" },
];

export default function TopNavLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow px-6 py-3 flex items-center justify-start space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-gray-700 font-medium hover:text-blue-600 ${
              pathname === item.href ? "text-blue-600" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
