import React from "react";

const fuelPrices = [
  { type: "Petrol (Regular)", price: 3.25, unit: "per gallon" },
  { type: "Petrol (Premium)", price: 3.75, unit: "per gallon" },
  { type: "Diesel", price: 3.10, unit: "per gallon" },
  { type: "CNG", price: 2.50, unit: "per gallon" },
  { type: "LPG", price: 2.30, unit: "per gallon" },
];

export default function PricingPage() {
  return (
    <main className="container mx-auto py-12 px-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">Current Fuel Prices</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Stay up to date with the latest fuel prices at our stations. Prices are updated regularly to reflect market changes.
      </p>
      <table className="w-full border rounded-lg overflow-hidden mb-8">
        <thead className="bg-card">
          <tr>
            <th className="py-3 px-4 text-left">Fuel Type</th>
            <th className="py-3 px-4 text-left">Price (USD)</th>
            <th className="py-3 px-4 text-left">Unit</th>
          </tr>
        </thead>
        <tbody>
          {fuelPrices.map((fuel) => (
            <tr key={fuel.type} className="border-t">
              <td className="py-3 px-4">{fuel.type}</td>
              <td className="py-3 px-4 font-semibold">${fuel.price.toFixed(2)}</td>
              <td className="py-3 px-4">{fuel.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-muted-foreground text-sm">
        <p>For bulk or commercial rates, please <a href="/contact" className="underline text-primary">contact us</a>.</p>
        <p className="mt-2">Prices are subject to change based on market conditions.</p>
      </div>
    </main>
  );
}