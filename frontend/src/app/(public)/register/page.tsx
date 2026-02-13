// frontend/src/app/register/page.tsx
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';


const RegisterPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] items-center justify-center px-0 md:px-8 py-8 bg-background">
      {/* Image section */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-muted rounded-l-3xl overflow-hidden shadow-lg">
        <img
          src="/images/refueling.jpg"
          alt="Refueling"
          className="object-cover w-full h-[500px] max-h-[80vh]"
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
