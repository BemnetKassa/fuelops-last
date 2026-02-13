// frontend/src/app/login/page.tsx
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';


const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] items-center justify-center px-0 md:px-0 py-0 bg-background relative">
      {/* Mobile image section */}
      <div className="flex md:hidden w-full h-56 items-center justify-center bg-muted overflow-hidden">
        <img
          src="/images/refueling.jpg"
          alt="Refueling"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Desktop image section */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-muted overflow-hidden shadow-lg">
        <img
          src="/images/refueling.jpg"
          alt="Refueling"
          className="object-cover w-full h-[700px] max-h-full"
        />
      </div>
      {/* Form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-8">
        <div className="w-full max-w-md space-y-6 bg-white/90 md:bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
            <p className="text-sm text-muted-foreground">
              Or{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                create a new driver account
              </Link>
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
