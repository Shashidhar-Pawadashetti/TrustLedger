import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Card } from "../components/ui/core";
import { useLogin } from "../api/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password }, {
      onSuccess: (data) => navigate(`/${data.user.role.toLowerCase()}-dashboard`)
    });
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-trust-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-trust-green/5 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md p-8 sm:p-10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-trust-blue-light rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-trust-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-2">Enter your credentials to access your dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="flex items-center gap-3 p-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{(error as any)?.response?.data?.error || "Login failed. Please try again."}</span>
            </div>
          )}
          
          <Input 
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          
          <Input 
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-3 mt-2" 
            disabled={isPending}
          >
            {isPending ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-8">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-trust-blue hover:text-blue-700 transition-colors">
            Sign up for free
          </Link>
        </p>
      </Card>
    </div>
  );
}
