"use client";

import { useState } from "react";
import StatCard from "../components/StatCard";
import Table from "../components/Table";
import Pagination from "../components/Pagination"; // <-- import pagination
import { User } from "../types/User";

import {
  UserIcon,
  EyeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const headers = [
    "User",
    "Email",
    "Role",
    "Joined",
    "Status",
    "IP Info",
    "Tags",
    "View",
    "Linked To",
    "Actions",
  ];

  const users: User[] = [
    {
      id: "USR-8FJ39K2L",
      avatar: "/images/image1.jpeg",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Instructor",
      joined: "Jan 15, 2025",
      status: "Active",
      ip: "85.124.33.98",
      tags: ["Premium", "Verified"],
    },
    {
      id: "USR-9KJ21L8M",
      avatar: "/images/image2.jpeg",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Student",
      joined: "Feb 02, 2025",
      status: "Pending",
      ip: "192.168.1.10",
      tags: ["Trial"],
    },
    {
      id: "USR-3KFJ92LM",
      avatar: "/images/image3.jpeg",
      name: "Mike Roberts",
      email: "mike.roberts@example.com",
      role: "Instructor",
      joined: "Mar 10, 2025",
      status: "Suspended",
      ip: "172.16.5.20",
      tags: ["Premium"],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header + New Action */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--button-glow)] text-white rounded-lg hover:bg-[var(--icon-active)]">
          <span>+</span>
          <span>New Action</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="8,432"
          change="+12.3%"
          icon={<UserIcon className="h-6 w-6" />}
        />
        <StatCard
          title="Active Users (24h)"
          value="3,247"
          change="+8.1%"
          icon={<EyeIcon className="h-6 w-6" />}
        />
        <StatCard
          title="Instructors"
          value="1,248"
          change="+15.2%"
          icon={<AcademicCapIcon className="h-6 w-6" />}
        />
        <StatCard
          title="Students"
          value="6,954"
          change="+9.7%"
          icon={<UserGroupIcon className="h-6 w-6" />}
        />
        <StatCard
          title="Suspended Users"
          value="127"
          change="-2.3%"
          icon={<ExclamationTriangleIcon className="h-6 w-6" />}
        />
        <StatCard
          title="Pending Verification"
          value="432"
          change="-0.8%"
          icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
        />
        <StatCard
          title="New Users (7d)"
          value="394"
          change="+18.4%"
          icon={<UserIcon className="h-6 w-6" />}
        />
        <StatCard
          title="Inactive Users (30d+)"
          value="1,623"
          change="-5.2%"
          icon={<UserIcon className="h-6 w-6" />}
        />
      </div>

      {/* Table */}
      <Table headers={headers} data={users} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={8432} // replace with actual total if dynamic
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
