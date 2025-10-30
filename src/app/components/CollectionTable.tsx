"use client";

import { useState, useRef, useEffect } from "react";
import { Collection } from "../types/Collection";
import CollectionRow from "./CollectionRow";

interface CollectionTableProps {
  data: Collection[];
}

export default function CollectionTable({ data }: CollectionTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownRefs = {
    sort: useRef<HTMLDivElement>(null),
    created: useRef<HTMLDivElement>(null),
    modified: useRef<HTMLDivElement>(null),
    bulkActions: useRef<HTMLDivElement>(null),
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((col) => col.id));
    }
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const filteredData = data.filter((col) =>
    col.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !dropdownRefs.sort.current?.contains(event.target as Node) &&
        !dropdownRefs.created.current?.contains(event.target as Node) &&
        !dropdownRefs.modified.current?.contains(event.target as Node) &&
        !dropdownRefs.bulkActions.current?.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-0">
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-t-lg shadow-sm">
        {/* Search */}
        <div className="flex items-center gap-2 border px-4 py-2 rounded-md w-full sm:w-auto">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-gray-400"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search collections..."
            value={searchQuery ?? ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none w-full"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Sort */}
          <div className="relative" ref={dropdownRefs.sort}>
            <button 
              className="button secondary-button flex items-center gap-2"
              onClick={() => toggleDropdown("sort")}
            >
              <svg viewBox="0 0 16 16" strokeLinejoin="round" className="w-4 h-4">
                <path
                  fill="currentColor"
                  d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
              Sort
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                fill="none"
                className={`transition-transform ${activeDropdown === "sort" ? "rotate-180" : ""}`}
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            
            {/* Sort Dropdown Menu */}
            {activeDropdown === "sort" && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-50">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Title (A-Z)
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Title (Z-A)
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Count (DESC)
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Created */}
          <div className="relative" ref={dropdownRefs.created}>
            <button 
              className="button secondary-button flex items-center gap-2"
              onClick={() => toggleDropdown("created")}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M8 2V5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.5 9.09H20.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Created
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                fill="none"
                className={`transition-transform ${activeDropdown === "created" ? "rotate-180" : ""}`}
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            
            {/* Created Date Picker Dropdown */}
            {activeDropdown === "created" && (
              <DatePicker prefix="created" onClose={() => setActiveDropdown(null)} />
            )}
          </div>

          {/* Modified */}
          <div className="relative" ref={dropdownRefs.modified}>
            <button 
              className="button secondary-button flex items-center gap-2"
              onClick={() => toggleDropdown("modified")}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M8 2V5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.5 9.09H20.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 15.79L16.19 18.6L15 17.4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Modified
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                fill="none"
                className={`transition-transform ${activeDropdown === "modified" ? "rotate-180" : ""}`}
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            
            {/* Modified Date Picker Dropdown */}
            {activeDropdown === "modified" && (
              <DatePicker prefix="modified" onClose={() => setActiveDropdown(null)} />
            )}
          </div>

          {/* Bulk Actions */}
          <div className="relative" ref={dropdownRefs.bulkActions}>
            <button 
              className="button secondary-button flex items-center gap-2"
              onClick={() => toggleDropdown("bulkActions")}
            >
              Bulk Actions
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                fill="none"
                className={`transition-transform ${activeDropdown === "bulkActions" ? "rotate-180" : ""}`}
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            
            {/* Bulk Actions Dropdown Menu */}
            {activeDropdown === "bulkActions" && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-50">
                <div className="py-1">
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.85 9.14L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.33 16.5H13.66" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.5 12.5H14.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Delete
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-[var(--secondary-bg)] text-[var(--menu-text)] uppercase text-xs">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedIds.length === data.length && data.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300"
                />
              </th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Icon</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Owner</th>
              <th className="px-4 py-2">Visibility</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Count</th>
              <th className="px-4 py-2">Modified</th>
              <th className="px-4 py-2">Linked To</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((collection) => (
              <CollectionRow
                key={collection.id}
                collection={collection}
                isSelected={selectedIds.includes(collection.id)}
                toggleSelect={() => toggleSelect(collection.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// DatePicker Component with your exact CSS classes
function DatePicker({ prefix, onClose }: { prefix: string; onClose: () => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
  const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentYear, currentMonth + direction, 1));
  };

  const handleDateClick = (date: Date) => {
    if (!selectedFromDate || (selectedFromDate && selectedToDate)) {
      // Start new selection
      setSelectedFromDate(date);
      setSelectedToDate(null);
    } else {
      // Complete selection
      if (date > selectedFromDate) {
        setSelectedToDate(date);
      } else {
        setSelectedToDate(selectedFromDate);
        setSelectedFromDate(date);
      }
    }
  };

  const clearDates = () => {
    setSelectedFromDate(null);
    setSelectedToDate(null);
  };

  const applyDates = () => {
    if (selectedFromDate && selectedToDate) {
      console.log(`Date filter applied: ${formatDate(selectedFromDate)} to ${formatDate(selectedToDate)}`);
      onClose();
    } else {
      console.log('Please select both from and to dates');
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isSelectedDate = (date: Date) => {
    if (!selectedFromDate && !selectedToDate) return false;
    
    if (selectedFromDate && !selectedToDate) {
      return isSameDate(date, selectedFromDate);
    }
    
    if (selectedFromDate && selectedToDate) {
      return (date >= selectedFromDate && date <= selectedToDate) || 
             (date >= selectedToDate && date <= selectedFromDate);
    }
    
    return false;
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
  };

  const formatDate = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const renderCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    const days = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(currentYear, currentMonth - 1, day);
      days.push(
        <div key={`prev-${day}`} className="datepicker-day other-month">
          {day}
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      let className = "datepicker-day";
      
      if (isToday(date)) {
        className += " today";
      }
      
      if (isSelectedDate(date)) {
        className += " selected";
      }

      days.push(
        <div 
          key={`current-${i}`} 
          className={className}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    // Next month days
    const totalCells = 42;
    const filledCells = firstDay + daysInMonth;
    const nextMonthDays = totalCells - filledCells;
    
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      days.push(
        <div key={`next-${i}`} className="datepicker-day other-month">
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="datepicker show" style={{ width: '280px' }}>
      <div className="datepicker-selector">
        <div className="datepicker-range">
          <label>From:</label>
          <input 
            type="text" 
            className="datepicker-input" 
            value={selectedFromDate ? formatDate(selectedFromDate) : ''}
            placeholder="Select date" 
            readOnly 
          />
        </div>
        <div className="datepicker-range">
          <label>To:</label>
          <input 
            type="text" 
            className="datepicker-input" 
            value={selectedToDate ? formatDate(selectedToDate) : ''}
            placeholder="Select date" 
            readOnly 
          />
        </div>
      </div>
      
      <div className="datepicker-header">
        <div className="datepicker-month">{monthNames[currentMonth]} {currentYear}</div>
        <div className="datepicker-nav">
          <button className="datepicker-btn" onClick={() => navigateMonth(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 18L9 12L15 6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="datepicker-btn" onClick={() => navigateMonth(1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 6L15 12L9 18" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="datepicker-day-names">
        <div className="datepicker-day-name">Su</div>
        <div className="datepicker-day-name">Mo</div>
        <div className="datepicker-day-name">Tu</div>
        <div className="datepicker-day-name">We</div>
        <div className="datepicker-day-name">Th</div>
        <div className="datepicker-day-name">Fr</div>
        <div className="datepicker-day-name">Sa</div>
      </div>
      
      <div className="datepicker-grid">
        {renderCalendarDays()}
      </div>
      
      <div className="datepicker-actions">
        <button className="button secondary-button" onClick={clearDates}>Clear</button>
        <button className="button primary-button" onClick={applyDates}>Apply</button>
      </div>
    </div>
  );
}