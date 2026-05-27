'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MapPin, Star, Share2, Heart, Grid, Wifi, Snowflake, Flame, Trees, ChefHat, Waves, ShieldCheck, ChevronDown, Loader2 } from 'lucide-react';

interface PropertyDetails {
  _id?: string;
  id?: string;
  title: string;
  location: string;
  pricePerNight: number;
  description: string;
  images: string[];
  amenities: string[];
  guests: number;
  bedrooms: number;
  baths: number;
  rating: number;
}

const MOCK_PROPERTIES_DETAILS: Record<string, PropertyDetails> = {
  '1': {
    id: '1',
    title: 'Lavender Fields Estate',
    location: 'Tuscany, Italy',
    pricePerNight: 850,
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Nestled in the heart of Tuscany, Lavender Fields Estate offers a peaceful retreat. Surrounded by fragrant fields, this classic stone villa has been fully restored with premium modern features.',
    amenities: ['Pool', 'Private Chef', 'High-Speed WiFi', 'Indoor Fireplace'],
    rating: 4.95,
    guests: 6,
    bedrooms: 3,
    baths: 3
  },
  '2': {
    id: '2',
    title: 'The Olive Grove Villa',
    location: 'Andalusia, Spain',
    pricePerNight: 1200,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A modern architectural masterpiece situated in a historic olive grove. Offers glass-walled lounge areas, private infinity pool, and customized concierge services.',
    amenities: ['Pool', 'High-Speed WiFi', 'Indoor Fireplace', 'Private Chef'],
    rating: 4.98,
    guests: 8,
    bedrooms: 4,
    baths: 4.5
  },
  '3': {
    id: '3',
    title: 'Highland Retreat',
    location: 'Scottish Highlands, UK',
    pricePerNight: 650,
    images: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A cozy and luxurious timber hideaway set in the scenic wilderness of the Scottish Highlands. Perfect for stargazing and getting close to nature.',
    amenities: ['Indoor Fireplace', 'High-Speed WiFi', 'Pool'],
    rating: 4.88,
    guests: 4,
    bedrooms: 2,
    baths: 2
  }
};

const AMENITY_ICONS: Record<string, React.ComponentType<any>> = {
  'Pool': Waves,
  'Private Chef': ChefHat,
  'High-Speed WiFi': Wifi,
  'WiFi': Wifi,
  'Indoor Fireplace': Flame,
  'Air Conditioning': Snowflake,
  'Vineyard Views': Trees,
};

export default function PropertyDetailsPage() {
  const { id } = useParams() || {};
  const { data: session } = useSession() || {};
  const router = useRouter();

  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Date States
  const [startDate, setStartDate] = useState('2024-10-15');
  const [endDate, setEndDate] = useState('2024-10-20');
  const [guestSelection, setGuestSelection] = useState(2);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getProperty() {
      setLoading(true);
      try {
        if (MOCK_PROPERTIES_DETAILS[id as string]) {
          setProperty(MOCK_PROPERTIES_DETAILS[id as string]);
        } else {
          const res = await fetch(`/api/farms/${id}`);
          if (res.ok) {
            const data = await res.json();
            setProperty({
              _id: data._id,
              title: data.title,
              location: data.location,
              pricePerNight: data.pricePerNight,
              description: data.description,
              images: data.images && data.images.length > 0 ? data.images : [
                'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
              ],
              amenities: data.amenities && data.amenities.length > 0 ? data.amenities : ['WiFi', 'Pool'],
              guests: data.guests || 4,
              bedrooms: data.bedrooms || 2,
              baths: data.baths || 2,
              rating: data.rating || 4.8,
            });
          } else {
            // Default fallback if not found in API
            setProperty(MOCK_PROPERTIES_DETAILS['1']);
          }
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setProperty(MOCK_PROPERTIES_DETAILS['1']);
      } finally {
        setLoading(false);
      }
    }

    getProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf8ff]">
        <Loader2 className="h-10 w-10 animate-spin text-[#003527]" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf8ff]">
        <p className="text-lg font-semibold text-[#003527]">Property not found.</p>
      </div>
    );
  }

  // Calculate pricing breakdown
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  const accommodationTotal = property.pricePerNight * diffNights;
  const cleaningFee = Math.round(accommodationTotal * 0.05);
  const serviceFee = Math.round(accommodationTotal * 0.12);
  const grandTotal = accommodationTotal + cleaningFee + serviceFee;

  const priceBreakdown = [
    { label: `$${property.pricePerNight.toLocaleString()} x ${diffNights} night${diffNights > 1 ? 's' : ''}`, value: accommodationTotal },
    { label: 'Cleaning fee', value: cleaningFee },
    { label: 'Service fee', value: serviceFee },
  ];

  const handleBooking = async () => {
    if (!session?.user) {
      alert('Please sign in to finalize your booking.');
      router.push('/login');
      return;
    }

    setBookingLoading(true);
    try {
      let finalFarmId = property._id || property.id;

      // Safe check: If it's a mock farm, we will register it on the fly to DB
      if (['1', '2', '3'].includes(finalFarmId as string)) {
        // Query to check if already created
        const checkRes = await fetch(`/api/farms`);
        if (checkRes.ok) {
          const list = await checkRes.json();
          const existing = list.find((item: any) => item.title === property.title);
          if (existing) {
            finalFarmId = existing._id;
          } else {
            // Create in database on the fly
            const createRes = await fetch('/api/farms', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                title: property.title,
                description: property.description,
                location: property.location,
                pricePerNight: property.pricePerNight,
                images: property.images,
                amenities: property.amenities,
                guests: property.guests,
                bedrooms: property.bedrooms,
                baths: property.baths,
                rating: property.rating,
              })
            });
            if (createRes.ok) {
              const newFarm = await createRes.json();
              finalFarmId = newFarm._id;
            }
          }
        }
      }

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: (session.user as any).id,
          farmId: finalFarmId,
          startDate,
          endDate,
          totalPrice: grandTotal,
        })
      });

      if (res.ok) {
        alert('Booking Confirmed Successfully!');
        router.push('/dashboard/bookings');
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to place booking.');
      }
    } catch (err) {
      console.error(err);
      alert('Error confirmed booking.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8ff] text-[#1a1b22] font-sans antialiased selection:bg-[#b0f0d6]">
      {/* Main Container Elements Area */}
      <main className="mx-auto max-w-[1280px] px-6 pt-[100px] pb-24 md:px-16">
        
        {/* Header Title Block */}
        <div className="my-8">
          <h1 className="font-serif text-3xl font-normal text-[#003527] md:text-5xl mb-2">{property.title}</h1>
          <div className="flex flex-col gap-2 text-sm text-[#404944] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <MapPin className="h-4 w-4 text-[#003527]" />
              <span>{property.location}</span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1 font-semibold">
                <Star className="h-4 w-4 fill-[#003527] text-[#003527]" /> {property.rating}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-sm font-medium underline transition-colors hover:text-[#003527]">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-sm font-medium underline transition-colors hover:text-[#003527]">
                <Heart className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bento Grid Image Mosaic Gallery */}
        <div className="relative mb-16 grid h-[400px] grid-cols-1 gap-4 overflow-hidden rounded-xl md:h-[550px] md:grid-cols-4 md:grid-rows-2">
          <div className="relative col-span-1 row-span-1 overflow-hidden md:col-span-2 md:row-span-2">
            <img 
              src={property.images[0]} 
              alt="Main property view" 
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-102"
            />
          </div>
          <div className="hidden overflow-hidden md:block">
            <img 
              src={property.images[1] || property.images[0]} 
              alt="Secondary pool view" 
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="hidden overflow-hidden md:block">
            <img 
              src={property.images[2] || property.images[0]} 
              alt="Lounge interior view" 
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="relative hidden overflow-hidden md:block md:col-span-2">
            <img 
              src={property.images[3] || property.images[0]} 
              alt="Gardens view" 
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <button className="absolute bottom-4 right-4 flex items-center space-x-2 rounded-lg border border-[#bfc9c3] bg-white px-4 py-2 text-sm font-semibold text-[#003527] shadow-sm transition-colors hover:bg-[#e3e1ec]">
              <Grid className="h-4 w-4" />
              <span>Show all photos</span>
            </button>
          </div>
        </div>

        {/* Dynamic Context Splitting Section Layout */}
        <div className="flex flex-col gap-12 md:flex-row">
          
          {/* Main Left Context Pillar Area */}
          <div className="w-full md:w-[65%] md:pr-8">
            
            {/* Host Presentation layer */}
            <div className="border-b border-[#bfc9c3]/30 pb-8 mb-8">
              <h2 className="font-serif text-2xl text-[#003527] mb-2">Entire villa hosted by Marie</h2>
              <p className="text-base text-[#404944]">
                {property.guests} guests · {property.bedrooms} bedrooms · {property.bedrooms * 2} beds · {property.baths} baths
              </p>
            </div>

            {/* Structured Descriptive Context Block */}
            <div className="border-b border-[#bfc9c3]/30 pb-8 mb-8">
              <h3 className="font-serif text-xl text-[#003527] mb-4">About this home</h3>
              <div className="space-y-4 text-sm leading-relaxed text-[#404944]">
                <p>{property.description}</p>
              </div>
            </div>

            {/* Amenities Matrix Checklist Presentation Layer */}
            <div className="border-b border-[#bfc9c3]/30 pb-8 mb-8">
              <h3 className="font-serif text-xl text-[#003527] mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 gap-y-4 gap-x-8 sm:grid-cols-2">
                {property.amenities.map((amenity, index) => {
                  const IconComponent = AMENITY_ICONS[amenity] || ShieldCheck;
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <IconComponent className="h-6 w-6 stroke-[1.5] text-[#003527]" />
                      <span className="text-sm text-[#404944]">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Context Pillar Area (Booking Card Block) */}
          <div className="w-full md:w-[35%]">
            <div className="sticky top-[120px] rounded-xl border border-[#bfc9c3]/30 bg-white p-6 shadow-[0_8px_30px_rgba(6,78,59,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(6,78,59,0.08)]">
              
              {/* Header Price Presentation Metrics */}
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <span className="font-serif text-2xl font-bold text-[#003527] md:text-3xl">${property.pricePerNight.toLocaleString()}</span>
                  <span className="text-sm text-[#404944]"> / night</span>
                </div>
                <div className="flex items-center text-sm font-semibold text-[#404944]">
                  <Star className="h-4 w-4 fill-[#003527] text-[#003527] mr-1" />
                  <span>{property.rating}</span>
                </div>
              </div>

              {/* Date Picker Form Grid Interface */}
              <div className="mb-4 overflow-hidden rounded-lg border border-[#bfc9c3]">
                <div className="flex border-b border-[#bfc9c3]">
                  <div className="w-1/2 border-r border-[#bfc9c3] p-3 transition-colors hover:bg-[#e3e1ec]/30">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1b22] block mb-1">Check-in</label>
                    <input 
                      type="date" 
                      value={startDate} 
                      onChange={(e) => setStartDate(e.target.value)}
                      className="text-sm font-medium text-[#003527] bg-transparent outline-none border-none w-full focus:ring-0 p-0" 
                    />
                  </div>
                  <div className="w-1/2 p-3 transition-colors hover:bg-[#e3e1ec]/30">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1b22] block mb-1">Checkout</label>
                    <input 
                      type="date" 
                      value={endDate} 
                      onChange={(e) => setEndDate(e.target.value)}
                      className="text-sm font-medium text-[#003527] bg-transparent outline-none border-none w-full focus:ring-0 p-0" 
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 transition-colors hover:bg-[#e3e1ec]/30">
                  <div className="w-full">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1b22] block mb-1">Guests</label>
                    <select 
                      value={guestSelection}
                      onChange={(e) => setGuestSelection(Number(e.target.value))}
                      className="text-sm font-medium text-[#003527] bg-transparent border-none outline-none w-full focus:ring-0 p-0"
                    >
                      {[...Array(property.guests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} guest{i > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Core Reservation Interaction Button Action Layer */}
              <button 
                onClick={handleBooking}
                disabled={bookingLoading}
                className="w-full rounded-lg bg-[#003527] py-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#064e3b] active:scale-[0.98] disabled:opacity-75"
              >
                {bookingLoading ? 'Confirming Stay...' : 'Confirm & Pay'}
              </button>
              <p className="mt-3 text-center text-xs text-[#404944]">Instant reservation confirmation</p>

              {/* Functional Itemized Financial Cost Listings Line items */}
              <div className="mt-6 space-y-4 border-b border-[#bfc9c3]/30 pb-6 text-sm text-[#404944]">
                {priceBreakdown.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="underline cursor-pointer">{item.label}</span>
                    <span>${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Aggregate Total Formulation Summary Metric */}
              <div className="mt-6 flex justify-between font-serif text-lg font-bold text-[#003527]">
                <span>Total</span>
                <span>${grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
