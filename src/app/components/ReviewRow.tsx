"use client";

import { Review } from "../types/Review";
import { FaStar, FaEllipsisV } from "react-icons/fa";
import { useState } from "react";

interface ReviewRowProps {
  review: Review;
  isSelected: boolean;
  toggleSelect: () => void;
}

export default function ReviewRow({ review, isSelected, toggleSelect }: ReviewRowProps) {
  const [showActions, setShowActions] = useState(false);

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
      <td className="px-4 py-4">{review.id}</td>

      {/* User */}
      <td className="px-4 py-4">{review.user}</td>

      {/* Product */}
      <td className="px-4 py-4">{review.product}</td>

      {/* Rating */}
      <td className="px-4 py-4">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
      </td>

      {/* Comment */}
      <td className="px-4 py-4 text-gray-600 text-sm">{review.comment}</td>

      {/* Created */}
      <td className="px-4 py-4">{review.created}</td>

      {/* Actions */}
      <td className="px-4 py-4 relative">
        <button
          onClick={() => setShowActions((prev) => !prev)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <FaEllipsisV />
        </button>

        {showActions && (
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg border rounded-md z-10">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">View</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Delete</button>
          </div>
        )}
      </td>
    </tr>
  );
}
