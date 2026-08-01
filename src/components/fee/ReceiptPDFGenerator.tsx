import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import { Download, Printer, Loader2, AlertCircle } from "lucide-react";
import { FeeReceiptData } from "@/types/feePayment";
import { FeeReceipt } from "./FeeReceipt";

interface ReceiptPDFGeneratorProps {
  data: FeeReceiptData;
}

/**
 * Ensures all images and fonts inside the specified container are fully loaded before canvas render.
 */
const waitForImages = async (container: HTMLElement): Promise<void> => {
  const images = Array.from(container.querySelectorAll("img"));

  const promises = images.map((img) => {
    if (img.complete && img.naturalHeight !== 0) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      const handleFinish = () => {
        img.removeEventListener("load", handleFinish);
        img.removeEventListener("error", handleFinish);
        resolve();
      };
      img.addEventListener("load", handleFinish);
      img.addEventListener("error", handleFinish);
    });
  });

  await Promise.all(promises);

  if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (err) {
      console.warn("Font readiness check warning:", err);
    }
  }

  // Brief delay to allow browser repaint and final layout calculation
  await new Promise((resolve) => setTimeout(resolve, 150));
};

export function ReceiptPDFGenerator({ data }: ReceiptPDFGeneratorProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  // Direct browser printing
  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `FeeReceipt_${data.student.roll || "RKGIT"}`,
  });

  // True A4 PDF export using html2canvas & jsPDF at high resolution
  const handleDownloadPDF = async () => {
    if (!receiptRef.current) {
      const err = new Error("Receipt element ref is unavailable.");
      console.error("PDF Generation error:", err);
      console.error(err.stack);
      setDownloadError(err.message);
      return;
    }

    setDownloading(true);
    setDownloadError(null);

    try {
      const element = receiptRef.current;

      // 1. Wait until all images (especially logo and watermark) are fully loaded
      await waitForImages(element);

      // 2. High-resolution canvas render using specified parameters
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: 0,
      });

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas element rendered zero dimensions.");
      }

      const imgData = canvas.toDataURL("image/png", 1.0);

      // 3. Create A4 PDF (210mm x 297mm) Portrait
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      if (imgHeight <= pdfHeight) {
        // Fit single page without cropping or blank pages
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");
      } else {
        // Handle multi-page content gracefully
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
          heightLeft -= pdfHeight;
        }
      }

      const rollNumber = data.student.roll ? data.student.roll.trim() : "RKGIT";
      const filename = `FeeReceipt_${rollNumber}.pdf`;

      pdf.save(filename);
    } catch (error: any) {
      console.error("PDF Generation failed:", error);
      if (error && error.stack) {
        console.error("Stack trace:", error.stack);
      }
      const message = error instanceof Error ? error.message : String(error);
      setDownloadError(`Failed to generate PDF: ${message}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Error Message display */}
      {downloadError && (
        <div className="max-w-[820px] mx-auto p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span className="font-medium">{downloadError}</span>
          </div>
          <button
            onClick={() => setDownloadError(null)}
            className="text-red-500 font-bold hover:text-red-800 text-xs ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Action Buttons (Top-Right Aligned on Desktop, Stacked on Mobile) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 max-w-[820px] mx-auto">
        <button
          onClick={() => handlePrint()}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-white text-primary text-xs font-bold px-5 py-2.5 hover:bg-primary-soft transition-colors cursor-pointer shadow-xs"
        >
          <Printer className="h-4 w-4" />
          <span>Print Receipt</span>
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground text-xs font-bold px-6 py-2.5 hover:bg-secondary transition-colors shadow-soft cursor-pointer disabled:opacity-75"
        >
          {downloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </>
          )}
        </button>
      </div>

      {/* Centered Embedded Printable Receipt Container */}
      <div className="flex justify-center overflow-x-auto pb-6">
        <div ref={receiptRef} className="w-full max-w-[820px]">
          <FeeReceipt data={data} />
        </div>
      </div>
    </div>
  );
}
