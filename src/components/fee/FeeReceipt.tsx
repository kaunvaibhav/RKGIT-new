import React from "react";
import { FeeReceiptData } from "@/types/feePayment";
import rkgitLogo from "@/assets/rkgitlogo.png";

interface FeeReceiptProps {
  data: FeeReceiptData;
}

export function FeeReceipt({ data }: FeeReceiptProps) {
  const { receiptNo, date, student, transaction, accountNumber } = data;
  const isHostel = student.feeType === "hostel";

  return (
    <div
      id="rkgit-fee-receipt"
      className="relative bg-white text-slate-900 mx-auto font-sans shadow-xl border border-slate-300 p-6 sm:p-10 w-full max-w-[820px] min-h-[1050px] flex flex-col justify-between overflow-hidden text-sm print:shadow-none print:border-none print:m-0 print:p-8"
      style={{
        boxSizing: "border-box",
        fontFamily: "'Inter', 'Plus Jakarta Sans', Arial, sans-serif",
      }}
    >
      {/* 4%-6% Opacity Watermark Logo behind all content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <img
          src={rkgitLogo}
          alt="RKGIT Watermark"
          className="w-[450px] opacity-[0.05] object-contain select-none grayscale"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 space-y-4">
        {/* Header Section: Left-aligned Logo, Right-aligned Institute Details */}
        <div className="flex items-center gap-4 sm:gap-6 border-b-2 border-[#123A72] pb-4">
          {/* Logo on Left (80-100px) */}
          <div className="w-[85px] h-[85px] sm:w-[95px] sm:h-[95px] shrink-0 flex items-center justify-center">
            <img
              src={rkgitLogo}
              alt="RKGIT Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Institute Name & Address on Right */}
          <div className="flex-1 text-left space-y-0.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#123A72] tracking-wide uppercase leading-tight">
              Raj Kumar Goel Institute of Technology
            </h1>
            <div className="text-xs text-slate-700 leading-snug font-medium">
              5th KM Stone, Opp. Jain Tube Co. Ltd.
              <br />
              Delhi Meerut Road, Ghaziabad (U.P.) - 201003
              <br />
              <span className="inline-block mt-0.5 text-[11px] text-slate-600">
                FAX : 0120-2788350 &nbsp;|&nbsp; TEL : 0120-2788273, 2788409
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center py-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#123A72] tracking-wider uppercase underline underline-offset-4 decoration-2">
            PROVISIONAL FEE RECEIPT
          </h2>
        </div>

        {/* Receipt Information Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs border border-slate-300 rounded-lg p-3.5 bg-slate-50/50">
          <div className="flex">
            <span className="font-semibold text-slate-600 w-28">Receipt No.:</span>
            <span className="font-bold text-slate-900 font-mono">{receiptNo}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-slate-600 w-28">Date:</span>
            <span className="font-bold text-slate-900">{date}</span>
          </div>

          <div className="flex">
            <span className="font-semibold text-slate-600 w-28">Roll Number:</span>
            <span className="font-bold text-slate-900 font-mono">{student.roll}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-slate-600 w-28">Student Name:</span>
            <span className="font-bold text-slate-900 uppercase">{student.name}</span>
          </div>

          <div className="flex">
            <span className="font-semibold text-slate-600 w-28">College ID:</span>
            <span className="font-bold text-slate-900 font-mono">{student.collegeId}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-slate-600 w-28">Course:</span>
            <span className="font-bold text-slate-900">{student.course}</span>
          </div>

          <div className="flex">
            <span className="font-semibold text-slate-600 w-28">Branch:</span>
            <span className="font-bold text-slate-900">{student.branch}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-slate-600 w-28">Academic Year:</span>
            <span className="font-bold text-slate-900">{student.year}</span>
          </div>

          <div className="flex col-span-2">
            <span className="font-semibold text-slate-600 w-28">Fee Type:</span>
            <span className="font-bold text-[#123A72] uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {isHostel ? "Hostel Fee" : "College Fee"}
            </span>
          </div>
        </div>

        {/* Main Table: Two-column layout (Particulars & Amount) */}
        <div>
          <table className="w-full border-collapse border border-slate-300 text-xs">
            <thead>
              <tr className="bg-[#123A72] text-white font-bold uppercase tracking-wider">
                <th className="border border-slate-300 p-2.5 text-left w-3/4">Particulars</th>
                <th className="border border-slate-300 p-2.5 text-right w-1/4">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="border border-slate-300 p-3 space-y-1">
                  <div className="font-semibold text-slate-800">
                    Account: <span className="font-mono text-slate-900 font-bold">{accountNumber}</span>
                  </div>
                  <div className="font-bold text-slate-900 uppercase">{student.name}</div>
                  <div className="text-slate-600 italic">
                    {isHostel
                      ? "Hostel Accommodation & Mess Charges"
                      : "Tuition, Development & Academic Fee"}
                  </div>
                </td>
                <td className="border border-slate-300 p-3 text-right font-bold text-slate-900 text-sm">
                  {transaction.amountFormatted}
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold">
                <td className="border border-slate-300 p-2.5 text-right uppercase">Total Paid</td>
                <td className="border border-slate-300 p-2.5 text-right text-sm text-[#123A72]">
                  {transaction.amountFormatted}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bank Details Table */}
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase text-[#123A72] tracking-wider">
            Bank Transaction Details
          </div>
          <table className="w-full border-collapse border border-slate-300 text-xs">
            <tbody>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold text-slate-600 bg-slate-50 w-1/3">
                  Through / Channel
                </td>
                <td className="border border-slate-300 p-2 font-semibold text-slate-900">
                  Online Payment Gateway ({transaction.paymentMethod})
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold text-slate-600 bg-slate-50">
                  Transaction ID
                </td>
                <td className="border border-slate-300 p-2 font-mono font-bold text-slate-900">
                  {transaction.transactionId}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold text-slate-600 bg-slate-50">
                  Reference Number
                </td>
                <td className="border border-slate-300 p-2 font-mono font-bold text-slate-900">
                  {transaction.referenceNumber}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold text-slate-600 bg-slate-50">
                  Payment Mode
                </td>
                <td className="border border-slate-300 p-2 text-slate-900">
                  {transaction.paymentMethod}{" "}
                  {transaction.paymentModeDetails ? `(${transaction.paymentModeDetails})` : ""}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold text-slate-600 bg-slate-50">
                  Transaction Date
                </td>
                <td className="border border-slate-300 p-2 text-slate-900">{transaction.date}</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold text-slate-600 bg-slate-50">
                  Amount
                </td>
                <td className="border border-slate-300 p-2 font-bold text-slate-900">
                  {transaction.amountFormatted}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Amount in Words */}
        <div className="border border-slate-300 bg-slate-50/80 rounded p-2.5 text-xs">
          <span className="font-semibold text-slate-600">Amount in Words: </span>
          <span className="font-bold text-slate-900 italic">{transaction.amountInWords}</span>
        </div>
      </div>

      {/* Bottom Section: Stamp, Signatory & Footer */}
      <div className="relative z-10 mt-8 pt-4 space-y-6">
        {/* Stamp & Signatory Row */}
        <div className="flex items-end justify-between px-2">
          <div className="text-[11px] text-slate-500 max-w-[260px] leading-snug">
            This is a computer-generated provisional fee receipt. No physical signature is required.
          </div>

          {/* Blue Circular PAID Stamp & Signatory */}
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="relative h-20 w-20 rounded-full border-4 border-double border-[#123A72] flex items-center justify-center rotate-[-12deg] shadow-xs select-none">
              <div className="absolute inset-1 rounded-full border border-dashed border-[#123A72]" />
              <div className="text-center leading-none">
                <div className="text-[8px] font-black uppercase text-[#123A72] tracking-tighter">
                  RKGIT GZB
                </div>
                <div className="text-base font-black uppercase text-[#123A72] my-0.5 tracking-wider">
                  PAID
                </div>
                <div className="text-[7px] font-bold text-[#123A72] uppercase">
                  FINANCE DEPT
                </div>
              </div>
            </div>

            <div className="text-xs font-bold text-[#123A72] pt-1 border-t border-slate-400 w-36">
              Authorised Signatory
            </div>
          </div>
        </div>

        {/* Footer Line & Jurisdiction */}
        <div className="border-t-2 border-[#123A72] pt-2 text-center text-[11px] text-slate-600 space-y-0.5">
          <p className="font-semibold text-slate-700">Subject to Ghaziabad Jurisdiction only</p>
          <p className="text-slate-500">Subject to successful payment confirmation.</p>
        </div>
      </div>
    </div>
  );
}
