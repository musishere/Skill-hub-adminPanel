"use client";

import React, { useState } from "react";
import { User } from "../types/User";
import UserRow from "./UserRow";

export default function Table({
  headers,
  data,
}: {
  headers: string[];
  data: User[];
}) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedUsers.length === data.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(data.map((u) => u.id));
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full table-auto border-separate border-spacing-y-3">
        <thead className="bg-[var(--secondary-bg)] text-[var(--menu-text)] uppercase text-xs">
          <tr>
            {/* Checkbox header */}
            <th className="px-4 py-3">
              <input
                type="checkbox"
                checked={selectedUsers.length === data.length}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </th>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              isSelected={selectedUsers.includes(user.id)}
              toggleUser={() => toggleUser(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
