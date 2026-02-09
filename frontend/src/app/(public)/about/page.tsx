import React from "react";
import { Target, Lightbulb, Shield, Users, History, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-muted/30">
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
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="flex justify-center">
            <Card className="max-w-xs w-full text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/images/bemnet.jpg" alt="Bemnet Kassa" />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">BK</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">Bemnet Kassa</CardTitle>
                <p className="text-sm font-medium text-primary">Founder & CEO</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visionary leader with a deep passion for logistics and technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}