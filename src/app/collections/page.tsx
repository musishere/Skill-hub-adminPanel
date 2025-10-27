"use client";

import { useState } from "react";
import StatCard from "../components/StatCard";
import CollectionTable from "../components/CollectionTable";
import Pagination from "../components/Pagination";
import CreateCollectionModal from "../components/CreateCollectionModal";
import { Collection } from "../types/Collection";
import { FaBox, FaBookmark } from "react-icons/fa";

interface CreateCollectionData {
  id: string;
  icon: string;
  title: string;
  description: string;
  type: string;
  owner: string;
  visibility: string;
}

export default function CollectionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: "C-B3H7K9A2",
      icon: "🎨",
      title: "Design Inspiration",
      type: "Collection",
      owner: "U-8A2F9C3D",
      visibility: "Featured",
      created: "Feb 15, 2025",
      count: 48,
      modified: "Feb 27, 2025",
      linkedTo: "",
      actions: "",
    },
    {
      id: "C-F2K8L7P9",
      icon: "📚",
      title: "Learning Resources",
      type: "Bookmark",
      owner: "U-3F7G2H9J",
      visibility: "Public",
      created: "Jan 20, 2025",
      count: 72,
      modified: "Feb 28, 2025",
      linkedTo: "",
      actions: "",
    },
    {
      id: "C-P9L4R2H7",
      icon: "👩‍💻",
      title: "Learning Tools",
      type: "Collection",
      owner: "U-7D9E4F1A",
      visibility: "Private",
      created: "Feb 05, 2025",
      count: 34,
      modified: "Feb 25, 2025",
      linkedTo: "",
      actions: "",
    },
  ]);

  const stats = [
    { title: "Collections Created", value: 1245, icon: <FaBox /> },
    { title: "Bookmarks", value: 5890, icon: <FaBookmark /> },
    { title: "Collections Created (7 Days)", value: 87, icon: <FaBox /> },
    { title: "Bookmarks (7 Days)", value: 342, icon: <FaBookmark /> },
  ];

  const handleCreateCollection = (collectionData: CreateCollectionData) => {
    const newCollection: Collection = {
      id: collectionData.id,
      icon: collectionData.icon,
      title: collectionData.title,
      type: collectionData.type,
      owner: collectionData.owner,
      visibility: collectionData.visibility,
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      modified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      count: 0,
      linkedTo: "",
      actions: ""
    };
    
    setCollections(prev => [...prev, newCollection]);
  };

  return (
    <div className="p-6 bg-[var(--dashboard-bg)] min-h-screen">
      {/* Header + New Collection Button */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Collections</h1>
          <button 
            className="flex items-center gap-1 px-6 py-2 bg-[var(--button-glow)] text-white rounded-lg hover:bg-[#3A7BAF] transition-colors"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="inline-block"
            >
              <path
                d="M8 3V13M3 8H13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Create Collection</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <StatCard key={idx} title={stat.title} value={stat.value} icon={stat.icon} />
          ))}
        </div>
      </div>

      {/* Table with Search & Sort */}
      <div className="mb-0">
        <CollectionTable data={collections} />
      </div>

      {/* Pagination - No gap */}
      <div className="mt-0">
        <Pagination
          currentPage={currentPage}
          totalItems={122}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(count) => {
            setItemsPerPage(count);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Create Collection Modal */}
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateCollection}
      />
    </div>
  );
}