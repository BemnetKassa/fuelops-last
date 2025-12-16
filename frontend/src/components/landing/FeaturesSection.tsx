// frontend/src/components/landing/FeaturesSection.tsx
const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose FuelOps?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
            <p>Monitor fuel levels and consumption across your entire fleet in real-time.</p>
          </div>
          <div className="p-8 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Detailed Reports</h3>
            <p>Generate insightful reports to identify savings and reduce operational costs.</p>
          </div>
          <div className="p-8 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Automated Alerts</h3>
            <p>Receive automated alerts for low fuel, maintenance, and unusual activity.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
