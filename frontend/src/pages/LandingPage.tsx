import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../components/ui/core";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-trust-green/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-trust-blue/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="text-center max-w-3xl mx-auto space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green-light/50 rounded-full border border-trust-green/20">
              <span className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-700">Built for student freelancers</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 text-balance">
              Get Paid.{" "}
              <span className="relative">
                <span className="text-trust-green">Every Time.</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-trust-green/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 T200,8" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto text-balance leading-relaxed">
              Smart escrow for student freelancers. Stop chasing invoices and focus on what you do best — building amazing things.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                variant="success" 
                className="text-base px-8 py-3.5 w-full sm:w-auto shadow-soft-lg hover:shadow-lg" 
                onClick={() => navigate("/register")}
              >
                Start Free Now
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button 
                variant="outline" 
                className="text-base px-8 py-3.5 w-full sm:w-auto" 
                onClick={() => navigate("/login")}
              >
                I already have an account
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% secure escrow</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>AI-powered contracts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Three simple steps to protect your work and ensure you always get paid
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 stagger-children">
            <Card className="p-8 text-center animate-slide-up" hover>
              <div className="w-14 h-14 bg-trust-green-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Escrow Locked</h3>
              <p className="text-slate-600 leading-relaxed">
                Clients deposit funds upfront. You only work when the money is safely locked in the vault.
              </p>
            </Card>

            <Card className="p-8 text-center animate-slide-up" hover>
              <div className="w-14 h-14 bg-trust-blue-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-trust-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Clear Milestones</h3>
              <p className="text-slate-600 leading-relaxed">
                Our AI splits your project into clear, unambiguous deliverables protecting against scope creep.
              </p>
            </Card>

            <Card className="p-8 text-center animate-slide-up" hover>
              <div className="w-14 h-14 bg-trust-amber-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-trust-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Fair Disputes</h3>
              <p className="text-slate-600 leading-relaxed">
                If things go wrong, our AI mediator analyzes the situation and suggests fair splits. No more ghosting.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Ready to get paid what you deserve?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Join thousands of student freelancers who&apos;ve stopped chasing invoices.
          </p>
          <Button 
            variant="primary" 
            className="text-base px-8 py-3.5 shadow-soft-lg" 
            onClick={() => navigate("/register")}
          >
            Create your free account
          </Button>
        </div>
      </section>
    </div>
  );
}
