"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StationLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("http://localhost:3001/api/stationadmin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (res.ok) {
                    const data = await res.json();
                    // Persist station admin identity and station info
                    localStorage.setItem('station-auth', 'true');
                    localStorage.setItem('station-user', JSON.stringify(data));
                router.push('/station/dashboard');
            } else {
                const err = await res.json();
                setError(err.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Station Login</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full border px-3 py-2 rounded"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}