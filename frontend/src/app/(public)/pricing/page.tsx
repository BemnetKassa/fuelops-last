import React from "react";

export default function PricingPage() {
  return (
    <main className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Pricing</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Simple, transparent pricing for fleets and stations of all sizes. Choose the plan that fits your needs, or contact us for a custom solution.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Starter Plan */}
        <div className="border rounded-lg p-6 flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Starter</h2>
          <p className="text-3xl font-bold mb-4">$29<span className="text-base font-normal">/mo</span></p>
          <ul className="mb-6 text-muted-foreground list-disc pl-5">
            <li>Up to 5 vehicles</li>
            <li>Basic analytics</li>
            <li>Email support</li>
            <li>1 station admin</li>
          </ul>
          <button className="mt-auto bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">Get Started</button>
        </div>
        {/* Professional Plan */}
        <div className="border-2 border-primary rounded-lg p-6 flex flex-col shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Professional</h2>
          <p className="text-3xl font-bold mb-4">$79<span className="text-base font-normal">/mo</span></p>
          <ul className="mb-6 text-muted-foreground list-disc pl-5">
            <li>Up to 25 vehicles</li>
            <li>Advanced analytics</li>
            <li>Priority email & chat support</li>
            <li>Multiple station admins</li>
            <li>Custom reports</li>
          </ul>
          <button className="mt-auto bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">Start Free Trial</button>
        </div>
        {/* Enterprise Plan */}
        <div className="border rounded-lg p-6 flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Enterprise</h2>
          <p className="text-3xl font-bold mb-4">Custom</p>
          <ul className="mb-6 text-muted-foreground list-disc pl-5">
            <li>Unlimited vehicles</li>
            <li>Dedicated account manager</li>
            <li>24/7 premium support</li>
            <li>API access & integrations</li>
            <li>Custom onboarding</li>
          </ul>
          <button className="mt-auto bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">Contact Sales</button>
        </div>
      </div>
      <div className="text-center text-muted-foreground">
        <p>
          Not sure which plan is right for you? <a href="/contact" className="underline text-primary">Contact our team</a> for a personalized recommendation.
        </p>
      </div>
    </main>
  );
}