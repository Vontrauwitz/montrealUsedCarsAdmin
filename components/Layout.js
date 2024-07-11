import { useState, useEffect, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children, requireAuth = false }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const router = useRouter();
  const isDashboard = router.pathname === '/dashboard';
  const isShowroom = router.pathname === '/showroom';

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false);
    }

    if (status === 'authenticated' && router.pathname === '/') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/'); // Redirigir a la página principal o de inicio de sesión
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (requireAuth && !session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="mb-4">No estás autorizado. Por favor, inicia sesión.</h2>
          <button
            onClick={() => signIn('google')}
            className="bg-white text-blue-900 p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 w-screen min-h-screen flex">
      {session && (
        <nav
          ref={sidebarRef}
          className={`bg-gray-800 p-4 flex flex-col justify-between items-start fixed h-full z-10 transform transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="text-white text-xl mb-4 flex items-center w-full justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <h1>My App</h1>
            </div>
            <button onClick={toggleSidebar} className="text-white focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5l-6-6 6-6" />
              </svg>
            </button>
          </div>
          <div className="text-white flex flex-col items-start w-full">
            <Navigation />
            <div className="mt-auto flex items-center">
              <span>{session.user.email}</span>
              <button
                className="ml-4 bg-red-500 px-4 py-2 rounded hover:bg-red-700"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>
        </nav>
      )}
      <div className="flex-1 p-8 pt-16 min-h-screen" style={{ paddingLeft: sidebarOpen ? '16px' : '64px' }}>
        {!sidebarOpen && session && !isDashboard && !isShowroom && (
          <button onClick={toggleSidebar} className="text-white focus:outline-none fixed top-4 left-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l6 6-6 6" />
            </svg>
          </button>
        )}
        {(!isDashboard && !isShowroom) && (
          <header className="bg-white shadow-md fixed top-0 w-full z-20">
            <div className="container mx-auto flex justify-between items-center p-6">
              <div className="text-2xl font-bold text-blue-900">Auto Latino</div>
              <nav className="space-x-4">
                <Link href="/showroom">
                  <span className="cursor-pointer text-gray-700 hover:text-blue-500">
                    Showroom
                  </span>
                </Link>
                {status === 'unauthenticated' && (
                  <button
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    className="bg-blue-500 text-white p-2 px-4 rounded-lg"
                  >
                    Login with Google
                  </button>
                )}
              </nav>
            </div>
          </header>
        )}
        <div className={`pt-${isDashboard || isShowroom ? '8' : '24'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
