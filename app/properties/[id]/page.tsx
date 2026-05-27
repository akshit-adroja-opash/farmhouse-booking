'use client';

import React from 'react';
import { MapPin, Star, Share2, Heart, Grid, Wifi, Snowflake, Flame, Trees, ChefHat, Waves, Globe, ChevronDown } from 'lucide-react';

export default function PropertyDetailsPage() {
  // Configured mock pricing breakdown array
  const priceBreakdown = [
    { label: '$1,200 x 5 nights', value: 6000 },
    { label: 'Cleaning fee', value: 350 },
    { label: 'Service fee', value: 850 },
  ];

  // Configured structural amenities listing
  const coreAmenities = [
    { icon: Waves, label: 'Infinity Pool' },
    { icon: Trees, label: 'Vineyard Views' },
    { icon: ChefHat, label: 'Private Chef' },
    { icon: Wifi, label: 'High-speed WiFi' },
    { icon: Flame, label: 'Indoor Fireplace' },
    { icon: Snowflake, label: 'Air Conditioning' },
  ];

  return (
    <div className="min-h-screen bg-[#fbf8ff] text-[#1a1b22] font-sans antialiased selection:bg-[#b0f0d6]">
      {/* Main Container Elements Area */}
      <main className="mx-auto max-w-[1280px] px-6 pt-[100px] pb-24 md:px-16">
        
        {/* Header Title Block */}
        <div className="my-8">
          <h1 className="font-serif text-3xl font-normal text-[#003527] md:text-5xl mb-2">Villa Serenity</h1>
          <div className="flex flex-col gap-2 text-sm text-[#404944] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <MapPin className="h-4 w-4 text-[#003527]" />
              <span>Provence, France</span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1 font-semibold">
                <Star className="h-4 w-4 fill-[#003527] text-[#003527]" /> 4.98
              </span>
              <span className="text-[#404944]/80">(124 reviews)</span>
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
              src="https://lh3.googleusercontent.com/aida/ADBb0uig8ZRgZXhxAU3-LcQXgXD6xvGrIfqh_5yKmk66RSTuA2xx67aXsNDYS523E9MMxXP04eI_MUGPHNKrQi9AjCH1zgfhnuutvhWu9MH93rZ4XAVhA3HRUSaGwsKM424qAIJP6uKYqOgP62r9oR_sywu2qE7065F0rtiF534LGXqo1r6-AbUfl0Qd-kRzWjLDJMhifet6f5SgaNxT6iZY0V5DpD9c-M9hbFMsnKmTyjktMgGWA0G3lfbXUFLC" 
              alt="Main property aerial view" 
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-102"
            />
          </div>
          <div className="hidden overflow-hidden md:block">
            <img 
              src="https://lh3.googleusercontent.com/aida/ADBb0uh9ve4PHoNFWK4Rt6LuJhRQbIbuCEBvdKvfOXnx08y7zwDxxKuNa0Wo_6Zs_38K1r4ty9Cg45Vbc3g4I1J5nAmIPDnucWTzjGHc8pRWiTQxiAsuS-TPpAK3F_7y-1TjoIX3K28rM6IzcZZe-9o0gigZxWLgZLhmsvJCoc9-La-lYKHiMVGmatl6oFA8SpfmnqS-NshkQ83KJekx-CawEw2ypMkR43iQsY6e-PLlaeTcTWswXq71-_nUH8JA" 
              alt="Pool side view sunset" 
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="hidden overflow-hidden md:block">
            <img 
              src="https://lh3.googleusercontent.com/aida/ADBb0uii0vqUIYDkE4MP8UNU604n3UHpMaWikuD8kctMz8fSiP0vpVngrl8jJwYVe5eFHLLqOV5J6do5AIZCuyMAKv8c4w6IqfSw-mM5mAzMazB6citgl3K_8URjyjSp58UxTnGUxs4Rs6fT0kJZXqugNdiYFXIOVT7fiImzy2-GMyFO811FCZw8tbkeR5A-JSl2MuU61YDvcrAetgXPxadI3oz-VaLbiYjqlLgaJQcVyC7FNkK59q9zK3-zRgxK" 
              alt="Luxury lounge interior architectural design" 
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="relative hidden overflow-hidden md:block md:col-span-2">
            <img 
              src="https://lh3.googleusercontent.com/aida/ADBb0uhEquJHVtDFQJ-k88-lrGtg54sP8dg4NWnA8Lz1ki5lOnX7cKYPKhQf2I45EcrZYEFEvhMpHZCmvDuHJG64McCGyC5Jb4W7Z4PN0gDLK5811dJFAeQgPhySW5pDnCtmKhzneGeE4aBYvqUiJN63XynwyOgAv5N6Ui9cPWO2n0K2_Bw67xjQeZ8jyS0onMMetPgvkiwS5wszsd35mFkjt_4x33JCG7pKaR7iObdzP26Kg8da4wfv7jfxPSw" 
              alt="Cottage gardens perspective view" 
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
              <p className="text-base text-[#404944]">10 guests · 5 bedrooms · 6 beds · 5.5 baths</p>
            </div>

            {/* Structured Descriptive Context Block */}
            <div className="border-b border-[#bfc9c3]/30 pb-8 mb-8">
              <h3 className="font-serif text-xl text-[#003527] mb-4">About this home</h3>
              <div className="space-y-4 text-sm leading-relaxed text-[#404944]">
                <p>
                  Nestled in the heart of the Luberon Valley, Villa Serenity offers an unparalleled luxury escape. This meticulously restored 18th-century bastide combines historic charm with modern sophistication. Wake up to panoramic views of rolling vineyards and lavender fields, bathed in the soft, golden light unique to Provence.
                </p>
                <p>
                  The expansive grounds feature a heated infinity pool that seemingly merges with the horizon, a shaded dining pergola perfect for al fresco meals, and an organic vegetable garden available for your culinary explorations. Inside, the interiors are defined by calm, neutral tones, exposed wooden beams, and curated local art, creating a space that is both grand and deeply comforting.
                </p>
              </div>
              <button className="mt-4 text-sm font-semibold text-[#003527] underline hover:text-[#064e3b]">
                Show more
              </button>
            </div>

            {/* Amenities Matrix Checklist Presentation Layer */}
            <div className="border-b border-[#bfc9c3]/30 pb-8 mb-8">
              <h3 className="font-serif text-xl text-[#003527] mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 gap-y-4 gap-x-8 sm:grid-cols-2">
                {coreAmenities.map((amenity, index) => {
                  const IconComponent = amenity.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <IconComponent className="h-6 w-6 stroke-[1.5] text-[#003527]" />
                      <span className="text-sm text-[#404944]">{amenity.label}</span>
                    </div>
                  );
                })}
              </div>
              <button className="mt-8 rounded-lg border border-[#003527] px-6 py-3 text-sm font-semibold text-[#003527] transition-colors hover:bg-[#e3e1ec]">
                Show all 32 amenities
              </button>
            </div>

            {/* Geographical Mapping Placeholder Layout Area */}
            <div>
              <h3 className="font-serif text-xl text-[#003527] mb-2">Where you'll be</h3>
              <p className="text-sm text-[#404944] mb-4">Provence-Alpes-Côte d'Azur, France</p>
              <div className="h-[350px] w-full overflow-hidden rounded-xl border border-[#bfc9c3]/30 bg-[#e3e1ec] shadow-[0_8px_30px_rgba(6,78,59,0.05)]">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8p6P9wseAIhNRBCqgMqjyp9_vgrdMjleHShMA-GMQEYQa2s-ELKdaj8xugHEqOZouexV2dOqWADn30tyCc5tMZcVfg7vJeJYm456sEOmJgjOijdBzTnkcsgBcU13LL8wzJGH0nsAAzbDALhTLNV0HhiqlpS1au_jl7leFLV8FFRgxWBq2PNRftnVVsV9Z2nvAOFR_fvHq7WKCJiu9jkvFWPB4xmpvByCeiLPURR0DYiZRvHypKQlB8PuC0_bB6Pdt2IWPT8-0f4li" 
                  alt="Topographical Map layout graphic of Provence location coordinates" 
                  className="h-full w-full object-cover opacity-80 mix-blend-multiply"
                />
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Context Pillar Area (Booking Card Block) */}
          <div className="w-full md:w-[35%]">
            <div className="sticky top-[120px] rounded-xl border border-[#bfc9c3]/30 bg-white p-6 shadow-[0_8px_30px_rgba(6,78,59,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(6,78,59,0.08)]">
              
              {/* Header Price Presentation Metrics */}
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <span className="font-serif text-2xl font-bold text-[#003527] md:text-3xl">$1,200</span>
                  <span className="text-sm text-[#404944]"> / night</span>
                </div>
                <div className="flex items-center text-sm font-semibold text-[#404944]">
                  <Star className="h-4 w-4 fill-[#003527] text-[#003527] mr-1" />
                  <span>4.98</span>
                </div>
              </div>

              {/* Pseudo Date Picker Form Structural Grid Interface */}
              <div className="mb-4 overflow-hidden rounded-lg border border-[#bfc9c3]">
                <div className="flex border-b border-[#bfc9c3]">
                  <div className="w-1/2 border-r border-[#bfc9c3] p-3 transition-colors hover:bg-[#e3e1ec]/30 cursor-pointer">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#1a1b22] mb-1">Check-in</div>
                    <div className="text-sm font-medium text-[#003527]">Oct 15, 2024</div>
                  </div>
                  <div className="w-1/2 p-3 transition-colors hover:bg-[#e3e1ec]/30 cursor-pointer">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#1a1b22] mb-1">Checkout</div>
                    <div className="text-sm font-medium text-[#003527]">Oct 20, 2024</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 transition-colors hover:bg-[#e3e1ec]/30 cursor-pointer">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#1a1b22] mb-1">Guests</div>
                    <div className="text-sm font-medium text-[#003527]">2 guests</div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-[#404944]" />
                </div>
              </div>

              {/* Core Reservation Interaction Button Action Layer */}
              <button className="w-full rounded-lg bg-[#003527] py-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#064e3b] active:scale-[0.98]">
                Confirm & Pay
              </button>
              <p className="mt-3 text-center text-xs text-[#404944]">You won't be charged yet</p>

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
                <span>$7,200</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
