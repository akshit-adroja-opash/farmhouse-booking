'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Property {
  _id?: string;
  id?: string;
  title: string;
  location: string;
  pricePerNight: number;
  imageSrc?: string;
  images?: string[];
  imageAlt?: string;
  amenities: string[];
  guests?: number;
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Lavender Fields Estate',
    location: 'Tuscany, Italy',
    pricePerNight: 850,
    imageSrc: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'A luxurious stone farmhouse surrounded by vibrant purple lavender fields.',
    amenities: ['Pool', 'Private Chef'],
  },
  {
    id: '2',
    title: 'The Olive Grove Villa',
    location: 'Andalusia, Spain',
    pricePerNight: 1200,
    imageSrc: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'A modern minimalist villa interior featuring expansive glass windows looking out onto an olive grove.',
    amenities: ['High-Speed WiFi', 'Indoor Fireplace'],
  },
  {
    id: '3',
    title: 'Highland Retreat',
    location: 'Scottish Highlands, UK',
    pricePerNight: 650,
    imageSrc: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'An elegant, modern glass and timber farmhouse situated on a misty rolling green hillside.',
    amenities: ['Indoor Fireplace', 'Pool'],
  },
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [priceLimit, setPriceLimit] = useState(2000);
  const [guestCount, setGuestCount] = useState<string>('2');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const guestQuery = guestCount.includes('+') ? guestCount.replace('+', '') : guestCount;
        const amenitiesQuery = selectedAmenities.join(',');
        
        let url = `/api/farms?pricePerNight=${priceLimit}&guests=${guestQuery}`;
        if (amenitiesQuery) {
          url += `&amenities=${encodeURIComponent(amenitiesQuery)}`;
        }

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProperties(data);
          } else {
            const filteredMock = MOCK_PROPERTIES.filter(p => {
              const matchesPrice = p.pricePerNight <= priceLimit;
              const matchesAmenities = selectedAmenities.every(a => p.amenities.includes(a));
              return matchesPrice && matchesAmenities;
            });
            setProperties(filteredMock);
          }
        } else {
          setProperties(MOCK_PROPERTIES);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setProperties(MOCK_PROPERTIES);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [priceLimit, guestCount, selectedAmenities]);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1a1b22] font-sans antialiased selection:bg-[#b0f0d6]">
      
      <main className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-6 pt-32 pb-24 md:grid-cols-12 md:px-16">
        
        {/* Left Sidebar Filter panel */}
        <aside className="sticky top-32 hidden self-start md:col-span-3 md:block">
          <div className="rounded-xl border border-[#bfc9c3]/30 bg-white p-6 shadow-[0_4px_20px_rgba(6,78,59,0.05)]">
            <h2 className="font-serif text-xl text-[#003527] mb-6">Refine Search</h2>
            
            {/* Price Range Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-[#1a1b22] mb-4">Price per night</h3>
              <input 
                type="range" 
                min="500" 
                max="2000" 
                value={priceLimit}
                onChange={(e) => setPriceLimit(Number(e.target.value))}
                className="w-full accent-[#064e3b] cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-xs text-[#404944]">
                <span>$500</span>
                <span className="font-bold text-[#003527]">${priceLimit}</span>
                <span>$2,000+</span>
              </div>
            </div>

            {/* Guest Selector Buttons */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-[#1a1b22] mb-4">Guests</h3>
              <div className="flex gap-2">
                {['1', '2', '3', '4+'].map((num) => (
                  <button 
                    key={num} 
                    type="button"
                    onClick={() => setGuestCount(num)}
                    className={`flex-1 rounded-lg border py-2.5 text-xs font-semibold transition-colors ${
                      guestCount === num 
                        ? 'border-[#003527] bg-[#064e3b]/10 text-[#0b513d]' 
                        : 'border-[#bfc9c3]/60 bg-transparent text-[#404944] hover:bg-gray-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities Checklist Options */}
            <div>
              <h3 className="text-sm font-semibold text-[#1a1b22] mb-4">Amenities</h3>
              <ul className="space-y-3.5">
                {['Pool', 'Private Chef', 'High-Speed WiFi', 'Indoor Fireplace'].map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        id={`amenity-${amenity}`}
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[#bfc9c3]/60 checked:border-[#003527] checked:bg-[#003527] focus:outline-none transition-colors"
                      />
                      <Check className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <label htmlFor={`amenity-${amenity}`} className="text-xs font-medium text-[#404944] cursor-pointer selection:bg-transparent">
                      {amenity}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </aside>

        {/* Right Product Grid catalog segment */}
        <section className="md:col-span-9">
          {loading ? (
            <div className="flex h-64 w-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#003527]" />
            </div>
          ) : properties.length === 0 ? (
            <div className="flex h-64 w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#bfc9c3] p-12 text-center">
              <h3 className="font-serif text-lg font-semibold text-[#003527] mb-2">No properties match your filters</h3>
              <p className="text-sm text-[#404944] mb-6">Try adjusting your price range or clearing some amenities.</p>
              <button 
                onClick={() => {
                  setPriceLimit(2000);
                  setGuestCount('2');
                  setSelectedAmenities([]);
                }}
                className="rounded-lg bg-[#003527] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {properties.map((property) => {
                const id = property._id || property.id;
                const price = property.pricePerNight;
                const image = property.images?.[0] || property.imageSrc || 'https://via.placeholder.com/600x400';
                
                return (
                  <div 
                    key={id} 
                    className="group relative overflow-hidden rounded-xl border border-[#bfc9c3]/20 bg-white shadow-sm shadow-[#064e3b]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    
                    {/* Catalog Card Thumbnail frame */}
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      <img 
                        src={image} 
                        alt={property.imageAlt || property.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 rounded-full border border-[#064e3b]/20 bg-white/90 px-3 py-1 text-xs font-semibold text-[#064e3b] backdrop-blur-sm">
                        ${price.toLocaleString()} / night
                      </div>
                    </div>

                    {/* Card Context Area */}
                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-1 text-[#404944]">
                        <MapPin className="h-4 w-4 text-[#404944]" />
                        <span className="text-xs font-semibold">{property.location}</span>
                      </div>
                      
                      <h3 className="font-serif text-lg font-medium text-[#003527] mb-4">
                        {property.title}
                      </h3>
                      
                      {/* Metadata Tag Badges */}
                      <div className="mb-6 flex flex-wrap gap-2">
                        {property.amenities.slice(0, 3).map((amenity, idx) => (
                          <span 
                            key={idx} 
                            className="rounded border border-[#bfc9c3]/50 bg-[#fdfbf7] px-2 py-1 text-[10px] font-semibold text-[#064e3b]"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <Link 
                        href={`/properties/${id}`}
                        className="block w-full rounded-lg border border-[#bfc9c3] py-3 text-center text-sm font-semibold text-[#064e3b] transition-all hover:bg-[#064e3b] hover:text-white"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
