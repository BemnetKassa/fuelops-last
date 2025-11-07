import { useState } from 'react'

export default function FuelRecordsPage() {
  const [records, setRecords] = useState([])
  const [form, setForm] = useState({ vehicle: '', liters: '', date: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddRecord = (e) => {
    e.preventDefault()
    const newRecord = { ...form, id: Date.now() }
    setRecords([newRecord, ...records])
    setForm({ vehicle: '', liters: '', date: '' })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fuel Records</h1>

      <form onSubmit={handleAddRecord} className="mb-6 space-y-4">
        <input
          name="vehicle"
          placeholder="Vehicle Name"
          value={form.vehicle}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="liters"
          type="number"
          placeholder="Liters"
          value={form.liters}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Record
        </button>
      </form>

      <ul className="space-y-2">
        {records.map((record) => (
          <li key={record.id} className="bg-white p-4 shadow rounded">
            {record.date} - {record.vehicle} - {record.liters}L
          </li>
        ))}
      </ul>
    </div>
  )
}