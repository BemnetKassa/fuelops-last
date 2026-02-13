"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoginForm = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('http://localhost:3001/api/driver/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Login successful:', data);
        // Save JWT token and user data to localStorage
        if (data.token) {
          localStorage.setItem('fuelops-token', data.token);
        }
        localStorage.setItem('fuelops-user', JSON.stringify(data.user || data));
        // Redirect to driver dashboard
        router.push('/driver/dashboard');
      } else {
        const errorData = await res.json();
        console.error('Login failed:', errorData.message);
        setError(errorData.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Card className="shadow-lg border-border/60">
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardHeader className="space-y-1 mb-4">
          <CardTitle className="text-xl">Driver login</CardTitle>
          <CardDescription>Access your reservations, history, and notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full btn-grow">
            Sign in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
