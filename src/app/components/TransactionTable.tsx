"use client";

import { useState, useRef, useEffect } from "react";
import { Transaction } from "../types/Transaction";
import TransactionRow from "./TransactionRow";

interface TransactionTableProps {
  data: Transaction[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onInvoiceClick?: (transaction: Transaction) => void;
}

export default function TransactionTable({ data, searchQuery = "", onSearchChange, onInvoiceClick }: TransactionTableProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [sortBy, setSortBy] = useState<string>("newest");

  const dropdownRefs = {
    sort: useRef<HTMLDivElement>(null),
    filter: useRef<HTMLDivElement>(null),
    bulk: useRef<HTMLDivElement>(null),
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = Object.values(dropdownRefs).every(ref => 
        ref.current && !ref.current.contains(event.target as Node)
      );
      if (isOutside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    console.log(`Sorting by: ${sortType}`);
    setOpenDropdown(null);
  };

  const handleFilter = (filterType: string) => {
    console.log(`Filter by: ${filterType}`);
    setOpenDropdown(null);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action}`);
    setOpenDropdown(null);
  };

  const handleSearchChange = (query: string) => {
    setLocalSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  // Filter by search (user name or ID)
  const filteredData = data.filter(
    (t) =>
      t.user.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(localSearchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-auto bg-white">
      {/* Search and filters section */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--button-line)]">
        <div className="search-container">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={localSearchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          {/* Sort Dropdown */}
          <div className="dropdown" ref={dropdownRefs.sort}>
            <button 
              className="button secondary-button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('sort');
              }}
            >
              <svg viewBox="0 0 16 16" strokeLinejoin="round">
                <path fill="currentColor" d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
              Sort
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" className="dropdown-arrow">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            <div className={`dropdown-menu ${openDropdown === 'sort' ? 'show' : ''}`}>
              <a href="#" className={`dropdown-item ${sortBy === 'newest' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleSort('newest'); }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Newest
              </a>
              <a href="#" className={`dropdown-item ${sortBy === 'oldest' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleSort('oldest'); }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M5 15L12 8L19 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Oldest
              </a>
              <a href="#" className={`dropdown-item ${sortBy === 'amount-high' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleSort('amount-high'); }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M12 20V10M12 10L15 13M12 10L9 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Amount: High to Low
              </a>
              <a href="#" className={`dropdown-item ${sortBy === 'amount-low' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleSort('amount-low'); }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M12 4V14M12 14L15 11M12 14L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Amount: Low to High
              </a>
              <a href="#" className={`dropdown-item ${sortBy === 'name-asc' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleSort('name-asc'); }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Name: A to Z
              </a>
              <a href="#" className={`dropdown-item ${sortBy === 'name-desc' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleSort('name-desc'); }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M5 15L12 8L19 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Name: Z to A
              </a>
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="dropdown" ref={dropdownRefs.filter}>
            <button 
              className="button secondary-button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('filter');
              }}
            >
              <svg viewBox="0 0 512 512">
                <path d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z" fill="currentColor"></path>
              </svg>
              Filter
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" className="dropdown-arrow">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            <div className={`dropdown-menu ${openDropdown === 'filter' ? 'show' : ''}`}>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleFilter('status'); }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Status
              </a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleFilter('billing'); }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M21 10H3M16 2V6M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Billing Country + State
              </a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleFilter('plan'); }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4.93 4.93L6.34 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M17.66 17.66L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6.34 17.66L4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M19.07 4.93L17.66 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Linked Plan
              </a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleFilter('date'); }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Date (from/to)
              </a>
            </div>
          </div>

          {/* Bulk Actions Dropdown */}
          <div className="dropdown" ref={dropdownRefs.bulk}>
            <button 
              className="button secondary-button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('bulk');
              }}
            >
              Bulk Actions
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" className="dropdown-arrow">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            <div className={`dropdown-menu ${openDropdown === 'bulk' ? 'show' : ''}`}>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleBulkAction('refund'); }}>
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <path d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.18 10.16 8.49 10.96 8.49H12.84C13.76 8.49 14.51 9.27 14.51 10.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 3V7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Refund
              </a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleBulkAction('cancel'); }}>
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.17004 14.83L14.83 9.17004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.83 14.83L9.17004 9.17004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <table className="transactions-table mb-0">
        <thead>
          <tr>
            <th>
              <div className="checkbox-container">
                <div className="custom-checkbox" id="selectAll"></div>
              </div>
            </th>
            <th>ID</th>
            <th>Billing</th>
            <th>Amount</th>
            <th>Card</th>
            <th>Date</th>
            <th>Next Bill</th>
            <th>Method</th>
            <th>Status</th>
            <th>View</th>
            <th>Linked To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((transaction) => (
              <TransactionRow 
                key={transaction.id} 
                transaction={transaction} 
                onInvoiceClick={onInvoiceClick}
              />
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-center py-8 text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No transactions found matching your criteria.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}