"use client";

import { useState } from "react";
import { Collection } from "../types/Collection";
import CollectionRow from "./CollectionRow";

interface CollectionTableProps {
  data: Collection[];
}

export default function CollectionTable({ data }: CollectionTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof Collection | "">("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredData = data.filter((col) =>
    col.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = sortKey
    ? [...filteredData].sort((a, b) => {
        const valA = a[sortKey] as string | number;
        const valB = b[sortKey] as string | number;
        if (typeof valA === "number" && typeof valB === "number") return valA - valB;
        return String(valA).localeCompare(String(valB));
      })
    : filteredData;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === sortedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedData.map((col) => col.id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300"
        />

        <div className="flex gap-2">
          <button
            className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => setSortKey("created")}
          >
            Sort by Created
          </button>
          <button
            className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => setSortKey("modified")}
          >
            Sort by Modified
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full table-auto border-separate border-spacing-y-3">
          <thead className="bg-[var(--secondary-bg)] text-[var(--menu-text)] uppercase text-xs">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === sortedData.length &&
                    sortedData.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Icon</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Visibility</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Count</th>
              <th className="px-4 py-3">Modified</th>
              <th className="px-4 py-3">Linked To</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((col) => (
              <CollectionRow
                key={col.id}
                collection={col}
                isSelected={selectedIds.includes(col.id)}
                toggleSelect={() => toggleSelect(col.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
