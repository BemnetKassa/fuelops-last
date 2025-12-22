"use client";
import { Fuel, Map, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Map className="h-12 w-12 text-primary" />,
    title: '1. Find a Station',
    description: 'Use our interactive map to locate the nearest available fuel station and check their current stock levels in real-time.',
  },
  {
    icon: <Clock className="h-12 w-12 text-primary" />,
    title: '2. Reserve Your Fuel',
    description: 'Secure your spot in the queue by reserving the amount of fuel you need. Your reservation is held for a limited time.',
  },
  {
    icon: <Fuel className="h-12 w-12 text-primary" />,
    title: '3. Fill Up & Go',
    description: 'Arrive at the station, get your fuel dispensed by the operator, and your transaction is automatically recorded. It\'s that simple.',
  },
];

const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const HowItWorks = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-5xl font-extrabold mb-6 tracking-tight text-secondary-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-secondary-foreground/80 mb-16 text-xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          A simple, three-step process to get your fuel, hassle-free.
        </motion.p>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex flex-col items-center bg-background p-8 rounded-2xl shadow-lg border border-border/20"
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-6 border-4 border-primary/20">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-secondary-foreground">{step.title}</h3>
                <p className="text-secondary-foreground/80 max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
