"use client";

import { useState } from "react";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";
import { Transaction } from "../types/Transaction";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleInvoiceClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowInvoiceModal(true);
  };

  const transactions: Transaction[] = [
    {
      id: "T-8FJ39K2L",
      user: "Sarah Johnson",
      amount: 199.99,
      type: "Credit",
      status: "Success",
      date: "Jan 15, 2025",
      cardNumber: "4312",
      nextBill: "Feb 15, 2025",
      method: "Stripe",
      linkedTo: "Elevate"
    },
    {
      id: "T-9XM45RN7", 
      user: "Michael Chen",
      amount: 49.99,
      type: "Credit",
      status: "Refunded",
      date: "Jan 28, 2025",
      cardNumber: "8712",
      nextBill: "N/A",
      method: "PayPal",
      linkedTo: "Grow"
    },
    {
      id: "T-7JK2L3P9",
      user: "Emily Rodriguez",
      amount: 149.99,
      type: "Credit", 
      status: "Processing",
      date: "Feb 10, 2025",
      cardNumber: "5532",
      nextBill: "Mar 10, 2025",
      method: "Paddle",
      linkedTo: "Empower"
    }
  ];

  const getInvoiceDetails = (transaction: Transaction) => {
    const details = {
      "T-8FJ39K2L": {
        invoiceNumber: "INV-20250115-001",
        plan: "Elevate",
        externalId: "ch_3NxVLtKn9RY28Lt51eDYeZaU",
        item: "Elevate Plan",
        description: "Monthly subscription",
        amount: 199.99
      },
      "T-9XM45RN7": {
        invoiceNumber: "INV-20250128-002", 
        plan: "Grow",
        externalId: "ch_3NxVLtKn9RY28Lt52eDYeZaU",
        item: "Grow Plan",
        description: "Monthly subscription",
        amount: 49.99
      },
      "T-7JK2L3P9": {
        invoiceNumber: "INV-20250210-003",
        plan: "Empower",
        externalId: "ch_3NxVLtKn9RY28Lt53eDYeZaU",
        item: "Empower Plan",
        description: "Monthly subscription", 
        amount: 149.99
      }
    };
    return details[transaction.id as keyof typeof details] || details["T-8FJ39K2L"];
  };

  const getBillingAddress = (user: string): string => {
    const addresses: Record<string, string> = {
      'Sarah Johnson': '123 Main St, Suite 101\nSan Francisco, CA 94105\nUnited States',
      'Michael Chen': '45 Park Lane, Suite 300\nSydney, NSW 2000\nAustralia', 
      'Emily Rodriguez': '82 Oxford Street, Flat 5\nLondon, W1D 1LL\nUnited Kingdom'
    };
    return addresses[user] || 'Address not available';
  };

 return (
  <div className="p-6">
    {/* Header + New Payment - Add margin-bottom here */}
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold">Transactions</h1>
      <button
        onClick={() => setShowModal(true)}
        className="button primary-button"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        New Payment
      </button>
    </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" viewBox="0 0 24 24">
              <path d="M21.6389 14.3957H17.5906C16.1042 14.3948 14.8993 13.1909 14.8984 11.7045C14.8984 10.218 16.1042 9.01409 17.5906 9.01318H21.6389" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.0485 11.6429H17.7369" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.03564 7.53817H12.4346" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-info">
            <h3>All Transactions</h3>
            <div className="stat-number">$55,575 <span>(400)</span></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 9.5H12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L13.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.5 2H22V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-info">
            <h3>Success <span>(7 Days)</span></h3>
            <div className="stat-number">$8,790 <span>(97)</span></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 9.5H12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L13.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 17H9c-.6 0-1-.4-1-1s.4-1 1-1h4c.6 0 1 .4 1 1s-.4 1-1 1z"/>
            </svg>
          </div>
          <div className="stat-info">
            <h3>Failed <span>(7 Days)</span></h3>
            <div className="stat-number">$495 <span>(9)</span></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9.25 9.05C11.03 9.7 12.97 9.7 14.75 9.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-info">
            <h3>Pending <span>(7 Days)</span></h3>
            <div className="stat-number">$595 <span>(6)</span></div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionTable 
        data={transactions} 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        onInvoiceClick={handleInvoiceClick}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={400}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
      />

      {/* Invoice Modal */}
      {showInvoiceModal && selectedTransaction && (
        <div className="modal-overlay active">
          <div className="modal" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Invoice</h2>
              <button className="modal-close" onClick={() => setShowInvoiceModal(false)}>&times;</button>
            </div>
            <div className="modal-content">
              <div className="invoice-id">{selectedTransaction.id}</div>
              <hr className="modal-divider" />
              
              <div className="invoice-grid">
                <div className="invoice-company">
                  <div className="company-logo">
                    <svg width="32" height="32" fill="#458BC1" viewBox="0 0 24 24">
                      <path d="M21.6389 14.3957H17.5906C16.1042 14.3948 14.8993 13.1909 14.8984 11.7045C14.8984 10.218 16.1042 9.01409 17.5906 9.01318H21.6389" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z" fill="currentColor" stroke="white" strokeWidth="0.5"/>
                    </svg>
                    <span>YourCompany Inc.</span>
                  </div>
                  <div className="company-info">
                    <p>123 Business Street</p>
                    <p>Suite 200</p>
                    <p>San Francisco, CA 94105</p>
                    <p>United States</p>
                    <p>support@yourcompany.com</p>
                  </div>
                </div>
                
                <div className="invoice-details">
                  <div className="detail-group">
                    <div className="detail-label">Invoice Number</div>
                    <div className="detail-value">{getInvoiceDetails(selectedTransaction).invoiceNumber}</div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">Issue Date</div>
                    <div className="detail-value">{selectedTransaction.date}</div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">Due Date</div>
                    <div className="detail-value">{selectedTransaction.date}</div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">Payment Type</div>
                    <div className="detail-value">Subscription</div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">Plan</div>
                    <div className="detail-value">{getInvoiceDetails(selectedTransaction).plan}</div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">External ID</div>
                    <div className="detail-value">{getInvoiceDetails(selectedTransaction).externalId}</div>
                  </div>
                </div>
              </div>
              
              <div className="invoice-billing">
                <div className="billing-section">
                  <h3>Bill To:</h3>
                  <div className="billing-details">
                    {getBillingAddress(selectedTransaction.user).split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                    <p>{selectedTransaction.user.toLowerCase().replace(' ', '.')}@example.com</p>
                  </div>
                </div>
                <div className="billing-section">
                  <h3>Payment Method:</h3>
                  <div className="payment-details">
                    <p>Credit Card ending in {selectedTransaction.cardNumber}</p>
                    <p>{selectedTransaction.method}</p>
                  </div>
                </div>
              </div>
              
              <div className="invoice-items">
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{getInvoiceDetails(selectedTransaction).item}</td>
                      <td>{getInvoiceDetails(selectedTransaction).description}</td>
                      <td>1</td>
                      <td>${getInvoiceDetails(selectedTransaction).amount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="invoice-summary">
                <div className="summary-row">
                  <div className="summary-label">Subtotal</div>
                  <div className="summary-value">${getInvoiceDetails(selectedTransaction).amount.toFixed(2)}</div>
                </div>
                <div className="summary-row">
                  <div className="summary-label">Tax (0%)</div>
                  <div className="summary-value">$0.00</div>
                </div>
                <div className="summary-row total">
                  <div className="summary-label">Total</div>
                  <div className="summary-value">${getInvoiceDetails(selectedTransaction).amount.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="invoice-notes">
                <h3>Notes</h3>
                <p>Thank you for your business! Payment is due within 10 days.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="button secondary-button modal-close-btn" onClick={() => setShowInvoiceModal(false)}>
                Close
              </button>
              <button className="button primary-button">Download PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* New Payment Modal */}
      {showModal && (
        <div className="modal-overlay active">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">New Payment</h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="modal-close"
              >
                &times;
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label className="form-label">Billing Name <span style={{ color: "red" }}>*</span></label>
                <input type="text" className="form-control" placeholder="Enter billing name"/>
              </div>
              <div className="form-group">
                <label className="form-label">Email <span style={{ color: "red" }}>*</span></label>
                <input type="email" className="form-control" placeholder="Enter email address"/>
              </div>
              <div className="form-group">
                <label className="form-label">Amount <span style={{ color: "red" }}>*</span></label>
                <input type="text" className="form-control" placeholder="Enter amount"/>
              </div>
              <div className="form-group">
                <label className="form-label">Street Address <span style={{ color: "red" }}>*</span></label>
                <input type="text" className="form-control" placeholder="Enter street address"/>
              </div>
              <div className="form-group">
                <label className="form-label">Street Address 2</label>
                <input type="text" className="form-control" placeholder="Enter apartment, suite, etc."/>
              </div>
              <div className="form-group">
                <label className="form-label">City <span style={{ color: "red" }}>*</span></label>
                <input type="text" className="form-control" placeholder="Enter city"/>
              </div>
              <div className="form-group">
                <label className="form-label">Country <span style={{ color: "red" }}>*</span></label>
                <select className="form-select">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Germany</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">State/Province <span style={{ color: "red" }}>*</span></label>
                <select className="form-select">
                  <option>California</option>
                  <option>New York</option>
                  <option>Texas</option>
                  <option>Florida</option>
                  <option>Illinois</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Zip/Postal Code <span style={{ color: "red" }}>*</span></label>
                <input type="text" className="form-control" placeholder="Enter zip/postal code"/>
              </div>
              <div className="form-group">
                <label className="form-label">Card Number <span style={{ color: "red" }}>*</span></label>
                <input type="text" className="form-control" placeholder="Enter card number"/>
              </div>
              <div className="form-group">
                <label className="form-label">Expiration Date <span style={{ color: "red" }}>*</span></label>
                <div style={{ display: "flex", gap: "12px" }}>
                  <select className="form-select" style={{ flex: 1 }}>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                  <select className="form-select" style={{ flex: 1 }}>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                    <option>2030</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">CVC <span style={{ color: "red" }}>*</span></label>
                <input type="text" className="form-control" placeholder="Enter CVC"/>
              </div>
              <div className="form-group">
                <label className="form-label">Payment Method <span style={{ color: "red" }}>*</span></label>
                <select className="form-select">
                  <option>Stripe</option>
                  <option>PayPal</option>
                  <option>Paddle</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Link to Plan</label>
                <select className="form-select">
                  <option>Learn</option>
                  <option>Grow</option>
                  <option>Elevate</option>
                  <option>Empower</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Billing Type</label>
                <select className="form-select">
                  <option>One Time</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setShowModal(false)} 
                className="button secondary-button modal-close-btn"
              >
                Cancel
              </button>
              <button className="button primary-button">Create Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}