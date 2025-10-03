// src/components/TransactionRow.tsx
"use client";

import { Transaction } from "../types/Transaction";
import { DocumentIcon, CalendarIcon } from "@heroicons/react/24/solid";

interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-sm">{transaction.id}</td>
      <td className="px-4 py-3 text-sm">{transaction.user}</td>
      <td className="px-4 py-3 text-sm">${transaction.amount.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm">{transaction.cardNumber || "•••• •••• •••• 1234"}</td>
      <td className="px-4 py-3 text-sm">{transaction.date}</td>
      <td className="px-4 py-3 text-sm">{transaction.nextBill || "—"}</td>
      <td className="px-4 py-3 text-sm">{transaction.method || "Stripe"}</td>
      <td className="px-4 py-3 text-sm">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            transaction.status === "Completed"
              ? "bg-green-100 text-green-800"
              : transaction.status === "Failed"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {transaction.status}
        </span>
      </td>

      {/* Actions column with two small grey icons */}
      <td className="px-4 py-3 text-sm flex gap-2 items-center justify-start">
        {/* Invoice Button */}
        <div className="relative group -ml-1">
          <button className="p-1 bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center">
            <DocumentIcon className="h-4 w-4 text-gray-500" />
          </button>
          <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Invoice
          </span>
        </div>

        {/* Plan Button */}
        <div className="relative group -ml-1">
          <button className="p-1 bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center">
            <CalendarIcon className="h-4 w-4 text-gray-500" />
          </button>
          <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Plan
          </span>
        </div>
      </td>

      <td className="px-4 py-3 text-sm">{transaction.linkedTo || "—"}</td>
    </tr>
  );
}
