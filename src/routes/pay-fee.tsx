import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, ChevronRight } from "lucide-react";
import { Header, Footer, Chatbot } from "./index";
import { StudentFeeFormData, TransactionDetails, FeeReceiptData } from "@/types/feePayment";
import { FeePaymentForm } from "@/components/fee/FeePaymentForm";
import { DummyPaymentGateway } from "@/components/fee/DummyPaymentGateway";
import { ReceiptPDFGenerator } from "@/components/fee/ReceiptPDFGenerator";

export const Route = createFileRoute("/pay-fee")({
  head: () => ({
    meta: [
      { title: "Student Fee Payment Portal — RKGIT Ghaziabad" },
      {
        name: "description",
        content:
          "Online fee payment portal for RKGIT students. Pay college and hostel fees quickly and generate official provisional fee receipts.",
      },
      { property: "og:title", content: "Student Fee Payment Portal — RKGIT" },
      {
        property: "og:description",
        content: "Enter your student details to continue with online fee payment.",
      },
    ],
  }),
  component: PayFeePage,
});

type FlowStep = "FORM" | "GATEWAY" | "RECEIPT";

function PayFeePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<FlowStep>("FORM");

  const [student, setStudent] = useState<StudentFeeFormData | null>(null);
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);

  // Form submission opens Gateway Modal
  const handleFormSubmit = (data: StudentFeeFormData) => {
    setStudent(data);
    setStep("GATEWAY");
  };

  // Gateway payment success transitions directly to Receipt view
  const handleGatewaySuccess = (tx: TransactionDetails) => {
    setTransaction(tx);
    setStep("RECEIPT");
  };

  // Construct complete receipt data
  const receiptData: FeeReceiptData | null =
    student && transaction
      ? {
          receiptNo: `RKGIT/REC/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          student,
          transaction,
          accountNumber: "2400330100399",
        }
      : null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-primary-soft/30 via-background to-background py-8 sm:py-12">
        <div className="container-page">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 max-w-4xl mx-auto">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Student Portal</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">Pay Fee</span>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Page Header (Only shown during FORM step) */}
            {step === "FORM" && (
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-3 border border-primary/20">
                  <CreditCard className="h-3.5 w-3.5" /> Online Fee Payment Portal
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  Student Online Fee Payment
                </h1>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                  Enter your academic details and payable amount below to proceed with fee payment.
                </p>
              </div>
            )}

            {/* Step 1: Fee Payment Form */}
            {step === "FORM" && (
              <FeePaymentForm
                initialValues={student || undefined}
                onSubmit={handleFormSubmit}
                onCancel={() => navigate({ to: "/" })}
              />
            )}

            {/* Step 2: Dummy Gateway Modal */}
            {student && (
              <DummyPaymentGateway
                student={student}
                isOpen={step === "GATEWAY"}
                onClose={() => setStep("FORM")}
                onSuccess={handleGatewaySuccess}
              />
            )}

            {/* Step 3: Fee Receipt View & PDF Export */}
            {step === "RECEIPT" && receiptData && (
              <ReceiptPDFGenerator data={receiptData} />
            )}
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
