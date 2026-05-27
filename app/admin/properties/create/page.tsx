import React from 'react';
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
  
  // Explicit representation data matching step wizard progression
  const wizardSteps = [
    { number: 1, label: 'Basics', active: true },
    { number: 2, label: 'Pricing', active: false },
    { number: 3, label: 'Amenities', active: false },
    { number: 4, label: 'Photos', active: false },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#fbf8ff] font-sans antialiased text-[#1a1b22] selection:bg-[#064e3b]/10 selection:text-[#0b513d]">
      
      {/* Universal Shared Admin Sidebar Navigation component */}
      <nav className="fixed top-0 left-0 z-40 hidden h-full w-64 flex-col border-r border-[#bfc9c3]/30 bg-white p-2 shadow-sm transition-transform duration-300 md:flex">
        <div className="px-4 py-6 mb-4">
          <h1 className="font-serif text-xl font-bold tracking-tight text-[#003527]">EstateStay</h1>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#404944] mt-1">Admin Suite</p>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <a href="#" className="group flex items-center gap-3 rounded-lg px-4 py-3 text-[#404944] transition-all hover:bg-[#e3e1ec]/40">
            <LayoutDashboard className="h-5 w-5 transition-colors group-hover:text-[#003527]" />
            <span className="text-sm font-semibold">Dashboard</span>
          </a>
          
          {/* Active Link Segment indicator */}
          <a href="#" className="flex translate-x-1 items-center gap-3 rounded-lg bg-[#064e3b] px-4 py-3 text-white font-bold transition-transform">
            <Home className="h-5 w-5" />
            <span className="text-sm font-semibold">Properties</span>
          </a>

          <a href="#" className="group flex items-center gap-3 rounded-lg px-4 py-3 text-[#404944] transition-all hover:bg-[#e3e1ec]/40">
            <svg className="h-5 w-5 transition-colors group-hover:text-[#003527]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold">Bookings</span>
          </a>

          <a href="#" className="group flex items-center gap-3 rounded-lg px-4 py-3 text-[#404944] transition-all hover:bg-[#e3e1ec]/40">
            <BarChart3 className="h-5 w-5 transition-colors group-hover:text-[#003527]" />
            <span className="text-sm font-semibold">Analytics</span>
          </a>

          <a href="#" className="group flex items-center gap-3 rounded-lg px-4 py-3 text-[#404944] transition-all hover:bg-[#e3e1ec]/40">
            <MessageSquare className="h-5 w-5 transition-colors group-hover:text-[#003527]" />
            <span className="text-sm font-semibold">Messages</span>
          </a>
        </div>

        {/* User Identity and settings actions area */}
        <div className="mt-auto border-t border-[#bfc9c3]/30 pt-4 flex flex-col gap-2">
          <a href="#" className="group flex items-center gap-3 rounded-lg px-4 py-3 text-[#404944] transition-all hover:bg-[#e3e1ec]/40">
            <Settings className="h-5 w-5 transition-colors group-hover:text-[#003527]" />
            <span className="text-sm font-semibold">Settings</span>
          </a>
          <div className="mt-2 flex items-center gap-3 px-4 py-3">
            <div className="h-8 h-8 overflow-hidden rounded-full border border-[#bfc9c3]">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHeWzVVz--dSZ3y4pAHxwpT6GzcpeSpovUe7YazCTW-uuLMqgwodi76nWkwvJ4b657lYXElOLA6L_1m4AUEpPun0vdcDS1htn6YX7lYaGXk1XFjoM6EJS8gM19T3QvEK2VME61-wBYyI8b2k6RyGyAW0-e-bW4QhlyK4eRJKO2_d_iJbWZGS4lod1yOVg14Yx5rPHsTA73jXmE2YgeYuOWmnqs_lYoH04zSgktGeL-Qf3w-R8dTy7gzgf82AMJ3jsYyDBReGcaoKQV" 
                alt="Admin Profile user illustration headshot" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-[#1a1b22]">Admin User</span>
          </div>
        </div>
      </nav>

      {/* Primary Content Base Canvas Workspace Area wrapper */}
      <main className="flex-grow ml-0 p-6 md:p-16 md:ml-64 min-h-screen pb-24">
        
        {/* Back Link Nav Header Stack block */}
        <header className="mx-auto max-w-3xl mb-12">
          <div className="mb-4 flex items-center gap-2 text-[#404944]">
            <a href="#" className="transition-colors hover:text-[#003527]">
              <ArrowLeft className="h-4 w-4" />
            </a>
            <span className="text-xs font-bold uppercase tracking-wider">Back to Properties</span>
          </div>
          <h2 className="font-serif text-3xl font-normal text-[#003527] mb-2">Add New Property</h2>
          <p className="text-sm text-[#404944]">Provide the details to list a new estate on the platform.</p>
        </header>

        {/* Ambient Shadow Multi-step Wizard Shell Card Frame */}
        <div className="mx-auto max-w-3xl rounded-xl border border-[#eeedf7] bg-white p-6 shadow-[0_4px_24px_-4px_rgba(6,78,59,0.05),0_12px_48px_-12px_rgba(6,78,59,0.08)] md:p-10">
          
          {/* Top Wizard Steps Progression Line Segment Bar component */}
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

          {/* Wizard Structural Step Input Form Segment wrapper element */}
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-[#1a1b22] pb-2 border-b border-[#bfc9c3]/30 mb-6">
                Basic Information
              </h3>

              {/* Title Input Field element */}
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

              {/* Description Textarea element */}
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

              {/* Dual Layout Grid Row Controls area */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                
                {/* Location Entry Field context */}
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

                {/* Dropdown Options Picker context menu */}
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

            {/* Stepper Form Bottom Interaction Controls Section footer */}
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
      </main>

    </div>
  );
}