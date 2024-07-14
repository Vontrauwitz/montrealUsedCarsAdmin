import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = '/'; // Redirigir a la página principal o de inicio de sesión
  };

  return (
    <header className="bg-black shadow-md w-full fixed top-0 z-20">
      <div className="container mx-auto flex justify-between items-center p-6 relative">
        <img src="/images/latinride.png" alt="Auto Latino Logo" className="h-20 absolute top-1/2 transform -translate-y-1/2" />
        <nav className="space-x-4 ml-auto">
          <Link href="/showroom">
            <span className="cursor-pointer text-gray-700 hover:text-blue-500">Showroom</span>
          </Link>
          {status === 'unauthenticated' && (
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="bg-blue-500 text-white p-2 px-4 rounded-lg"
            >
              Login with Google
            </button>
          )}
          {status === 'authenticated' && (
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white p-2 px-4 rounded-lg"
            >
              Sign out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
