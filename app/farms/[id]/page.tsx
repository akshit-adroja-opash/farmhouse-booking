'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

export default function FarmDetailPage() {
  const { id } = useParams();
  const { data: session } = useSession() || {};
  const router = useRouter();
  const [farm, setFarm] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetch('/api/farms')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f: any) => f._id === id);
        setFarm(found);
      });
  }, [id]);

  if (!farm) return <p className="text-center p-10">Loading Farm Details...</p>;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      alert('Please log in to finalize booking');
      router.push('/login');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = diffDays * farm.pricePerNight;

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: (session.user as any).id,
        farmId: farm._id,
        startDate,
        endDate,
        totalPrice,
      }),
    });

    if (res.ok) {
      alert('Booking Successfully Confirmed!');
      router.push('/dashboard');
    } else {
      alert('Something went wrong during reservation.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-28 pb-6 px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img src={farm.images[0] || 'https://via.placeholder.com/600x400'} alt={farm.title} className="w-full rounded-lg shadow" />
        <h1 className="text-3xl font-bold mt-4">{farm.title}</h1>
        <p className="text-gray-500 mb-2">{farm.location}</p>
        <p className="text-gray-700">{farm.description}</p>
      </div>
      <div className="border p-6 rounded-lg shadow-md bg-gray-50 h-fit">
        <h3 className="text-xl font-bold mb-4">Book Your Stay</h3>
        <p className="text-2xl font-bold text-green-700 mb-4">₹{farm.pricePerNight} <span className="text-sm font-normal text-gray-500">/ night</span></p>
        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Check-In</label>
            <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Check-Out</label>
            <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 transition">
            Reserve Now
          </button>
        </form>
      </div>
    </div>
  );
}