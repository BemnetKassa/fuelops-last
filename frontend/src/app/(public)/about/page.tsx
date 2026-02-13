"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Lightbulb, Shield, Users, History, Linkedin, Twitter, Github, Quote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-chart-4/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Driving the Future of <span className="text-primary">Fuel Management</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            FuelOps connects fleets, drivers, and stations in one seamless ecosystem. We bring transparency, efficiency, and intelligence to every gallon.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-primary/10 rounded-xl">
                 <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To simplify and modernize the way fleets and fuel stations operate, making fuel management smarter, more efficient, and more transparent for everyone involved. We believe in getting drivers back on the road faster and giving managers the data they need instantly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
             <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
             <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/10 transition-colors duration-500"></div>
                
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 relative z-10">
                  <div className="bg-background p-2 rounded-lg shadow-sm border">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  Why it matters
                </h3>
                
                <div className="space-y-4 relative z-10 text-muted-foreground">
                  <p>
                    Fuel operations have lagged behind in the digital transformation. Inefficiencies cost time and money.
                  </p>
                  <div className="h-px bg-gradient-to-r from-border to-transparent w-full"></div>
                  <p className="font-medium text-foreground/80">
                    We are bridging that gap with robust, user-first technology that solves real-world logistical headaches.
                  </p>
                </div>
            </div>
          </motion.div>
        </section>

        {/* Values */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">The principles that guide every feature we build.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Lightbulb,
                title: "Innovation",
                desc: "We constantly seek better ways to solve old problems.",
              },
              {
                icon: Shield,
                title: "Reliability",
                desc: "Our platform is the backbone of your operations. We take that seriously.",
              },
              {
                icon: Users,
                title: "Transparency",
                desc: "Clear data, honest pricing, and open communication.",
              },
              {
                icon: Target,
                title: "Customer Focus",
                desc: "We build what you need, listening to feedback every step of the way.",
              },
            ].map((item, index) => (
              <Card key={index} className="border-none shadow-md bg-card/60 hover:bg-card transition-colors">
                <CardHeader>
                  <item.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-muted/30 rounded-3xl p-8 md:p-12 relative overflow-hidden mb-12 md:mb-0"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
            <div className="md:w-1/3 text-center md:text-left sticky top-24">
              <div className="w-full md:w-1/3 text-center md:text-left md:sticky md:top-24 mb-8 md:mb-0">
                <div className="flex flex-row items-center justify-center md:block mb-6 gap-3">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-background p-6 rounded-2xl shadow-sm cursor-pointer"
                  >
                    <History className="h-12 w-12 text-primary" />
                  </motion.div>
                  <h2 className="text-2xl font-bold tracking-tight md:text-4xl">Our Journey</h2>
                </div>
                <div className="h-1.5 w-24 bg-primary rounded-full mx-auto md:mx-0"></div>
            </div>
            
            <div className="md:w-2/3 space-y-8 relative border-l-2 border-primary/20 pl-8 md:pl-12 py-2">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                 <div className="absolute -left-[41px] md:-left-[57px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-sm"></div>
                 <h3 className="text-xl font-semibold mb-2 text-foreground">Inception</h3>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in 2024 by <strong>Bemnet Kassa</strong>, FuelOps was born out of a passion for solving real-world problems in the transportation and logistics industry.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                 <div className="absolute -left-[41px] md:-left-[57px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-sm"></div>
                 <h3 className="text-xl font-semibold mb-2 text-foreground">The Problem</h3>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                  With years of experience in fleet management, we identified a critical gap: the disconnect between drivers, stations, and managers. Bemnet set out to build the bridge.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="absolute -left-[41px] md:-left-[57px] top-8 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-sm"></div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Growth</h3>
                <p className="font-medium text-muted-foreground italic mb-2">
                  "From humble beginnings to a dynamic platform."
                </p>
                <p className="text-muted-foreground">
                  Today, FuelOps serves a diverse range of users, from small fleet operators to large logistics companies, bringing efficiency and transparency to every transaction.
                </p>
              </motion.div>
            </div>
          </div>
          </div>
        </motion.section>

        {/* Team */}
        <section className="max-w-4xl mx-auto pb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Meet the Visionary</h2>
            
            <div className="group relative overflow-hidden rounded-3xl bg-card border shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-32 h-32 rotate-180 text-primary" />
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 relative z-10">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <Avatar className="w-40 h-40 md:w-56 md:h-56 border-4 border-background shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500">
                      <AvatarImage src="/images/Bemnet.png" alt="Bemnet Kassa" className="object-cover" />
                      <AvatarFallback className="text-4xl font-bold bg-muted text-muted-foreground">BK</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-background p-2 rounded-full shadow-lg border">
                      <Linkedin className="w-5 h-5 text-[#0077b5]" />
                    </div>
                  </div>
                </div>

                <div className="text-center md:text-left space-y-4 flex-1">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">Bemnet Kassa</h3>
                    <p className="text-primary font-medium text-lg">Founder & CEO</p>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    "I built FuelOps to bridge the gap between technology and logistics. We're not just tracking fuel; we're empowering the people who move our world to do it more efficiently."
                  </p>

                  <div className="pt-4 flex items-center justify-center md:justify-start gap-4">
                    <div className="flex gap-3">
                         {/* Social placeholders - can be real links later */}
                        <div className="h-2 w-2 rounded-full bg-primary/40"></div>
                        <div className="h-2 w-2 rounded-full bg-primary/40"></div>
                        <div className="h-2 w-2 rounded-full bg-primary/40"></div>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Engineering • Strategy • Innovation</p>
                  </div>
                </div>
              </div>
              
              {/* Bottom gradient bar */}
              <div className="h-2 w-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}