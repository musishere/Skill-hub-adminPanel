import { LucideIcon } from 'lucide-react';

export interface NavSubItem {
  id: string;
  label: string;
  page: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  page: string;
  submenu?: NavSubItem[];
}

export interface SidebarProps {
  className?: string;
  onNavigate?: (page: string) => void;
  currentPage?: string;
  isMobileOpen?: boolean;
  onMobileToggle?: () => void;
  // No children prop here
}
