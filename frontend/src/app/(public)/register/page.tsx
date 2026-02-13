// frontend/src/app/register/page.tsx
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';


const RegisterPage = () => {
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
      <div className="hidden md:flex w-1/2 h-full min-h-screen max-h-screen items-stretch justify-stretch bg-muted overflow-hidden shadow-lg p-0 m-0">
        <img
          src="/images/refueling.jpg"
          alt="Refueling"
          className="object-cover w-full h-full min-h-screen max-h-screen"
        />
      </div>
      {/* Form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-8">
        <div className="w-full max-w-xl space-y-6 bg-white/90 md:bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Create a driver account</h1>
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
