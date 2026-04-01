import React from "react";
import { useAuthStore } from "../stores/authStore";
import { Card, Button, Badge } from "../components/ui/core";
import { useNavigate } from "react-router-dom";
import { useMyProjects } from "../api/useProjects";

export default function ClientDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { data: projects = [], isLoading } = useMyProjects();

  const inEscrow = projects.reduce((sum, p) => sum + Number((p as any).escrowWallet?.totalDeposited ?? 0), 0);
  const released = projects.reduce((sum, p) => sum + Number((p as any).escrowWallet?.totalReleased ?? 0), 0);
  const activeProjects = projects.filter(p => p.status === "ACTIVE").length;
  const completed = projects.filter(p => p.status === "COMPLETED" as any).length;

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
              onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              My Projects
            </button>
            <div className="pt-4">
              <Button 
                variant="success" 
                className="w-full justify-start gap-3" 
                onClick={() => navigate('/projects/new')}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Project
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
              <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your projects</p>
            </div>
            <Button variant="success" onClick={() => navigate('/projects/new')} className="md:hidden">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </Button>
          </header>

          {/* Stats cards */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-trust-green-light rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500">In Escrow</p>
              <p className="text-2xl font-bold text-trust-green mt-1">₹{inEscrow.toLocaleString()}</p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500">Released</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">₹{released.toLocaleString()}</p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-trust-blue-light rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-trust-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500">Active</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{activeProjects}</p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500">Completed</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{completed}</p>
            </Card>
          </section>

          {/* Projects list */}
          <section id="projects-section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">My Projects</h2>
              <span className="text-sm text-slate-500">{projects.length} total</span>
            </div>

            {isLoading ? (
              <Card className="p-8">
                <div className="flex items-center justify-center gap-3 text-slate-400">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Loading projects...</span>
                </div>
              </Card>
            ) : projects.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects yet</h3>
                <p className="text-slate-500 mb-6">Create your first project to get started with escrow-protected payments.</p>
                <Button variant="primary" onClick={() => navigate('/projects/new')}>
                  Create your first project
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
        </div>
      </main>
    </div>
  );
}
