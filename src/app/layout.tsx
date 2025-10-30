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
      <body>
        
        <Navbar>{children}</Navbar>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
