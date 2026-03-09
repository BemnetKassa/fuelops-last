
import React from "react";
import FeaturesSection from '@/components/landing/FeaturesSection';
import CTASection from '@/components/landing/CTASection';
import { ShieldCheck, Cloud, Lock, Star, Users } from "lucide-react";

export default function FeaturesPage() {
  return (
        <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-card/30">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-primary/10 to-background flex flex-col items-center justify-center">
                <div className="absolute inset-0 pointer-events-none select-none opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent drop-shadow-lg">
                        Discover the Power of FuelOps
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        Modern, secure, and intelligent fuel management for ambitious fleets. Experience the next level of control, savings, and reliability.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/register" className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-4 px-8 rounded-lg shadow-lg transition-all text-lg">Start Free Trial</a>
                        <a href="/contact" className="bg-background/80 border border-primary text-primary font-semibold py-4 px-8 rounded-lg hover:bg-primary/10 transition-all text-lg">Contact Sales</a>
                    </div>
                </div>
            </section>

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
                        <div className="flex flex-col items-center text-center p-8 bg-background rounded-2xl border shadow-lg hover:shadow-xl transition-shadow">
                            <div className="bg-primary/10 p-4 rounded-full mb-6">
                                <ShieldCheck className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Compliance Ready</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We adhere to industry standards for data privacy and operational security, keeping your fleet compliant.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-8 bg-background rounded-2xl border shadow-lg hover:shadow-xl transition-shadow">
                            <div className="bg-primary/10 p-4 rounded-full mb-6">
                                <Cloud className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">99.9% Uptime SLA</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Our cloud-native infrastructure is built for high availability, ensuring your operations never grind to a halt.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-8 bg-background rounded-2xl border shadow-lg hover:shadow-xl transition-shadow">
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

            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-br from-background via-card/40 to-primary/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">What Our Customers Say</h2>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">Trusted by leading fleets and fuel operators nationwide.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="bg-background border rounded-2xl p-8 shadow-lg flex flex-col items-center text-center">
                            <div className="flex items-center gap-2 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400" />)}
                            </div>
                            <p className="text-lg mb-4 italic">“FuelOps transformed our operations. The real-time tracking and reports are game changers!”</p>
                            <div className="flex items-center gap-3 mt-2">
                                <Users className="w-6 h-6 text-primary" />
                                <span className="font-semibold">Logistics Manager, FastFleet</span>
                            </div>
                        </div>
                        <div className="bg-background border rounded-2xl p-8 shadow-lg flex flex-col items-center text-center">
                            <div className="flex items-center gap-2 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400" />)}
                            </div>
                            <p className="text-lg mb-4 italic">“The mobile app lets me manage everything on the go. Highly recommended for any fleet!”</p>
                            <div className="flex items-center gap-3 mt-2">
                                <Users className="w-6 h-6 text-primary" />
                                <span className="font-semibold">Fleet Owner, CityFuel</span>
                            </div>
                        </div>
                        <div className="bg-background border rounded-2xl p-8 shadow-lg flex flex-col items-center text-center">
                            <div className="flex items-center gap-2 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400" />)}
                            </div>
                            <p className="text-lg mb-4 italic">“Security and compliance are top-notch. We trust FuelOps with our most sensitive data.”</p>
                            <div className="flex items-center gap-3 mt-2">
                                <Users className="w-6 h-6 text-primary" />
                                <span className="font-semibold">COO, National Haulage</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection />
        </div>
  );
}