"use client";

import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import IconButton from "./IconButton";
import {
  EyeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  LinkIcon,
  BanknotesIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UsersIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { User } from "../types/User";
import ViewMoreButton from "./ViewMoreButton";

type Props = {
  user: User;
  isSelected?: boolean;
  toggleUser?: () => void;
};

export default function UserRow({ user, isSelected = false, toggleUser }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "status-pill status-active";
      case "pending":
        return "status-pill status-pending";
      case "suspended":
        return "status-pill status-suspended";
      default:
        return "status-pill status-inactive";
    }
  };

  const getRoleClass = (role: string) => {
    switch (role?.toLowerCase()) {
      case "instructor":
        return "role-pill role-instructor";
      case "student":
        return "role-pill role-student";
      case "support":
        return "role-pill role-support";
      case "admin":
        return "role-pill role-admin";
      default:
        return "role-pill";
    }
  };

  return (
    <tr className={`hover:bg-[var(--secondary-bg)] transition`}>
      {/* Checkbox */}
      <td className="px-4 py-4 text-center">
        {toggleUser && (
          <div className="checkbox-container">
            <div
              className={`custom-checkbox ${isSelected ? "checked" : ""}`}
              onClick={toggleUser}
            />
          </div>
        )}
      </td>

      {/* User */}
      <td className="px-4 py-3">
        <div className="user-container">
          <div className="user-avatar">
            <Image
              src={user.avatar || "/default-avatar.png"}
              alt={user.name || "User Avatar"}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="user-info">
            <div className="user-name" data-full-name={user.name || "Unknown"}>
              {user.name || "Unknown"}
            </div>
            <div className="user-id" data-user-id={user.id || "N/A"}>
              {user.id || "N/A"}
              {user.id && (
                <svg
                  onClick={() => {
                    navigator.clipboard.writeText(user.id);
                    toast.success("User ID copied to clipboard!", {
                      duration: 2000,
                      style: {
                        background: "#52C41A",
                        color: "#fff",
                        fontSize: "14px",
                      },
                    });
                  }}
                  className="copy-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 9V7C20 5.89543 19.1046 5 18 5H16M20 9V16C20 17.1046 19.1046 18 18 18H16M20 9H16M16 5V3C16 1.89543 15.1046 1 14 1H6C4.89543 1 4 1.89543 4 3V15C4 16.1046 4.89543 17 6 17H8M16 5H14C12.8954 5 12 5.89543 12 7V9M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V8C4 6.89543 4.89543 6 6 6H8M16 18H14C12.8954 18 12 17.1046 12 16V14"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-4">
        <div
          className="email-cell"
          data-full-email={user.email || "N/A"}
        >
          <span className="email-text">{user.email || "N/A"}</span>

          {user.email && (
            <svg
              onClick={() => {
                navigator.clipboard.writeText(user.email);
                toast.success("Email copied to clipboard!", {
                  duration: 2000,
                  style: {
                    background: "#52C41A",
                    color: "#fff",
                    fontSize: "14px",
                  },
                });
              }}
              className="email-copy-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 9V7C20 5.89543 19.1046 5 18 5H16M20 9V16C20 17.1046 19.1046 18 18 18H16M20 9H16M16 5V3C16 1.89543 15.1046 1 14 1H6C4.89543 1 4 1.89543 4 3V15C4 16.1046 4.89543 17 6 17H8M16 5H14C12.8954 5 12 5.89543 12 7V9M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V8C4 6.89543 4.89543 6 6 6H8M16 18H14C12.8954 18 12 17.1046 12 16V14"
              />
            </svg>
          )}
        </div>
      </td>

      {/* Role */}
      <td>
        <span className={getRoleClass(user.role || "")}>{user.role || "User"}</span>
      </td>

      {/* Joined */}
      <td>{user.joined || "N/A"}</td>

      {/* Status */}
      <td>
        <span className={getStatusClass(user.status || "")}>{user.status || "Inactive"}</span>
      </td>

      {/* IP */}
      <td className="px-4 py-4 ip-info">{user.ip || "N/A"}</td>

      {/* Tags */}
      <td className="px-4 py-4">
        <div className="tags-container">
          {user.tags?.length ? (
            user.tags.map((tag, idx) => (
              <span key={idx} className="tag-pill">
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs">No tags</span>
          )}
        </div>
      </td>

      {/* View */}
      <td className="px-4 py-4 text-center">
        <div className="view-links">
          <IconButton icon={<EyeIcon />} tooltip="View" />
          <IconButton icon={<UserCircleIcon />} tooltip="Account Details" />
          <IconButton icon={<Cog6ToothIcon />} tooltip="Preferences" />
          <IconButton icon={<ClipboardDocumentListIcon />} tooltip="Logs" />
          <IconButton icon={<ShieldCheckIcon />} tooltip="Security" />
          <ViewMoreButton count={4} />
        </div>
      </td>

      {/* Linked */}
      <td className="px-4 py-4 text-center">
        <div className="view-links">
          <IconButton icon={<LinkIcon />} tooltip="Linked Accounts" />
          <IconButton icon={<BanknotesIcon />} tooltip="Transactions" />
          <IconButton icon={<DocumentTextIcon className="h-5 w-5" />} tooltip="Enrollment" />
          <IconButton icon={<AcademicCapIcon />} tooltip="Courses" />
          <IconButton icon={<UsersIcon />} tooltip="Groups" />
          <ViewMoreButton count={5} />
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 text-center">
        <div ref={menuRef} className="relative overflow-visible inline-block">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="options-button flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition"
            aria-label="More actions"
          >
            <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-md z-50"
              style={{ minWidth: "200px" }}
            >
              <ul className="py-1">
                <li className="dropdown-item" data-action="suspend">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20 17.5C20.83 17.5 21.5 18.17 21.5 19S20.83 20.5 20 20.5S18.5 19.83 18.5 19S19.17 17.5 20 17.5Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20 22V20.5"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20 17.5V16"/>
                  </svg>
                  Suspend
                </li>

                <li className="dropdown-item" data-action="resend-verification">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 9v9a3 3 0 01-3 3H6a3 3 0 01-3-3V9"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 9l-7.66 6.48a2 2 0 01-2.68 0L3 9m2.5-2.03L3 9m18 0l-2.5-2.03"/>
                  </svg>
                  Resend Verification
                </li>

                <li className="dropdown-item" data-action="change-role">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"/>
                  </svg>
                  Change Role
                </li>

                <li className="dropdown-item" data-action="enroll-products">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 14H14V21H21V14Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10 14H3V21H10V14Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 3H14V10H21V3Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10 3H3V10H10V3Z"/>
                  </svg>
                  Enroll in Product(s)
                </li>

                <li className="dropdown-item" data-action="tags">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41V13.41Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M7 7H7.01"/>
                  </svg>
                  Add/Remove Tags
                </li>
              </ul>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}