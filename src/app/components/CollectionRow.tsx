"use client";

import { useState } from "react";
import { Collection } from "../types/Collection";
import {
  EllipsisVerticalIcon,
  UserIcon,
  CubeIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

interface CollectionRowProps {
  collection: Collection;
  isSelected: boolean;
  toggleSelect: () => void;
}

export default function CollectionRow({
  collection,
  isSelected,
  toggleSelect,
}: CollectionRowProps) {
  const [showActions, setShowActions] = useState(false);

  const typeColors: Record<string, string> = {
    Collection: "bg-green-100 text-green-700",
    Bookmark: "bg-blue-100 text-blue-700",
  };

  const visibilityColors: Record<string, string> = {
    Featured: "bg-yellow-100 text-yellow-800",
    Public: "bg-indigo-100 text-indigo-700",
    Private: "bg-red-100 text-red-700",
  };

  return (
    <tr className={`bg-white border-b border-gray-200 hover:bg-gray-50 ${isSelected ? "bg-indigo-50" : ""}`}>
      {/* Checkbox */}
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={toggleSelect}
          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </td>

      {/* ID */}
      <td className="px-4 py-4">{collection.id}</td>

      {/* Icon */}
      <td className="px-4 py-4 text-center">{collection.icon}</td>

      {/* Title */}
      <td className="px-4 py-4">{collection.title}</td>

      {/* Type */}
      <td className="px-4 py-4">
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
            typeColors[collection.type] || "bg-gray-100 text-gray-700"
          }`}
        >
          {collection.type}
        </span>
      </td>

      {/* Owner */}
      <td className="px-4 py-4">{collection.owner}</td>

      {/* Visibility */}
      <td className="px-4 py-4">
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
            visibilityColors[collection.visibility] || "bg-gray-100 text-gray-700"
          }`}
        >
          {collection.visibility}
        </span>
      </td>

      {/* Created */}
      <td className="px-4 py-4">{collection.created}</td>

      {/* Count */}
      <td className="px-4 py-4">{collection.count}</td>

      {/* Modified */}
      <td className="px-4 py-4">{collection.modified}</td>

      {/* Linked To (User & Items) */}
      <td className="px-4 py-4 flex gap-4 justify-center">
        <div className="flex flex-col items-center">
          <button className="p-1 rounded hover:bg-gray-200">
            <UserIcon className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-xs text-gray-400">User</span>
        </div>
        <div className="flex flex-col items-center">
          <button className="p-1 rounded hover:bg-gray-200">
            <CubeIcon className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-xs text-gray-400">Items</span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 relative">
        <button
          onClick={() => setShowActions(!showActions)}
          className="p-1 rounded hover:bg-gray-200"
        >
          <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
        </button>

        {showActions && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
            <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
              <EyeIcon className="w-4 h-4" /> View
            </button>
            <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
              <PencilIcon className="w-4 h-4" /> Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
              <TrashIcon className="w-4 h-4" /> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
