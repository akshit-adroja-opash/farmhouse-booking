'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface AuthFormProps {
  initialMode: 'signin' | 'signup';
}

const Logo = () => (
  <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16">
    <rect width="100" height="100" rx="22" fill="#003527" />
    <path d="M50 25L23 48H33V75H45V60H55V75H67V48H77L50 25Z" fill="#ffffff" />
    <circle cx="50" cy="38" r="4.5" fill="#95d3ba" />
  </svg>
);

export default function AuthForm({ initialMode }: AuthFormProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const router = useRouter();

  // Input states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: loginEmail,
        password: loginPassword,
        redirect: false
      });
      if (result?.ok) {
        if (loginEmail.toLowerCase() === 'admin@gmail.com') {
          router.push('/admin/dashboard');
        } else {
          router.push('/farms');
        }
        router.refresh();
      } else {
        alert(result?.error || 'Invalid credentials!');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword }),
      });

      if (res.ok) {
        alert('Registration successful! Please log in.');
        setMode('signin');
        router.push('/login');
      } else {
        const data = await res.json();
        alert(data.error || 'Registration error.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    if (newMode === 'signin') {
      router.push('/login', { scroll: false });
    } else {
      router.push('/register', { scroll: false });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fbf8ff] text-[#1a1b22] font-sans antialiased">
      {/* Left Side: Visual Showcase Panel */}
      <section className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-105" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&w=1200&q=80')" }}
        >
          <div className="absolute inset-0 bg-[#003527]/20 backdrop-brightness-75"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-end p-16 w-full text-white">
          <div className="max-w-md space-y-4">
            <h1 className="font-serif text-5xl leading-tight">Experience the art of slow living.</h1>
            <div className="h-1 w-12 bg-white"></div>
            <p className="text-lg opacity-90">Discover curated estate stays that redefine rural sophistication.</p>
          </div>
        </div>
        
        {/* Floating Decoration Tag */}
        <div className="absolute top-12 left-12 z-10">
          <div className="flex items-center gap-2 text-white/80 uppercase tracking-widest text-xs font-semibold">
            <ShieldCheck className="h-5 w-5 text-[#95d3ba]" />
            <span>Verified Estates Only</span>
          </div>
        </div>
      </section>

      <section className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 md:p-16 overflow-y-auto">
        <div className="w-full max-w-[440px] space-y-8 py-10">
          
          {/* Branding Logo Block */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Logo />
            <div className="space-y-1">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#003527]">EstateStay</h2>
              <p className="text-sm text-[#404944]">Welcome back to your rural sanctuary.</p>
            </div>
          </div>

          {/* Form Tabbed Card Container */}
          <div className="bg-[#fbf8ff] rounded-xl border border-gray-100 p-6 md:p-8 space-y-8 shadow-[0_4px_20px_rgba(0,53,39,0.02)]">
            
            {/* Toggle Tabs Control */}
            <div className="flex border-b border-gray-200">
              <button 
                type="button"
                className={`flex-1 pb-4 text-sm font-semibold border-b-2 transition-all ${
                  mode === 'signin' 
                    ? 'text-[#003527] border-[#003527]' 
                    : 'text-[#404944] border-transparent hover:text-[#003527]'
                }`}
                onClick={() => handleTabChange('signin')}
              >
                Sign In
              </button>
              <button 
                type="button"
                className={`flex-1 pb-4 text-sm font-semibold border-b-2 transition-all ${
                  mode === 'signup' 
                    ? 'text-[#003527] border-[#003527]' 
                    : 'text-[#404944] border-transparent hover:text-[#003527]'
                }`}
                onClick={() => handleTabChange('signup')}
              >
                Create Account
              </button>
            </div>

            {/* Dynamic Render Sign In Form */}
            {mode === 'signin' && (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#404944]" htmlFor="login-email">
                      Email Address
                    </label>
                    <input 
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-[#003527] focus:ring-1 focus:ring-[#003527] bg-white text-sm outline-none transition-all"
                      id="login-email" 
                      placeholder="name@example.com" 
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#404944]" htmlFor="login-pass">
                        Password
                      </label>
                      <a href="#" className="text-xs text-[#003527] font-semibold hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                    <input 
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-[#003527] focus:ring-1 focus:ring-[#003527] bg-white text-sm outline-none transition-all"
                      id="login-pass" 
                      placeholder="••••••••" 
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 bg-[#003527] hover:bg-[#064e3b] text-white rounded-lg text-sm font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm disabled:opacity-75"
                >
                  <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            )}

            {/* Dynamic Render Sign Up Form */}
            {mode === 'signup' && (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#404944]" htmlFor="reg-name">
                      Full Name
                    </label>
                    <input 
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-[#003527] focus:ring-1 focus:ring-[#003527] bg-white text-sm outline-none transition-all"
                      id="reg-name" 
                      placeholder="Julianne Smith" 
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#404944]" htmlFor="reg-email">
                      Email Address
                    </label>
                    <input 
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-[#003527] focus:ring-1 focus:ring-[#003527] bg-white text-sm outline-none transition-all"
                      id="reg-email" 
                      placeholder="name@example.com" 
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#404944]" htmlFor="reg-pass">
                      Create Password
                    </label>
                    <input 
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-[#003527] focus:ring-1 focus:ring-[#003527] bg-white text-sm outline-none transition-all"
                      id="reg-pass" 
                      placeholder="At least 8 characters" 
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 bg-[#003527] hover:bg-[#064e3b] text-white rounded-lg text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-75"
                >
                  {loading ? 'Creating Account...' : 'Create My Account'}
                </button>
              </form>
            )}

          </div>

          {/* Footer Terms & Conditions */}
          <p className="text-center text-xs text-[#404944] opacity-70">
            © 2026 EstateStay. Rural Sophistication Defined.<br/>
            By continuing, you agree to our Terms and Privacy Policy.
          </p>

        </div>
      </section>
    </div>
  );
}
