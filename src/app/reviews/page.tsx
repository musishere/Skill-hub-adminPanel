"use client";

import { useState, useRef, useEffect } from "react";
import StatCard from "../components/StatCard";
import ReviewTable from "../components/ReviewTable";
import Pagination from "../components/Pagination";
import { Review } from "../types/Review";
import { FaCheck, FaComment, FaTimes, FaClock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function ReviewsPage() {
  const [autoApprove, setAutoApprove] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [reasons, setReasons] = useState([
    "Great content and insights",
    "Excellent quality and value",
    "Well-written and informative",
    "Poor quality or content",
    "Not as described",
  ]);
  const [newReason, setNewReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dropdownRefs = {
    sort: useRef<HTMLDivElement>(null),
    rating: useRef<HTMLDivElement>(null),
    date: useRef<HTMLDivElement>(null),
    contentType: useRef<HTMLDivElement>(null),
    status: useRef<HTMLDivElement>(null),
    bulk: useRef<HTMLDivElement>(null),
  };

  // Export modal state
  const [exportFormat, setExportFormat] = useState("csv");
  const [exportFromDate, setExportFromDate] = useState("");
  const [exportToDate, setExportToDate] = useState("");
  const [includeFields, setIncludeFields] = useState({
    id: true,
    item: true,
    rating: true,
    user: true,
    reason: true,
    comment: true,
    date: true,
    contentType: true,
    status: true
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
  }, [dropdownRefs]);

  const toggleAutoApprove = () => {
    setAutoApprove(!autoApprove);
    toast.success(!autoApprove ? "Reviews will be auto-approved" : "Manual approval enabled");
  };

  const openManageModal = () => setShowManageModal(true);
  const closeManageModal = () => setShowManageModal(false);

  const openExportModal = () => setShowExportModal(true);
  const closeExportModal = () => setShowExportModal(false);

  const addReason = () => {
    if (newReason.trim() !== "") {
      setReasons([...reasons, newReason.trim()]);
      setNewReason("");
    }
  };

  const deleteReason = (index: number) => {
    setReasons(reasons.filter((_, i) => i !== index));
  };

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleExport = () => {
    // Export logic here
    toast.success(`Reviews exported as ${exportFormat.toUpperCase()}`);
    closeExportModal();
  };

  const toggleIncludeField = (field: string) => {
    setIncludeFields(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  // Handle dropdown item clicks
  const handleDropdownAction = (action: string, value?: string) => {
    console.log(`Action: ${action}`, value ? `Value: ${value}` : '');
    setOpenDropdown(null);
    toast.success(`${action} ${value ? `- ${value}` : ''} selected`);
  };

  const reviews: Review[] = [
    { id: "R-1001", user: "Aliyaan Ahmed", product: "Smartwatch X200", rating: 5, comment: "Amazing product, highly recommend!", created: "Sep 1, 2025" },
    { id: "R-1002", user: "Sara Khan", product: "Wireless Headphones", rating: 4, comment: "Good sound quality but a bit pricey.", created: "Sep 2, 2025" },
    { id: "R-1003", user: "Ahmed Raza", product: "Fitness Tracker", rating: 3, comment: "Average features, battery life could be better.", created: "Sep 3, 2025" },
  ];

  const stats = [
    { title: "All Reviews (7 Days)", value: 1526, icon: <FaComment /> },
    { title: "Published (7 Days)", value: 1256, icon: <FaCheck /> },
    { title: "Rejected (7 Days)", value: 142, icon: <FaTimes /> },
    { title: "Pending (7 Days)", value: 128, icon: <FaClock /> },
  ];

  // Search Component
  const searchComponent = (
    <div className="search-container">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input 
        type="text" 
        placeholder="Filter reviews..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1"
      />
    </div>
  );

  // Filter Component
  const filterComponent = (
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
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('sort', 'newest'); }}>Newest</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('sort', 'oldest'); }}>Oldest</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('sort', 'item-asc'); }}>Item Title (A-Z)</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('sort', 'item-desc'); }}>Item Title (Z-A)</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('sort', 'rating-high'); }}>Top Rated</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('sort', 'rating-low'); }}>Lowest Rated</a>
        </div>
      </div>

      {/* Rating Dropdown */}
      <div className="dropdown" ref={dropdownRefs.rating}>
        <button 
          className="button secondary-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown('rating');
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          Rating
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" className="dropdown-arrow">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <div className={`dropdown-menu ${openDropdown === 'rating' ? 'show' : ''}`}>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('rating', 'all'); }}>All Ratings</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('rating', '5'); }}>5 Stars</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('rating', '4'); }}>4 Stars</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('rating', '3'); }}>3 Stars</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('rating', '2'); }}>2 Stars</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('rating', '1'); }}>1 Star</a>
        </div>
      </div>

      {/* Date Dropdown */}
      <div className="dropdown" ref={dropdownRefs.date}>
        <button 
          className="button secondary-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown('date');
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Date
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" className="dropdown-arrow">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <div className={`dropdown-menu datepicker ${openDropdown === 'date' ? 'show' : ''}`}>
          <div className="datepicker-selector">
            <div className="datepicker-range">
              <label>From:</label>
              <input type="text" className="datepicker-input" placeholder="Select date" readOnly />
            </div>
            <div className="datepicker-range">
              <label>To:</label>
              <input type="text" className="datepicker-input" placeholder="Select date" readOnly />
            </div>
          </div>
          <div className="datepicker-header">
            <div className="datepicker-month">March 2025</div>
            <div className="datepicker-nav">
              <button className="datepicker-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="datepicker-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
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
            {/* Days will be inserted here by JavaScript */}
          </div>
          <div className="datepicker-actions">
            <button className="button secondary-button">Clear</button>
            <button className="button primary-button">Apply</button>
          </div>
        </div>
      </div>

      {/* Content Type Dropdown */}
      <div className="dropdown" ref={dropdownRefs.contentType}>
        <button 
          className="button secondary-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown('contentType');
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          CoType
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" className="dropdown-arrow">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <div className={`dropdown-menu ${openDropdown === 'contentType' ? 'show' : ''}`}>
          <div className="checkbox-filter">
            <div className="checkbox-option">
              <input type="checkbox" id="content-all" defaultChecked />
              <label htmlFor="content-all">All</label>
            </div>
            <div className="checkbox-option">
              <input type="checkbox" id="content-books" />
              <label htmlFor="content-books">Books</label>
            </div>
            <div className="checkbox-option">
              <input type="checkbox" id="content-podcasts" />
              <label htmlFor="content-podcasts">Podcasts</label>
            </div>
            <div className="checkbox-option">
              <input type="checkbox" id="content-wikipedia" />
              <label htmlFor="content-wikipedia">Wikipedia</label>
            </div>
          </div>
          <div className="datepicker-actions">
            <button className="button primary-button" onClick={() => handleDropdownAction('contentType', 'apply')}>Apply</button>
          </div>
        </div>
      </div>

      {/* Status Dropdown */}
      <div className="dropdown" ref={dropdownRefs.status}>
        <button 
          className="button secondary-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown('status');
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Status
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" className="dropdown-arrow">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <div className={`dropdown-menu ${openDropdown === 'status' ? 'show' : ''}`}>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('status', 'all'); }}>All</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('status', 'published'); }}>Published</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('status', 'rejected'); }}>Rejected</a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('status', 'pending'); }}>Pending</a>
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
          Bulk
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" className="dropdown-arrow">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <div className={`dropdown-menu ${openDropdown === 'bulk' ? 'show' : ''}`}>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('bulk', 'approve'); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Approve Selected
          </a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('bulk', 'reject'); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Reject Selected
          </a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('bulk', 'export'); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Selected
          </a>
          <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDropdownAction('bulk', 'delete'); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete Selected
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-[var(--dashboard-bg)] min-h-screen">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Reviews</h1>

        {/* Top-right controls */}
        <div className="flex items-center gap-4">
          <label className="flex items-center cursor-pointer">
            <div className="relative w-14 h-8">
              <input type="checkbox" checked={autoApprove} onChange={toggleAutoApprove} className="sr-only" />
              <span className={`block w-full h-full rounded-full transition-colors ${autoApprove ? "bg-green-500" : "bg-gray-300"}`}></span>
              <span className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transform transition-transform ${autoApprove ? "translate-x-6" : "translate-x-0"}`}></span>
            </div>
            <span className="ml-3 text-gray-700 font-medium">Auto-Approve</span>
          </label>

          <button onClick={openManageModal} className="button secondary-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            Manage Reason
          </button>

          <button onClick={openExportModal} className="button primary-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* Review Table with integrated search/filter */}
      <ReviewTable 
        data={reviews} 
        searchQuery={searchQuery}
        searchComponent={searchComponent}
        filterComponent={filterComponent}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={1526}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
      />

      {/* Manage Reasons Modal */}
      {showManageModal && (
        <div className="modal-overlay active">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Manage Review Reasons</h2>
              <button className="modal-close" onClick={closeManageModal}>&times;</button>
            </div>
            <div className="modal-content">
              <p>Configure the main reason options available for reviews.</p>
              <div className="reasons-list">
                {reasons.map((reason, idx) => (
                  <div key={idx} className="reason-item">
                    <div className="reason-text">{reason}</div>
                    <div className="reason-actions">
                      <button className="edit-reason-btn">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button className="delete-reason-btn" onClick={() => deleteReason(idx)}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                <div className="add-reason">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Add new reason..."
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                  />
                  <button className="button primary-button" onClick={addReason}>Add</button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="button secondary-button modal-close-btn" onClick={closeManageModal}>Cancel</button>
              <button className="button primary-button" onClick={closeManageModal}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Export Data Modal */}
      {showExportModal && (
        <div className="modal-overlay active">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Export Review Data</h2>
              <button className="modal-close" onClick={closeExportModal}>&times;</button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label className="form-label">Export Format</label>
                <select 
                  className="form-select" 
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                  <option value="xlsx">Excel (XLSX)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date Range</label>
                <div className="form-group">
                  <label className="form-label">From</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={exportFromDate}
                    onChange={(e) => setExportFromDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">To</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={exportToDate}
                    onChange={(e) => setExportToDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Include Fields</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  <div>
                    <input 
                      type="checkbox" 
                      id="includeId" 
                      checked={includeFields.id}
                      onChange={() => toggleIncludeField('id')}
                    />
                    <label htmlFor="includeId">ID</label>
                  </div>
                  <div>
                    <input 
                      type="checkbox" 
                      id="includeItem" 
                      checked={includeFields.item}
                      onChange={() => toggleIncludeField('item')}
                    />
                    <label htmlFor="includeItem">Item</label>
                  </div>
                  <div>
                    <input 
                      type="checkbox" 
                      id="includeRating" 
                      checked={includeFields.rating}
                      onChange={() => toggleIncludeField('rating')}
                    />
                    <label htmlFor="includeRating">Rating</label>
                  </div>
                  <div>
                    <input 
                      type="checkbox" 
                      id="includeUser" 
                      checked={includeFields.user}
                      onChange={() => toggleIncludeField('user')}
                    />
                    <label htmlFor="includeUser">User</label>
                  </div>
                  <div>
                    <input 
                      type="checkbox" 
                      id="includeReason" 
                      checked={includeFields.reason}
                      onChange={() => toggleIncludeField('reason')}
                    />
                    <label htmlFor="includeReason">Reason</label>
                  </div>
                  <div>
                    <input 
                      type="checkbox" 
                      id="includeComment" 
                      checked={includeFields.comment}
                      onChange={() => toggleIncludeField('comment')}
                    />
                    <label htmlFor="includeComment">Comment</label>
                  </div>
                  <div>
                    <input 
                      type="checkbox" 
                      id="includeDate" 
                      checked={includeFields.date}
                      onChange={() => toggleIncludeField('date')}
                    />
                    <label htmlFor="includeDate">Date</label>
                  </div>
                  <div>
                    <input 
                      type="checkbox" 
                      id="includeContentType" 
                      checked={includeFields.contentType}
                      onChange={() => toggleIncludeField('contentType')}
                    />
                    <label htmlFor="includeContentType">Type</label>
                  </div>
                  <div>
                    <input 
                      type="checkbox" 
                      id="includeStatus" 
                      checked={includeFields.status}
                      onChange={() => toggleIncludeField('status')}
                    />
                    <label htmlFor="includeStatus">Status</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="button secondary-button modal-close-btn" onClick={closeExportModal}>Cancel</button>
              <button className="button primary-button" onClick={handleExport}>Export</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}