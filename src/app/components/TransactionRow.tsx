"use client";

import { useState, useRef, useEffect } from "react";
import { Transaction } from "../types/Transaction";

interface TransactionRowProps {
  transaction: Transaction;
  onInvoiceClick?: (transaction: Transaction) => void;
}

export default function TransactionRow({ transaction, onInvoiceClick }: TransactionRowProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleInvoiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onInvoiceClick?.(transaction);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'status-success';
      case 'processing':
        return 'status-processing';
      case 'failed':
        return 'status-failed';
      case 'cancelled':
        return 'status-cancelled';
      case 'refunded':
        return 'status-refunded';
      default:
        return 'status-processing';
    }
  };

  const getBillingAddress = (user: string) => {
    const addresses: { [key: string]: string } = {
      'Sarah Johnson': '123 Main St, Suite 101, San Francisco, California, 94105, US',
      'Michael Chen': '45 Park Lane, Suite 300, Sydney, New South Wales, 2000, AU',
      'Emily Rodriguez': '82 Oxford Street, Flat 5, London, England, W1D 1LL, UK'
    };
    return addresses[user] || 'Address not available';
  };

  const getShortAddress = (user: string) => {
    const addresses: { [key: string]: string } = {
      'Sarah Johnson': '123 Main St, CA 94105',
      'Michael Chen': '45 Park Lane, NSW 2000',
      'Emily Rodriguez': '82 Oxford St, London W1D 1LL'
    };
    return addresses[user] || 'Address not available';
  };

  const getTooltipContent = (user: string) => {
    const addresses: { [key: string]: string } = {
      'Sarah Johnson': '123 Main St, Suite 101<br>San Francisco, CA 94105<br>United States',
      'Michael Chen': '45 Park Lane, Suite 300<br>Sydney, NSW 2000<br>Australia',
      'Emily Rodriguez': '82 Oxford Street, Flat 5<br>London, W1D 1LL<br>United Kingdom'
    };
    return addresses[user] || 'Address not available';
  };

  const getPlanName = (amount: number) => {
    if (amount === 199.99) return 'Elevate';
    if (amount === 49.99) return 'Grow';
    if (amount === 149.99) return 'Empower';
    return 'Basic';
  };

  return (
    <tr>
      {/* Checkbox */}
      <td>
        <div className="checkbox-container">
          <div className="custom-checkbox"></div>
        </div>
      </td>

      {/* ID */}
      <td>{transaction.id}</td>

      {/* Billing Info */}
      <td>
        <div className="billing-info">
          <div className="billing-avatar">
            {transaction.user === 'Sarah Johnson' ? (
              <img 
                src="https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png" 
                alt={transaction.user} 
                className="avatar-image"
                title={transaction.user}
              />
            ) : (
              getInitials(transaction.user)
            )}
          </div>
          <div className="billing-details">
            <div className="billing-name">{transaction.user}</div>
            <div 
              className="billing-address" 
              data-address={getBillingAddress(transaction.user)}
            >
              {getShortAddress(transaction.user)}
              <div 
                className="tooltip-content" 
                dangerouslySetInnerHTML={{ __html: getTooltipContent(transaction.user) }}
              />
            </div>
          </div>
        </div>
      </td>

      {/* Amount with Tooltip */}
      <td className="hover-tooltip">
        ${transaction.amount.toFixed(2)}
        <div className="tooltip-content">
          Plan: {getPlanName(transaction.amount)}
        </div>
      </td>

      {/* Card */}
      <td>{transaction.cardNumber || '4312'}</td>

      {/* Date with Tooltip */}
      <td className="hover-tooltip">
        {transaction.date}
        <div className="tooltip-content">
          Paid On: {transaction.date} {transaction.status === 'Success' ? '4:33:07 PM' : '9:12:45 AM'}
        </div>
      </td>

      {/* Next Bill with Tooltip */}
      <td className="hover-tooltip">
        {transaction.nextBill || (transaction.status === 'Refunded' ? 'N/A' : 'Feb 15, 2025')}
        <div className="tooltip-content">
          {transaction.status === 'Refunded' ? 'No future billing' : `Next Bill: ${transaction.nextBill || 'Feb 15, 2025'} 4:33:07 PM`}
        </div>
      </td>

      {/* Method */}
      <td>
        <span className="method-badge">
          {transaction.method || (transaction.user === 'Michael Chen' ? 'PayPal' : 'Stripe')}
        </span>
      </td>

      {/* Status */}
      <td>
        <span className={`status-pill ${getStatusClass(transaction.status)}`}>
          {transaction.status}
        </span>
      </td>

      {/* View Links */}
      <td>
        <div className="view-links">
          <div 
            className="view-link" 
            data-view="invoice"
            onClick={handleInvoiceClick}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7C4 2 2 4 2 7Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 13.01H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 13.01H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 17.01H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 17.01H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 7.01H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 7.01H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="tooltip">Invoice</div>
          </div>
          <div className="view-link" data-view="plan">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21.6389 14.3957H17.5906C16.1042 14.3948 14.8993 13.1909 14.8984 11.7045C14.8984 10.218 16.1042 9.01409 17.5906 9.01318H21.6389" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.0485 11.6429H17.7369" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.03564 7.53817H12.4346" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="tooltip">Plan</div>
          </div>
        </div>
      </td>

      {/* Linked To */}
      <td>
        <div className="view-links">
          <div className="view-link" data-link="user">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="tooltip">User</div>
          </div>
          <div className="view-link" data-link={transaction.status === 'Refunded' ? 'payment' : 'refund'}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.18 10.16 8.49 10.96 8.49H12.84C13.76 8.49 14.51 9.27 14.51 10.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              {transaction.status !== 'Refunded' && (
                <>
                  <path d="M17 3V7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </>
              )}
            </svg>
            <div className="tooltip">{transaction.status === 'Refunded' ? 'Payment' : 'Refund'}</div>
          </div>
        </div>
      </td>

      {/* Actions Dropdown */}
      <td>
        <div className="options-button" data-transaction-id={transaction.id} ref={dropdownRef}>
          <svg viewBox="0 0 24 24" onClick={toggleDropdown}>
            <g fillRule="nonzero" fill="currentColor">
              <path d="M12 10.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214M18 10.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214M6 10.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214"></path>
            </g>
          </svg>
          <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
            <a href="#" className="dropdown-item">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 12H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5 15L15.5 12L12.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              View
            </a>
            {transaction.status === 'Processing' && (
              <a href="#" className="dropdown-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.17004 14.83L14.83 9.17004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.83 14.83L9.17004 9.17004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Cancel
              </a>
            )}
            <a href="#" className="dropdown-item">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M19.71 7.99004L16 4.28004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.1594 2.90576C13.5387 2.52588 14.2664 2.22149 14.9216 2.22149H19.1194C20.7309 2.22149 22.0001 3.49821 22.0001 5.10217V9.29997C22.0001 9.95517 21.6857 10.6829 21.3058 11.0722L11.0723 21.3057C10.2837 22.0943 8.99421 22.0943 8.20559 21.3057L2.69426 15.7944C1.90564 15.0058 1.90564 13.7163 2.69426 12.9277L13.1594 2.90576Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.2812 7.77881C17.3867 7.88434 17.3867 8.05776 17.2812 8.16329C17.1757 8.26882 17.0023 8.26882 16.8967 8.16329C16.7912 8.05776 16.7912 7.88434 16.8967 7.77881C17.0023 7.67328 17.1757 7.67328 17.2812 7.77881Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Update Billing
            </a>
            {transaction.status !== 'Refunded' && (
              <a href="#" className="dropdown-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.18 10.16 8.49 10.96 8.49H12.84C13.76 8.49 14.51 9.27 14.51 10.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 3V7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Refund
              </a>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}