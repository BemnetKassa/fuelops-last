export default function RoleFeatures() {
  const roles = [
    {
      title: "For Drivers",
      description: "Track fuel usage, find stations, and manage your daily fuel limits.",
      features: ["Live fuel status", "Vehicle tracking", "Usage history"],
      iconColor: "bg-blue-100",
    },
    {
      title: "For Stations",
      description: "Manage fuel levels, verify users, and enable availability tracking.",
      features: ["Inventory logs", "Transaction tagging", "Live status updates"],
      iconColor: "bg-yellow-100",
    },
    {
      title: "For Admins",
      description: "Monitor fuel flow, detect black market activity, and ensure fair access.",
      features: ["System-wide control", "Manual adjustments", "Usage reports"],
      iconColor: "bg-green-100",
    },
  ]

  return (
    <section id="features" className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose FuelOps?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {roles.map((role, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <div className={`w-12 h-12 rounded-full ${role.iconColor} flex items-center justify-center mb-4`}>
                <span className="text-xl font-bold text-gray-700">{role.title.charAt(4)}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
              <p className="text-gray-600 mb-3">{role.description}</p>
              <ul className="text-sm text-gray-500 list-disc list-inside">
                {role.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
