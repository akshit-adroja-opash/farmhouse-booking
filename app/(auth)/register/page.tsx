'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert('Registration successful! Please log in.');
      router.push('/login');
    } else {
      alert('Registration error.');
    }
  };

  return (
    <div className="flex max-w-md mx-auto my-20 p-6 border rounded-lg bg-white shadow-md flex-col">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Register</button>
      </form>
    </div>
  );
}