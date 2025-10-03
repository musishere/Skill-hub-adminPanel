"use client";

import { useState } from "react";
import { Review } from "../types/Review";
import ReviewRow from "./ReviewRow";

interface ReviewTableProps {
  data?: Review[];
  searchQuery: string;
}

export default function ReviewTable({ data = [], searchQuery }: ReviewTableProps) {
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
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full table-auto border-separate border-spacing-y-3">
          <thead className="bg-[var(--secondary-bg)] text-[var(--menu-text)] uppercase text-xs">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
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
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
