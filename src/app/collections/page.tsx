"use client";

import { useState } from "react";
import StatCard from "../components/StatCard";
import CollectionTable from "../components/CollectionTable"; // new table component
import Pagination from "../components/Pagination"; // <-- import pagination
import { Collection } from "../types/Collection";
import { FaBox, FaBookmark } from "react-icons/fa";

export default function CollectionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const collections: Collection[] = [
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
  ];

  const stats = [
    { title: "Collections Created", value: 1245, icon: <FaBox /> },
    { title: "Bookmarks", value: 5890, icon: <FaBookmark /> },
    { title: "Collections Created (7 Days)", value: 87, icon: <FaBox /> },
    { title: "Bookmarks (7 Days)", value: 342, icon: <FaBookmark /> },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header + New Collection Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Collections</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--button-glow)] text-white rounded-lg hover:bg-[var(--icon-active)]">
          <span>+</span>
          <span>New Collection</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* Table with Search & Sort */}
      <CollectionTable data={collections} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={1245} // replace with actual total if dynamic
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
