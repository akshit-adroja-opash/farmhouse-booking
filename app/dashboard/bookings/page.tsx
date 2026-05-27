'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Download, HelpCircle, Loader2 } from 'lucide-react';


interface Farm {
  _id: string;
  title: string;
  images?: string[];
  pricePerNight: number;
}

interface Booking {
  _id: string;
  farmId: Farm | null;
  startDate: string;
  endDate: string;
  totalPrice: number;
  paymentStatus: 'Paid' | 'Pending';
}


export default function BookingsDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/login');
      setLoading(false);
      return;
    }

    if (status === 'authenticated' && session?.user) {
      const fetchBookings = async () => {
        try {
          const userId = (session.user as any)?.id;

          if (!userId) {
            console.warn('User ID missing in session');
            setLoading(false);
            return;
          }

          const res = await fetch(`/api/bookings?userId=${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!res.ok) throw new Error('Failed to fetch bookings');

          const data = await res.json();
          setBookings(data || []);
        } catch (err) {
          console.error('Error fetching bookings:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchBookings();
    }
  }, [session, status, router]);


  const formatDateRange = (startStr: string, endStr: string) => {
    try {
      const s = new Date(startStr);
      const e = new Date(endStr);

      return `${s.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })} - ${e.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}`;
    } catch {
      return `${startStr} - ${endStr}`;
    }
  };


  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf8ff]">
        <Loader2 className="h-10 w-10 animate-spin text-[#003527]" />
      </div>
    );
  }


  if (status === 'unauthenticated') {
    return null;
  }


  return (
    <div className="min-h-screen bg-[#fbf8ff] text-[#1a1b22] font-sans flex flex-col">
      <main className="flex-grow mx-auto w-full max-w-[1280px] px-6 pt-28 pb-12 md:py-20 md:px-16">
        
        <header className="mb-16">
          <h1 className="font-serif text-3xl md:text-5xl text-[#003527] mb-4">
            Welcome back, {session?.user?.name || 'Guest'}
          </h1>
          <p className="text-[#404944] max-w-2xl">
            Manage your upcoming retreats and review past journeys.
          </p>
        </header>

        <section className="flex flex-col gap-8">
          <div className="flex border-b gap-8">
            <button className="text-sm font-semibold text-[#003527] border-b-2 border-[#003527] pb-4">
              Upcoming Stays
            </button>
            <button className="text-sm text-[#404944] pb-4 hover:text-[#003527]">
              Past Trips
            </button>
            <button className="text-sm text-[#404944] pb-4 hover:text-[#003527]">
              Saved
            </button>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            {bookings.length === 0 ? (
              <div className="text-center py-16 border border-dashed rounded-xl bg-white/50">
                <p className="mb-6 text-[#404944]">
                  You don't have any bookings yet.
                </p>
                <Link
                  href="/properties"
                  className="bg-[#003527] text-white px-6 py-3 rounded-lg"
                >
                  Explore Estates
                </Link>
              </div>
            ) : (
              bookings.map((booking) => {
                const farm = booking.farmId;
                if (!farm) return null;

                const image =
                  farm.images && farm.images.length > 0
                    ? farm.images[0]
                    : 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80';

                return (
                  <article
                    key={booking._id}
                    className="rounded-xl bg-white flex flex-col md:flex-row overflow-hidden shadow"
                  >
                    <div className="md:w-1/4 h-48 md:h-auto">
                      <img
                        src={image}
                        alt={farm.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-grow gap-6">
                      
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-xl text-[#003527]">
                            {farm.title}
                          </h3>
                          <p className="text-sm flex gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatDateRange(
                              booking.startDate,
                              booking.endDate
                            )}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            booking.paymentStatus === 'Paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {booking.paymentStatus}
                        </span>
                      </div>

                      <div className="flex justify-between items-end border-t pt-4">
                        <div>
                          <p className="text-xs text-gray-500">
                            Total Payment
                          </p>
                          <p className="text-2xl text-[#003527]">
                            ${booking.totalPrice}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            disabled={booking.paymentStatus === 'Pending'}
                            className="text-xs border px-4 py-2 rounded"
                          >
                            <Download className="h-3 w-3 inline mr-1" />
                            Receipt
                          </button>

                          <button className="text-xs px-4 py-2">
                            <HelpCircle className="h-3 w-3 inline mr-1" />
                            Support
                          </button>

                          {booking.paymentStatus === 'Pending' && (
                            <button className="bg-[#064e3b] text-white px-4 py-2 rounded">
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}