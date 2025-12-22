"use client";
import { User, Building, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const roles = [
	{
		icon: <User className="h-8 w-8 text-primary" />,
		title: 'For the Driver',
		description:
			'The end-user who needs fuel. A streamlined experience to find, reserve, and track fuel consumption.',
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
		description:
			'The staff on the ground, managing the flow of fuel and keeping operations smooth.',
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
		description:
			'The system controller with a birds-eye view of the entire fuel distribution network.',
		features: [
			'Oversee all stations and users',
			'Generate system-wide analytics',
			'Manage user roles and access',
			'Monitor for suspicious activity',
		],
	},
];

const cardVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0 },
};

const RoleFeatures = () => {
	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto text-center">
				<motion.h2
					className="text-4xl font-bold mb-4"
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					A Platform for Everyone
				</motion.h2>
				<motion.p
					className="text-muted-foreground mb-12 text-lg max-w-3xl mx-auto"
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					FuelOps is designed with dedicated tools and dashboards for every role in
					the fuel management ecosystem.
				</motion.p>
				<div className="grid md:grid-cols-3 gap-8 text-left">
					{roles.map((role, index) => (
						<motion.div
							key={role.title}
							variants={cardVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
						>
							<Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300">
								<CardHeader className="flex-shrink-0">
									<div className="flex items-center space-x-4">
										{role.icon}
										<CardTitle>{role.title}</CardTitle>
									</div>
								</CardHeader>
								<CardContent className="flex-grow flex flex-col">
									<p className="text-muted-foreground mb-4 flex-grow">
										{role.description}
									</p>
									<ul className="space-y-2 text-sm">
										{role.features.map((feature) => (
											<li key={feature} className="flex items-center">
												<svg
													className="h-4 w-4 mr-2 text-green-500"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M5 13l4 4L19 7"
													></path>
												</svg>
												{feature}
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default RoleFeatures;
