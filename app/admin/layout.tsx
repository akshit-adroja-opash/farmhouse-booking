'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Home, 
  BarChart3, 
  CreditCard, 
  Plus, 
  LogOut,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession() || {};
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'loading') return;
    if (!session || (session.user as any).role !== 'admin') {
      alert('Access Denied: Admins Only');
      router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf8ff]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#003527] border-t-transparent"></div>
      </div>
    );
  }

  if (!session || (session.user as any).role !== 'admin') {
    return null;
  }

  const menuItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/dashboard#reservations', icon: CalendarDays, label: 'Reservations' },
    { href: '/admin/properties/create', icon: Home, label: 'Properties' },
    { href: '/admin/dashboard#analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/admin/dashboard#financials', icon: CreditCard, label: 'Financials' },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fbf8ff] font-sans antialiased text-[#1a1b22]">
      
      <aside className="fixed top-0 left-0 z-50 hidden h-full w-64 flex-col border-r border-[#bfc9c3]/20 bg-white p-2 shadow-md shadow-[#064e3b]/5 md:flex">
        <div className="px-4 py-6 mb-4">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#003527]">EstateStay</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#404944] mt-1">Admin Suite</p>
        </div>
        
        <ul className="flex flex-1 flex-col gap-1 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            return (
              <li key={item.label}>
                <Link 
                  href={item.href} 
                  className={`flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#064e3b] text-white font-semibold' 
                      : 'text-[#404944] hover:bg-[#e3e1ec]/40'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-semibold">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto border-t border-[#bfc9c3]/20 px-2 pt-4 pb-4 flex flex-col gap-2">
          <Link href="/admin/properties/create" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#003527] py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90">
            <Plus className="h-4 w-4" />
            <span>New Property</span>
          </Link>
          <Link href="/" className="flex items-center gap-4 rounded-lg px-4 py-3 text-[#404944] transition-all hover:bg-[#e3e1ec]/40">
            <Home className="h-5 w-5" />
            <span className="text-sm font-semibold">View Main Site</span>
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })} 
            className="flex items-center gap-4 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50 transition-all text-left w-full"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-semibold">Log Out</span>
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col h-screen overflow-hidden md:ml-64">
        
        <header className="flex h-20 items-center justify-between border-b border-[#bfc9c3]/10 bg-[#fbf8ff] px-6 shadow-sm shadow-[#064e3b]/5 md:px-10 z-40">
          <div className="flex flex-1 items-center">
            <div className="hidden md:flex w-full max-w-md items-center gap-3 rounded-full border border-[#bfc9c3]/30 bg-[#f4f2fd]/50 px-4 py-2.5 transition-colors focus-within:border-[#003527]">
              <Search className="h-4 w-4 text-[#404944]/70" />
              <input 
                type="text" 
                placeholder="Search listings, bookings..." 
                className="w-full bg-transparent text-sm text-[#1a1b22] placeholder-[#404944]/50 outline-none border-none p-0 focus:ring-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-[#404944] hover:bg-[#e3e1ec]/40">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l border-[#bfc9c3]/20 pl-4">
              <div className="h-8 w-8 overflow-hidden rounded-full border border-[#bfc9c3]">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHeWzVVz--dSZ3y4pAHxwpT6GzcpeSpovUe7YazCTW-uuLMqgwodi76nWkwvJ4b657lYXElOLA6L_1m4AUEpPun0vdcDS1htn6YX7lYaGXk1XFjoM6EJS8gM19T3QvEK2VME61-wBYyI8b2k6RyGyAW0-e-bW4QhlyK4eRJKO2_d_iJbWZGS4lod1yOVg14Yx5rPHsTA73jXmE2YgeYuOWmnqs_lYoH04zSgktGeL-Qf3w-R8dTy7gzgf82AMJ3jsYyDBReGcaoKQV" 
                  alt="User Avatar" 
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="hidden text-sm font-semibold text-[#1a1b22] sm:inline">{session?.user?.name || 'Admin'}</span>
              <ChevronDown className="h-4 w-4 text-[#404944]" />
            </div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
