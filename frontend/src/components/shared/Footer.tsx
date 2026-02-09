// frontend/src/components/shared/Footer.tsx
import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <nav className="flex flex-wrap justify-center gap-8">
            {[
              { label: 'About', href: '/about' },
              { label: 'Features', href: '/features' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity cursor-default">
            <span>Built with</span>
            <span className="text-red-500 animate-pulse" role="img" aria-label="love">❤️</span>
            <span>for the modern fleet.</span>
          </p>
        </div>

        <div className="border-t border-border/40 pt-4 md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-muted-foreground">
              &copy; {new Date().getFullYear()} FuelOps. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
