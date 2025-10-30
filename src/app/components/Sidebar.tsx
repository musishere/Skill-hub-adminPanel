'use client';

import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { navData } from '../components/data/sidebarData';
import { NavItem, SidebarProps } from '../types/sidebar';

const Sidebar: React.FC<SidebarProps> = ({
  className = '',
  onNavigate,
  currentPage = '/dashboard',
  isMobileOpen = false,
  onMobileToggle,
}) => {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const toggleSubmenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const handleNavigation = (page: string, item: NavItem) => {
    if (item.submenu) {
      toggleSubmenu(item.id);
    } else {
      onNavigate?.(page);
      if (window.innerWidth < 768) {
        onMobileToggle?.();
      }
    }
  };

  const isActive = (page: string) => currentPage === page;

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const hasSubmenu = !!item.submenu;
    const isExpanded = expandedMenus.has(item.id);
    const isItemActive = isActive(item.page);

    return (
      <div key={item.id} className="mb-0.5">
        <button
          onClick={() => handleNavigation(item.page, item)}
          className={`
            w-full flex items-center px-3.5 py-3 text-foreground rounded-xl
            transition-all duration-200 ease-in-out cursor-pointer text-sm font-medium
            relative select-none
            hover:bg-accent hover:text-accent-foreground
            ${hasSubmenu ? 'justify-between' : ''}
            ${
              isItemActive
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 font-semibold'
                : ''
            }
          `}
        >
          <div className="flex items-center flex-1 min-w-0">
            <Icon
              className={`
                w-5 h-5 mr-3 flex-shrink-0 transition-colors duration-200
                ${isItemActive ? 'text-blue-600' : 'text-muted-foreground'}
              `}
            />
            <span className="flex-1 truncate text-left">{item.label}</span>
          </div>

          {hasSubmenu && (
            <ChevronRight
              className={`
                w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200
                ${isExpanded ? 'rotate-90' : ''}
              `}
            />
          )}
        </button>

        {hasSubmenu && item.submenu && (
          <div
            className={`
              ml-5 pl-3 border-l-2 border-border transition-all duration-300 ease-in-out
              ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
            `}
          >
            {item.submenu.map(subItem => {
              const isSubItemActive = isActive(subItem.page);

              return (
                <div key={subItem.id} className="my-0.5">
                  <button
                    onClick={() => {
                      onNavigate?.(subItem.page);
                      if (window.innerWidth < 768) {
                        onMobileToggle?.();
                      }
                    }}
                    className={`
                      w-full flex items-center px-3.5 py-2.5 text-muted-foreground
                      rounded-lg transition-all duration-200 ease-in-out cursor-pointer text-xs font-medium
                      hover:bg-accent hover:text-accent-foreground
                      ${isSubItemActive ? 'bg-blue-50 text-blue-600 font-semibold relative' : ''}
                    `}
                  >
                    {subItem.label}
                    {isSubItemActive && (
                      <div className="absolute left-[-15px] top-0 bottom-0 w-0.5 bg-blue-600 rounded-r" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-16 left-0 bottom-0 z-40
          w-72 bg-card border-r border-border flex flex-col
          overflow-y-auto overflow-x-hidden shadow-lg md:shadow-sm
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${className}
        `}
      >
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="mb-2">{navData.map(renderNavItem)}</div>
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-border bg-gradient-to-b from-card to-secondary">
          <div className="flex items-center p-3 bg-card rounded-xl cursor-pointer transition-all duration-200 border border-border hover:border-blue-500 hover:shadow-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold text-base mr-3 flex-shrink-0">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-card-foreground truncate">Admin User</div>
              <div className="text-xs text-muted-foreground truncate">Super Administrator</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
