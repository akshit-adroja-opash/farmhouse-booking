'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { User, Menu, X, ShieldAlert } from 'lucide-react';

const Logo = ({ className = "h-8 w-8 text-primary" }: { className?: string }) => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="22" fill="#003527" />
    <path d="M50 25L23 48H33V75H45V60H55V75H67V48H77L50 25Z" fill="#ffffff" />
    <circle cx="50" cy="38" r="4.5" fill="#95d3ba" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession() || {};
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Do not render navbar on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isAdmin = session?.user && (session.user as any).role === 'admin';

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 h-20 flex items-center">
      <div className="flex justify-between items-center w-full max-w-[1280px] mx-auto px-6 md:px-16 h-full">
        {/* Brand Logo */}
        <Link className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight text-[#003527]" href="/">
          <Logo />
          EstateStay
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            className={`text-sm font-semibold transition-all ${
              pathname === '/properties' 
                ? 'text-[#003527] border-b-2 border-[#003527] pb-1' 
                : 'text-[#404944] hover:text-[#003527]'
            }`} 
            href="/properties"
          >
            Properties
          </Link>
          <Link 
            className={`text-sm font-semibold transition-all ${
              pathname === '/experiences' 
                ? 'text-[#003527] border-b-2 border-[#003527] pb-1' 
                : 'text-[#404944] hover:text-[#003527]'
            }`} 
            href="#"
          >
            Experiences
          </Link>
          <Link 
            className="text-sm font-semibold text-[#404944] hover:text-[#003527] transition-all" 
            href="#"
          >
            Journal
          </Link>
          <Link 
            className="text-sm font-semibold text-[#404944] hover:text-[#003527] transition-all" 
            href="#"
          >
            About
          </Link>
          {session && (
            <Link 
              className={`text-sm font-semibold transition-all ${
                pathname === '/dashboard' 
                  ? 'text-[#003527] border-b-2 border-[#003527] pb-1' 
                  : 'text-[#404944] hover:text-[#003527]'
              }`} 
              href="/dashboard"
            >
              My Bookings
            </Link>
          )}
          {isAdmin && (
            <Link 
              className="text-sm font-bold text-[#064e3b] hover:text-[#003527] flex items-center gap-1 transition-all" 
              href="/admin/dashboard"
            >
              <ShieldAlert className="h-4 w-4" /> Admin Panel
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/register" className="hidden lg:block text-sm font-semibold text-[#003527] hover:underline">
            List your Estate
          </Link>
          
          {session ? (
            <div className="flex items-center gap-3">
              <span className="hidden lg:inline text-xs font-semibold text-[#404944]">
                Welcome, {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-sm font-semibold text-[#404944] hover:text-[#003527] transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-[#404944] hover:text-[#003527] transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link
            href={session ? "/dashboard" : "/login"}
            aria-label="Account"
            className="p-2 text-[#404944] hover:text-[#003527] transition-all rounded-full hover:bg-gray-100 border border-[#bfc9c3]/50"
          >
            <User className="h-4 w-4" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#404944] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden flex flex-col py-4 px-6 gap-4 z-40">
          <Link 
            className="text-sm font-semibold text-[#404944] hover:text-[#003527] py-1" 
            href="/properties" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Properties
          </Link>
          <Link 
            className="text-sm font-semibold text-[#404944] hover:text-[#003527] py-1" 
            href="#" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Experiences
          </Link>
          <Link 
            className="text-sm font-semibold text-[#404944] hover:text-[#003527] py-1" 
            href="#" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Journal
          </Link>
          <Link 
            className="text-sm font-semibold text-[#404944] hover:text-[#003527] py-1" 
            href="#" 
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          {session && (
            <Link 
              className="text-sm font-semibold text-[#404944] hover:text-[#003527] py-1" 
              href="/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
            >
              My Bookings
            </Link>
          )}
          {isAdmin && (
            <Link 
              className="text-sm font-bold text-[#064e3b] py-1 flex items-center gap-1" 
              href="/admin/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShieldAlert className="h-4 w-4" /> Admin Panel
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
