"use client";
// frontend/src/components/landing/FeaturesSection.tsx
import { Zap, BarChart, Bell, Map, Smartphone, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const FeatureCard = ({ icon, title, children, index }) => (
  <motion.div
    className="bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border/20 overflow-hidden"
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="p-8">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6 border-2 border-primary/20">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground text-base">
        {children}
      </p>
    </div>
  </motion.div>
);


const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-Time Tracking",
      description: "Monitor fuel levels and consumption across your entire fleet in real-time, ensuring you're always in control."
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Detailed Reports",
      description: "Generate insightful reports to identify savings, optimize routes, and reduce operational costs."
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Automated Alerts",
      description: "Receive automated alerts for low fuel, scheduled maintenance, and unusual activity to prevent downtime."
    },
    {
      icon: <Map className="h-8 w-8" />,
      title: "Route Optimization",
      description: "Find the most efficient routes to fueling stations, saving time and money on every trip."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Access",
      description: "Manage your fleet and drivers from anywhere with our fully-featured mobile application."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Secure Payments",
      description: "Handle all fuel-related transactions securely within the app, with detailed digital receipts."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-5xl font-extrabold mb-6 tracking-tight text-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features for Smart Fuel Management
        </motion.h2>
        <motion.p
          className="text-muted-foreground mb-16 text-xl max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          FuelOps provides a comprehensive suite of tools to optimize your fueling operations, reduce costs, and increase efficiency.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} index={index}>
              {feature.description}
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
