// frontend/src/components/landing/FeaturesSection.tsx
import { Zap, BarChart, Bell, Map, Smartphone, CreditCard } from 'lucide-react';

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border/20 overflow-hidden">
    <div className="p-8">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6 border-2 border-primary/20">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground text-base">
        {children}
      </p>
    </div>
  </div>
);


const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight text-foreground">Powerful Features for Smart Fuel Management</h2>
        <p className="text-muted-foreground mb-16 text-xl max-w-3xl mx-auto">
          FuelOps provides a comprehensive suite of tools to optimize your fueling operations, reduce costs, and increase efficiency.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          <FeatureCard icon={<Zap className="h-8 w-8" />} title="Real-Time Tracking">
            Monitor fuel levels and consumption across your entire fleet in real-time, ensuring you're always in control.
          </FeatureCard>
          <FeatureCard icon={<BarChart className="h-8 w-8" />} title="Detailed Reports">
            Generate insightful reports to identify savings, optimize routes, and reduce operational costs.
          </FeatureCard>
          <FeatureCard icon={<Bell className="h-8 w-8" />} title="Automated Alerts">
            Receive automated alerts for low fuel, scheduled maintenance, and unusual activity to prevent downtime.
          </FeatureCard>
          <FeatureCard icon={<Map className="h-8 w-8" />} title="Route Optimization">
            Find the most efficient routes to fueling stations, saving time and money on every trip.
          </FeatureCard>
          <FeatureCard icon={<Smartphone className="h-8 w-8" />} title="Mobile Access">
            Manage your fleet and drivers from anywhere with our fully-featured mobile application.
          </FeatureCard>
          <FeatureCard icon={<CreditCard className="h-8 w-8" />} title="Secure Payments">
            Handle all fuel-related transactions securely within the app, with detailed digital receipts.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
