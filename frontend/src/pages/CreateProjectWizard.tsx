import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card } from "../components/ui/core";
import {
  useCreateProject,
  useLinkFreelancer,
  usePersistMilestones,
  useSignContract,
  useUpsertContract,
} from "../api/useProjects";
import { useAiContract, useAiMilestones, type MilestoneSuggestion } from "../api/useAi";
import { useDepositEscrow } from "../api/useEscrow";

const steps = [
  { id: 1, name: "Describe", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  { id: 2, name: "AI Scope", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { id: 3, name: "Contract", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { id: 4, name: "Deposit", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
];

export default function CreateProjectWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: "", description: "", budget: "", deadline: "", freelancerEmail: "" });
  const [projectId, setProjectId] = useState<string | null>(null);
  const [milestones, setMilestones] = useState<MilestoneSuggestion[]>([]);
  const [clauses, setClauses] = useState<{ title: string; body: string }[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const navigate = useNavigate();
  const createProject = useCreateProject();
  const linkFreelancer = useLinkFreelancer();
  const aiMilestones = useAiMilestones();
  const aiContract = useAiContract();
  const persistMilestones = usePersistMilestones();
  const upsertContract = useUpsertContract();
  const signContract = useSignContract();
  const depositEscrow = useDepositEscrow(projectId ?? "");

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const ensureProject = async (): Promise<string> => {
    if (projectId) return projectId;
    return await new Promise((resolve, reject) => {
      createProject.mutate(
        {
          title: form.title,
          description: form.description,
          totalBudget: Number(form.budget),
          deadline: form.deadline || new Date(Date.now() + 10 * 86400000).toISOString(),
        },
        {
          onSuccess: (data) => {
            setProjectId(data.id);
            resolve(data.id);
          },
          onError: reject,
        }
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Stepper */}
      <nav className="mb-8">
        <ol className="flex items-center justify-between">
          {steps.map((s, idx) => (
            <li key={s.id} className="flex items-center">
              <div className={`
                flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg transition-all
                ${step >= s.id ? 'bg-trust-blue-light' : 'bg-slate-100'}
              `}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${step > s.id 
                    ? 'bg-trust-green text-white' 
                    : step === s.id 
                    ? 'bg-trust-blue text-white' 
                    : 'bg-slate-200 text-slate-500'
                  }
                `}>
                  {step > s.id ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.id
                  )}
                </div>
                <span className={`hidden sm:inline text-sm font-medium ${step >= s.id ? 'text-trust-blue' : 'text-slate-400'}`}>
                  {s.name}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`hidden sm:block w-8 h-0.5 mx-2 ${step > s.id ? 'bg-trust-green' : 'bg-slate-200'}`} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step content */}
      <Card className="p-6 sm:p-8">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Describe your project</h2>
              <p className="text-slate-500">Tell us about the project so we can help structure it</p>
            </div>
            
            <div className="space-y-5">
              <Input 
                label="Project Title" 
                placeholder="e.g. Website Redesign" 
                value={form.title} 
                onChange={(e: any) => setForm({...form, title: e.target.value})} 
              />
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea 
                  className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-trust-blue/20 focus:border-trust-blue transition-all resize-none"
                  placeholder="Be highly specific about deliverables and expectations..."
                  rows={4}
                  value={form.description} 
                  onChange={(e) => setForm({...form, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  label="Total Budget (₹)" 
                  type="number" 
                  placeholder="50000"
                  value={form.budget} 
                  onChange={(e: any) => setForm({...form, budget: e.target.value})} 
                />
                <Input 
                  label="Deadline" 
                  type="date" 
                  value={form.deadline} 
                  onChange={(e: any) => setForm({...form, deadline: e.target.value})} 
                />
              </div>
              
              <Input
                label="Freelancer Email (to invite)"
                placeholder="freelancer@example.com"
                type="email"
                value={form.freelancerEmail}
                onChange={(e: any) => setForm({ ...form, freelancerEmail: e.target.value })}
              />
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {stepError && <p className="text-sm text-trust-red">{stepError}</p>}
              <div className="ml-auto">
                <Button
                  onClick={async () => {
                    setStepError(null);
                    try {
                      const pid = await ensureProject();
                      if (form.freelancerEmail.trim()) {
                        await linkFreelancer.mutateAsync({ projectId: pid, email: form.freelancerEmail.trim() });
                      }
                      aiMilestones.mutate(
                        { title: form.title, description: form.description, budget: Number(form.budget), deadline: form.deadline },
                        {
                          onSuccess: async (data) => {
                            setMilestones(data);
                            await persistMilestones.mutateAsync({ projectId: pid, milestones: data });
                            setStep(2);
                          },
                          onError: (e: any) => setStepError(e?.response?.data?.error || "Failed to generate milestones"),
                        }
                      );
                    } catch (e: any) {
                      setStepError(e?.response?.data?.error || "Failed to create project");
                    }
                  }}
                  disabled={createProject.isPending || aiMilestones.isPending || persistMilestones.isPending || !form.title || !form.budget}
                >
                  {aiMilestones.isPending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate with AI
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Proposed AI Milestones</h2>
              <p className="text-slate-500">Review the milestones our AI extracted from your description</p>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-5 space-y-3">
              {milestones.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-trust-blue-light rounded-full flex items-center justify-center text-sm font-bold text-trust-blue">
                      {idx + 1}
                    </div>
                    <span className="font-medium text-slate-900">{m.title}</span>
                  </div>
                  <span className="text-sm font-semibold text-trust-blue">{m.budgetPercent}%</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Button variant="ghost" onClick={() => setStep(1)}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back
              </Button>
              <Button
                onClick={async () => {
                  const pid = await ensureProject();
                  aiContract.mutate(
                    { title: form.title, description: form.description, milestones },
                    {
                      onSuccess: async (data) => {
                        setClauses(data.clauses);
                        await upsertContract.mutateAsync({ projectId: pid, clauses: data.clauses });
                        setStep(3);
                      },
                    }
                  );
                }}
                disabled={aiContract.isPending || upsertContract.isPending || milestones.length === 0}
              >
                {aiContract.isPending ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Drafting...
                  </>
                ) : (
                  <>
                    This Looks Good
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Review Contract</h2>
              <p className="text-slate-500">Read through the AI-generated contract terms</p>
            </div>
            
            <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-6 max-h-64 overflow-y-auto">
              {clauses.map((c, idx) => (
                <div key={idx} className="mb-5 last:mb-0">
                  <h3 className="font-bold text-slate-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
            
            <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <input 
                type="checkbox" 
                id="agree" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-trust-blue focus:ring-trust-blue"
              />
              <span className="text-sm text-slate-700">
                I have read and agree to these generated terms and conditions
              </span>
            </label>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Button variant="ghost" onClick={() => { setStepError(null); setStep(2); }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back
              </Button>
              <div className="flex items-center gap-3">
                {stepError && <p className="text-sm text-trust-red">{stepError}</p>}
                <Button
                  onClick={async () => {
                    setStepError(null);
                    try {
                      const pid = await ensureProject();
                      await signContract.mutateAsync({ projectId: pid, ipHash: crypto.randomUUID().replace(/-/g, "") });
                      setStep(4);
                    } catch (e: any) {
                      setStepError(e?.response?.data?.error || "Failed to sign contract");
                    }
                  }}
                  disabled={!agreed || signContract.isPending || !projectId}
                >
                  {signContract.isPending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing...
                    </>
                  ) : (
                    <>
                      Sign Contract
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in text-center py-8">
            <div className="w-20 h-20 bg-trust-green-light rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Deposit Escrow</h2>
              <p className="text-lg text-slate-600">Secure ₹{Number(form.budget).toLocaleString()} into the platform vault</p>
            </div>
            
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Funds are held securely. You have absolute control to release them as each milestone is approved.
            </p>
            
            <div className="pt-4 space-y-3">
              {stepError && <p className="text-sm text-trust-red">{stepError}</p>}
              <Button
                variant="success"
                className="px-10 py-4 text-lg"
                disabled={createProject.isPending || !projectId || depositEscrow.isPending}
                onClick={() => {
                  setStepError(null);
                  depositEscrow.mutate(Number(form.budget), {
                    onSuccess: () => navigate(`/projects/${projectId}`),
                    onError: (e: any) => setStepError(e?.response?.data?.error || "Deposit failed. Please try again."),
                  });
                }}
              >
                {depositEscrow.isPending ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Depositing...
                  </>
                ) : (
                  `Confirm Deposit ₹${Number(form.budget).toLocaleString()}`
                )}
              </Button>
              <p className="text-xs text-slate-400">This is a simulated escrow — no real money is transferred.</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
