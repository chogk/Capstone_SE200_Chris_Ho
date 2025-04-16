"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams  } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const router = useRouter();
  const searchParams = useSearchParams()

  useEffect(() => {
    const msg = searchParams.get("message")
    if (msg === "password-updated") {
      setMessage("Password changed successfully. Please log in again.")
    }
  }, [searchParams])

  const handleEmailLogin = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Invalid credentials!");
    } else {
      router.push("/dashboard");
    }

    if (message === "password-updated") {
      toast.success("Password changed. Please log in again.")
    }
  };

  return (
    <div className="flex h-screen">
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
      <div className="flex justify-center items-center w-full md:w-1/2 p-6">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-center">
              Sign In to Your Account
            </h2>

            <div className="space-y-4">
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="w-full bg-black text-white hover:bg-gray-900"
                onClick={handleEmailLogin}
              >
                Sign In with Email
              </Button>
            </div>

            <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500 text-xs">OR CONTINUE WITH</span>
                <hr className="flex-grow border-gray-300" />
            </div>

            <Button
              className="w-full bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center gap-2"
              onClick={() => signIn("github")}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 00-3.162 19.48c.5.09.682-.217.682-.483v-1.874c-2.782.603-3.369-1.336-3.369-1.336-.454-1.153-1.11-1.459-1.11-1.459-.906-.619.068-.607.068-.607 1.002.07 1.53 1.03 1.53 1.03.89 1.53 2.335 1.089 2.905.833.091-.646.349-1.089.635-1.34-2.22-.25-4.555-1.111-4.555-4.943 0-1.092.39-1.986 1.029-2.685-.103-.253-.447-1.276.097-2.66 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.805a9.573 9.573 0 012.497.336c1.91-1.294 2.75-1.025 2.75-1.025.544 1.384.2 2.407.097 2.66.64.699 1.028 1.593 1.028 2.685 0 3.842-2.337 4.688-4.564 4.936.358.308.678.914.678 1.84v2.727c0 .269.18.578.688.482A10 10 0 0012 2z" />
              </svg>
              GitHub
            </Button>

            <p className="text-center text-sm text-gray-500">
                Don't have an account? <a href="/signup" className="underline">Sign up</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
