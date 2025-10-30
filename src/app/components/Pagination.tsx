"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, currentPage - 3),
    Math.min(totalPages, currentPage + 2)
  );

  return (
    <div className="pagination-row">
      {/* Info & Rows per page */}
      <div className="pagination-info">
        <div>
          Showing <span className="pagination-bold">{startItem}-{endItem}</span> of{" "}
          <span className="pagination-bold">{totalItems}</span> users
        </div>

        <div className="page-size-wrapper">
          <span className="page-size-label">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="page-size-dropdown"
          >
            {[5, 10, 20, 25, 50, 100].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pagination Buttons */}
      <div className="pagination-controls">
        <div className="page-buttons">
          <button
            className={`page-button ${currentPage === 1 ? "disabled" : ""}`}
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none">
              <path d="M18 17L13 12L18 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 17L6 12L11 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className={`page-button ${currentPage === 1 ? "disabled" : ""}`}
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`page-button ${num === currentPage ? "active" : ""}`}
            >
              {num}
            </button>
          ))}

          <button
            className={`page-button ${currentPage === totalPages ? "disabled" : ""}`}
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className={`page-button ${currentPage === totalPages ? "disabled" : ""}`}
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none">
              <path d="M6 7L11 12L6 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 7L18 12L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
