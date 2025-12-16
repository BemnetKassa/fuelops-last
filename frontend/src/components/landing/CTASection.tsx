// frontend/src/components/landing/CTASection.tsx
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Fuel Costs?</h2>
        <p className="text-xl mb-8">Join FuelOps today and start optimizing your operations.</p>
        <Link href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign Up Now
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
