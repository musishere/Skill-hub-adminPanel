"use client";

import { useState } from "react";
import StatCard from "../components/StatCard";
import ReviewTable from "../components/ReviewTable";
import Pagination from "../components/Pagination"; // <-- import pagination
import { Review } from "../types/Review";
import { FaCheck, FaComment, FaTimes, FaClock, FaEdit, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function ReviewsPage() {
  const [autoApprove, setAutoApprove] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [reasons, setReasons] = useState([
    "Great content and insights",
    "Excellent quality and value",
    "Well-written and informative",
    "Poor quality or content",
    "Not as described",
  ]);
  const [newReason, setNewReason] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleAutoApprove = () => {
    setAutoApprove(!autoApprove);
    toast.success(!autoApprove ? "Reviews will be auto-approved" : "Manual approval enabled");
  };

  const openManageModal = () => setShowManageModal(true);
  const closeManageModal = () => setShowManageModal(false);

  const addReason = () => {
    if (newReason.trim() !== "") {
      setReasons([...reasons, newReason.trim()]);
      setNewReason("");
    }
  };

  const deleteReason = (index: number) => {
    setReasons(reasons.filter((_, i) => i !== index));
  };

  const toggleDropdown = (key: string) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const dropdownOptions: { [key: string]: string[] } = {
    Sort: ["Ascending", "Descending"],
    Rating: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    Date: ["Newest First", "Oldest First"],
    CoType: ["Seasonal", "Special", "Exclusive"],
    Status: ["Published", "Rejected", "Pending"],
    Bulk: ["Delete Selected", "Export Selected"],
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

  return (
    <div className="p-6 space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between">
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

          <button onClick={openManageModal} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Manage Reason
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* Search + Dropdown Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by user or product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300"
        />

        <div className="flex flex-wrap gap-2">
          {Object.keys(dropdownOptions).map((key) => (
            <div key={key} className="relative">
              <button onClick={() => toggleDropdown(key)} className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                {key}
              </button>
              {dropdownOpen[key] && (
                <div className="absolute right-0 mt-1 w-40 bg-white border rounded shadow z-10">
                  {dropdownOptions[key].map((option, idx) => (
                    <button key={idx} className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen({})}>
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Review Table */}
      <ReviewTable data={reviews} searchQuery={searchQuery} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={1526} // replace with actual total if dynamic
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
      />

      {/* Manage Reasons Modal */}
      {showManageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Manage Review Reasons</h2>
            <p className="text-gray-600 text-sm">Configure the main reason options available for reviews.</p>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
                  <span>{reason}</span>
                  <div className="flex gap-2 text-gray-600">
                    <button><FaEdit /></button>
                    <button onClick={() => deleteReason(idx)}><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add new reason..."
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300"
              />
              <button onClick={addReason} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Add</button>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={closeManageModal} className="px-3 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
              <button onClick={closeManageModal} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
