'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const { data: session } = useSession() || {};
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (session?.user && (session.user as any).role !== 'admin') {
      alert('Access Denied');
      router.push('/farms');
    } else {
      fetch('/api/bookings').then(res => res.json()).then(data => setBookings(data));
    }
  }, [session]);

  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = '';

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    const res = await fetch('/api/farms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, location, pricePerNight: Number(pricePerNight), images: [imageUrl] })
    });

    if (res.ok) {
      alert('Farmhouse posted successfully!');
      setTitle(''); setDescription(''); setLocation(''); setPricePerNight('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-2xl font-bold mb-4">Add New Farmhouse Listings</h2>
        <form onSubmit={handleCreateFarm} className="space-y-4 bg-white p-6 border rounded shadow-sm">
          <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full p-2 border rounded" required />
          <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="number" placeholder="Price Per Night" value={pricePerNight} onChange={(e)=>setPricePerNight(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="file" onChange={(e)=>setImageFile(e.target.files?.[0] || null)} className="w-full" />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Publish Property</button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Global Bookings Overview</h2>
        <div className="space-y-3">
          {bookings.map((b: any) => (
            <div key={b._id} className="p-3 border rounded bg-gray-50 flex justify-between">
              <div>
                <p className="font-semibold">{b.farmId?.title}</p>
                <p className="text-xs text-gray-500">Renter: {b.userId?.name} ({b.userId?.email})</p>
              </div>
              <p className="font-bold text-blue-700">₹{b.totalPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}