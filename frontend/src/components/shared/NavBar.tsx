// frontend/src/components/shared/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-secondary text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          FuelOps
        </Link>
        <div>
          <Link href="/login" className="mr-4 hover:text-white/60">Login</Link>
          <Link href="/register" className="hover:text-white/60 ">Register</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
