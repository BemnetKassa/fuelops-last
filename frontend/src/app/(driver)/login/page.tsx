import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
          <p className="text-sm text-muted-foreground">
            Or{' '}
            <Link href="/driver/register" className="font-medium text-primary hover:underline">
              create a new driver account
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
