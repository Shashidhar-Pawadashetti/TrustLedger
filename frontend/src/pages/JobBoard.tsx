import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "../components/ui/core";
import { useOpenProjects, useApplyToProject } from "../api/useProjects";

export default function JobBoard() {
  const navigate = useNavigate();
  const { data: projects = [], isLoading, refetch } = useOpenProjects();
  const { mutate: apply, isPending } = useApplyToProject();
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const handleApply = (projectId: string) => {
    setError(null);
    apply(projectId, {
      onSuccess: () => {
        setAppliedIds((prev) => new Set(prev).add(projectId));
        navigate(`/projects/${projectId}`);
      },
      onError: (e: any) => setError(e?.response?.data?.error || "Failed to apply"),
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Job Board</h1>
          <p className="text-slate-500 mt-1">Browse open projects and apply to work on them</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => refetch()}
          className="self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </Button>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-3 p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg animate-fade-in">
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center gap-4 text-slate-400">
            <svg className="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading open projects...</span>
          </div>
        </Card>
      ) : projects.length === 0 ? (
        <Card className="p-16 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No open projects right now</h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            Check back later — clients post new projects regularly.
          </p>
        </Card>
      ) : (
        <div className="space-y-4 stagger-children">
          {projects.map((p: any) => (
            <Card key={p.id} className="p-6 animate-fade-in transition-all duration-250 ease-out hover:shadow-soft-lg hover:-translate-y-0.5 hover:border-slate-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Project info */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">{p.title}</h2>
                    <Badge status={p.status} />
                  </div>
                  
                  <p className="text-slate-600 line-clamp-2">{p.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        Budget: <span className="font-semibold text-slate-900">₹{Number(p.totalBudget).toLocaleString()}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        Deadline: <span className="font-semibold text-slate-900">{new Date(p.deadline).toLocaleDateString()}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>
                        Client: <span className="font-semibold text-slate-900">{p.client?.displayName}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Apply button */}
                <div className="lg:ml-4 shrink-0">
                  <Button
                    variant={appliedIds.has(p.id) ? "outline" : "success"}
                    disabled={isPending || appliedIds.has(p.id)}
                    onClick={() => handleApply(p.id)}
                    className="w-full lg:w-auto min-w-[110px]"
                  >
                    {isPending && !appliedIds.has(p.id) ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Applying...
                      </>
                    ) : appliedIds.has(p.id) ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Applied
                      </>
                    ) : (
                      "Apply Now"
                    )}
                  </Button>
                </div>
              </div>

              {/* Milestones */}
              {p.milestones?.length > 0 && (
                <div className="mt-5 pt-5 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Milestones ({p.milestones.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.milestones.map((m: any) => (
                      <span 
                        key={m.id} 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-700 rounded-full"
                      >
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        {m.title} — ₹{Number(m.amount).toLocaleString()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
