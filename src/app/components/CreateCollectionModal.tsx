"use client";

import { useState } from "react";

interface CreateCollectionData {
  id: string;
  icon: string;
  title: string;
  description: string;
  type: string;
  owner: string;
  visibility: string;
}

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (collectionData: CreateCollectionData) => void;
}

export default function CreateCollectionModal({ isOpen, onClose, onCreate }: CreateCollectionModalProps) {
  const [selectedIcon, setSelectedIcon] = useState("🎨");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = [
    "🎨", "📚", "🚀", "👩‍💻", "📊", "📝", "🔍", "💡", "⚙️", "🛠️",
    "📱", "💻", "🖥️", "🎮", "🎯", "🧩", "⌨️", "🖱️", "🎬", "📷",
    "🎵", "📈", "📉", "📌"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const collectionId = `C-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const formData = new FormData(e.target as HTMLFormElement);
    const collectionData: CreateCollectionData = {
      id: collectionId,
      icon: selectedIcon,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      type: formData.get('type') as string,
      owner: formData.get('owner') as string,
      visibility: formData.get('visibility') as string
    };
    
    onCreate(collectionData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Create Collection</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="form-group">
              <label className="form-label">Collection ID</label>
              <input 
                type="text" 
                className="form-control form-disabled" 
                value={`C-${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
                readOnly 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Icon <span style={{ color: "red" }}>*</span></label>
              <div className="emoji-select">
                <button 
                  type="button" 
                  className="emoji-select-btn" 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <span className="emoji-selected">{selectedIcon}</span>
                  <span>Select Icon</span>
                  <svg 
                    viewBox="0 0 24 24" 
                    width="16" 
                    height="16" 
                    stroke="currentColor" 
                    fill="none" 
                    className={`dropdown-arrow ${showEmojiPicker ? 'rotate-180' : ''}`}
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
                
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    <div className="emoji-grid">
                      {emojis.map((emoji, index) => (
                        <div 
                          key={index}
                          className={`emoji-item ${selectedIcon === emoji ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedIcon(emoji);
                            setShowEmojiPicker(false);
                          }}
                        >
                          {emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Title <span style={{ color: "red" }}>*</span></label>
              <input 
                type="text" 
                className="form-control" 
                name="title"
                placeholder="Enter collection title" 
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Description <span style={{ color: "red" }}>*</span></label>
              <textarea 
                className="form-control" 
                name="description"
                rows={4} 
                placeholder="Enter collection description"
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label className="form-label">Type <span style={{ color: "red" }}>*</span></label>
              <select className="form-select" name="type" required>
                <option value="Collection">Collection</option>
                <option value="Bookmark">Bookmark</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Owner <span style={{ color: "red" }}>*</span></label>
              <input 
                type="text" 
                className="form-control" 
                name="owner"
                placeholder="Enter owner user ID" 
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Visibility <span style={{ color: "red" }}>*</span></label>
              <select className="form-select" name="visibility" required>
                <option value="Featured">Featured</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="button secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button primary-button">
              Create Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}