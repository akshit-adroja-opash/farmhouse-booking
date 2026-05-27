import Link from 'next/link';

async function getFarms() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/farms`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function FarmsListingPage() {
  const farms = await getFarms();

  return (
    <div className="max-w-6xl mx-auto pt-28 pb-6 px-6">
      <h1 className="text-3xl font-bold mb-6">Explore Farmhouses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {farms.map((farm: any) => (
          <div key={farm._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img src={farm.images[0] || 'https://via.placeholder.com/400x250'} alt={farm.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{farm.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{farm.location}</p>
              <p className="text-lg font-bold text-green-700">₹{farm.pricePerNight} <span className="text-sm font-normal text-gray-500">/ night</span></p>
              <Link href={`/farms/${farm._id}`} className="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}