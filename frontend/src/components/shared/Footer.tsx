// frontend/src/components/shared/Footer.tsx
import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
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
        <div className="mt-8 border-t border-border pt-8 md:flex md:items-center md:justify-between">
          <div className="text-color-black flex flex-wrap justify-center gap-x-6 gap-y-4">
            <Link href="/about" className="text-base text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/features" className="text-base text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="/pricing" className="text-base text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/contact" className="text-base text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
          <p className="mt-8 text-center text-base text-muted-foreground md:mt-0">
            Built with ❤️ for the modern fleet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
