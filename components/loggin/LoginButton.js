import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button
      className='bg-white p-2 px-4 rounded-lg'
      onClick={() => signIn('google')}
    >
      Login with Google
    </button>
  );
};

export default LoginButton;
