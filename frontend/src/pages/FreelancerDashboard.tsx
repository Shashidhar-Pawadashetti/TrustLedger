import React from "react";
import { useAuthStore } from "../stores/authStore";
import { Card, Button, Badge } from "../components/ui/core";
import { useNavigate } from "react-router-dom";
import { useMyProjects } from "../api/useProjects";

export default function FreelancerDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { data: projects = [], isLoading } = useMyProjects();

  const totalReceived = projects.reduce((sum, p) => sum + Number((p as any).escrowWallet?.totalReleased ?? 0), 0);
  const activeJobs = projects.filter(p => p.status === "ACTIVE").length;
  const pendingActions = projects.reduce((sum, p) => {
    return sum + ((p.milestones ?? []).filter((m: any) => m.status === "PENDING").length);
  }, 0);

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white">
        <div className="flex-1 p-6">
          <nav className="space-y-1">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Overview
            </button>
            <button 
              onClick={() => document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              My Jobs
            </button>
            <button 
              onClick={() => document.getElementById('earnings-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Earnings
            </button>
            <div className="pt-4">
              <Button 
                variant="primary" 
                className="w-full justify-start gap-3" 
                onClick={() => navigate('/job-board')}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Jobs
              </Button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Welcome back, {user?.displayName?.split(' ')[0]}
              </h1>
              <p className="text-slate-500 mt-1">Track your jobs and earnings</p>
            </div>
            <Button variant="primary" onClick={() => navigate('/job-board')} className="md:hidden">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Jobs
            </Button>
          </header>

          {/* Stats cards */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-trust-green-light rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500">Total Received</p>
              <p className="text-2xl font-bold text-trust-green mt-1">₹{totalReceived.toLocaleString()}</p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-trust-blue-light rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-trust-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500">Active Jobs</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{activeJobs}</p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-trust-amber-light rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-trust-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500">Action Required</p>
              <p className="text-2xl font-bold text-trust-amber mt-1">{pendingActions}</p>
            </Card>
          </section>

          {/* Jobs list */}
          <section id="jobs-section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">My Jobs</h2>
              <span className="text-sm text-slate-500">{projects.length} total</span>
            </div>

            {isLoading ? (
              <Card className="p-8">
                <div className="flex items-center justify-center gap-3 text-slate-400">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Loading jobs...</span>
                </div>
              </Card>
            ) : projects.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No jobs assigned yet</h3>
                <p className="text-slate-500 mb-6">Browse available projects to find your next opportunity.</p>
                <Button variant="primary" onClick={() => navigate('/job-board')}>
                  Browse open jobs
                </Button>
              </Card>
            ) : (
              <Card className="overflow-hidden p-0">
                <div className="divide-y divide-slate-100">
                  {projects.map(p => (
                    <div 
                      key={p.id} 
                      className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/projects/${p.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{p.title}</p>
                          <p className="text-sm text-slate-500">Budget: ₹{Number(p.totalBudget).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge status={p.status} />
                        <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </section>

          {/* Earnings breakdown */}
          <section id="earnings-section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Earnings Breakdown</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.filter(p => (p as any).escrowWallet?.totalReleased > 0).map(p => (
                <Card 
                  key={p.id} 
                  className="p-5 cursor-pointer" 
                  hover
                  onClick={() => navigate(`/projects/${p.id}`)}
                >
                  <p className="font-semibold text-slate-900 truncate mb-2">{p.title}</p>
                  <p className="text-2xl font-bold text-trust-green">
                    ₹{Number((p as any).escrowWallet?.totalReleased ?? 0).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-trust-green rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(Number((p as any).escrowWallet?.totalReleased ?? 0) / Number(p.totalBudget)) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">
                      of ₹{Number(p.totalBudget).toLocaleString()}
                    </span>
                  </div>
                </Card>
              ))}
              {projects.filter(p => (p as any).escrowWallet?.totalReleased > 0).length === 0 && (
                <Card className="col-span-full p-8 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-500">No earnings yet. Complete milestones to get paid!</p>
                </Card>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
