export default function HowItWorks() {
  const steps = [
    { title: "Register", desc: "Sign up with your vehicle details and choose your role." },
    { title: "Track", desc: "Monitor fuel usage and limits through your dashboard." },
    { title: "Find", desc: "Locate nearby stations with real-time fuel availability." },
    { title: "Refuel", desc: "Fill up your tank with confidence using FuelOps." },
  ]

  return (
    <section className="bg-white py-16 px-4 border-t">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">How FuelOps Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-left md:text-center">
              <div className="text-blue-600 text-3xl font-bold mb-2">{i + 1}</div>
              <h4 className="text-lg font-semibold">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
