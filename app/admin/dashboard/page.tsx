import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Home, 
  BarChart3, 
  CreditCard, 
  Search, 
  Bell, 
  Settings, 
  Plus, 
  HelpCircle, 
  ChevronDown, 
  SlidersHorizontal, 
  Download, 
  TrendingUp, 
  Minus, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

// Explicit structural type definitions for mock data sets
interface MetricCard {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'neutral';
  timeframe: string;
  icon: React.ComponentType<any>;
  chartPath: string;
}

interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  avatarInitials?: string;
  avatarSrc?: string;
  propertyName: string;
  propertyTier: string;
  dates: string;
  duration: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

export default function AdminDashboard() {
  
  // Populated metric structures reflecting design specifications 
  const performanceMetrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$124,500',
      trend: '12.5%',
      trendType: 'up',
      timeframe: 'vs last month',
      icon: CreditCard,
      chartPath: 'M0,45 Q15,50 30,30 T60,35 T90,10 T120,20 L120,60 L0,60 Z'
    },
    {
      title: 'Active Bookings',
      value: '42',
      trend: '4.1%',
      trendType: 'up',
      timeframe: 'vs last month',
      icon: CalendarDays,
      chartPath: 'M0,35 Q20,45 40,25 T80,45 T120,40 L120,60 L0,60 Z'
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      trend: '0.0%',
      trendType: 'neutral',
      timeframe: 'vs last month',
      icon: BarChart3,
      chartPath: 'M0,30 L25,30 L25,40 L55,40 L55,25 L85,25 L85,35 L120,35 L120,60 L0,60 Z'
    }
  ];

  // Populated table itemizations mapping directly to image data matrix
  const historicalReservations: Reservation[] = [
    {
      id: 'res-01',
      customerName: 'Jonathan Doe',
      customerEmail: 'john.doe@example.com',
      avatarInitials: 'JD',
      propertyName: 'The Willow Barn',
      propertyTier: '2 Guests • Premium',
      dates: 'Oct 12 - Oct 15',
      duration: '3 nights',
      status: 'Confirmed'
    },
    {
      id: 'res-02',
      customerName: 'Sarah Anderson',
      customerEmail: 'sarah.a@company.com',
      avatarInitials: 'SA',
      propertyName: 'Orchard House',
      propertyTier: '4 Guests • Standard',
      dates: 'Oct 18 - Oct 22',
      duration: '4 nights',
      status: 'Pending'
    },
    {
      id: 'res-03',
      customerName: 'Emma Williams',
      customerEmail: 'emma.w@studio.net',
      avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDewUJcYfqqCr0ssCY-UejgNn-Oxt2xXd_gytVyGdHo-Gbn5MggV1ZI6BfGPciCuZq7Z-J7S62J6K7B9ySlAyTCyJOaOaY0LDgWb6Z-_JR_RyZXROUdrFZVuUeNlVKgQ6veCKfG0QBo0zylA3yJkjqhpjXNgY3LZOUYixTCxOKBs4Y1SFotfNlaS-bTjJXeQ_PJPy7oJ2DaGiuSu9gIezl_KYXubu9MGGyuPeDCXVMZV6VCro2DOLgzVElPZNDnjsAKx8VXe_E0w6P2',
      propertyName: 'The Meadow Cabin',
      propertyTier: '2 Guests • Rustic',
      dates: 'Sep 28 - Oct 01',
      duration: '3 nights',
      status: 'Completed'
    },
    {
      id: 'res-04',
      customerName: 'Michael Reed',
      customerEmail: 'm.reed@corporate.com',
      avatarInitials: 'MR',
      propertyName: 'The Willow Barn',
      propertyTier: '6 Guests • Corporate',
      dates: 'Oct 25 - Oct 28',
      duration: '3 nights',
      status: 'Confirmed'
    }
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fbf8ff] font-sans antialiased text-[#1a1b22]">
      
      {/* Structural Admin Left Sidebar Element */}
      <aside className="fixed top-0 left-0 z-50 hidden h-full w-64 flex-col border-r border-[#bfc9c3]/20 bg-white p-2 shadow-md shadow-[#064e3b]/5 md:flex">
        <div className="px-4 py-6 mb-4">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#003527]">EstateStay</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#404944] mt-1">Rural Sophistication</p>
        </div>
        
        <ul className="flex flex-1 flex-col gap-1 px-2">
          <li>
            <a href="#" className="flex items-center gap-4 rounded-lg bg-[#064e3b] px-4 py-3 text-white transition-all">
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-sm font-semibold">Dashboard</span>
            </a>
          </li>
          {[
            { icon: CalendarDays, label: 'Reservations' },
            { icon: Home, label: 'Properties' },
            { icon: BarChart3, label: 'Analytics' },
            { icon: CreditCard, label: 'Financials' }
          ].map((navItem, idx) => (
            <li key={idx}>
              <a href="#" className="flex items-center gap-4 rounded-lg px-4 py-3 text-[#404944] transition-all duration-200 hover:translate-x-1 hover:bg-[#e3e1ec]/40">
                <navItem.icon className="h-5 w-5" />
                <span className="text-sm font-semibold">{navItem.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-[#bfc9c3]/20 px-2 pt-4 pb-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#003527] py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90">
            <Plus className="h-4 w-4" />
            <span>New Booking</span>
          </button>
          <a href="#" className="mt-2 flex items-center gap-4 rounded-lg px-4 py-3 text-[#404944] transition-all hover:bg-[#e3e1ec]/40">
            <HelpCircle className="h-5 w-5" />
            <span className="text-sm font-semibold">Help Center</span>
          </a>
        </div>
      </aside>

      {/* Primary Right Panel Workspace Workspace Content Frame Container */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden md:ml-64">
        
        {/* Top Operational Navigation Utility Control Bar */}
        <header className="flex h-20 items-center justify-between border-b border-[#bfc9c3]/10 bg-[#fbf8ff] px-6 shadow-sm shadow-[#064e3b]/5 md:px-10 z-40">
          <div className="flex flex-1 items-center">
            <div className="hidden md:flex w-full max-w-md items-center gap-3 rounded-full border border-[#bfc9c3]/30 bg-[#f4f2fd]/50 px-4 py-2.5 transition-colors focus-within:border-[#003527]">
              <Search className="h-4 w-4 text-[#404944]/70" />
              <input 
                type="text"
                placeholder="Search reservations, guests, or properties..."
                className="w-full border-none bg-transparent p-0 text-sm text-[#1a1b22] placeholder-[#404944]/50 outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-[#404944] transition-colors hover:bg-[#e8e7f1]">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full border border-[#fbf8ff] bg-[#ba1a1a]"></span>
            </button>
            <button className="rounded-full p-2 text-[#404944] transition-colors hover:bg-[#e8e7f1] hidden sm:block">
              <Settings className="h-5 w-5" />
            </button>
            <div className="ml-2 h-10 w-10 overflow-hidden rounded-full border-2 border-[#e8e7f1] cursor-pointer hover:border-[#003527] transition-colors">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjSzKQAF8BGfzgdxrpZ6R-3_rCqIQcLlgBVe8E21JfqJWjfSVs6K6YcIvUKAH9tYqQmHGC8ZJ7DahwaHTp9xR-TE8x3gBUyylniWIqtuKWtPtJuYGT-Fz41dKWzm2nFCA3iEcPVTanH5kDa65GzpuOroHp8xmzFl41sOg3DzJm6tN0Wex1U4SAjJn8ORdNgexdyVgrDU1qq3Omh9eBfxtIBUqj0-xPeBRRCZb_LrDQDa6XTFSwOzs8WgTwE-98E993eqGOyz49usTR" 
                alt="Administrator avatar frame profile" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic Internal Main Workspace */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-none">
          <div className="mx-auto max-w-[1280px] space-y-8">
            
            {/* View State Scope Level Selector Title Panel */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#1a1b22] md:text-3xl">Overview</h2>
                <p className="text-sm text-[#404944] mt-1">Here's what's happening at your properties today.</p>
              </div>
              <div className="flex items-center gap-2 border border-[#bfc9c3]/30 bg-white px-4 py-2 rounded-lg text-sm font-semibold text-[#404944] cursor-pointer hover:bg-[#fbf8ff] transition-colors">
                <CalendarDays className="h-4 w-4" />
                <span>This Month</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </div>
            </div>

            {/* Structured Metric Bento Overview Grid Row Layout */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {performanceMetrics.map((metric, idx) => (
                <div 
                  key={idx} 
                  className="group relative overflow-hidden rounded-xl border border-[#bfc9c3]/20 bg-white p-6 shadow-sm shadow-[#064e3b]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative z-10 flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#404944] mb-1">
                        {metric.title}
                      </p>
                      <h3 className="font-serif text-2xl font-semibold text-[#1a1b22]">
                        {metric.value}
                      </h3>
                    </div>
                    <div className="rounded-lg bg-[#064e3b]/10 p-2 text-[#003527]">
                      <metric.icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center gap-2 mb-6">
                    <span className={`flex items-center gap-0.5 rounded px-2 py-0.5 text-xs font-bold ${
                      metric.trendType === 'up' 
                        ? 'bg-[#064e3b]/20 text-[#0b513d]' 
                        : 'bg-[#e3e1ec] text-[#404944]'
                    }`}>
                      {metric.trendType === 'up' ? <TrendingUp className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                      {metric.trend}
                    </span>
                    <span className="text-xs text-[#404944]">{metric.timeframe}</span>
                  </div>

                  {/* Absolute Inline Embedded Micro Trend Curves SVG Pathing Render Overlay */}
                  <div className="absolute bottom-0 left-0 h-16 w-full opacity-40 transition-opacity duration-500 group-hover:opacity-100">
                    <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 120 60">
                      <defs>
                        <linearGradient id={`grad-${idx}`} x1="0%" x2="0%" y1="0%" y2="100%">
                          <stop offset="0%" stopColor="#003527" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#003527" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d={metric.chartPath} fill={`url(#grad-${idx})`} />
                      <path 
                        d={metric.chartPath.split('L')[0]} 
                        fill="none" 
                        stroke="#003527" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Segmented Table Architecture Interface Grid Structure Element */}
            <div className="overflow-hidden rounded-xl border border-[#bfc9c3]/20 bg-white shadow-sm shadow-[#064e3b]/5">
              
              <div className="flex flex-col gap-4 bg-white/50 p-6 border-b border-[#bfc9c3]/20 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-serif text-lg font-normal text-[#1a1b22]">Recent Reservations</h3>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#bfc9c3] px-4 py-2 text-sm font-semibold text-[#1a1b22] transition-colors hover:bg-[#f4f2fd]/50 sm:flex-none">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#003527] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:flex-none">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#bfc9c3]/20 bg-[#fbf8ff]/50">
                      <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[#404944]">Customer</th>
                      <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[#404944]">Property</th>
                      <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[#404944]">Dates</th>
                      <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[#404944]">Status</th>
                      <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-[#404944]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#bfc9c3]/15">
                    {historicalReservations.map((row) => (
                      <tr key={row.id} className="group cursor-pointer transition-colors hover:bg-[#f4f2fd]/30">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            {row.avatarSrc ? (
                              <img src={row.avatarSrc} alt={row.customerName} className="h-8 w-8 rounded-full object-cover border border-[#bfc9c3]/30" />
                            ) : (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#064e3b]/10 text-xs font-bold text-[#003527]">
                                {row.avatarInitials}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-semibold text-[#1a1b22]">{row.customerName}</p>
                              <p className="text-xs text-[#404944] mt-0.5">{row.customerEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-semibold text-[#1a1b22]">{row.propertyName}</p>
                          <p className="text-xs text-[#404944] mt-0.5">{row.propertyTier}</p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm text-[#1a1b22]">{row.dates}</p>
                          <p className="text-xs text-[#404944] mt-0.5">{row.duration}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border ${
                            row.status === 'Confirmed' 
                              ? 'bg-[#b0f0d6]/30 text-[#0b513d] border-[#b0f0d6]' 
                              : row.status === 'Pending'
                              ? 'bg-[#e3e1ec] text-[#404944] border-[#bfc9c3]/50'
                              : 'bg-white text-[#707974] border-[#707974]/30'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="rounded p-1 text-[#404944] hover:text-[#003527] transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Functional Dashboard Table Bottom Pagination Frame Controls */}
              <div className="flex items-center justify-between border-t border-[#bfc9c3]/20 bg-white p-4">
                <p className="text-xs text-[#404944]">Showing 1 to 4 of 42 entries</p>
                <div className="flex gap-1">
                  <button disabled className="rounded p-1.5 text-[#707974] opacity-40 hover:bg-[#f4f2fd] transition-colors cursor-not-allowed">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="min-w-[32px] rounded bg-[#064e3b]/10 p-1.5 text-xs font-bold text-[#003527]">1</button>
                  <button className="min-w-[32px] rounded p-1.5 text-xs font-semibold text-[#404944] hover:bg-[#f4f2fd] transition-colors">2</button>
                  <button className="min-w-[32px] rounded p-1.5 text-xs font-semibold text-[#404944] hover:bg-[#f4f2fd] transition-colors">3</button>
                  <button className="rounded p-1.5 text-[#404944] hover:bg-[#f4f2fd] transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
            
            {/* Standard structural spacer spacer panel logic */}
            <div className="h-4"></div>
          </div>
        </main>

      </div>
    </div>
  );
}