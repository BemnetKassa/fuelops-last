"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [drivingLicenseId, setDrivingLicenseId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const role = 'DRIVER'; // Set role to driver for public registration
    try {
      const res = await fetch('http://localhost:3001/api/driver/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone, role, licensePlate, drivingLicenseId }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Registration successful:', data);
        // Save user data to localStorage
        localStorage.setItem('fuelops-user', JSON.stringify(data));
        // Redirect to driver dashboard
        router.push('/driver/dashboard');
      } else {
        const errorData = await res.json();
        console.error('Registration failed:', errorData.message);
        setError(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Card className="shadow-lg border-border/60">
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Driver registration</CardTitle>
          <CardDescription>Create your FuelOps driver account in a few steps.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
              {error}
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
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
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="licensePlate">License plate</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                type="text"
                required
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="drivingLicenseId">Driving license ID</Label>
              <Input
                id="drivingLicenseId"
                name="drivingLicenseId"
                type="text"
                required
                value={drivingLicenseId}
                onChange={(e) => setDrivingLicenseId(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full btn-grow">
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
