import React from "react";

export default function ContactPage() {
  return (
    <main className="container mx-auto py-12 px-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Have questions, feedback, or need support? Reach out to our team and we’ll get back to you as soon as possible.
      </p>
      <section className="mb-10">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border rounded px-3 py-2"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
          >
            Send Message
          </button>
        </form>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
        <ul className="text-muted-foreground">
          <li>
            <span className="font-medium">Email:</span>{" "}
            <a href="mailto:support@fuelops.com" className="underline text-primary">support@fuelops.com</a>
          </li>
          <li>
            <span className="font-medium">Phone:</span> +1 (555) 123-4567
          </li>
          <li>
            <span className="font-medium">Address:</span> 123 Fleet Avenue, Suite 100, Cityville, USA
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Location</h2>
        <div className="w-full h-64 bg-muted flex items-center justify-center rounded">
          {/* Replace with an actual map embed if desired */}
          <span className="text-muted-foreground">[Map Placeholder]</span>
        </div>
      </section>
    </main>
  );
}