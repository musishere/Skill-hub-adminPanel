"use client";

import { useState } from "react";
import StatCard from "../components/StatCard";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
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
      {/* Header Section */}
<div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-semibold text-[var(--primary-text)]">Users</h1>

  <div className="flex gap-3">
    <button
      id="newActionBtn"
      className="flex items-center gap-1 px-4 py-2 bg-[var(--button-glow)] text-white rounded-lg hover:bg-[var(--icon-active)] transition-colors"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="inline-block"
      >
        <path
          d="M8 3V13M3 8H13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      New Action
    </button>
  </div>
</div>


      {/* Stats Section */}
      <div
        className="grid gap-4 mb-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        <StatCard
          title="Total Users"
          value="8,432"
          change="+12.3%"
          trend="positive"
          icon={<UserIcon className="h-6 w-6" />}
          tooltip="Total registered users on the platform."
        />
        <StatCard
          title="Active Users (24h)"
          value="3,247"
          change="+8.1%"
          trend="positive"
          icon={<EyeIcon className="h-6 w-6" />}
          tooltip="Users who logged in or interacted in the last 24 hours."
        />
        <StatCard
          title="Instructors"
          value="1,248"
          change="+15.2%"
          trend="positive"
          icon={<AcademicCapIcon className="h-6 w-6" />}
          tooltip="Active instructors currently teaching courses."
        />
        <StatCard
          title="Students"
          value="6,954"
          change="+9.7%"
          trend="positive"
          icon={<UserGroupIcon className="h-6 w-6" />}
          tooltip="Students currently enrolled in at least one course."
        />
        <StatCard
          title="Suspended Users"
          value="127"
          change="-2.3%"
          trend="negative"
          icon={<ExclamationTriangleIcon className="h-6 w-6" />}
          tooltip="Accounts temporarily disabled for policy violations."
        />
        <StatCard
          title="Pending Verification"
          value="432"
          change="-0.8%"
          trend="neutral"
          icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
          tooltip="Users awaiting email or ID verification."
        />
        <StatCard
          title="New Users (7d)"
          value="394"
          change="+18.4%"
          trend="positive"
          icon={<UserIcon className="h-6 w-6" />}
          tooltip="Users registered in the last 7 days."
        />
        <StatCard
          title="Inactive Users (30d+)"
          value="1,623"
          change="-5.2%"
          trend="negative"
          icon={<UserIcon className="h-6 w-6" />}
          tooltip="Users who haven’t logged in for over a month."
        />
      </div>

      {/* Table */}
      <div className="card bg-white rounded-lg shadow-sm p-4">
        <Table headers={headers} data={users} />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={8432}
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
