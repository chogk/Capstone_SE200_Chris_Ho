"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // 👇 ADD THIS: While loading, don't render form yet
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // 👇 ADD THIS: If already authenticated, don't show login form
  if (session) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
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
                onClick={async () => {
                  const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                  });

                  if (result?.error) {
                    alert("Invalid email or password");
                  } else {
                    router.push("/dashboard");
                  }
                }}
              >
                Sign In with Email
              </Button>
            </div>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500 text-xs">
                OR CONTINUE WITH
              </span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <Button
              className="w-full bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center gap-2"
              onClick={() => signIn("github")}
            >
              {/* Github Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="..." />
              </svg>
              GitHub
            </Button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="/signup" className="underline">
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
