'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Users, 
  Star, 
  Heart, 
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Clock,
  CircleDollarSign,
  CalendarCheck2,
  Smile,
  Compass,
  ArrowUpRight
} from 'lucide-react';

const MOCK_FARMS = [
  {
    _id: '1',
    title: 'Sunrise Valley Farm',
    location: 'Mulshi, Maharashtra',
    pricePerNight: 3500,
    images: ['https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80'],
    description: 'A quiet valley getaway surrounded by lush greenery, complete with private pool, cozy patio, and traditional home-style cooking.',
    category: 'farmhouse',
    rating: 4.8,
    guests: 12,
    bedrooms: 4,
    baths: 4,
    amenities: ['WiFi', 'Swimming Pool', 'Kitchen']
  },
  {
    _id: '2',
    title: 'Green Meadow Retreat',
    location: 'Rishikesh, Uttarakhand',
    pricePerNight: 2800,
    images: ['https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&w=800&q=80'],
    description: 'Riverside escape offering peace and spirituality. Features a dedicated yoga deck, outdoor dining, and direct river access.',
    category: 'riverfront',
    rating: 4.6,
    guests: 8,
    bedrooms: 3,
    baths: 2,
    amenities: ['WiFi', 'Yoga deck', 'River view']
  },
  {
    _id: '3',
    title: 'Hilltop Haven',
    location: 'Manali, Himachal Pradesh',
    pricePerNight: 5500,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'],
    description: 'Luxury snow-capped peaks cottage featuring an indoor fireplace, heated pool, spacious wood-paneled bedrooms, and local trekking guides.',
    category: 'cabin',
    rating: 4.9,
    guests: 16,
    bedrooms: 5,
    baths: 5,
    amenities: ['WiFi', 'Hot tub', 'Fireplace']
  }
];

const DESTINATIONS = [
  { name: 'Manali', state: 'Himachal Pradesh', count: 12, img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80' },
  { name: 'Goa', state: 'Goa', count: 18, img: 'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=400&q=80' },
  { name: 'Rishikesh', state: 'Uttarakhand', count: 10, img: 'https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&w=400&q=80' },
  { name: 'Munnar', state: 'Kerala', count: 15, img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80' },
  { name: 'Panchgani', state: 'Maharashtra', count: 8, img: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=400&q=80' },
  { name: 'Jaisalmer', state: 'Rajasthan', count: 6, img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80' }
];

export default function Home() {
  const { data: session } = useSession() || {};
  const router = useRouter();
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFarms() {
      try {
        const res = await fetch('/api/farms');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const formattedFarms = data.map((farm: any) => ({
              ...farm,
              rating: farm.rating || 4.5 + Math.random() * 0.5,
              guests: farm.guests || 6,
              bedrooms: farm.bedrooms || 3,
              baths: farm.baths || 2,
              category: farm.category || 'farmhouse',
              amenities: farm.amenities || ['WiFi', 'Kitchen']
            }));
            // Merge: prioritize database records, append any mock properties not in database
            const merged = [...formattedFarms];
            MOCK_FARMS.forEach((m: any) => {
              if (!merged.some(f => f.title.toLowerCase() === m.title.toLowerCase())) {
                merged.push(m);
              }
            });
            setFarms(merged);
          } else {
            setFarms(MOCK_FARMS);
          }
        } else {
          setFarms(MOCK_FARMS);
        }
      } catch (err) {
        console.error('Failed to fetch from API, using fallback data:', err);
        setFarms(MOCK_FARMS);
      } finally {
        setLoading(false);
      }
    }
    fetchFarms();
  }, []);

  useEffect(() => {
    async function fetchFavorites() {
      if (session?.user) {
        try {
          const userId = (session.user as any).id;
          const res = await fetch(`/api/users/favorites?userId=${userId}`);
          if (res.ok) {
            const data = await res.json();
            setFavorites(data.map((fav: any) => fav._id));
          }
        } catch (err) {
          console.error('Failed to fetch favorites:', err);
        }
      }
    }
    fetchFavorites();
  }, [session]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      router.push(`/farms?location=${encodeURIComponent(searchLocation.trim())}`);
    } else {
      router.push('/farms');
    }
  };

  const toggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session?.user) {
      alert('Please sign in to save farmhouses to your favorites.');
      router.push('/login');
      return;
    }
    try {
      const userId = (session.user as any).id;
      const res = await fetch('/api/users/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, farmId: id })
      });
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.favorites);
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to toggle favorite.');
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert('Failed to update favorites.');
    }
  };

  return (
    <div className="bg-[#fdfbf7] text-[#1a1b22] pt-20">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[580px] flex items-center justify-center bg-[#f4f2fd]/50">
        <div className="absolute inset-0 z-0">
          <img
            alt="Scenic countryside golden hour background"
            className="w-full h-full object-cover brightness-[0.85]"
            src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1920&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 md:px-16 text-white flex flex-col items-start gap-6">
          
          {/* Yellow Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#eab308]/20 border border-[#eab308]/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[#fef08a] tracking-wide animate-fade-in shadow-sm">
            <Compass className="h-3.5 w-3.5" />
            <span>India's #1 Farmhouse Platform</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-6xl font-normal leading-[1.1] tracking-tight max-w-2xl">
            Find Your Perfect <br />
            <span className="font-serif font-semibold text-[#10b981]">Farmhouse</span> Escape
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-lg text-gray-200 max-w-xl font-medium leading-relaxed drop-shadow-sm">
            Discover unique farmhouses, connect with nature, and create unforgettable memories across India's most beautiful destinations.
          </p>

          {/* Search bar */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex items-center bg-white rounded-full p-2.5 shadow-xl w-full max-w-xl mt-4 border border-[#bfc9c3]/30"
          >
            <div className="flex items-center gap-3 flex-1 pl-4">
              <MapPin className="h-5 w-5 text-[#003527]" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full bg-transparent text-[#1a1b22] placeholder-gray-400 outline-none text-sm font-semibold border-none"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="bg-[#003527] hover:bg-[#064e3b] text-white rounded-full px-6 py-3 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 mt-10 w-full max-w-lg border-t border-white/20 pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#10b981]/20 backdrop-blur-md flex items-center justify-center text-[#10b981]">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-bold font-serif leading-none">500+</p>
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-300 mt-1">Farmhouses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#10b981]/20 backdrop-blur-md flex items-center justify-center text-[#10b981]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-bold font-serif leading-none">50K+</p>
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-300 mt-1">Happy Guests</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#10b981]/20 backdrop-blur-md flex items-center justify-center text-[#10b981]">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-bold font-serif leading-none">4.8</p>
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-300 mt-1">Avg Rating</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Farmhouses Section */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-20">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-[#003527]">Featured Farmhouses</h2>
            <p className="text-sm text-[#404944] mt-1.5 font-medium">Hand-picked properties for the perfect getaway.</p>
          </div>
          <Link 
            className="flex items-center gap-1 text-sm font-bold text-[#003527] hover:text-[#064e3b] transition-all" 
            href="/farms"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#003527] border-t-transparent"></div>
            <p className="text-sm text-[#404944] font-semibold">Loading stays...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {farms.slice(0, 3).map((farm) => {
              const isFav = favorites.includes(farm._id);
              return (
                <Link
                  key={farm._id}
                  href={`/farms/${farm._id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#bfc9c3]/15 shadow-sm hover-lift group cursor-pointer flex flex-col h-full"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={farm.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                      alt={farm.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Featured Tag */}
                    <div className="absolute top-4 left-4 bg-[#10b981] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      Featured
                    </div>

                    {/* Favorite Heart Button */}
                    <button 
                      onClick={(e) => toggleFavorite(farm._id, e)}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full border border-gray-100 shadow-sm text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart className={`h-4 w-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                  </div>

                  {/* Info details */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{farm.location}</span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-[#1a1b22] group-hover:text-[#003527] transition-colors mb-2">
                      {farm.title}
                    </h3>
                    
                    {/* Amenities tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {farm.amenities?.map((amenity: string, idx: number) => (
                        <span key={idx} className="text-[10px] font-bold text-[#404944] bg-[#e3e1ec]/30 px-2 py-0.5 rounded border border-[#bfc9c3]/20">
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Price & guest count */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#bfc9c3]/15 mt-auto">
                      <div>
                        <span className="text-lg font-bold text-[#003527]">
                          ₹{(farm.pricePerNight || 3000).toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-gray-500 font-normal"> / night</span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#404944] bg-[#bfc9c3]/10 px-2.5 py-1 rounded-md">
                        {farm.guests || 6} guests
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Popular Destinations */}
      <section className="bg-[#f7f5ef] border-y border-[#bfc9c3]/20 py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-serif text-3xl font-semibold text-[#003527]">Popular Destinations</h2>
            <p className="text-sm text-[#404944] mt-2 font-medium">Explore farmhouses in India's most loved destinations.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {DESTINATIONS.map((dest, idx) => (
              <Link 
                key={idx}
                href={`/farms?location=${encodeURIComponent(dest.name)}`}
                className="group relative h-48 rounded-2xl overflow-hidden shadow-sm cursor-pointer flex flex-col justify-end p-4 hover-lift"
              >
                <div className="absolute inset-0 z-0">
                  <img src={dest.img} alt={dest.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>

                <div className="relative z-10 text-white">
                  <span className="bg-white/20 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20">
                    {dest.count} Farms
                  </span>
                  <h3 className="font-serif text-base font-semibold mt-2">{dest.name}</h3>
                  <p className="text-[10px] text-gray-300 font-medium">{dest.state}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-serif text-3xl font-semibold text-[#003527]">How It Works</h2>
          <p className="text-sm text-[#404944] mt-2 font-medium">Book your farmhouse in 3 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              step: '1', 
              title: 'Search & Discover', 
              desc: 'Browse through hundreds of unique farmhouses across India.',
              icon: Search
            },
            { 
              step: '2', 
              title: 'Book & Pay', 
              desc: 'Select your dates, make advance payment securely.',
              icon: CalendarCheck2
            },
            { 
              step: '3', 
              title: 'Enjoy & Relax', 
              desc: 'Arrive at your farmhouse and enjoy a memorable stay.',
              icon: Smile
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="h-14 w-14 rounded-full bg-[#e6f4ea] flex items-center justify-center text-[#003527] mb-6 relative">
                <item.icon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-[#10b981] text-white text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center shadow-sm">
                  {item.step}
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1a1b22] mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose AgriStay Section */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 pb-20">
        <div className="bg-[#003527] text-white rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-lg shadow-[#064e3b]/10">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full bg-[#064e3b] opacity-20 blur-3xl"></div>
            <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] rounded-full bg-[#10b981]/20 opacity-20 blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center max-w-xl mx-auto mb-14">
              <h2 className="font-serif text-3xl font-normal">Why Choose AgriStay</h2>
              <p className="text-sm text-emerald-200 mt-2 font-medium">The best farmhouse booking experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Secure Booking', desc: 'SSL encrypted payments, holistic protection.', icon: ShieldCheck },
                { title: '24/7 Support', desc: 'Round-the-clock customer assistance.', icon: Clock },
                { title: 'Best Prices', desc: 'Competitive rates and no hidden charges.', icon: CircleDollarSign },
                { title: 'Verified Properties', desc: 'All properties are verified by our team.', icon: ShieldCheck }
              ].map((card, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-[#10b981]/20 flex items-center justify-center text-[#10b981] mb-5">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold mb-2 tracking-tight">{card.title}</h3>
                  <p className="text-xs text-emerald-200 leading-relaxed font-medium">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#f7f5ef] border-t border-[#bfc9c3]/20 py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-serif text-3xl font-semibold text-[#003527]">What Our Guests Say</h2>
            <p className="text-sm text-[#404944] mt-2 font-medium">Real reviews from real guests.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                role: 'Homemaker',
                text: 'AgriStay made our family vacation absolutely memorable. The farmhouse was exactly as described, and the host was wonderful!',
                img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
              },
              {
                name: 'Rajesh Kumar',
                role: 'Owner',
                text: 'As a farmhouse owner, AgriStay has helped me reach customers across India. The platform is easy to use and the support team is great.',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
              },
              {
                name: 'Ankit Verma',
                role: 'HR Manager',
                text: "I've been using AgriStay for corporate retreats. The variety of properties and ease of booking makes it our go-to platform.",
                img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
              }
            ].map((test, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-[#bfc9c3]/15 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-yellow-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-[#404944] leading-relaxed italic font-medium">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                  <img src={test.img} alt={test.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-[#1a1b22]">{test.name}</h4>
                    <p className="text-[10px] text-gray-500 font-semibold">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-20">
        <div className="bg-[#003527] text-white rounded-3xl p-10 md:p-16 relative overflow-hidden text-center flex flex-col items-center gap-6 shadow-lg shadow-[#064e3b]/10">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full bg-[#064e3b] opacity-20 blur-3xl"></div>
            <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] rounded-full bg-[#10b981]/20 opacity-20 blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4">
            <h2 className="font-serif text-3xl font-normal leading-tight max-w-xl">
              Ready for Your Farmhouse Adventure?
            </h2>
            <p className="text-sm text-emerald-200 max-w-md font-medium">
              Join thousands of happy travelers and discover the perfect farmhouse for your next getaway.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link 
                href="/farms" 
                className="bg-white text-[#003527] hover:bg-emerald-50 px-8 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span>Browse Farmhouses</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a 
                href="tel:+919876543210"
                className="bg-transparent border border-white/30 hover:border-white/60 text-white px-8 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
