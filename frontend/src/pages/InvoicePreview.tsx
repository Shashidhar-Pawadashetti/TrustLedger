import React from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "../components/ui/core";
import { useCreateInvoice, useInvoice } from "../api/useInvoices";

export default function InvoicePreview() {
  const { projectId } = useParams();
  const { mutate, isPending } = useCreateInvoice();
  const { data: invoice } = useInvoice(projectId || "");

  const handleGenerate = () => {
    mutate(projectId!, {
      onSuccess: (data) => {
        const a = document.createElement("a");
        a.href = data.pdfPayload;
        a.download = `${data.invoice.invoiceNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Invoice</h1>
          <p className="text-slate-500 mt-1">Final escrow receipt for your records</p>
        </div>
        <Button 
          onClick={handleGenerate} 
          variant="primary" 
          disabled={isPending}
        >
          {isPending ? (
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </>
          )}
        </Button>
      </div>

      {/* Invoice card */}
      <Card className="p-8 sm:p-12 shadow-soft-lg">
        {/* Invoice header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-trust-green to-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-trust-green">Trust-Bound</span>
            </div>
            <p className="text-sm text-slate-500">Simulated Escrow Receipt</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-lg font-bold text-slate-900">
              {invoice?.invoiceNumber ?? "INV-000000"}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Date: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Parties */}
        <div className="flex flex-col sm:flex-row justify-between py-8 gap-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Billed To
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {invoice?.metadata?.client ?? "Client Name"}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Billed By
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {invoice?.metadata?.freelancer ?? "Freelancer Name"}
            </p>
          </div>
        </div>

        {/* Line items */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Milestone
                </th>
                <th className="text-right px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(invoice?.metadata?.milestones ?? []).length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-5 py-8 text-center text-slate-400">
                    No milestones found
                  </td>
                </tr>
              ) : (
                (invoice?.metadata?.milestones ?? []).map((m: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 text-slate-900">{m.title}</td>
                    <td className="px-5 py-4 text-right text-slate-700 font-medium">
                      ₹{Number(m.amount).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200 bg-slate-50">
                <td className="px-5 py-5 text-lg font-bold text-slate-900">
                  Total
                </td>
                <td className="px-5 py-5 text-right">
                  <span className="text-2xl font-bold text-trust-green">
                    ₹{Number(invoice?.totalAmount ?? 0).toLocaleString()}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            This is a simulated invoice for demonstration purposes only.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            No actual financial transactions have been processed.
          </p>
        </div>
      </Card>
    </div>
  );
}
