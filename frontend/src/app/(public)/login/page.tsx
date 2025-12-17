// frontend/src/app/login/page.tsx
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Sign in to your account</h1>
        <p className="text-gray-600">
          Or{' '}
          <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            start your 14-day free trial
          </a>
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
