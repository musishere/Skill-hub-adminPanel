// src/components/TransactionTable.tsx
"use client";

import { Transaction } from "../types/Transaction";
import TransactionRow from "./TransactionRow";

interface TransactionTableProps {
  data: Transaction[];
  searchQuery?: string;
}

export default function TransactionTable({ data, searchQuery = "" }: TransactionTableProps) {
  // Filter by search (user name or ID)
  const filteredData = data.filter(
    (t) =>
      t.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headers = [
    "ID",
    "Billing",
    "Amount",
    "Card",
    "Date",
    "Next Bill",
    "Method",
    "Status",
    "View",
    "Linked To",
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full table-auto border-separate border-spacing-y-2">
        <thead className="bg-[var(--secondary-bg)] text-[var(--menu-text)] uppercase text-xs">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-4 py-3 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center py-4 text-gray-500">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
