import React from "react";

export default function FeaturesPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Features</h1>
      <ul className="list-disc pl-6 text-muted-foreground">
        <li>Real-time fuel reservation</li>
        <li>Driver and station management</li>
        <li>Analytics dashboard</li>
        <li>Secure authentication</li>
      </ul>
    </main>
  );
}