export default function CTASection() {
  return (
    <section className="bg-blue-600 text-white py-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Fuel Management?</h2>
        <p className="mb-6 text-lg">
          Join thousands of drivers, stations, and administrators already using FuelOps.
        </p>
        <a
          href="/register"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Get Started Today
        </a>
      </div>
    </section>
  )
}
