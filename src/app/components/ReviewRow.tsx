"use client";

import { Review } from "../types/Review";
import { useState } from "react";
import Image from "next/image";

interface ReviewRowProps {
  review: Review;
  isSelected: boolean;
  toggleSelect: () => void;
}

interface ReviewDetails {
  itemTitle: string;
  itemId: string;
  itemImage: string;
  rating: number;
  userFullName: string;
  userEmail: string;
  userImage: string;
  reason: string;
  fullComment: string;
  contentType: string;
  status: string;
}

export default function ReviewRow({ review, isSelected, toggleSelect }: ReviewRowProps) {
  const [showActions, setShowActions] = useState(false);

  // Enhanced review data with all required fields
  const getReviewDetails = (reviewId: string): ReviewDetails => {
    const detailsMap: { [key: string]: ReviewDetails } = {
      "R-1001": {
        itemTitle: "The Complete Guide to Machine Learning",
        itemId: "ITM-A7B9C3",
        itemImage: "https://i.ibb.co/XZwpwsqp/product1.webp",
        rating: 4.5,
        userFullName: "John Smith",
        userEmail: "johnsmith@example.com",
        userImage: "https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg",
        reason: "Great insights and practical examples for beginners",
        fullComment: "This book provides excellent examples and clear explanations that make complex concepts easy to understand. Highly recommended for anyone starting with machine learning.",
        contentType: "Books",
        status: "Published"
      },
      "R-1002": {
        itemTitle: "JavaScript: The Definitive Guide",
        itemId: "ITM-B8D1E6",
        itemImage: "https://i.ibb.co/SwpdsBdp/product2.webp",
        rating: 5.0,
        userFullName: "Mary Jones",
        userEmail: "maryjones@example.com",
        userImage: "https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg",
        reason: "Comprehensive reference with excellent code examples",
        fullComment: "This is the best JavaScript book I've ever read. The author does an amazing job explaining complex concepts with clear examples. Perfect for both beginners and experienced developers.",
        contentType: "Books",
        status: "Published"
      },
      "R-1003": {
        itemTitle: "Historia de España: Un Recorrido por Su Pasado",
        itemId: "ITM-C5G7H1",
        itemImage: "https://i.ibb.co/SwpdsBdp/product2.webp",
        rating: 2.5,
        userFullName: "Carlos Rodriguez",
        userEmail: "carlos@example.com",
        userImage: "https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg",
        reason: "Lacks depth on important historical periods",
        fullComment: "El podcast no profundiza lo suficiente en los períodos más importantes de la historia española. Esperaba un análisis más detallado de la Guerra Civil y la dictadura franquista.",
        contentType: "Podcasts",
        status: "Rejected"
      },
      "R-1004": {
        itemTitle: "Artificial Intelligence: A Modern Approach",
        itemId: "ITM-D2K8L4",
        itemImage: "https://i.ibb.co/SwpdsBdp/product2.webp",
        rating: 4.0,
        userFullName: "Alex Thompson",
        userEmail: "alex@example.com",
        userImage: "https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg",
        reason: "Excellent technical content but could be more accessible",
        fullComment: "This book is the gold standard for AI textbooks. The technical depth is impressive, though it can be challenging for beginners. I'd recommend having some programming experience before tackling this.",
        contentType: "Books",
        status: "Pending"
      }
    };
    
    return detailsMap[reviewId] || {
      itemTitle: review.product,
      itemId: `ITM-${review.id.slice(2)}`,
      itemImage: "https://i.ibb.co/SwpdsBdp/product2.webp",
      rating: review.rating,
      userFullName: review.user,
      userEmail: `${review.user.toLowerCase().replace(' ', '')}@example.com`,
      userImage: "https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg",
      reason: "Great content and insights",
      fullComment: review.comment,
      contentType: "Books",
      status: "Published"
    };
  };

  const details = getReviewDetails(review.id);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Published': return 'status-published';
      case 'Rejected': return 'status-rejected';
      case 'Pending': return 'status-pending';
      default: return 'status-published';
    }
  };

  const getContentClass = (type: string) => {
    switch (type) {
      case 'Books': return 'content-books';
      case 'Podcasts': return 'content-podcasts';
      case 'Wikipedia': return 'content-wikipedia';
      default: return 'content-books';
    }
  };

  const handleActionClick = (action: string) => {
    console.log(`${action} clicked for review ${review.id}`);
    setShowActions(false);
  };

  return (
    <tr className={`${isSelected ? "bg-white" : ""} hover:bg-[var(--secondary-bg)] transition-colors duration-200 `}>
      {/* Checkbox */}
      <td>
        <div className="checkbox-container">
          <div 
            className={`custom-checkbox ${isSelected ? 'checked' : ''}`}
            onClick={toggleSelect}
          ></div>
        </div>
      </td>

      {/* Review ID */}
      <td>{review.id}</td>

      {/* Item */}
      <td>
        <div className="item-container">
          <div className="item-avatar">
            <Image 
              src={details.itemImage} 
              alt="Item thumbnail" 
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="item-info">
            <div className="item-title" data-full-title={details.itemTitle}>
              {details.itemTitle.length > 20 ? `${details.itemTitle.substring(0, 20)}...` : details.itemTitle}
            </div>
            <div className="item-id" data-item-id={details.itemId}>{details.itemId}</div>
          </div>
        </div>
      </td>

      {/* Rating */}
      <td><span className="rating">{details.rating}</span></td>

      {/* User */}
      <td>
        <div className="user-container">
          <div className="user-avatar">
            <Image 
              src={details.userImage} 
              alt="User avatar" 
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div className="user-info">
            <div className="user-name" data-full-name={details.userFullName}>
              {details.userFullName}
            </div>
            <div className="user-email" data-email={details.userEmail}>
              {details.userEmail.replace('@example.com', '...le.com')}
            </div>
          </div>
        </div>
      </td>

      {/* Reason */}
      <td>
        <div className="review-reason" data-full-reason={details.reason}>
          {details.reason.length > 15 ? `${details.reason.substring(0, 15)}...` : details.reason}
        </div>
      </td>

      {/* Comment */}
      <td>
        <div className="review-comment" data-full-comment={details.fullComment}>
          {details.fullComment.length > 20 ? `${details.fullComment.substring(0, 20)}...` : details.fullComment}
        </div>
      </td>

      {/* Date */}
      <td className="hover-tooltip">
        {review.created}
        <div className="tooltip-content">
          {review.created} 14:32:21 PM
        </div>
      </td>

      {/* Type */}
      <td><span className={`content-pill ${getContentClass(details.contentType)}`}>{details.contentType}</span></td>

      {/* Status */}
      <td><span className={`status-pill ${getStatusClass(details.status)}`}>{details.status}</span></td>

      {/* Linked to */}
      <td>
        <div className="view-links">
          <div className="view-link" data-link="item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <div className="tooltip">View Item</div>
          </div>
          <div className="view-link" data-link="user">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <div className="tooltip">User Profile</div>
          </div>
        </div>
      </td>

      {/* Actions */}
      <td>
        <div className="options-button">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            onClick={() => setShowActions(!showActions)}
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
          
          {showActions && (
            <div className="dropdown-menu show">
              <button className="dropdown-item" onClick={() => handleActionClick('edit')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit
              </button>
              <button className="dropdown-item" onClick={() => handleActionClick('approve')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Approve
              </button>
              <button className="dropdown-item" onClick={() => handleActionClick('reject')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Reject
              </button>
              <button className="dropdown-item" onClick={() => handleActionClick('delete')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}