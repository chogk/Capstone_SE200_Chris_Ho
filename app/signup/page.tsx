"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Github } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Signup failed");
      return;
    }

    // Redirect to login page after successful signup
    router.push("/login");
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
            <h2 className="text-2xl font-semibold text-center">Create an account</h2>
            <p className="text-gray-500 text-center">
              Enter your email below to create your account
            </p>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
             />
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="w-full bg-black text-white"
                onClick={handleSignup}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up with Email"}
              </Button>
            </div>

            <div className="text-center text-gray-500">OR CONTINUE WITH</div>

            <Button
              className="w-full bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center gap-2"
              onClick={() => signIn("github")}
            >
              GitHub
            </Button>

            <p className="text-center text-sm text-gray-500">
              By clicking continue, you agree to our{" "}
              <a href="../terms" className="underline">Terms of Service</a> and{" "}
              <a href="../privacy" className="underline">Privacy Policy</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
