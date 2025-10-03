// src/types/Transaction.ts

export interface Transaction {
  cardNumber: string;
  nextBill: string;
  method: string;
  linkedTo: string;
  id: string;       // Unique transaction ID
  user: string;     // Name of the user who made the transaction
  amount: number;   // Transaction amount
  type: "Credit" | "Debit"; // Type of transaction
  status: "Completed" | "Pending" | "Failed"; // Status of transaction
  date: string;     // Date of transaction (can use ISO string)
}
