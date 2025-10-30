import {
  DollarSign,
  LayoutDashboard,
  Monitor,
  Package,
  Settings,
  Users,
  Users2,
} from 'lucide-react';
import { NavItem } from '../../types/sidebar';

export const navData: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    page: '/dashboard',
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
    page: '/users',
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    page: '/products',
    submenu: [
      { id: 'products-all', label: 'All Products', page: '/products/all' },
      { id: 'products-courses', label: 'Courses', page: '/products/courses' },
      { id: 'products-events', label: 'Event Products', page: '/products/events' },
      { id: 'products-sessions', label: 'Session Instances', page: '/products/sessions' },
      { id: 'products-bundles', label: 'Bundles', page: '/products/bundles' },
      { id: 'products-content', label: 'Course Content', page: '/products/content' },
    ],
  },
  {
    id: 'financials',
    label: 'Financials',
    icon: DollarSign,
    page: '/financials',
    submenu: [
      { id: 'financials-transactions', label: 'Transactions', page: '/financials/transactions' },
      {
        id: 'financials-subscriptions',
        label: 'User Subscriptions',
        page: '/financials/subscriptions',
      },
      { id: 'financials-plans', label: 'Subscription Plans', page: '/financials/plans' },
      { id: 'financials-payouts', label: 'Payouts', page: '/financials/payouts' },
      { id: 'financials-coupons', label: 'Coupons & Promotions', page: '/financials/coupons' },
    ],
  },
  {
    id: 'community',
    label: 'Instructors & Community',
    icon: Users2,
    page: '/community',
    submenu: [
      {
        id: 'community-instructors',
        label: 'Instructor Management',
        page: '/community/instructors',
      },
      { id: 'community-reviews', label: 'Reviews & Ratings', page: '/community/reviews' },
      { id: 'community-management', label: 'Community Management', page: '/community/management' },
      { id: 'community-forms', label: 'Form Submissions', page: '/community/forms' },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    icon: Monitor,
    page: '/platform',
    submenu: [
      { id: 'platform-schools', label: 'Schools', page: '/platform/schools' },
      { id: 'platform-teams', label: 'Team Plans', page: '/platform/teams' },
      {
        id: 'platform-certificates',
        label: 'Certificate Management',
        page: '/platform/certificates',
      },
    ],
  },
  {
    id: 'system',
    label: 'System',
    icon: Settings,
    page: '/system',
    submenu: [
      { id: 'system-settings', label: 'Platform Settings', page: '/system/settings' },
      { id: 'system-checklists', label: 'Checklist Instances', page: '/system/checklists' },
      { id: 'system-search', label: 'Search Management', page: '/system/search' },
      { id: 'system-emails', label: 'Marketing Emails', page: '/system/emails' },
      { id: 'system-logs', label: 'System Health & Logs', page: '/system/logs' },
    ],
  },
];
