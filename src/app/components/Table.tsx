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
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);

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

  // Filtered data
  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto rounded-lg bg-white p-4 shadow-sm space-y-4">
      {/* Filters Row */}
      <div className="filters-row mb-4 flex-wrap">
        {/* Search */}
        <div className="search-container">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="searchInput"
          />
        </div>

        {/* Buttons */}
        <div className="filter-buttons">
          {/* Sort */}
          <div className="dropdown">
            <button
              className="button secondary-button"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <svg viewBox="0 0 16 16" fill="currentColor" width={16} height={16}>
                <path
                  d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              Sort
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                fill="none"
                className="dropdown-arrow"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            <div className={`dropdown-menu ${isSortOpen ? "show" : ""}`} id="sortDropdownMenu">
              <div className="dropdown-item" data-sort="name-asc">Full Name (A-Z)</div>
              <div className="dropdown-item" data-sort="name-desc">Full Name (Z-A)</div>
              <div className="dropdown-item" data-sort="email-asc">Email (A-Z)</div>
              <div className="dropdown-item" data-sort="email-desc">Email (Z-A)</div>
              <div className="dropdown-item" data-sort="joined-newest">Join Date (Newest First)</div>
              <div className="dropdown-item" data-sort="joined-oldest">Join Date (Oldest)</div>
              <div className="dropdown-item" data-sort="login-recent">Last Login (Most Recent)</div>
              <div className="dropdown-item" data-sort="login-old">Last Login (Least Recent)</div>
            </div>
          </div>

          {/* Filter */}
          <div className="dropdown">
            <button
              className="button secondary-button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <svg viewBox="0 0 512 512" width="16" height="16">
                <path d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z" fill="currentColor"/>
              </svg>
              Filter
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                fill="none"
                className="dropdown-arrow"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            <div className={`dropdown-menu ${isFilterOpen ? "show" : ""}`} id="filterDropdownMenu">
              <div className="dropdown-item" data-filter="status">Status</div>
              <div className="dropdown-item" data-filter="role">Role</div>
              <div className="dropdown-item" data-filter="join-date">Join Date</div>
              <div className="dropdown-item" data-filter="last-login">Last Login Date</div>
              <div className="dropdown-item" data-filter="country">Country</div>
              <div className="dropdown-item" data-filter="subscription">Has Active Subscription</div>
              <div className="dropdown-item" data-filter="tags">Has Tag(s)</div>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="dropdown">
            <button
              className="button secondary-button"
              onClick={() => setIsBulkOpen(!isBulkOpen)}
              disabled
            >
              Bulk Actions
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                fill="none"
                className="dropdown-arrow"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            <div className={`dropdown-menu ${isBulkOpen ? "show" : ""}`}>
              <div className="dropdown-item" data-action="suspend">Suspend</div>
              <div className="dropdown-item" data-action="delete">Delete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto border-separate border-spacing-y-3">
        <thead className="bg-[var(--secondary-bg)] text-[var(--menu-text)] uppercase text-xs">
          <tr>
            <th className="px-4 py-3">
              <input
                type="checkbox"
                checked={selectedUsers.length === filteredData.length}
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
          {filteredData.map((user) => (
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
