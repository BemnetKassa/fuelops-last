import React from "react";
import { Droplet, Flame, TrendingUp, TrendingDown, Minus, Fuel, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

// Enhanced data with icons and trend info
const fuelPrices = [
  { type: "Petrol (Regular)", price: 3.25, unit: "Gallon", trend: 'up', icon: Droplet, color: "text-orange-500", diff: "+0.05" },
  { type: "Petrol (Premium)", price: 3.75, unit: "Gallon", trend: 'stable', icon: Droplet, color: "text-red-500", diff: "0.00" },
  { type: "Diesel", price: 3.10, unit: "Gallon", trend: 'down', icon: Fuel, color: "text-blue-500", diff: "-0.02" },
  { type: "CNG", price: 2.50, unit: "GGE", trend: 'up', icon: Flame, color: "text-green-500", diff: "+0.10" },
  { type: "LPG", price: 2.30, unit: "Gallon", trend: 'stable', icon: Flame, color: "text-amber-500", diff: "0.00" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-muted/20 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Current Fuel Prices</h1>
          <p className="text-lg text-muted-foreground">
             Live pricing from our network. Updated daily at 08:00 AM.
          </p>
        </div>

        <Card className="shadow-lg border-muted mb-12 overflow-hidden">
          <CardHeader className="bg-card border-b">
            <div className="flex justify-between items-center">
                <div>
                     <CardTitle>Daily Rates</CardTitle>
                     <CardDescription>Prices across all station locations.</CardDescription>
                </div>
                <Badge variant="outline" className="px-3 py-1 text-sm">
                    Today: {new Date().toLocaleDateString()}
                </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
             <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-semibold">
                        <tr>
                            <th className="py-4 px-6 text-left">Fuel Type</th>
                            <th className="py-4 px-6 text-right">Price</th>
                            <th className="py-4 px-6 text-left">Unit</th>
                            <th className="py-4 px-6 text-left">24h Trend</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {fuelPrices.map((fuel, index) => (
                            <tr key={index} className="hover:bg-muted/30 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-background border shadow-sm ${fuel.color}`}>
                                            <fuel.icon className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium">{fuel.type}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <span className="text-lg font-bold">${fuel.price.toFixed(2)}</span>
                                </td>
                                <td className="py-4 px-6 text-sm text-muted-foreground">
                                    / {fuel.unit}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        {fuel.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500" />}
                                        {fuel.trend === 'down' && <TrendingDown className="h-4 w-4 text-green-500" />}
                                        {fuel.trend === 'stable' && <Minus className="h-4 w-4 text-muted-foreground" />}
                                        
                                        <span className={`text-sm font-medium ${
                                            fuel.trend === 'up' ? 'text-red-500' : 
                                            fuel.trend === 'down' ? 'text-green-500' : 'text-muted-foreground'
                                        }`}>
                                            {fuel.diff}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          </CardContent>
        </Card>

        {/* Commercial Section */}
        <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-900 text-slate-50 border-none">
                <CardHeader>
                    <CardTitle className="text-xl">Commercial Fleet?</CardTitle>
                    <CardDescription className="text-slate-300">
                        Get access to volume discounts and detailed capabilities like automated invoicing and fraud detection.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/contact">
                      <Button variant="secondary" className="w-full">
                        Contact Sales <ArrowRight className="ml-2 h-4 w-4"/>
                      </Button>
                    </Link>
                </CardContent>
            </Card>

             <Card className="border-dashed border-2">
                <CardHeader>
                    <CardTitle className="text-xl">Become a Partner Station</CardTitle>
                     <CardDescription>
                        Join the FuelOps network to increase visibility and manage your station pricing dynamically.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Button functionality can be added later */}
                   <Button variant="outline" className="w-full">Learn More</Button>
                </CardContent>
            </Card>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            * Prices are subject to change without prior notice. Taxes may apply.
          </p>
        </div>
      </div>
    </div>
  );
}