// src/pages/owner/VehiclesPage.jsx
import { useState } from 'react'

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([])
  const [vehicleName, setVehicleName] = useState('')

  const handleAddVehicle = (e) => {
    e.preventDefault()
    if (!vehicleName) return
    setVehicles([{ name: vehicleName, id: Date.now() }, ...vehicles])
    setVehicleName('')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vehicles</h1>
      <form onSubmit={handleAddVehicle} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter vehicle name"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {vehicles.map((v) => (
          <li key={v.id} className="bg-white p-4 shadow rounded">
            {v.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
