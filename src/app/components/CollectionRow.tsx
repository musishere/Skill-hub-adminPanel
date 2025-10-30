"use client";

import { useState } from "react";
import { Collection } from "../types/Collection";

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

  const getTypeClass = (type: string) => {
    switch (type) {
      case "Bookmark":
        return "collection-type type-bookmark";
      case "Collection":
        return "collection-type type-collection";
      default:
        return "collection-type";
    }
  };

  const getVisibilityClass = (visibility: string) => {
    switch (visibility) {
      case "Private":
        return "status-pill status-private";
      case "Public":
        return "status-pill status-public";
      case "Hidden":
        return "status-pill status-hidden";
      case "Featured":
        return "status-pill status-featured";
      default:
        return "status-pill";
    }
  };

  return (
    <tr className={`${isSelected ? "bg-white" : ""} hover:bg-[var(--secondary-bg)] transition`}>
      {/* Checkbox */}
      <td className="px-4 py-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={toggleSelect}
          className="w-4 h-4 rounded border-gray-300"
        />
      </td>

      {/* ID */}
      <td className="px-4 py-2">{collection.id}</td>

      {/* Icon */}
      <td className="px-4 py-2">
        <div className="collection-icon">
          {collection.icon}
        </div>
      </td>

      {/* Title */}
      <td className="px-4 py-2">
        <div className="collection-info">
          <div className="collection-details">
            <div className="collection-title">{collection.title}</div>
          </div>
        </div>
      </td>

      {/* Type */}
      <td className="px-4 py-2">
        <span className={getTypeClass(collection.type)}>
          {collection.type}
        </span>
      </td>

      {/* Owner */}
      <td className="px-4 py-2">
        <div className="relative group">
          <span className="user-link">
            {collection.owner}
          </span>
          <div className="tooltip">View {collection.owner} profile</div>
        </div>
      </td>

      {/* Visibility */}
      <td className="px-4 py-2">
        <span className={getVisibilityClass(collection.visibility)}>
          {collection.visibility}
        </span>
      </td>

      {/* Created */}
      <td className="px-4 py-2">{collection.created}</td>

      {/* Count */}
      <td className="px-4 py-2">{collection.count}</td>

      {/* Modified */}
      <td className="px-4 py-2">{collection.modified}</td>

      {/* Linked To */}
      <td className="px-4 py-2">
        <div className="view-links">
          <div className="view-link">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="tooltip">User</div>
          </div>
          <div className="view-link">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 16.7399V4.67C22 3.47 21.02 2.58 19.83 2.68H19.77C17.67 2.86 14.48 3.93 12.7 5.05L12.53 5.16C12.24 5.34 11.76 5.34 11.47 5.16L11.22 5.01C9.44 3.9 6.26 2.84 4.16 2.67C2.97 2.57 2 3.47 2 4.66V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5.48999V20.49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.75 8.48999H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.5 11.49H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="tooltip">Items</div>
          </div>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-2">
        <div className="dropdown relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="options-button"
          >
            <svg viewBox="0 0 24 24">
              <g fillRule="nonzero" fill="currentColor">
                <path d="M12 10.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214M18 10.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214M6 10.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214"></path>
              </g>
            </svg>
            <div className="tooltip">More options</div>
          </button>

          {showActions && (
            <div className="dropdown-menu show">
              <button className="dropdown-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.21C17.88 20.27 12 20.27 8.47 20.27 5.18 18.19 2.88996 14.21C0.599961 10.23 0.599961 13.79 2.88996 9.81C5.18 5.83 8.47 3.75 12 3.75C15.53 3.75 18.82 5.83 21.11 9.82C23.4 13.8 23.4 10.24 21.11 14.22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View
              </button>
              <button className="dropdown-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Edit
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.85 9.14L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.33 16.5H13.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.5 12.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}