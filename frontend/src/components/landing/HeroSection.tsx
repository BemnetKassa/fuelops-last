// frontend/src/components/landing/HeroSection.tsx
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center text-white" style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto text-center py-40">
        <h1 className="text-6xl font-extrabold mb-4 leading-tight">
          Powering Your Fleet,
          <br />
          One Drop at a Time.
        </h1>
        <p className="text-2xl mb-10 font-light">
          The ultimate platform for seamless fuel tracking and management.
        </p>
        <Link href="/register" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
            Join the Revolution
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
