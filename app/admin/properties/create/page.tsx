import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Home, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  ArrowLeft, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';

export default function AddPropertyWizardPage() {
  
  const wizardSteps = [
    { number: 1, label: 'Basics', active: true },
    { number: 2, label: 'Pricing', active: false },
    { number: 3, label: 'Amenities', active: false },
    { number: 4, label: 'Photos', active: false },
  ];

  return (
    <div className="p-6 md:p-16 pb-24 selection:bg-[#064e3b]/10 selection:text-[#0b513d]">
        
        <header className="mx-auto max-w-3xl mb-12">
          <div className="mb-4 flex items-center gap-2 text-[#404944]">
            <Link href="/admin/dashboard" className="transition-colors hover:text-[#003527]">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-xs font-bold uppercase tracking-wider">Back to Dashboard</span>
          </div>
          <h2 className="font-serif text-3xl font-normal text-[#003527] mb-2">Add New Property</h2>
          <p className="text-sm text-[#404944]">Provide the details to list a new estate on the platform.</p>
        </header>

        <div className="mx-auto max-w-3xl rounded-xl border border-[#eeedf7] bg-white p-6 shadow-[0_4px_24px_-4px_rgba(6,78,59,0.05),0_12px_48px_-12px_rgba(6,78,59,0.08)] md:p-10">
          
          <div className="relative mb-12 flex items-center justify-between">
            <div className="absolute top-1/2 left-0 -z-10 h-px w-full -translate-y-1/2 bg-[#bfc9c3]/50"></div>
            {wizardSteps.map((step) => (
              <div key={step.number} className="flex flex-col items-center gap-2 bg-white px-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  step.active 
                    ? 'bg-[#003527] text-white font-semibold' 
                    : 'bg-[#fbf8ff] border border-[#bfc9c3]/50 text-[#707974]'
                }`}>
                  {step.number}
                </div>
                <span className={`text-xs font-semibold ${step.active ? 'text-[#003527]' : 'text-[#707974]'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-[#1a1b22] pb-2 border-b border-[#bfc9c3]/30 mb-6">
                Basic Information
              </h3>

              <div className="space-y-2">
                <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-[#1a1b22]">
                  Property Title
                </label>
                <input 
                  id="title"
                  type="text"
                  placeholder="e.g. Whispering Pines Farmhouse"
                  className="w-full rounded-lg border-[#bfc9c3]/60 bg-[#fbf8ff] px-4 py-3 text-sm text-[#1a1b22] placeholder-[#404944]/50 outline-none transition-colors border focus:border-[#003527] focus:ring-1 focus:ring-[#003527]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-[#1a1b22]">
                  Description
                </label>
                <textarea 
                  id="description"
                  rows={4}
                  placeholder="Describe the unique features and atmosphere of the estate..."
                  className="w-full resize-none rounded-lg border-[#bfc9c3]/60 bg-[#fbf8ff] px-4 py-3 text-sm text-[#1a1b22] placeholder-[#404944]/50 outline-none transition-colors border focus:border-[#003527] focus:ring-1 focus:ring-[#003527]"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-[#1a1b22]">
                    Location
                  </label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-[#707974]">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <input 
                      id="location"
                      type="text"
                      placeholder="City, Region"
                      className="w-full rounded-lg border-[#bfc9c3]/60 bg-[#fbf8ff] pl-10 pr-4 py-3 text-sm text-[#1a1b22] placeholder-[#404944]/50 outline-none transition-colors border focus:border-[#003527] focus:ring-1 focus:ring-[#003527]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="property_type" className="block text-xs font-bold uppercase tracking-wider text-[#1a1b22]">
                    Property Type
                  </label>
                  <select 
                    id="property_type"
                    className="w-full rounded-lg border-[#bfc9c3]/60 bg-[#fbf8ff] px-4 py-3 text-sm text-[#1a1b22] outline-none transition-colors border focus:border-[#003527] focus:ring-1 focus:ring-[#003527]"
                  >
                    <option value="farmhouse">Farmhouse</option>
                    <option value="cabin">Cabin</option>
                    <option value="estate">Estate</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

              </div>
            </div>

            <div className="mt-12 flex justify-end gap-4 border-t border-[#bfc9c3]/30 pt-8">
              <button 
                type="button"
                className="rounded-lg border border-[#003527] px-6 py-3 text-sm font-semibold text-[#003527] transition-colors hover:bg-[#e3e1ec]/30"
              >
                Cancel
              </button>
              <button 
                type="button"
                className="flex items-center gap-2 rounded-lg bg-[#003527] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b513d]"
              >
                <span>Next Step</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

        </div>
    </div>
  );
}