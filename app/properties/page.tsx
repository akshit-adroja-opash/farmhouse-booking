'use client';

import React from 'react';
import { MapPin, Check } from 'lucide-react';

// Define explicit types for our property listing structure
interface Property {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  imageSrc: string;
  imageAlt: string;
  amenities: string[];
}

export default function PropertiesPage() {
  // Mock data matching the design sample perfectly
  const properties: Property[] = [
    {
      id: '1',
      title: 'Lavender Fields Estate',
      location: 'Tuscany, Italy',
      pricePerNight: 850,
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdBK11OryjT3YBXWuiAUehtO1dcgc5t67U1ZvCYh3RiWtWCKZ4p-d8oKKq3saj2oOPHl-Dc1hUoxSBdy63tnawpJzzhlWhpXxbsc7YuZu9pcWU182OnY-UqGIpxMkT1Y0pft-hHI7JfYECponD4zOHLgWBbVVU7wKs8-jnGoJBOR2UwGSOUWvzu-hU2aJdXiAr0pZxAERY8Tt1owLHmSwV3V1dWL6sHm0AGnSSkhzRl5Y6qUWJZ_CC6j1m6reOLuRhFgFwb3JOvoNN',
      imageAlt: 'A luxurious stone farmhouse surrounded by vibrant purple lavender fields.',
      amenities: ['Pool', 'Chef'],
    },
    {
      id: '2',
      title: 'The Olive Grove Villa',
      location: 'Andalusia, Spain',
      pricePerNight: 1200,
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTQmdaQr_jDHa_n6vukuEDVQhAqUZX7NKwSvZ0lhlnnsIe2vNBZy1YIWHAstvH49MdwZwhBYue3Kf6maItKKmxW_5EC7a-2ojDQ66wpIyx_Z8Z5p1uJPNeNrImyLfzLHKUzrHO-0RWM8bTAQk7-5DM5_jrbOijZcsVp8Eqqbynhykuo92slE0QlLWvqy_9XSM9L0KtW3HV1BiA1BcoXjWt98fC_KWGna0gyGGEsj-1XMfDHnrT2aht0X3kViQAUEc4pXuXZbOslYGa',
      imageAlt: 'A modern minimalist villa interior featuring expansive glass windows looking out onto an olive grove.',
      amenities: ['WiFi', 'Fireplace'],
    },
    {
      id: '3',
      title: 'Highland Retreat',
      location: 'Scottish Highlands, UK',
      pricePerNight: 650,
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgaAxHqe6xYgASeDfi-8Kki3671xBp0SOmw_8URnZJvvqlj3fZ5_PhuRO2rvJyNGWkWMfqPWxP6opsqK7-WaS2LT3e1piNP-oXIMSIEPwCdk5v7aMb8bw6QfD0J9zLWa5TtFpoMbhgy3FXT8nGPAgO6p7abEb91pTItYL-iazdfbOOZYmYPCG9-s9Oj7HU5k1M5QctlRG4TOWAx2uM-T0QfDjBnEiJ3sRNhKfiRfFMiXzy-vPmrMnFvSBEHad5XYtsHm4aUEPiVPHW',
      imageAlt: 'An elegant, modern glass and timber farmhouse situated on a misty rolling green hillside.',
      amenities: ['Fireplace', 'BBQ'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1a1b22] font-sans antialiased selection:bg-[#b0f0d6]">
      {/* Main Content Layout */}
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
                className="w-full accent-[#064e3b] cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-xs text-[#404944]">
                <span>$500</span>
                <span>$2,000+</span>
              </div>
            </div>

            {/* Guest Selector Buttons */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-[#1a1b22] mb-4">Guests</h3>
              <div className="flex gap-2">
                {['1', '2', '3', '4+'].map((num, idx) => (
                  <button 
                    key={idx} 
                    className={`flex-1 rounded-lg border py-2.5 text-xs font-semibold transition-colors ${
                      idx === 1 
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
                {['Pool', 'Private Chef', 'High-Speed WiFi', 'Indoor Fireplace'].map((amenity, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        id={`amenity-${idx}`}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[#bfc9c3]/60 checked:border-[#003527] checked:bg-[#003527] focus:outline-none transition-colors"
                      />
                      <Check className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <label htmlFor={`amenity-${idx}`} className="text-xs font-medium text-[#404944] cursor-pointer selection:bg-transparent">
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {properties.map((property) => (
              <div 
                key={property.id} 
                className="group relative overflow-hidden rounded-xl border border-[#bfc9c3]/20 bg-white shadow-sm shadow-[#064e3b]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                
                {/* Catalog Card Thumbnail frame */}
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <img 
                    src={property.imageSrc} 
                    alt={property.imageAlt} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 rounded-full border border-[#064e3b]/20 bg-white/90 px-3 py-1 text-xs font-semibold text-[#064e3b] backdrop-blur-sm">
                    ${property.pricePerNight.toLocaleString()} / night
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
                    {property.amenities.map((amenity, idx) => (
                      <span 
                        key={idx} 
                        className="rounded border border-[#bfc9c3]/50 bg-[#fdfbf7] px-2 py-1 text-[10px] font-semibold text-[#064e3b]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <button className="w-full rounded-lg border border-[#bfc9c3] py-3 text-sm font-semibold text-[#064e3b] transition-colors hover:bg-[#064e3b] hover:text-white">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
