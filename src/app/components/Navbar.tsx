'use client';

import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Users', href: '/users' },
  { name: 'Collections', href: '/collections' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Transactions', href: '/transactions' },
];

interface NavbarProps {
  onMobileToggle?: () => void;
}

export default function Navbar({ onMobileToggle }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left: Mobile Menu Button and Title */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileToggle}
          className="md:hidden p-2 rounded-lg hover:bg-blue-500 transition-colors"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Title */}
        <div className="text-2xl font-bold tracking-wide">
          Skillhub <span className="font-light">Admin</span>
        </div>
      </div>

      {/* Center: Nav Links */}
      <div className="hidden md:flex space-x-6">
        {navItems.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className={`
              font-medium transition duration-300
              hover:text-gray-200 hover:shadow-lg hover:shadow-blue-300/50
              px-2 py-1 rounded
              ${pathname === item.href ? 'underline underline-offset-4' : ''}
            `}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right: Profile Icon */}
      <div className="flex items-center space-x-3">
        <UserCircleIcon className="h-8 w-8 text-white hover:text-gray-200 transition cursor-pointer" />
      </div>
    </nav>
  );
}
