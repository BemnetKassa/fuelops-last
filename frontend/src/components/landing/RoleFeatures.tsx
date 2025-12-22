import { User, Building, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const roles = [
  {
    icon: <User className="h-8 w-8 text-primary" />,
    title: 'For the Driver',
    description: 'The end-user who needs fuel. A streamlined experience to find, reserve, and track fuel consumption.',
    features: [
      'View daily fuel quota',
      'Find stations on a live map',
      'Reserve fuel within limits',
      'View transaction history',
    ],
  },
  {
    icon: <Building className="h-8 w-8 text-primary" />,
    title: 'For the Station Operator',
    description: 'The staff on the ground, managing the flow of fuel and keeping operations smooth.',
    features: [
      'Manage incoming reservations',
      'Confirm fuel dispensing',
      'Update station fuel stock',
      'View station-specific reports',
    ],
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'For the Administrator',
    description: 'The system controller with a birds-eye view of the entire fuel distribution network.',
    features: [
      'Oversee all stations and users',
      'Generate system-wide analytics',
      'Manage user roles and access',
      'Monitor for suspicious activity',
    ],
  },
];

const RoleFeatures = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">A Platform for Everyone</h2>
        <p className="text-muted-foreground mb-12 text-lg max-w-3xl mx-auto">
          FuelOps is designed with dedicated tools and dashboards for every role in the fuel management ecosystem.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {roles.map((role) => (
            <Card key={role.title} className="flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center space-x-4">
                  {role.icon}
                  <CardTitle>{role.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground mb-4 flex-grow">{role.description}</p>
                <ul className="space-y-2 text-sm">
                  {role.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleFeatures;
