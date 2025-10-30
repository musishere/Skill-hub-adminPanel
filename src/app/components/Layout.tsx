'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (page: string) => {
    router.push(page);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar - fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar onMobileToggle={toggleMobile} />
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex pt-16">
        {' '}
        {/* pt-16 to account for navbar height */}
        {/* Sidebar */}
        <Sidebar
          currentPage={pathname}
          onNavigate={handleNavigate}
          isMobileOpen={isMobileOpen}
          onMobileToggle={toggleMobile}
        />
        {/* Main Content */}
        <main className="flex-1 min-h-screen p-6 ml-0 md:ml-72">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
