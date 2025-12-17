// frontend/src/components/landing/HeroSection.tsx
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="bg-brown-800 text-white">
      <div className="container mx-auto text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Efficient Fuel Management is Here</h1>
        <p className="text-xl mb-8">Track, manage, and optimize your fuel consumption with FuelOps.</p>
        <Link href="/register" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
          Get Started for Free
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
