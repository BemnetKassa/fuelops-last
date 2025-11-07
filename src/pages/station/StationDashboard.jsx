import { useState } from 'react'

export default function StationDashboard() {
  const [stock, setStock] = useState({
    petrol: 1200,
    diesel: 800
  })

  const [logs, setLogs] = useState([
    { id: 1, type: 'refill', fuel: 'Petrol', amount: 500, time: '10:00 AM' },
    { id: 2, type: 'sale', fuel: 'Diesel', amount: 60, time: '10:45 AM' },
    { id: 3, type: 'sale', fuel: 'Petrol', amount: 30, time: '11:10 AM' },
  ])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Station Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700">Fuel Stock</h2>
          <ul className="mt-4 space-y-2">
            <li>🚗 Petrol: <span className="font-bold text-blue-600">{stock.petrol} L</span></li>
            <li>🚛 Diesel: <span className="font-bold text-yellow-600">{stock.diesel} L</span></li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700">Quick Refill (Manual)</h2>
          <button
            onClick={() => setStock(prev => ({ ...prev, petrol: prev.petrol + 500 }))}
            className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            + Add 500L Petrol
          </button>
          <button
            onClick={() => setStock(prev => ({ ...prev, diesel: prev.diesel + 300 }))}
            className="mt-2 w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
          >
            + Add 300L Diesel
          </button>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity Logs</h2>
      <div className="bg-white p-4 rounded shadow">
        <ul className="divide-y divide-gray-200">
          {logs.map(log => (
            <li key={log.id} className="py-2 flex justify-between text-sm">
              <span>{log.type === 'refill' ? '🔄' : '🛒'} {log.type} - {log.fuel}</span>
              <span>{log.amount} L</span>
              <span>{log.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
