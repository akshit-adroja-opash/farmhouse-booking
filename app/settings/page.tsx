'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera
} from 'lucide-react';

export default function SettingsPage() {
  const { data: session } = useSession() || {};
  const role = (session?.user as any)?.role || 'customer';

  // Toggle View/Edit modes
  const [isEditing, setIsEditing] = useState(false);

  // Profile data states
  const [name, setName] = useState(session?.user?.name || 'Arjun Mehta');
  const [email, setEmail] = useState(session?.user?.email || 'arjun@agristay.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('India');

  // Temporary buffer for edits
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhone, setEditPhone] = useState(phone);
  const [editLocation, setEditLocation] = useState(location);

  const handleEditClick = () => {
    setEditName(name);
    setEditEmail(email);
    setEditPhone(phone);
    setEditLocation(location);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setName(editName);
    setEmail(editEmail);
    setPhone(editPhone);
    setLocation(editLocation);
    setIsEditing(false);
    alert('Profile changes saved successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1a1b22] font-sans antialiased">
      <main className="max-w-[760px] mx-auto px-6 pt-32 pb-24">
        
        {/* Title */}
        <h1 className="font-serif text-3xl font-semibold text-[#003527] mb-8">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white border border-[#bfc9c3]/20 rounded-2xl p-8 shadow-sm shadow-[#064e3b]/3 mb-6">
          
          {/* Avatar Header info */}
          <div className="flex items-center gap-5 mb-8">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-[#00a877] text-white flex items-center justify-center font-bold text-3xl">
                {name.charAt(0).toUpperCase()}
              </div>
              <button 
                type="button"
                onClick={() => alert('Profile photo upload feature requires active file storage.')}
                className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 text-gray-500"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#1a1b22]">{name}</h2>
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold bg-[#e6f4ea] text-[#0f766e] border border-[#a7f3d0]/30 rounded-full lowercase">
                {role}
              </span>
              <p className="text-xs text-gray-400 font-semibold mt-1">
                Joined 2024-01-15
              </p>
            </div>
          </div>

          {/* View Mode or Edit Mode */}
          {!isEditing ? (
            <div className="space-y-6">
              
              {/* Email display */}
              <div className="flex items-center gap-4 bg-[#f4f6f8] rounded-xl px-5 py-3.5 border border-transparent">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-semibold text-[#1a1b22]">{email}</span>
              </div>

              {/* Phone display */}
              <div className="flex items-center gap-4 bg-[#f4f6f8] rounded-xl px-5 py-3.5 border border-transparent">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-semibold text-[#1a1b22]">{phone}</span>
              </div>

              {/* Location display */}
              <div className="flex items-center gap-4 bg-[#f4f6f8] rounded-xl px-5 py-3.5 border border-transparent">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-semibold text-[#1a1b22]">{location}</span>
              </div>

              <button
                onClick={handleEditClick}
                className="mt-2 px-6 py-2.5 rounded-xl border border-[#00a877] text-[#00a877] text-sm font-bold hover:bg-[#e6f4ea]/30 transition-colors"
              >
                Edit Profile
              </button>

            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-5">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative flex items-center bg-white rounded-xl border border-[#bfc9c3]/50 focus-within:border-[#00a877] transition-all">
                  <User className="absolute left-4 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-transparent text-sm font-semibold outline-none border-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative flex items-center bg-white rounded-xl border border-[#bfc9c3]/50 focus-within:border-[#00a877] transition-all">
                  <Mail className="absolute left-4 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-transparent text-sm font-semibold outline-none border-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Phone
                </label>
                <div className="relative flex items-center bg-white rounded-xl border border-[#bfc9c3]/50 focus-within:border-[#00a877] transition-all">
                  <Phone className="absolute left-4 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-transparent text-sm font-semibold outline-none border-none"
                  />
                </div>
              </div>

              {/* Save / Cancel actions */}
              <div className="flex items-center gap-4 pt-3">
                <button
                  type="submit"
                  className="bg-[#00a877] hover:bg-[#009669] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-[#00a877]/10 active:scale-[0.98] transition-all"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>

            </form>
          )}

        </div>

      </main>
    </div>
  );
}
