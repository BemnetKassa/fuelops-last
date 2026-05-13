"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [carType, setCarType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    const userData = localStorage.getItem('fuelops-user');
    if (!userData) {
      router.push('/public/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setName(parsedUser.name);
    setEmail(parsedUser.email);
    setPhone(parsedUser.phone);
    setCarType(parsedUser.carType);
    setFuelType(parsedUser.fuelType);
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Only send changed fields
    const updates: any = {};
    if (name !== user.name) updates.name = name;
    if (email !== user.email) updates.email = email;
    if (phone !== user.phone) updates.phone = phone;
    if (carType !== user.carType) updates.carType = carType;
    if (fuelType !== user.fuelType) updates.fuelType = fuelType;

    if (Object.keys(updates).length === 0) {
      setError('No changes detected. Please update at least one field.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message || 'Profile updated successfully!');
        // Update local storage as well
        const updatedUser = { ...user, ...data };
        localStorage.setItem('fuelops-user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        setError(data.message || 'Failed to update profile.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 via-background to-sky-50 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Driver Profile</h1>
          <p className="text-sm text-muted-foreground">
            Keep your contact details up to date for smoother verification and dispatch.
          </p>
        </div>
      </div>

      <Card className="max-w-3xl">
        <form onSubmit={handleUpdate}>
          <CardHeader className="flex flex-col gap-1">
            <CardTitle>Personal Information</CardTitle>
            <p className="text-sm text-muted-foreground">
              {isEditing ? 'Edit your details and save changes.' : 'Review your account details.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && <div className="text-red-700 bg-red-100 p-3 rounded-md">{error}</div>}
            {success && <div className="text-green-700 bg-green-100 p-3 rounded-md">{success}</div>}

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={user.role} disabled />
              </div>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Vehicle Details</h3>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Car Type</Label>
                  <Input value={carType} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Fuel Type</Label>
                  <Input value={fuelType} disabled />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <div className="text-xs text-muted-foreground">
              Last updated info is stored locally after save.
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;

