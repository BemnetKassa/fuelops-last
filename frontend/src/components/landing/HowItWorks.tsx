"use client";
import { Fuel, Map, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const steps = [
  {
    icon: <Map className="h-12 w-12 text-primary" />,
    title: '1. Find a Station',
    description: 'Use our interactive map to locate the nearest available fuel station and check their current stock levels in real-time.',
    background: '/images/howItWorks.jpg', // Add your image path here
  },
  {
    icon: <Clock className="h-12 w-12 text-primary" />,
    title: '2. Reserve Your Fuel',
    description: 'Secure your spot in the queue by reserving the amount of fuel you need. Your reservation is held for a limited time.',
    background: '/images/darkFuelStation.jpg', // Add your image path here
  },
  {
    icon: <Fuel className="h-12 w-12 text-primary" />,
    title: '3. Fill Up & Go',
    description: 'Arrive at the station, get your fuel dispensed by the operator, and your transaction is automatically recorded. It\'s that simple.',
    background: '/images/refueling.jpg', // Add your image path here
  },
];

const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const HowItWorks = () => {
  const [current, setCurrent] = useState(0);
  const stepCount = steps.length;

  const handlePrev = () => setCurrent((prev) => (prev === 0 ? stepCount - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev === stepCount - 1 ? 0 : prev + 1));

  return (
    <section
      className="py-24 bg-secondary relative"
      style={{
        backgroundImage: `url(${steps[current].background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.5s ease',
      }}
    >
      <div className="absolute inset-0 bg-secondary/80 pointer-events-none" />
      <div className="container mx-auto text-center relative z-10">
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
        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={steps[current].title}
              className="flex flex-col items-center bg-background p-12 rounded-3xl shadow-2xl border-2 border-border/30"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-6 border-4 border-primary/20">
                {steps[current].icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-secondary-foreground">{steps[current].title}</h3>
              <p className="text-secondary-foreground/80 max-w-xs mx-auto">{steps[current].description}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition"
              aria-label="Previous step"
            >
              &larr; Prev
            </button>
            <div className="flex gap-2">
              {steps.map((_, idx) => (
                <span
                  key={idx}
                  className={`inline-block w-3 h-3 rounded-full ${current === idx ? 'bg-primary' : 'bg-border'}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition"
              aria-label="Next step"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
