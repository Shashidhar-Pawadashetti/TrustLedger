import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Badge } from "../components/ui/core";
import { useAuthStore } from "../stores/authStore";
import { useApproveMilestone, useReviewMilestone, useSubmitMilestone } from "../api/useMilestones";
import { useProject } from "../api/useProjects";
import { useRaiseDispute } from "../api/useDisputes";
import { useDepositEscrow } from "../api/useEscrow";
import { useSignContract } from "../api/useProjects";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: project, isLoading, error } = useProject(id!);

  const isClient = user?.role === "CLIENT";

  const { mutate: approve } = useApproveMilestone(id!);
  const { mutate: review } = useReviewMilestone(id!);
  const { mutate: submit } = useSubmitMilestone(id!);
  const { mutateAsync: raiseDispute } = useRaiseDispute(id!);
  const depositEscrow = useDepositEscrow(id!);
  const signContract = useSignContract();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 text-slate-400">
          <svg className="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading project...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-12 text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-trust-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Project not found</h3>
          <p className="text-slate-500 mb-6">This project may have been deleted or you don&apos;t have access.</p>
          <Button variant="primary" onClick={() => navigate(-1)}>Go back</Button>
        </Card>
      </div>
    );
  }

  const deposited = Number(project.escrowWallet?.totalDeposited ?? 0);
  const released = Number(project.escrowWallet?.totalReleased ?? 0);
  const progressPct = deposited > 0 ? (released / deposited) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header */}
          <header>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{project.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Client: <span className="font-medium text-slate-700">{(project as any).client?.displayName}</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    Freelancer: <span className="font-medium text-slate-700">{(project as any).freelancer?.displayName ?? "Not assigned"}</span>
                  </span>
                </div>
              </div>
              <Badge status={project.status} />
            </div>
          </header>

          {/* Milestone Timeline */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Milestone Timeline
            </h2>
            
            <div className="space-y-3">
              {(project.milestones ?? []).map((m, index) => (
                <Card key={m.id} className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold
                        ${m.status === 'APPROVED' || m.status === 'FUNDS_RELEASED' 
                          ? 'bg-trust-green-light text-trust-green' 
                          : m.status === 'SUBMITTED' || m.status === 'UNDER_REVIEW'
                          ? 'bg-trust-amber-light text-trust-amber'
                          : 'bg-slate-100 text-slate-500'
                        }
                      `}>
                        {m.status === 'APPROVED' || m.status === 'FUNDS_RELEASED' ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-900">{m.title}</span>
                          <Badge status={m.status}>{m.status}</Badge>
                        </div>
                        <span className="text-sm text-slate-500">₹{Number(m.amount).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {isClient && m.status === "SUBMITTED" && (
                        <>
                          <Button
                            variant="destructiveOutline"
                            onClick={async () => {
                              const reason =
                                window.prompt("Why are you raising a dispute? (min 10 chars)") ||
                                "Deliverable does not meet the agreed criteria.";
                              const dispute = await raiseDispute({ milestoneId: m.id, reason });
                              navigate(`/projects/${id}/dispute/${dispute.id}`);
                            }}
                          >
                            Dispute
                          </Button>
                          <Button variant="success" onClick={() => approve(m.id)}>
                            Release ₹{Number(m.amount).toLocaleString()}
                          </Button>
                        </>
                      )}
                      {isClient && m.status === "UNDER_REVIEW" && (
                        <Button variant="success" onClick={() => approve(m.id)}>
                          Release ₹{Number(m.amount).toLocaleString()}
                        </Button>
                      )}
                      {!isClient && m.status === "PENDING" && (
                        <Button variant="primary" onClick={() => submit({ milestoneId: m.id, url: "https://example.com" })}>
                          Submit Deliverable
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Contract signing card */}
          {(project.status === "CONTRACT_REVIEW" || project.status === "AWAITING_DEPOSIT") && (
            <Card className="p-6 border-trust-blue/30 bg-trust-blue-light/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-trust-blue-light rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-trust-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Contract</h3>
                  <p className="text-xs text-slate-500">Sign to proceed</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Both parties must sign before escrow can be deposited.
              </p>
              <Button
                variant="primary"
                className="w-full"
                onClick={() =>
                  signContract.mutate(
                    { projectId: id!, ipHash: crypto.randomUUID().replace(/-/g, "") },
                    { onSuccess: () => {} }
                  )
                }
              >
                Sign Contract
              </Button>
            </Card>
          )}

          {/* Escrow wallet card */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-trust-green-light rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Escrow Wallet</h3>
                <p className="text-xs text-slate-500">Secure fund management</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Total Deposited</span>
                <span className="font-bold text-slate-900">₹{deposited.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Funds Released</span>
                <span className="font-bold text-trust-green">₹{released.toLocaleString()}</span>
              </div>
              
              {deposited > 0 && (
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Progress</span>
                    <span>{Math.round(progressPct)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-trust-green rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {isClient && (
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <Button
                  onClick={() => depositEscrow.mutate(Number(project.totalBudget))}
                  variant="success"
                  className="w-full"
                  disabled={depositEscrow.isPending || project.status !== "AWAITING_DEPOSIT"}
                >
                  {depositEscrow.isPending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Depositing...
                    </>
                  ) : (
                    `Deposit ₹${Number(project.totalBudget).toLocaleString()}`
                  )}
                </Button>
                <Button 
                  onClick={() => navigate(`/projects/${id}/invoice`)} 
                  variant="outline" 
                  className="w-full"
                >
                  View Invoice
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
