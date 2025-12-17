// frontend/src/components/shared/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-brown-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          FuelOps
        </Link>
        <div>
          <Link href="/login" className="mr-4">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
