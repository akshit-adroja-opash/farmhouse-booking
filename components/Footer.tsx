'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

const Logo = ({ className = "h-8 w-8 text-primary" }: { className?: string }) => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="22" fill="#003527" />
    <path d="M50 25L23 48H33V75H45V60H55V75H67V48H77L50 25Z" fill="#ffffff" />
    <circle cx="50" cy="38" r="4.5" fill="#95d3ba" />
  </svg>
);

export default function Footer() {
  const pathname = usePathname();

  // Do not render footer on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="w-full border-t border-[#bfc9c3]/30 bg-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4 md:px-16 text-sm">
        <div className="md:col-span-1">
          <Link className="flex items-center gap-2 font-serif text-xl font-bold text-[#003527] mb-3" href="/">
            <Logo className="h-6 w-6 grayscale opacity-80" />
            EstateStay
          </Link>
          <p className="text-xs text-[#404944] leading-relaxed">
            Curating the world's most exceptional rural properties for those who seek tranquility without compromising on luxury.
          </p>
          <p className="text-[10px] text-[#707974] mt-4">
            &copy; 2026 EstateStay Luxury Farmhouses. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col space-y-3 text-[#404944]">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Company</h4>
          <a href="#" className="opacity-80 transition-all hover:text-[#003527] hover:opacity-100">About Us</a>
          <a href="#" className="opacity-80 transition-all hover:text-[#003527] hover:opacity-100">Sustainability</a>
          <a href="#" className="opacity-80 transition-all hover:text-[#003527] hover:opacity-100">Contact</a>
        </div>
        <div className="flex flex-col space-y-3 text-[#404944]">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Legal</h4>
          <a href="#" className="opacity-80 transition-all hover:text-[#003527] hover:opacity-100">Privacy Policy</a>
          <a href="#" className="opacity-80 transition-all hover:text-[#003527] hover:opacity-100">Terms of Service</a>
        </div>
        <div className="flex flex-col space-y-4 font-semibold text-[#003527]">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Preferences</h4>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="cursor-pointer hover:underline text-xs">English (US)</span>
          </div>
          <span className="cursor-pointer hover:underline text-xs">$ USD</span>
        </div>
      </div>
    </footer>
  );
}
