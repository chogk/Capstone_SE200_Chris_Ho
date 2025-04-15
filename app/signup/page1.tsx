'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GitHub } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';


export default function AuthPage() {
  const [email, setEmail] = useState('');

  const handleEmailLogin = async () => {
    await signIn('email', { email });
  };

  return (
    <div className="flex h-screen">
      {/* Login Link */}
      <Link href="/login" className="absolute top-6 right-8 text-gray-600 hover:underline">
        Login
      </Link>

      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-black text-white p-10">
        <div className="text-lg font-bold">Acme Inc</div>
        <blockquote className="italic">
          “This library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before.”
          <br />
          <span className="text-sm">- Sofia Davis</span>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Create an account</h2>
          <p className="text-gray-600 text-center mt-2">Enter your email below to create your account</p>

          <Input
            type="email"
            placeholder="name@example.com"
            className="mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="w-full mt-4" onClick={handleEmailLogin}>
            Sign In with Email
          </Button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-xs">OR CONTINUE WITH</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <Button
            className="w-full flex items-center justify-center bg-gray-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800"
            onClick={() => signIn('github')}
          >
            <GitHub className="mr-0.1 h-5 w-5" />
            GitHub
          </Button>

          <p className="text-center text-gray-500 text-sm mt-4">
            By clicking continue, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}