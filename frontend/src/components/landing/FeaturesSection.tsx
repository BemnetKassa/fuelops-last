// frontend/src/components/landing/FeaturesSection.tsx
import { Zap, BarChart, Bell, Map, Smartphone, CreditCard } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Powerful Features for Smart Fuel Management</h2>
        <p className="text-muted-foreground mb-12 text-lg">
          FuelOps provides a comprehensive suite of tools to optimize your fueling operations, reduce costs, and increase efficiency.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <div className="p-8 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
            <p className="text-muted-foreground">
              Monitor fuel levels and consumption across your entire fleet in real-time, ensuring you're always in control.
            </p>
          </div>
          <div className="p-8 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
              <BarChart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Detailed Reports</h3>
            <p className="text-muted-foreground">
              Generate insightful reports to identify savings, optimize routes, and reduce operational costs.
            </p>
          </div>
          <div className="p-8 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
              <Bell className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Automated Alerts</h3>
            <p className="text-muted-foreground">
              Receive automated alerts for low fuel, scheduled maintenance, and unusual activity to prevent downtime.
            </p>
          </div>
          <div className="p-8 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
              <Map className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Route Optimization</h3>
            <p className="text-muted-foreground">
              Find the most efficient routes to fueling stations, saving time and money on every trip.
            </p>
          </div>
          <div className="p-8 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
              <Smartphone className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Mobile Access</h3>
            <p className="text-muted-foreground">
              Manage your fleet and drivers from anywhere with our fully-featured mobile application.
            </p>
          </div>
          <div className="p-8 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-muted-foreground">
              Handle all fuel-related transactions securely within the app, with detailed digital receipts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
