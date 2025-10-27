"use client";

import React, { useState, useEffect, useRef } from "react";
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

  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const bulkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(e.target as Node) &&
        filterRef.current &&
        !filterRef.current.contains(e.target as Node) &&
        bulkRef.current &&
        !bulkRef.current.contains(e.target as Node)
      ) {
        setIsSortOpen(false);
        setIsFilterOpen(false);
        setIsBulkOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const filteredData = data.filter(
    (user) =>
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
          <div className="dropdown" ref={sortRef}>
            <button
              className="button secondary-button"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                width={16}
                height={16}
              >
                <path
                  d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              Sort
            </button>
            <div
              className={`dropdown-menu ${isSortOpen ? "show" : ""}`}
              id="sortDropdownMenu"
            >
              <div className="dropdown-item" data-sort="name-asc">
                Full Name (A-Z)
              </div>
              <div className="dropdown-item" data-sort="name-desc">
                Full Name (Z-A)
              </div>
              <div className="dropdown-item" data-sort="email-asc">
                Email (A-Z)
              </div>
              <div className="dropdown-item" data-sort="email-desc">
                Email (Z-A)
              </div>
              <div className="dropdown-item" data-sort="joined-newest">
                Join Date (Newest First)
              </div>
              <div className="dropdown-item" data-sort="joined-oldest">
                Join Date (Oldest)
              </div>
              <div className="dropdown-item" data-sort="login-recent">
                Last Login (Most Recent)
              </div>
              <div className="dropdown-item" data-sort="login-old">
                Last Login (Least Recent)
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="dropdown" ref={filterRef}>
            <button
              className="button secondary-button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <svg viewBox="0 0 512 512" width="16" height="16">
                <path
                  d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z"
                  fill="currentColor"
                />
              </svg>
              Filter
            </button>
            <div
              className={`dropdown-menu ${isFilterOpen ? "show" : ""}`}
              id="filterDropdownMenu"
            >
              <div className="dropdown-item" data-filter="status">
                Status
              </div>
              <div className="dropdown-item" data-filter="role">
                Role
              </div>
              <div className="dropdown-item" data-filter="join-date">
                Join Date
              </div>
              <div className="dropdown-item" data-filter="last-login">
                Last Login Date
              </div>
              <div className="dropdown-item" data-filter="country">
                Country
              </div>
              <div className="dropdown-item" data-filter="subscription">
                Has Active Subscription
              </div>
              <div className="dropdown-item" data-filter="tags">
                Has Tag(s)
              </div>
            </div>
          </div>

          {/* ✅ Bulk Actions */}
          <div className="dropdown" ref={bulkRef}>
            <button
              className="button secondary-button"
              onClick={() => setIsBulkOpen(!isBulkOpen)}
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
                <path
                  d="M19 9l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>

            {isBulkOpen && (
              <div className="dropdown-menu show" style={{ width: "220px" }}>
                <div className="dropdown-item" data-action="suspend">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20 17.5C20.83 17.5 21.5 18.17 21.5 19S20.83 20.5 20 20.5S18.5 19.83 18.5 19S19.17 17.5 20 17.5Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20 22V20.5"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20 17.5V16"/>
                  </svg>
                  Suspend
                </div>

                <div className="dropdown-item" data-action="unsuspend">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"/>
                  </svg>
                  Unsuspend
                </div>

                <div className="dropdown-item" data-action="resend-verification">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 9v9a3 3 0 01-3 3H6a3 3 0 01-3-3V9"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 9l-7.66 6.48a2 2 0 01-2.68 0L3 9m2.5-2.03L3 9m18 0l-2.5-2.03"/>
                  </svg>
                  Resend Verification Email
                </div>

                <div className="dropdown-item" data-action="change-role">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"/>
                  </svg>
                  Change Role
                </div>

                <div className="dropdown-item" data-action="enroll-products">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 14H14V21H21V14Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10 14H3V21H10V14Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 3H14V10H21V3Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10 3H3V10H10V3Z"/>
                  </svg>
                  Enroll in Product(s)
                </div>

                <div className="dropdown-item" data-action="invite-spaces">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16.9706 14.4402C18.3406 14.6702 19.8506 14.4302 20.9106 13.7202C22.3206 12.7802 22.3206 11.2402 20.9106 10.3002C19.8406 9.59016 18.3106 9.35016 16.9406 9.59016"/>
                  </svg>
                  Invite to Space(s)
                </div>

                <div className="dropdown-item" data-action="tags">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41V13.41Z"/>
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M7 7H7.01"/>
                  </svg>
                  Add/Remove Tags
                </div>
              </div>
            )}
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
