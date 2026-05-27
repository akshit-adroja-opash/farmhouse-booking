import React from 'react';
import { Calendar, Download, HelpCircle } from 'lucide-react';

interface Booking {
  id: string;
  title: string;
  dateRange: string;
  totalPayment: number;
  status: 'Paid' | 'Pending';
  imageSrc: string;
  imageAlt: string;
}

export default function BookingsDashboardPage() {
  // Mock data populated to mirror the image exactly
  const bookings: Booking[] = [
    {
      id: 'b1',
      title: 'Villa Serenity',
      dateRange: 'Oct 15 - Oct 20, 2024',
      totalPayment: 7200,
      status: 'Paid',
      imageSrc: 'https://lh3.googleusercontent.com/aida/ADBb0uig8ZRgZXhxAU3-LcQXgXD6xvGrIfqh_5yKmk66RSTuA2xx67aXsNDYS523E9MMxXP04eI_MUGPHNKrQi9AjCH1zgfhnuutvhWu9MH93rZ4XAVhA3HRUSaGwsKM424qAIJP6uKYqOgP62r9oR_sywu2qE7065F0rtiF534LGXqo1r6-AbUfl0Qd-kRzWjLDJMhifet6f5SgaNxT6iZY0V5DpD9c-M9hbFMsnKmTyjktMgGWA0G3lfbXUFLC',
      imageAlt: 'Villa Serenity sunset perspective view',
    },
    {
      id: 'b2',
      title: 'Lavender Fields Estate',
      dateRange: 'Nov 02 - Nov 08, 2024',
      totalPayment: 4850,
      status: 'Pending',
      imageSrc: 'https://lh3.googleusercontent.com/aida/ADBb0uh9ve4PHoNFWK4Rt6LuJhRQbIbuCEBvdKvfOXnx08y7zwDxxKuNa0Wo_6Zs_38K1r4ty9Cg45Vbc3g4I1J5nAmIPDnucWTzjGHc8pRWiTQxiAsuS-TPpAK3F_7y-1TjoIX3K28rM6IzcZZe-9o0gigZxWLgZLhmsvJCoc9-La-lYKHiMVGmatl6oFA8SpfmnqS-NshkQ83KJekx-CawEw2ypMkR43iQsY6e-PLlaeTcTWswXq71-_nUH8JA',
      imageAlt: 'Lavender Fields Estate illuminated villa pool deck view',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbf8ff] text-[#1a1b22] font-sans antialiased flex flex-col">
      
      {/* Top Application Header */}
      <nav className="sticky top-0 z-50 w-full bg-[#fbf8ff] border-b border-[#e3e1ec]/30 shadow-sm">
        <div className="mx-auto flex max-w-[1280px] h-20 items-center justify-between px-6 md:px-16">
          <div className="font-serif text-2xl font-bold tracking-tight text-[#003527]">
            EstateStay
          </div>
          
          <div className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm font-semibold text-[#404944] transition-colors hover:text-[#003527]">Properties</a>
            <a href="#" className="text-sm font-semibold text-[#404944] transition-colors hover:text-[#003527]">Experiences</a>
            <a href="#" className="text-sm font-semibold text-[#404944] transition-colors hover:text-[#003527]">Journal</a>
            <a href="#" className="text-sm font-semibold text-[#404944] transition-colors hover:text-[#003527]">About</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden text-sm font-semibold text-[#003527] transition-colors hover:text-[#064e3b] md:block">
              List your Estate
            </button>
            <div className="h-10 w-10 overflow-hidden rounded-full transition-transform hover:scale-95 duration-200">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2JPJIho5qxlMWjwtltpam1ULjqcCPTFViz5C-aeXPY3qbGuE3aPKLsxmloe7ymqnpeljHZcl0qm1rLlWWCet0Ah1ctJt6_AEhzGUaTQDTCId2s4_Xqx1O-6vzFegV4A2ueaTtJ7kesyHTQHhmGOUogb8XkGImaUmLW3FAuT2YxiiQf1I27asNmWlxkrkA8FM4t25Xqjm0QGxEQVmAwAqoTQl6hgJBan1Fam0S9o-s3tK4oY7-ERvkgaDirPUTJ21WFJ9SeRRgBFLM" 
                alt="User profile avatar" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Canvas Frame */}
      <main className="flex-grow mx-auto w-full max-w-[1280px] px-6 py-12 md:py-20 md:px-16">
        
        {/* Welcome Banner Header Info */}
        <header className="mb-16">
          <h1 className="font-serif text-3xl font-normal text-[#003527] md:text-5xl mb-4">
            Welcome back, Eleanor
          </h1>
          <p className="text-base md:text-lg text-[#404944] max-w-2xl">
            Manage your upcoming retreats and review past journeys in the countryside.
          </p>
        </header>

        {/* Booking Tab Navigation Layout Layer */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center border-b border-[#e3e1ec] gap-8 w-full">
            <button className="text-sm font-semibold text-[#003527] border-b-2 border-[#003527] pb-4 -mb-[1px] transition-all">
              Upcoming Stays
            </button>
            <button className="text-sm font-semibold text-[#404944] pb-4 -mb-[1px] transition-colors hover:text-[#003527]">
              Past Trips
            </button>
            <button className="text-sm font-semibold text-[#404944] pb-4 -mb-[1px] transition-colors hover:text-[#003527]">
              Saved
            </button>
          </div>

          {/* List Content Horizontal Card Grid */}
          <div className="flex flex-col gap-6 w-full mt-4">
            {bookings.map((booking) => (
              <article 
                key={booking.id} 
                className="rounded-xl border border-white/30 bg-white/85 flex flex-col md:flex-row w-full overflow-hidden shadow-[0_10px_30px_-10px_rgba(6,78,59,0.05)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_20px_40px_-15px_rgba(6,78,59,0.08)]"
              >
                {/* Visual Image Presentation Box */}
                <div className="w-full md:w-1/3 lg:w-1/4 h-48 md:h-auto relative overflow-hidden">
                  <img 
                    src={booking.imageSrc} 
                    alt={booking.imageAlt} 
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content Core Interactive Controls Area */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow gap-6">
                  
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-serif text-xl text-[#003527] mb-1">{booking.title}</h3>
                      <p className="text-sm text-[#404944] flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#404944]" />
                        {booking.dateRange}
                      </p>
                    </div>

                    {/* Status Pill Badge Layer */}
                    <div className={`self-start px-3 py-1 rounded-full border flex items-center gap-2 ${
                      booking.status === 'Paid' 
                        ? 'border-[#003527] bg-[#f4f2fd]' 
                        : 'border-[#bfc9c3] bg-[#eeedf7]'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        booking.status === 'Paid' ? 'bg-[#064e3b]' : 'bg-[#5e5e5c]'
                      }`} />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        booking.status === 'Paid' ? 'text-[#064e3b]' : 'text-[#5e5e5c]'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Financial Total & Utility Buttons Line */}
                  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-t border-[#e3e1ec] pt-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#404944] block mb-1">
                        Total Payment
                      </span>
                      <span className="font-serif text-2xl font-normal text-[#003527]">
                        ${booking.totalPayment.toLocaleString()}
                      </span>
                    </div>

                    {/* Interactive Action Layout Matrix */}
                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                      <button 
                        disabled={booking.status === 'Pending'} 
                        className={`flex-1 md:flex-none text-xs font-bold border rounded-lg px-4 py-2.5 transition-colors flex items-center justify-center gap-2 ${
                          booking.status === 'Pending'
                            ? 'border-[#bfc9c3]/50 text-[#404944]/40 cursor-not-allowed'
                            : 'border-[#bfc9c3] text-[#064e3b] hover:border-[#064e3b]'
                        }`}
                      >
                        <Download className="h-3.5 w-3.5" /> 
                        <span>Receipt</span>
                      </button>
                      
                      <button className="flex-1 md:flex-none text-xs font-bold text-[#404944] hover:text-[#003527] transition-colors flex items-center justify-center gap-2 py-2.5">
                        <HelpCircle className="h-3.5 w-3.5" /> 
                        <span>Support</span>
                      </button>

                      {booking.status === 'Pending' && (
                        <button className="w-full md:w-auto text-xs font-bold text-white bg-[#064e3b] rounded-lg px-6 py-2.5 hover:bg-[#003527] transition-colors shadow-sm">
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Global Application Sticky/Bottom Footer */}
      <footer className="bg-[#e3e1ec]/40 w-full mt-auto border-t border-[#bfc9c3]/30">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-6 px-6 py-12 md:flex-row md:items-start md:px-16">
          <div className="flex flex-col gap-2">
            <span className="font-serif text-xl font-bold text-[#003527]">EstateStay</span>
            <p className="text-xs text-[#404944]">
              © 2026 EstateStay. Heritage Hearth Hospitality.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-semibold text-[#404944]">
            <a href="#" className="underline decoration-1 hover:text-[#003527] opacity-80 hover:opacity-100">Privacy</a>
            <a href="#" className="underline decoration-1 hover:text-[#003527] opacity-80 hover:opacity-100">Terms</a>
            <a href="#" className="underline decoration-1 hover:text-[#003527] opacity-80 hover:opacity-100">Sustainability</a>
            <a href="#" className="underline decoration-1 hover:text-[#003527] opacity-80 hover:opacity-100">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}