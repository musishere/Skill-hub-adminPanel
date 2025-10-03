"use client";

import { useState } from "react";
import StatCard from "../components/StatCard";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";
import { Transaction } from "../types/Transaction";

import {
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleDropdown = (key: string) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const transactions: Transaction[] = [
    {
      id: "TXN-001", user: "Sarah Johnson", amount: 1200, type: "Credit", status: "Completed", date: "Sep 1, 2025",
      cardNumber: "", nextBill: "", method: "", linkedTo: ""
    },
    {
      id: "TXN-002", user: "John Doe", amount: 350, type: "Debit", status: "Failed", date: "Sep 2, 2025",
      cardNumber: "", nextBill: "", method: "", linkedTo: ""
    },
    {
      id: "TXN-003", user: "Mike Roberts", amount: 495, type: "Credit", status: "Pending", date: "Sep 3, 2025",
      cardNumber: "", nextBill: "", method: "", linkedTo: ""
    },
  ];

  const stats = [
    { title: "All Transactions", value: "$55,575", sub: "(400)", icon: <CurrencyDollarIcon className="h-6 w-6 text-indigo-500" /> },
    { title: "Success (7 Days)", value: "$8,790", sub: "(97)", icon: <CheckCircleIcon className="h-6 w-6 text-indigo-500" /> },
    { title: "Failed (7 Days)", value: "$495", sub: "(9)", icon: <XCircleIcon className="h-6 w-6 text-indigo-500" /> },
    { title: "Pending (7 Days)", value: "$595", icon: <ClockIcon className="h-6 w-6 text-indigo-500" /> },
  ];

  const dropdownOptions: { [key: string]: string[] } = {
    Sort: ["Date Ascending", "Date Descending", "Amount Ascending", "Amount Descending"],
    Filter: ["Completed", "Failed", "Pending", "Credit", "Debit"],
    "Bulk Actions": ["Delete Selected", "Export Selected", "Mark as Completed"],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header + New Payment */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--button-glow)] text-white rounded-lg hover:bg-[var(--icon-active)]"
        >
          <span>+</span>
          <span>New Payment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} title={stat.title} value={stat.value} sub={stat.sub} icon={stat.icon} />
        ))}
      </div>

      {/* Search + Dropdown Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by user or transaction ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300"
        />

        <div className="flex flex-wrap gap-2">
          {Object.keys(dropdownOptions).map((key) => (
            <div key={key} className="relative">
              <button
                onClick={() => toggleDropdown(key)}
                className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                {key}
              </button>
              {dropdownOpen[key] && (
                <div className="absolute right-0 mt-1 w-48 bg-white border rounded shadow z-10">
                  {dropdownOptions[key].map((option, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen({})}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionTable data={transactions} searchQuery={searchQuery} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={400} // replace with actual total if dynamic
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
      />

      {/* New Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 space-y-4 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">New Payment</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>

            {/* Form Fields */}
            <div className="space-y-2">
              <input type="text" placeholder="Billing Name *" className="w-full px-3 py-2 border rounded-lg"/>
              <input type="email" placeholder="Email *" className="w-full px-3 py-2 border rounded-lg"/>
              <input type="number" placeholder="Amount *" className="w-full px-3 py-2 border rounded-lg"/>
              <input type="text" placeholder="Street Address *" className="w-full px-3 py-2 border rounded-lg"/>
              <input type="text" placeholder="Street Address 2" className="w-full px-3 py-2 border rounded-lg"/>
              <input type="text" placeholder="City *" className="w-full px-3 py-2 border rounded-lg"/>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>United States</option>
              </select>
              <input type="text" placeholder="State/Province *" className="w-full px-3 py-2 border rounded-lg"/>
              <input type="text" placeholder="Zip/Postal Code *" className="w-full px-3 py-2 border rounded-lg"/>
              <input type="text" placeholder="Card Number *" className="w-full px-3 py-2 border rounded-lg"/>
              <div className="flex gap-2">
                <input type="text" placeholder="Expiration Date *" className="flex-1 px-3 py-2 border rounded-lg"/>
                <input type="text" placeholder="CVC *" className="flex-1 px-3 py-2 border rounded-lg"/>
              </div>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Stripe</option>
              </select>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>One Time</option>
              </select>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-3 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
