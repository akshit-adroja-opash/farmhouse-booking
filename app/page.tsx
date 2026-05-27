'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Logo = ({ className = "h-8 w-8 text-primary" }: { className?: string }) => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="22" fill="#003527" />
    <path d="M50 25L23 48H33V75H45V60H55V75H67V48H77L50 25Z" fill="#ffffff" />
    <circle cx="50" cy="38" r="4.5" fill="#95d3ba" />
  </svg>
);

const MOCK_FARMS = [
  {
    _id: '1',
    title: 'The Vineyard House',
    location: 'Tuscany, Italy',
    pricePerNight: 850,
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
    description: 'An elegant stone estate nestled among rolling vineyards, featuring a private pool, wine-tasting room, and gourmet kitchen.',
    category: 'Vineyard',
    rating: 4.95,
    guests: 8,
    bedrooms: 4,
    baths: 4,
  },
  {
    _id: '2',
    title: 'Villa Serenity',
    location: 'Provence, France',
    pricePerNight: 1200,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'],
    description: 'A luxury seaside retreat overlooking the caldera, offering a private infinity pool, panoramic ocean sunsets, and white-glove service.',
    category: 'Pool',
    rating: 5.0,
    guests: 6,
    bedrooms: 3,
    baths: 3,
  },
  {
    _id: '3',
    title: 'Oak Beam Cottage',
    location: 'Cotswolds, UK',
    pricePerNight: 450,
    images: ['https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&w=800&q=80'],
    description: 'A historic honey-colored stone cottage with original oak beams, cozy stone fireplace, and a beautiful English country garden.',
    category: 'Garden',
    rating: 4.85,
    guests: 4,
    bedrooms: 2,
    baths: 2,
  }
];

export default function Home() {
  const { data: session } = useSession() || {};
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [searchLocation, setSearchLocation] = useState('');
  const [searchGuests, setSearchGuests] = useState('');
  const [searchCheckIn, setSearchCheckIn] = useState('');
  
  const [filteredFarms, setFilteredFarms] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFarms() {
      try {
        const res = await fetch('/api/farms');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const formattedFarms = data.map((farm: any) => ({
              ...farm,
              rating: farm.rating || 4.7 + Math.random() * 0.3,
              guests: farm.guests || 6,
              bedrooms: farm.bedrooms || 3,
              baths: farm.baths || 2,
              category: farm.category || 'Vineyard'
            }));
            setFarms(formattedFarms);
            setFilteredFarms(formattedFarms);
          } else {
            setFarms(MOCK_FARMS);
            setFilteredFarms(MOCK_FARMS);
          }
        } else {
          setFarms(MOCK_FARMS);
          setFilteredFarms(MOCK_FARMS);
        }
      } catch (err) {
        console.error('Failed to fetch from API, using fallback data:', err);
        setFarms(MOCK_FARMS);
        setFilteredFarms(MOCK_FARMS);
      } finally {
        setLoading(false);
      }
    }
    fetchFarms();
  }, []);

  useEffect(() => {
    let result = farms;

    if (searchLocation.trim() !== '') {
      const locQuery = searchLocation.toLowerCase();
      result = result.filter(farm => 
        farm.location.toLowerCase().includes(locQuery) ||
        farm.title.toLowerCase().includes(locQuery)
      );
    }

    if (searchGuests.trim() !== '') {
      const minGuests = parseInt(searchGuests, 10);
      if (!isNaN(minGuests)) {
        result = result.filter(farm => farm.guests >= minGuests);
      }
    }

    setFilteredFarms(result);
  }, [searchLocation, searchGuests, farms]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const element = document.getElementById('listings');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const isAdmin = session?.user && (session.user as any).role === 'admin';

  return (
    <div className="bg-background text-on-surface pt-20">
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-surface-variant">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxurious modern farmhouse villa"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtHN65TmjaePBeXGJiQ-xbmOtsFA_0d9Fhm4nvmMfqcklf27q1g8ZPyihPvtTQbfWpCHwXNysGBFggN_p6YYsx5g9etgc7T-2IsSARaRa2GmVo-mbKYdmExaRiWeJT_-MQwM-IlIMn4aHvdFn-x1PtuiAqOA3ODSXKXQTkzMlbgZkb0AZ2ewgB_HjpegJoDkJeHysvIcmakxYVYdBwQiJQsllhi_43CzSYMxzq16_VMbZQOdUmRYGj59_WjN3Z1wD4cwnLJ3-sH_bk"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </section>

      <section id="listings" className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="font-display-lg text-3xl text-gray-900 mb-2 font-serif">Featured Stays</h2>
            <p className="font-body-lg text-body-lg text-secondary">
              Curated rural retreats for the discerning traveler.
            </p>
          </div>
          <Link className="hidden md:flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container transition-colors" href="/farms">
            View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="material-symbols-outlined text-5xl text-primary animate-spin">sync</span>
            <p className="text-secondary font-medium">Curating retreats for you...</p>
          </div>
        ) : filteredFarms.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-lg p-8 max-w-md mx-auto shadow-sm">
            <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">search_off</span>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No retreats match your criteria</h3>
            <p className="text-secondary text-sm mb-6">Try refining your search parameters to view full listings.</p>
            <button
              onClick={() => { setSearchLocation(''); setSearchGuests(''); setSearchCheckIn(''); }}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-md font-label-md text-label-md hover:bg-primary-container transition-colors"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredFarms.map((farm) => {
              const isMockPrice = farm.pricePerNight < 5000;
              const formattedPrice = isMockPrice 
                ? `$${farm.pricePerNight.toLocaleString('en-US')}` 
                : `₹${farm.pricePerNight.toLocaleString('en-IN')}`;

              return (
                <Link
                  key={farm._id}
                  href={`/farms/${farm._id}`}
                  className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover-lift group cursor-pointer flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={farm.images?.[0] || 'https://via.placeholder.com/600x400?text=Premium+Farmhouse'}
                      alt={farm.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-full border border-gray-100 flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-500 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="text-xs font-bold text-gray-800">
                        {farm.rating?.toFixed(2) || '4.90'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-display-lg text-lg text-gray-900 mb-1 font-serif">
                      {farm.title}
                    </h3>
                    
                    <div className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      <span>{farm.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <p className="text-gray-900 font-bold">
                        {formattedPrice} <span className="text-gray-500 font-normal">/ night</span>
                      </p>
                      <span className="text-xs text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded">
                        {farm.category}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-surface-container-low py-16 border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display-lg text-3xl text-gray-900 mb-4 font-serif">
              Why EstateStay?
            </h2>
            <p className="font-body-lg text-body-lg text-secondary">
              We design escape routes from the fast lane. Every location in our portfolio is chosen with design, nature, and serenity in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg border border-gray-100 shadow-sm hover-lift">
              <div className="h-16 w-16 bg-[#003527]/5 rounded-full flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-3xl text-[#003527]">verified</span>
              </div>
              <h3 className="font-display-lg text-lg text-gray-900 mb-3 font-serif">Verified Excellence</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Each listing is physically audited for structural beauty, pristine sanitation, premium bedding, and reliable backup utilities.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg border border-gray-100 shadow-sm hover-lift">
              <div className="h-16 w-16 bg-[#003527]/5 rounded-full flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-3xl text-[#003527]">restaurant</span>
              </div>
              <h3 className="font-display-lg text-lg text-gray-900 mb-3 font-serif">Hyper-Local Experiences</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Enjoy customized packages containing private vineyard tours, locally sourced farm-to-table breakfast, and guided wilderness safaris.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg border border-gray-100 shadow-sm hover-lift">
              <div className="h-16 w-16 bg-[#003527]/5 rounded-full flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-3xl text-[#003527]">concierge</span>
              </div>
              <h3 className="font-display-lg text-lg text-gray-900 mb-3 font-serif">Dedicated Concierge</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                From check-in coordinates to organizing private dinners, our on-call guest experience hosts are at your service 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#003527] text-on-primary py-16 relative overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full bg-[#064e3b] opacity-20 blur-3xl"></div>
          <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] rounded-full bg-surface-tint opacity-20 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center px-margin-mobile">
          <h2 className="font-display-lg text-3xl text-white mb-4 font-serif">
            Receive Curated Offers
          </h2>
          <p className="text-sm text-emerald-200 max-w-xl mb-8 leading-relaxed">
            Subscribe to receive priority notifications on newly added estates, seasonal discount vouchers, and gourmet escape itineraries.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-emerald-300 text-sm rounded px-5 py-3.5 focus:outline-none focus:border-white/40 flex-grow"
              required
            />
            <button
              type="submit"
              className="bg-white text-[#003527] font-semibold py-3.5 px-6 rounded hover:bg-emerald-100 transition-colors text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
