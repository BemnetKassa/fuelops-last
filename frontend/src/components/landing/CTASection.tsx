// frontend/src/components/landing/CTASection.tsx
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="bg-secondary text-primary-foreground">
      <div className="container mx-auto text-center py-20">
        <h2 className="text-4xl font-extrabold mb-4">
          Ready to Revolutionize Your Fuel Management?
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Join FuelOps today and unlock a world of efficiency, savings, and control over your fleet's fuel consumption.
        </p>
        <Link href="/register" className="bg-background text-foreground hover:bg-background/90 font-bold py-4 px-8 rounded-lg text-lg btn-grow">
            Start Your Free Trial
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
