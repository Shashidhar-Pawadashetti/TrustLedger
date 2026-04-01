import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Card } from "../components/ui/core";
import { useRegister } from "../api/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"CLIENT" | "FREELANCER">("FREELANCER");
  const [form, setForm] = useState({ email: "", password: "", displayName: "", upiHandle: "" });
  const { mutate: register, isPending, error } = useRegister();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register({ ...form, role }, {
      onSuccess: (data) => navigate(`/${data.user.role.toLowerCase()}-dashboard`)
    });
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-trust-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-trust-blue/5 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md p-8 sm:p-10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-trust-green-light rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-500 mt-2">Start getting paid what you deserve</p>
        </div>
        
        {/* Role Toggle */}
        <div className="flex p-1.5 bg-slate-100 rounded-xl mb-6">
          <button 
            type="button"
            className={`
              flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200
              ${role === 'FREELANCER' 
                ? 'bg-white text-slate-900 shadow-soft' 
                : 'text-slate-500 hover:text-slate-700'
              }
            `}
            onClick={() => setRole("FREELANCER")}
          >
            I&apos;m a Freelancer
          </button>
          <button 
            type="button"
            className={`
              flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200
              ${role === 'CLIENT' 
                ? 'bg-white text-slate-900 shadow-soft' 
                : 'text-slate-500 hover:text-slate-700'
              }
            `}
            onClick={() => setRole("CLIENT")}
          >
            I&apos;m a Client
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <div className="flex items-center gap-3 p-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{(error as any)?.response?.data?.error || "Registration failed. Please try again."}</span>
            </div>
          )}
          
          <Input 
            label="Display Name" 
            placeholder="John Doe"
            required 
            value={form.displayName} 
            onChange={(e: any) => setForm({...form, displayName: e.target.value})}
            autoComplete="name"
          />
          
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="you@example.com"
            required 
            value={form.email} 
            onChange={(e: any) => setForm({...form, email: e.target.value})}
            autoComplete="email"
          />
          
          <Input 
            label="Password" 
            type="password" 
            placeholder="Min. 6 characters"
            required 
            value={form.password} 
            onChange={(e: any) => setForm({...form, password: e.target.value})}
            autoComplete="new-password"
          />
          
          <Input 
            label="UPI Handle (Optional)" 
            placeholder="yourname@upi"
            value={form.upiHandle} 
            onChange={(e: any) => setForm({...form, upiHandle: e.target.value})}
          />

          <Button 
            type="submit" 
            variant="success" 
            className="w-full py-3 mt-2" 
            disabled={isPending}
          >
            {isPending ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-trust-blue hover:text-blue-700 transition-colors">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
