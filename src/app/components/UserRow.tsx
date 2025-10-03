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
  PencilIcon,
  TrashIcon,
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

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <tr className={`transition rounded-lg ${isSelected ? "bg-indigo-50" : "bg-white"} hover:bg-[var(--hover-bg)]`}>
      {/* Checkbox cell (renders only if toggleUser passed) */}
      <td className="px-4 py-4">
        {toggleUser ? (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={toggleUser}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            aria-label={`Select ${user.name}`}
          />
        ) : null}
      </td>

      {/* User */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Image
            src={user.avatar}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.id}</p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-4">{user.email}</td>

      {/* Role */}
      <td className="px-4 py-4">{user.role}</td>

      {/* Joined */}
      <td className="px-4 py-4">{user.joined}</td>

      {/* Status */}
      <td className="px-4 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyles(user.status)}`}
        >
          {user.status}
        </span>
      </td>

      {/* IP Info */}
      <td className="px-4 py-4 font-mono text-xs">{user.ip}</td>

      {/* Tags */}
      <td className="px-4 py-4">
        <div className="flex flex-wrap gap-2">
          {user.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>

      {/* View Options */}
      <td className="px-4 py-4 text-center">
        <div className="flex gap-2 justify-center flex-wrap">
          <IconButton icon={<EyeIcon className="h-5 w-5" />} tooltip="View" />
          <IconButton icon={<UserCircleIcon className="h-5 w-5" />} tooltip="Account Details" />
          <IconButton icon={<Cog6ToothIcon className="h-5 w-5" />} tooltip="Preferences" />
          <IconButton icon={<ClipboardDocumentListIcon className="h-5 w-5" />} tooltip="Logs" />
          <IconButton icon={<ShieldCheckIcon className="h-5 w-5" />} tooltip="Security" />
        </div>
      </td>

      {/* Linked To Options */}
      <td className="px-4 py-4 text-center">
        <div className="flex gap-2 justify-center flex-wrap">
          <IconButton icon={<LinkIcon className="h-5 w-5" />} tooltip="Linked Accounts" />
          <IconButton icon={<BanknotesIcon className="h-5 w-5" />} tooltip="Transactions" />
          <IconButton icon={<DocumentTextIcon className="h-5 w-5" />} tooltip="Enrollment" />
          <IconButton icon={<AcademicCapIcon className="h-5 w-5" />} tooltip="Courses" />
          <IconButton icon={<UsersIcon className="h-5 w-5" />} tooltip="Groups" />
        </div>
      </td>

      {/* Actions (Edit/Delete above, 3-dots dropdown below — all inside single cell) */}
      <td className="px-4 py-4 text-center align-middle">
        <div className="flex flex-col items-center gap-2">
          {/* Edit / Delete */}
          <div className="flex gap-2">
            <IconButton icon={<PencilIcon className="h-5 w-5" />} tooltip="Edit" />
            <IconButton icon={<TrashIcon className="h-5 w-5" />} tooltip="Delete" />
          </div>

          {/* 3-dots dropdown (positioned absolutely so it doesn't push layout) */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="More actions"
            >
              <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
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
