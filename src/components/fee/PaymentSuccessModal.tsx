import React from "react";
import { CheckCircle2, ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { StudentFeeFormData, TransactionDetails } from "@/types/feePayment";

interface PaymentSuccessModalProps {
  student: StudentFeeFormData;
  transaction: TransactionDetails;
  isOpen: boolean;
  onProceedToReceipt: () => void;
}

export function PaymentSuccessModal({
  student,
  transaction,
  isOpen,
  onProceedToReceipt,
}: PaymentSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-up">
      <div className="bg-card w-full max-w-md rounded-3xl border border-border shadow-lift overflow-hidden p-6 sm:p-8 text-center space-y-6">
        {/* Animated Check Icon */}
        <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner animate-pulse">
          <CheckCircle2 className="h-12 w-12" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold text-xs rounded-full border border-emerald-200 mb-2">
            Transaction Complete
          </span>
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
            ✓ Payment Successful
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your fee payment has been successfully recorded in the RKGIT student ledger.
          </p>
        </div>

        {/* Transaction Summary Box */}
        <div className="bg-surface rounded-2xl border border-border p-4 text-left space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-border/60">
            <span className="text-muted-foreground font-semibold">Student Name:</span>
            <span className="font-bold text-foreground">{student.name}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/60">
            <span className="text-muted-foreground font-semibold">Roll Number:</span>
            <span className="font-bold text-foreground">{student.roll}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/60">
            <span className="text-muted-foreground font-semibold">Transaction ID:</span>
            <span className="font-mono text-primary font-bold">{transaction.transactionId}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/60">
            <span className="text-muted-foreground font-semibold">Payment ID:</span>
            <span className="font-mono text-foreground font-semibold">{transaction.paymentId}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/60">
            <span className="text-muted-foreground font-semibold">Reference No:</span>
            <span className="font-mono text-foreground font-semibold">{transaction.referenceNumber}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-muted-foreground font-semibold">Amount Paid:</span>
            <span className="font-extrabold text-emerald-600 text-sm">{transaction.amountFormatted}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onProceedToReceipt}
          className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-secondary transition-all shadow-soft cursor-pointer"
        >
          <FileText className="h-4 w-4" />
          <span>View & Download Fee Receipt</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          Official RKGIT Provisional Receipt Ready
        </div>
      </div>
    </div>
  );
}
