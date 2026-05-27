'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function UserDashboard() {
  const { data: session } = useSession() || {};
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (session?.user) {
      fetch(`/api/bookings?userId=${(session.user as any).id}`)
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }
  }, [session]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Bookings Dashboard</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No active bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking: any) => (
            <div key={booking._id} className="border p-4 rounded-lg flex justify-between items-center bg-white shadow-sm">
              <div>
                <h3 className="text-xl font-semibold">{booking.farmId?.title || 'Farmhouse'}</h3>
                <p className="text-sm text-gray-500">Dates: {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">{booking.paymentStatus}</span>
                <p className="text-lg font-bold mt-1">₹{booking.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}