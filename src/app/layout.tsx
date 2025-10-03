// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SkillHub Admin",
  description: "Admin Panel",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {/* Wrap all pages in TopNavLayout */}
        <Navbar>
          {children}
        </Navbar>

        {/* Global toast notifications */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
