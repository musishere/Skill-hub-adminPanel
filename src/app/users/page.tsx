"use client";

import Image from "next/image";
import {
  EyeIcon,
  ClipboardDocumentListIcon,
  LinkIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export default function UsersPage() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Users</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="8,432"
          change="+12.3%"
          icon={<UserIcon className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Active Users (24h)"
          value="3,247"
          change="+8.1%"
          icon={<EyeIcon className="h-6 w-6 text-green-600" />}
        />
        <StatCard
          title="Instructors"
          value="1,248"
          change="+15.2%"
          icon={<AcademicCapIcon className="h-6 w-6 text-purple-600" />}
        />
        <StatCard
          title="Students"
          value="6,954"
          change="+9.7%"
          icon={<UserGroupIcon className="h-6 w-6 text-pink-600" />}
        />
        <StatCard
          title="Suspended Users"
          value="127"
          change="-2.3%"
          icon={<ExclamationTriangleIcon className="h-6 w-6 text-red-600" />}
        />
        <StatCard
          title="Pending Verification"
          value="432"
          change="-0.8%"
          icon={<ClipboardDocumentListIcon className="h-6 w-6 text-yellow-600" />}
        />
        <StatCard
          title="New Users (7d)"
          value="394"
          change="+18.4%"
          icon={<UserIcon className="h-6 w-6 text-indigo-600" />}
        />
        <StatCard
          title="Inactive Users (30d+)"
          value="1,623"
          change="+3.2%"
          icon={<TrashIcon className="h-6 w-6 text-gray-600" />}
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-[var(--card-bg)] rounded-lg shadow">
        <table className="w-full text-sm text-left text-[var(--primary-text)]">
          <thead className="bg-[var(--secondary-bg)] text-[var(--menu-text)] uppercase text-xs">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">IP Info</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">View</th>
              <th className="px-4 py-3">Linked To</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <UserRow
              avatar="/images/image1.jpeg"
              name="John Doe"
              id="#1234"
              email="john@example.com"
              role="Admin"
              joined="2023-01-12"
              status="Active"
              ip="192.168.0.1"
              tags={["Premium", "Verified"]}
            />
            <UserRow
              avatar="/images/image2.jpeg"
              name="Jane Smith"
              id="#5678"
              email="jane@example.com"
              role="User"
              joined="2023-03-20"
              status="Inactive"
              ip="10.0.0.45"
              tags={["Free"]}
            />
            <UserRow
              avatar="/images/image3.jpeg"
              name="Michael Brown"
              id="#9012"
              email="michael@example.com"
              role="Instructor"
              joined="2023-05-10"
              status="Active"
              ip="172.16.5.77"
              tags={["Pro"]}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Stats Card Component ---------- */
function StatCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) {
  const isNegative = change.startsWith("-");
  return (
    <div className="p-4 bg-[var(--secondary-bg)] rounded-lg shadow flex items-center gap-4">
      <div className="p-2 rounded-full bg-white shadow">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold">{value}</p>
        <p
          className={`text-xs font-medium ${
            isNegative ? "text-red-600" : "text-green-600"
          }`}
        >
          {change}
        </p>
      </div>
    </div>
  );
}

/* ---------- Table Row Component ---------- */
function UserRow({
  avatar,
  name,
  id,
  email,
  role,
  joined,
  status,
  ip,
  tags,
}: {
  avatar: string;
  name: string;
  id: string;
  email: string;
  role: string;
  joined: string;
  status: string;
  ip: string;
  tags: string[];
}) {
  return (
    <tr className="hover:bg-gray-50">
      {/* User info */}
      <td className="px-4 py-3 flex items-center space-x-3">
        <Image
          src={avatar}
          alt={name}
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-[var(--primary-text)]">{name}</p>
          <p className="text-xs text-gray-500">{id}</p>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-3">{email}</td>

      {/* Role */}
      <td className="px-4 py-3">{role}</td>

      {/* Joined */}
      <td className="px-4 py-3">{joined}</td>

      {/* Status */}
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </td>

      {/* IP */}
      <td className="px-4 py-3">{ip}</td>

      {/* Tags */}
      <td className="px-4 py-3">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded bg-[var(--secondary-bg)] text-[var(--menu-text)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>

      {/* View column with icon buttons */}
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <IconButton icon={<EyeIcon className="h-4 w-4" />} label="View" />
          <IconButton
            icon={<ClipboardDocumentListIcon className="h-4 w-4" />}
            label="History"
          />
        </div>
      </td>

      {/* Linked To column with icon buttons */}
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <IconButton
            icon={<AcademicCapIcon className="h-4 w-4" />}
            label="Courses"
          />
          <IconButton
            icon={<UserGroupIcon className="h-4 w-4" />}
            label="Instructors"
          />
          <IconButton icon={<LinkIcon className="h-4 w-4" />} label="Links" />
        </div>
      </td>

      {/* Actions column */}
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <IconButton
            icon={<CheckCircleIcon className="h-4 w-4 text-green-600" />}
            label="Verify"
          />
          <IconButton
            icon={<ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" />}
            label="Suspend"
          />
          <IconButton
            icon={<TrashIcon className="h-4 w-4 text-red-600" />}
            label="Delete"
          />
        </div>
      </td>
    </tr>
  );
}

/* ---------- Small Reusable Icon Button ---------- */
function IconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--button-line)] bg-[var(--default-button-bg)] hover:bg-[var(--menu-hover-bg)]"
      title={label}
    >
      {icon}
    </button>
  );
}
