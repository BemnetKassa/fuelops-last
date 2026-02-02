"use client";

import { useState, useEffect } from 'react';
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
  
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('fuelops-user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setName(parsedUser.name);
      setEmail(parsedUser.email);
      setPhone(parsedUser.phone);
      setCarType(parsedUser.carType);
    }
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
    <Card className="max-w-2xl">
      <form onSubmit={handleUpdate}>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="text-red-500 bg-red-100 p-3 rounded-md">{error}</div>}
          {success && <div className="text-green-500 bg-green-100 p-3 rounded-md">{success}</div>}
          
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
           <div className="space-y-2">
            <Label>carType</Label>
            <Input value={carType} disabled />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </CardFooter>
        </form>
      </Card>
  );
};

export default ProfilePage;

