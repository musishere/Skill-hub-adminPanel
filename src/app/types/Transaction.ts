export interface Transaction {
  id: string;
  user: string;
  amount: number;
  type: string;
  status: "Success" | "Refunded" | "Processing" | "Failed" | "Cancelled" | "Completed" | "Pending";
  date: string;
  cardNumber?: string;
  nextBill?: string;
  method?: string;
  linkedTo?: string;
}