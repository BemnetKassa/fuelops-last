"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Lightbulb, Shield, Users, History, Linkedin, Twitter, Github } from "lucide-react";
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
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To simplify and modernize the way fleets and fuel stations operate, making fuel management smarter, more efficient, and more transparent for everyone involved. We believe in getting drivers back on the road faster and giving managers the data they need instantly.
            </p>
          </div>
          <div className="bg-card rounded-xl p-8 shadow-sm border">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Why it matters
            </h3>
            <p className="text-muted-foreground mb-4">
              Fuel operations have lagged behind in the digital transformation. Inefficiencies cost time and money.
            </p>
            <p className="text-muted-foreground">
              We are bridging that gap with robust, user-first technology that solves real-world logistical headaches.
            </p>
          </div>
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
        <section className="bg-muted/30 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <div className="bg-background p-4 rounded-xl inline-block shadow-sm">
                 <History className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mt-6 mb-4">Our Story</h2>
            </div>
            <div className="md:w-2/3 space-y-4 text-lg text-muted-foreground">
              <p>
                Founded in 2024 by <strong>Bemnet Kassa</strong>, FuelOps was born out of a passion for solving real-world problems in the transportation and logistics industry.
              </p>
              <p>
                 With years of experience in fleet management and a deep understanding of the challenges faced by drivers and station operators, Bemnet set out to create a solution that would bring efficiency, transparency, and ease to fuel management.
              </p>
              <p>
                From humble beginnings, FuelOps has grown into a dynamic platform that serves a diverse range of users, from small fleet operators to large logistics companies.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Meet the Visionary</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Driven by a passion for technology and logistics.
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="max-w-md w-full text-center hover:shadow-2xl transition-all duration-300 border-primary/20 bg-gradient-to-b from-card to-muted/20 overflow-hidden">
                <div className="h-24 bg-primary/10 w-full mb-[-48px]"></div>
                <CardHeader className="relative pt-0">
                  <div className="relative w-32 h-32 mx-auto mb-4 p-1 rounded-full bg-background shadow-lg">
                    <Avatar className="w-full h-full">
                      <AvatarImage src="/images/Bemnet.png" alt="Bemnet Kassa" className="object-cover" />
                      <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">BK</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-2xl font-bold">Bemnet Kassa</CardTitle>
                  <p className="text-primary font-medium tracking-wide">Founder & CEO</p>
                </CardHeader>
                <CardContent className="space-y-6 pb-8">
                  <p className="text-muted-foreground leading-relaxed px-4">
                    A visionary software engineer dedicated to solving real-world challenges in transportation. Bemnet founded FuelOps to bridge the gap between complex logistics and simple, efficient management.
                  </p>
                  
                  <div className="flex justify-center gap-4">
                    <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 transition-colors">
                      <Github className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}