import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Input } from "../components/ui/core";
import { useAuthStore } from "../stores/authStore";
import { io, Socket } from "socket.io-client";
import { useDispute, useGenerateDisputeAiSummary, useResolveDispute } from "../api/useDisputes";

export default function DisputeChat() {
  const { projectId, id: disputeId } = useParams();
  const { user, token } = useAuthStore();
  const { data: dispute } = useDispute(disputeId || "");
  const aiSummary = useGenerateDisputeAiSummary(disputeId || "");
  const resolve = useResolveDispute(disputeId || "");

  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dispute?.messages) {
      setMessages(
        dispute.messages.map((m: any) => ({
          sender: m.sender?.role ?? "USER",
          text: m.body,
        }))
      );
    }
  }, [dispute]);

  useEffect(() => {
    if (!disputeId) return;
    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3001", {
      auth: { token },
    });
    socketRef.current = socket;

    socket.emit("join_dispute", disputeId);

    socket.on("receive_message", (msg: any) => {
      setMessages(prev => [...prev, { sender: msg.sender?.role ?? "USER", text: msg.body }]);
    });

    return () => { socket.disconnect(); };
  }, [disputeId, token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !socketRef.current) return;
    socketRef.current.emit("send_message", {
      disputeId,
      body: input,
    });
    setInput("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)]">
        {/* Sidebar */}
        <div className="lg:w-80 shrink-0 space-y-4">
          <Card className="p-6 border-trust-red/20 bg-red-50/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-trust-red-light rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-trust-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-trust-red">Dispute Raised</h2>
                <p className="text-xs text-slate-500">Project #{projectId?.slice(0, 8)}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                AI Neutral Summary
              </h3>
              {dispute?.aiSummary ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {dispute.aiSummary.proposedResolution}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Suggested split:</span>
                    <span className="font-semibold text-trust-green">
                      {dispute.aiSummary?.suggestedSplit?.freelancer ?? dispute.proposedFreelancerPct ?? 50}% freelancer
                    </span>
                    <span>/</span>
                    <span className="font-semibold text-trust-blue">
                      {dispute.aiSummary?.suggestedSplit?.client ?? dispute.proposedClientPct ?? 50}% client
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Use the chat to communicate. Then generate a neutral AI summary and proposed split.
                </p>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <Button
                variant="outline"
                className="w-full"
                disabled={aiSummary.isPending || !disputeId || (messages?.length ?? 0) < 2}
                onClick={() => aiSummary.mutate()}
              >
                {aiSummary.isPending ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Generate AI Summary
                  </>
                )}
              </Button>

              <Button
                variant="success"
                className="w-full"
                disabled={resolve.isPending || !dispute || !dispute.proposedFreelancerPct || !dispute.proposedClientPct}
                onClick={() =>
                  resolve.mutate({
                    freelancerPct: dispute.proposedFreelancerPct ?? 50,
                    clientPct: dispute.proposedClientPct ?? 50,
                  })
                }
              >
                {resolve.isPending ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Resolving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accept Resolution
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Chat area */}
        <Card className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Mediation Channel</h3>
                <p className="text-xs text-slate-500">Discuss the dispute with the other party</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/30">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm">No messages yet. Start the conversation.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`
                  flex 
                  ${m.sender === "System" 
                    ? "justify-center" 
                    : m.sender === user?.role 
                    ? "justify-end" 
                    : "justify-start"
                  }
                `}
              >
                <div 
                  className={`
                    px-4 py-3 rounded-2xl max-w-[75%]
                    ${m.sender === "System" 
                      ? "bg-slate-100 text-xs text-slate-500 px-6" 
                      : m.sender === "CLIENT" 
                      ? "bg-trust-blue-light text-slate-900 rounded-br-md" 
                      : "bg-trust-green-light text-slate-900 rounded-bl-md"
                    }
                  `}
                >
                  {m.sender !== "System" && (
                    <div className="text-[10px] font-semibold text-slate-500 mb-1">
                      {m.sender}
                    </div>
                  )}
                  <p className="text-sm">{m.text}</p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-trust-blue/20 focus:border-trust-blue transition-all"
                  value={input}
                  onChange={(e: any) => setInput(e.target.value)}
                  onKeyDown={(e: any) => e.key === "Enter" && handleSend()}
                />
              </div>
              <Button onClick={handleSend} variant="primary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
