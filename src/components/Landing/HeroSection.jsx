export default function HeroSection() {
  return (
    <section className="bg-blue-600 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Smart Fuel Management for Everyone
          </h1>
          <p className="mb-6 text-lg">
            End fuel shortages and black market sales with real-time tracking, fair distribution, and transparent monitoring.
          </p>
          <div className="flex gap-4">
            <a
              href="/register"
              className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Start Managing Fuel
            </a>
            <a
              href="#features"
              className="border border-white px-6 py-2 rounded hover:bg-white hover:text-blue-600 transition"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="/assets/fuelops-station.png" // Replace with actual path
            alt="Fuel Station"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
