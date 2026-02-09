import React from "react";

export default function ContactPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-muted-foreground">
        Have questions or feedback? Reach out to our team at <a href="mailto:support@fuelops.com" className="underline">support@fuelops.com</a>.
      </p>
    </main>
  );
}