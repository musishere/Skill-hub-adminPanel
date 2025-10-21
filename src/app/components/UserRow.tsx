// src/app/components/UserRow.tsx
"use client";

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
    <tr className={`${isSelected ? "bg-indigo-50" : ""} hover:bg-[var(--secondary-bg)] transition`}>
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
      <td className="px-4 py-4">
        <div className="user-info">
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt={user.name || "User Avatar"}
            width={40}
            height={40}
            className="user-avatar"
          />
          <div className="user-details">
            <p className="user-name">{user.name || "Unknown"}</p>
            <p className="user-id">
              {user.id || "N/A"}
              <span className="copy-icon">📋</span>
            </p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-4">
        <div className="email-cell">
          <span className="email-text">{user.email || "N/A"}</span>
          <span className="email-copy-icon">📋</span>
        </div>
      </td>

      {/* Role */}
      <td className="px-4 py-4">
        <span className={getRoleClass(user.role || "")}>{user.role || "User"}</span>
      </td>

      {/* Joined */}
      <td className="px-4 py-4">{user.joined || "N/A"}</td>

      {/* Status */}
      <td className="px-4 py-4">
        <span className={getStatusClass(user.status || "")}>{user.status || "Inactive"}</span>
      </td>

      {/* IP */}
      <td className="px-4 py-4 ip-info">{user.ip || "N/A"}</td>

      {/* Tags */}
      <td className="px-4 py-4">
        <div className="tags-container">
          {user.tags?.length
            ? user.tags.map((tag, idx) => (
                <span key={idx} className="tag-pill">
                  {tag}
                </span>
              ))
            : <span className="text-gray-400 text-xs">No tags</span>}
        </div>
      </td>

      {/* View */}
      <td className="px-4 py-4 text-center">
        <div className="view-links">
          <IconButton icon={<EyeIcon className="h-5 w-5" />} tooltip="View" />
          <IconButton icon={<UserCircleIcon className="h-5 w-5" />} tooltip="Account Details" />
          <IconButton icon={<Cog6ToothIcon className="h-5 w-5" />} tooltip="Preferences" />
          <IconButton icon={<ClipboardDocumentListIcon className="h-5 w-5" />} tooltip="Logs" />
          <IconButton icon={<ShieldCheckIcon className="h-5 w-5" />} tooltip="Security" />
        </div>
      </td>

      {/* Linked */}
      <td className="px-4 py-4 text-center">
        <div className="view-links">
          <IconButton icon={<LinkIcon className="h-5 w-5" />} tooltip="Linked Accounts" />
          <IconButton icon={<BanknotesIcon className="h-5 w-5" />} tooltip="Transactions" />
          <IconButton icon={<DocumentTextIcon className="h-5 w-5" />} tooltip="Enrollment" />
          <IconButton icon={<AcademicCapIcon className="h-5 w-5" />} tooltip="Courses" />
          <IconButton icon={<UsersIcon className="h-5 w-5" />} tooltip="Groups" />
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 text-center">
        <div className="flex flex-col items-center gap-2">
          {/* Edit/Delete */}
          <div className="flex gap-2">

          </div>

          {/* Dropdown */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="options-button"
              aria-label="More actions"
            >
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50">
                <ul className="text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Suspend</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Resend Verification</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Change Role</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Enroll in Product(s)</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add/Remove Tags</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}
