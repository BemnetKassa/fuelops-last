import React from "react";

export default function AboutPage() {
  return (
    <main className="container mx-auto py-12 px-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">About FuelOps</h1>
      <section className="mb-8">
        <p className="text-lg text-muted-foreground mb-4">
          FuelOps is a cutting-edge fuel management platform designed to streamline operations for fleets and fuel stations. Our mission is to revolutionize the way fuel is reserved, managed, and consumed, providing a seamless experience for drivers and station operators alike.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-muted-foreground">
          To simplify and modernize the way fleets and fuel stations operate, making fuel management smarter, more efficient, and more transparent for everyone involved.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
        <ul className="list-disc pl-6 text-muted-foreground">
          <li>Innovation: We embrace new ideas and technologies.</li>
          <li>Reliability: Our platform is built for trust and uptime.</li>
          <li>Transparency: Clear data and honest communication.</li>
          <li>Customer Focus: We listen and adapt to our users’ needs.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
        <p className="text-muted-foreground">
          Founded in 2024 by Bemnet Kassa, FuelOps was born out of a passion for solving real-world problems in the transportation and logistics industry. With years of experience in fleet management and a deep understanding of the challenges faced by drivers and station operators, Bemnet set out to create a solution that would bring efficiency, transparency, and ease to fuel management. From humble beginnings, FuelOps has grown into a dynamic platform that serves a diverse range of users, from small fleet operators to large logistics companies. Our journey is just beginning, and we are excited to continue innovating and expanding our offerings to meet the evolving needs of our customers.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Meet the Team</h2>
        <ul className="text-muted-foreground">
          <li><span className="font-medium">Bemnet Kassa</span> – Founder &CEO</li>
          
        </ul>
      </section>
    </main>
  );
}