// frontend/src/components/shared/Navbar.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-foreground">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold shadow-sm">
            FO
          </span>
          <span>FuelOps</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="btn-grow">
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
