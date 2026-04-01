import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../components/ui/core";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0 opacity-[0.015]" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-32 lg:pb-40">
          <div className="text-center max-w-4xl mx-auto">
            {/* Announcement badge */}
            <div className="animate-fade-in mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-600">Built for student freelancers</span>
              </div>
            </div>

            {/* Main headline */}
            <h1 className="animate-fade-in text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 mb-6 text-balance">
              Get Paid.{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Every Time.
                </span>
                <svg 
                  className="absolute -bottom-1 left-0 w-full" 
                  viewBox="0 0 200 8" 
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M1 5.5C47 2 87 2 100 3.5C113 5 153 7 199 3" 
                    stroke="url(#gradient)" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#10B981" stopOpacity="0.4" />
                      <stop offset="0.5" stopColor="#14B8A6" stopOpacity="0.6" />
                      <stop offset="1" stopColor="#10B981" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-in text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
              Smart escrow for student freelancers. Stop chasing invoices and focus on what you do best.
            </p>

            {/* CTA buttons */}
            <div className="animate-fade-in flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                variant="success" 
                className="text-base px-8 py-4 w-full sm:w-auto shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300" 
                onClick={() => navigate("/register")}
              >
                Start Free
                <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button 
                variant="ghost" 
                className="text-base px-8 py-4 w-full sm:w-auto text-slate-600 hover:text-slate-900" 
                onClick={() => navigate("/login")}
              >
                Sign in to your account
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="animate-fade-in flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>100% secure escrow</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>AI-powered contracts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </section>

      {/* Social proof bar */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-wider mb-8">
            Trusted by students at top universities
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40">
            {['Stanford', 'MIT', 'Berkeley', 'Harvard', 'Carnegie Mellon'].map((uni) => (
              <span key={uni} className="text-lg font-semibold text-slate-700">{uni}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 text-balance">
              Three steps to secure payments
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A simple workflow designed to protect both freelancers and clients
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                    1
                  </div>
                  <div className="flex-1 h-px bg-slate-200 hidden md:block" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Escrow Locked</h3>
                <p className="text-slate-600 leading-relaxed">
                  Clients deposit funds upfront into a secure vault. You only start work when the money is safely locked.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                    2
                  </div>
                  <div className="flex-1 h-px bg-slate-200 hidden md:block" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Clear Milestones</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our AI splits your project into clear, unambiguous deliverables protecting against scope creep.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/20">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Fair Disputes</h3>
                <p className="text-slate-600 leading-relaxed">
                  If things go wrong, our AI mediator analyzes the situation and suggests fair splits. No more ghosting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to get paid
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Secure Escrow",
                description: "Funds held safely until work is approved",
                color: "bg-trust-green-light text-trust-green",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "AI Contracts",
                description: "Smart contracts generated in seconds",
                color: "bg-trust-blue-light text-trust-blue",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
                title: "Fair Resolution",
                description: "AI-powered dispute mediation",
                color: "bg-trust-amber-light text-trust-amber",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Auto Invoices",
                description: "Professional invoices generated automatically",
                color: "bg-trust-blue-light text-trust-blue",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Instant Payouts",
                description: "Get paid as soon as work is approved",
                color: "bg-trust-green-light text-trust-green",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Buyer Protection",
                description: "Full refund if work is not delivered",
                color: "bg-trust-red-light text-trust-red",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="p-6 animate-fade-in group"
                hover
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Loved by freelancers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {[
              {
                quote: "Finally, a platform that actually protects freelancers. I've recovered $2,000 in payments I would have lost.",
                author: "Sarah K.",
                role: "UI Designer, Stanford"
              },
              {
                quote: "The AI contract generation is incredible. What used to take hours now takes seconds.",
                author: "Marcus T.",
                role: "Developer, MIT"
              },
              {
                quote: "No more awkward payment conversations. The escrow system handles everything professionally.",
                author: "Elena R.",
                role: "Content Writer, Berkeley"
              }
            ].map((testimonial, i) => (
              <div key={i} className="relative animate-fade-in">
                <div className="absolute -top-4 left-6 text-6xl text-emerald-200 font-serif leading-none select-none">"</div>
                <Card className="p-8 pt-10 transition-all duration-250 ease-out hover:shadow-soft-lg hover:-translate-y-0.5 hover:border-slate-300">
                  <p className="text-slate-700 mb-6 leading-relaxed">{testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{testimonial.author}</p>
                      <p className="text-slate-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Ready to get paid what you deserve?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            Join thousands of student freelancers who&apos;ve stopped chasing invoices and started building their careers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="success" 
              className="text-base px-8 py-4 w-full sm:w-auto shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300" 
              onClick={() => navigate("/register")}
            >
              Create your free account
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button 
              variant="outline" 
              className="text-base px-8 py-4 w-full sm:w-auto border-slate-600 text-white hover:bg-slate-700 hover:border-slate-500" 
              onClick={() => navigate("/jobs")}
            >
              Browse open projects
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">TrustBound</span>
            </div>
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} TrustBound. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
