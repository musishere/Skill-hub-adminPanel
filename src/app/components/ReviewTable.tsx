"use client";

import { useState } from "react";
import { Review } from "../types/Review";
import ReviewRow from "./ReviewRow";

interface ReviewTableProps {
  data?: Review[];
  searchQuery: string;
  searchComponent?: React.ReactNode;
  filterComponent?: React.ReactNode;
}

export default function ReviewTable({ data = [], searchQuery, searchComponent, filterComponent }: ReviewTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredData = data.filter(
    (rev) =>
      rev.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map((r) => r.id));
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--button-line)] bg-white">
      {/* Search and Filter Section - Search left, Filters right */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--button-line)]">
        {/* Search on the left */}
        <div className="flex-shrink-0">
          {searchComponent}
        </div>
        
        {/* Filters on the right */}
        <div className="flex items-center gap-2">
          {filterComponent}
        </div>
      </div>

      {/* Table Section */}
      <table className="reviews-table w-full">
        <thead>
          <tr>
            <th className="text-left">
              <input
                type="checkbox"
                checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th className="text-left">Review ID</th>
            <th className="text-left">Item</th>
            <th className="text-left">Rating</th>
            <th className="text-left">User</th>
            <th className="text-left">Reason</th>
            <th className="text-left">Comment</th>
            <th className="text-left">Date</th>
            <th className="text-left">Type</th>
            <th className="text-left">Status</th>
            <th className="text-left">Linked</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((rev) => (
              <ReviewRow
                key={rev.id}
                review={rev}
                isSelected={selectedIds.includes(rev.id)}
                toggleSelect={() => toggleSelect(rev.id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-center py-8 text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No reviews found matching your criteria.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}