import React, { useState } from "react";
import {
  CreditCard,
  Building,
  Smartphone,
  ShieldCheck,
  Lock,
  Loader2,
  X,
  ChevronDown,
} from "lucide-react";
import { StudentFeeFormData, TransactionDetails, numberToWords } from "@/types/feePayment";

interface DummyPaymentGatewayProps {
  student: StudentFeeFormData;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (transaction: TransactionDetails) => void;
}

type PaymentTab = "debit" | "credit" | "upi" | "netbanking";

const NET_BANKING_BANKS = ["SBI", "ICICI", "HDFC", "Axis", "PNB"];

export function DummyPaymentGateway({
  student,
  isOpen,
  onClose,
  onSuccess,
}: DummyPaymentGatewayProps) {
  const [tab, setTab] = useState<PaymentTab>("debit");
  const [processing, setProcessing] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState("4532 8921 7734 8921");
  const [cardHolder, setCardHolder] = useState(student.name || "Student Name");
  const [expiry, setExpiry] = useState("08/28");
  const [cvv, setCvv] = useState("492");
  const [upiId, setUpiId] = useState("student@upi");
  const [selectedBank, setSelectedBank] = useState("SBI");

  if (!isOpen) return null;

  const numericAmount = parseFloat(student.amount) || 0;
  const formattedAmount = `₹${numericAmount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  const amountWords = numberToWords(numericAmount);

  const handlePay = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      // Generate dummy transaction details
      const randomDigits = Math.floor(100000000 + Math.random() * 900000000).toString();
      const transactionId = `TXN${randomDigits}`;
      const paymentId = `PAY${Math.floor(10000000 + Math.random() * 90000000)}`;
      const referenceNumber = `REF2026${Math.floor(100000 + Math.random() * 900000)}`;

      const now = new Date();
      const formattedDate =
        now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) +
        " " +
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

      let methodLabel: TransactionDetails["paymentMethod"] = "Debit Card";
      let modeDetails = "";

      if (tab === "debit") {
        methodLabel = "Debit Card";
        modeDetails = `VISA Ending in ${cardNumber.slice(-4) || "8921"}`;
      } else if (tab === "credit") {
        methodLabel = "Credit Card";
        modeDetails = `Mastercard Ending in ${cardNumber.slice(-4) || "8921"}`;
      } else if (tab === "upi") {
        methodLabel = "UPI";
        modeDetails = upiId;
      } else if (tab === "netbanking") {
        methodLabel = "Net Banking";
        modeDetails = `${selectedBank} Internet Banking`;
      }

      const transaction: TransactionDetails = {
        transactionId,
        paymentId,
        referenceNumber,
        paymentMethod: methodLabel,
        paymentModeDetails: modeDetails,
        date: formattedDate,
        amount: numericAmount,
        amountFormatted: formattedAmount,
        amountInWords: amountWords,
      };

      onSuccess(transaction);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-up">
      <div className="bg-card w-full max-w-xl rounded-3xl border border-border shadow-lift overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-navy text-navy-foreground px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 grid place-items-center">
              <Lock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <div className="text-xs text-navy-foreground/70 uppercase tracking-wider font-semibold">
                Dummy Payment Gateway
              </div>
              <div className="text-base font-bold text-white">RKGIT Online Fee Portal</div>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={processing}
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Payment Method Selector Tabs */}
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-3">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <TabButton
                active={tab === "debit"}
                onClick={() => setTab("debit")}
                icon={<CreditCard className="h-4 w-4" />}
                label="Debit Card"
              />
              <TabButton
                active={tab === "credit"}
                onClick={() => setTab("credit")}
                icon={<CreditCard className="h-4 w-4" />}
                label="Credit Card"
              />
              <TabButton
                active={tab === "upi"}
                onClick={() => setTab("upi")}
                icon={<Smartphone className="h-4 w-4" />}
                label="UPI"
              />
              <TabButton
                active={tab === "netbanking"}
                onClick={() => setTab("netbanking")}
                icon={<Building className="h-4 w-4" />}
                label="Net Banking"
              />
            </div>
          </div>

          {/* Dynamic Tab Contents */}
          <div className="bg-surface rounded-2xl border border-border p-5">
            {(tab === "debit" || tab === "credit") && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Card Number</label>
                  <input
                    type="text"
                    className="w-full h-11 mt-1 rounded-xl border border-border bg-white px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="4532 0000 0000 8921"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">Card Holder Name</label>
                  <input
                    type="text"
                    className="w-full h-11 mt-1 rounded-xl border border-border bg-white px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="As shown on card"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground">Expiry Date</label>
                    <input
                      type="text"
                      className="w-full h-11 mt-1 rounded-xl border border-border bg-white px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      className="w-full h-11 mt-1 rounded-xl border border-border bg-white px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {tab === "upi" && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-foreground">
                  Virtual Payment Address (VPA)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full h-11 rounded-xl border border-border bg-white px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="student@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <div className="absolute right-3 top-2.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    Verified
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter your Google Pay, PhonePe, Paytm, or BHIM VPA ID.
                </p>
              </div>
            )}

            {tab === "netbanking" && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-foreground">Select Bank</label>
                <div className="relative">
                  <select
                    className="w-full h-11 appearance-none rounded-xl border border-border bg-white px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    {NET_BANKING_BANKS.map((b) => (
                      <option key={b} value={b}>
                        {b} Bank
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="h-4 w-4 absolute right-3 top-3.5 text-muted-foreground pointer-events-none" />
                </div>
                <p className="text-xs text-muted-foreground">
                  You will be redirected to your bank&apos;s dummy internet banking page.
                </p>
              </div>
            )}
          </div>

          {/* Amount Bar */}
          <div className="bg-primary-soft/50 rounded-2xl p-4 border border-primary/20 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground font-semibold">Total Payable Fee</div>
              <div className="text-xs text-foreground mt-0.5 font-medium">
                {student.feeType === "college" ? "College Academic Fee" : "Hostel Fee"} ({student.course})
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground font-semibold">Amount</div>
              <div className="text-xl font-extrabold text-primary">{formattedAmount}</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-surface border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> Demo Payment Gateway
          </div>

          <button
            onClick={handlePay}
            disabled={processing}
            className="w-full sm:w-auto min-w-[200px] h-12 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-secondary transition-all shadow-soft cursor-pointer disabled:opacity-80"
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Pay Securely</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
        active
          ? "border-primary bg-primary/10 text-primary shadow-xs"
          : "border-border bg-white text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
