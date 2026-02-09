import React from "react";
import FeaturesSection from '@/components/landing/FeaturesSection';
import CTASection from '@/components/landing/CTASection';
import { ShieldCheck, Cloud, Lock } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
       {/* Main Features Grid from Landing */}
       <FeaturesSection />

       {/* Deep Dive / Security Section */}
       <section className="py-20 bg-muted/30 border-y border-border/50">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Enterprise-Grade Reliability</h2>
                <p className="text-lg text-muted-foreground">
                    Beyond features, we provide the infrastructure your fleet needs to scale securely and reliably.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-8 bg-background rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-primary/10 p-4 rounded-full mb-6">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">Compliance Ready</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        We adhere to industry standards for data privacy and operational security, keeping your fleet compliant.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center p-8 bg-background rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-primary/10 p-4 rounded-full mb-6">
                        <Cloud className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">99.9% Uptime SLA</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Our cloud-native infrastructure is built for high availability, ensuring your operations never grind to a halt.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center p-8 bg-background rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-primary/10 p-4 rounded-full mb-6">
                         <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">End-to-End Encryption</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Your transaction data and user information are encrypted in transit and at rest with bank-grade security.
                    </p>
                </div>
            </div>
         </div>
       </section>

       <CTASection />
    </div>
  );
}