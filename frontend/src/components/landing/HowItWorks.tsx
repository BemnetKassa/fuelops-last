import { Fuel, Map, Clock } from 'lucide-react';

const steps = [
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: '1. Find a Station',
    description: 'Use our interactive map to locate the nearest available fuel station and check their current stock levels in real-time.',
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: '2. Reserve Your Fuel',
    description: 'Secure your spot in the queue by reserving the amount of fuel you need. Your reservation is held for a limited time.',
  },
  {
    icon: <Fuel className="h-10 w-10 text-primary" />,
    title: '3. Fill Up & Go',
    description: 'Arrive at the station, get your fuel dispensed by the operator, and your transaction is automatically recorded. It\'s that simple.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-secondary-foreground">How It Works</h2>
        <p className="text-secondary-foreground/80 mb-12 text-lg">
          A simple, three-step process to get your fuel.
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-background mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-secondary-foreground">{step.title}</h3>
              <p className="text-secondary-foreground/80 max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
