import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ExternalLink, X } from "lucide-react";

interface QuickLink {
  title: string;
  href: string;
  isExternal?: boolean;
}

const IMPORTANT_LINKS: QuickLink[] = [
  { title: "RKGIT Campus Tour", href: "https://rkgit.edu.in/", isExternal: true },
  { title: "Grievance Redressal", href: "https://rkgit.edu.in/grievance-redressal", isExternal: true },
  { title: "Admission Procedure", href: "https://rkgit.edu.in/admission-procedure", isExternal: true },
  { title: "Mandatory Disclosure", href: "https://rkgit.edu.in/mandatory-disclosure", isExternal: true },
  { title: "Information Brochure", href: "https://rkgit.edu.in/information-brochure", isExternal: true },
  { title: "Counselling Support", href: "https://rkgit.edu.in/counselling-support", isExternal: true },
  { title: "Ex-Student Verification Services", href: "https://rkgit.edu.in/ex-student-verification", isExternal: true },
];

export const FloatingActionPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Fade-in effect on initial mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Keyboard Escape listener & focus handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Outside click listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* --- LEFT SIDE: IMPORTANT LINKS TAB & FLOATING POPUP --- */}
      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-500 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Vertical Tab attached to Left Edge */}
        <button
          ref={toggleBtnRef}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="rkgit-important-links-popup"
          aria-label="Toggle Important Links floating panel"
          className="group flex flex-col items-center gap-2.5 bg-[#0B4F8A] text-white py-4 px-3 rounded-r-lg shadow-xl cursor-pointer hover:bg-[#1565C0] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B4F8A]"
        >
          <ChevronRight
            className={`w-4 h-4 text-white/90 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "group-hover:translate-x-0.5"
            }`}
          />
          <span
            className="font-semibold text-sm tracking-wide select-none whitespace-nowrap"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            Important Links
          </span>
        </button>
      </div>

      {/* Floating Popup Panel (Anchored beside Left Tab, ~120px Top Margin) */}
      {isOpen && (
        <>
          {/* Subtle click-outside backdrop */}
          <div
            aria-hidden="true"
            onClick={() => {
              setIsOpen(false);
              toggleBtnRef.current?.focus();
            }}
            className="fixed inset-0 bg-black/10 z-40 transition-opacity duration-250 animate-fade-in"
          />

          <div
            id="rkgit-important-links-popup"
            ref={popupRef}
            role="dialog"
            aria-modal="true"
            aria-label="Important Links"
            className="fixed top-[120px] left-[52px] max-md:left-3 z-50 w-[90vw] sm:w-[320px] max-w-[320px] bg-white rounded-[10px] shadow-2xl border border-[#ECECEC] overflow-hidden flex flex-col max-h-[420px] max-md:max-h-[60vh] transition-all duration-300 ease-out animate-in fade-in slide-in-from-left-2"
          >
            {/* Fixed Header */}
            <div className="bg-[#0B4F8A] text-white px-5 py-4 flex items-center justify-between shadow-sm shrink-0 rounded-t-[9px]">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white m-0">
                Important Links
              </h2>
              <button
                ref={closeBtnRef}
                onClick={() => {
                  setIsOpen(false);
                  toggleBtnRef.current?.focus();
                }}
                aria-label="Close Important Links popup"
                className="p-1 rounded-full hover:bg-white/20 text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Links Body */}
            <div className="flex-1 overflow-y-auto py-0">
              <ul className="list-none p-0 m-0 divide-y divide-[#ECECEC]">
                {IMPORTANT_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      target={link.isExternal ? "_blank" : "_self"}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3.5 px-5 py-4 text-[#333] hover:bg-[#F5F8FC] hover:text-[#0B4F8A] transition-colors duration-200 cursor-pointer font-medium text-[14px] leading-snug no-underline focus:outline-none focus-visible:bg-[#F5F8FC] focus-visible:text-[#0B4F8A]"
                    >
                      <ExternalLink className="w-4 h-4 shrink-0 text-[#0B4F8A]/75 group-hover:text-[#0B4F8A] transition-colors duration-200" />
                      <span className="truncate">{link.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {/* --- RIGHT SIDE FLOATING BUTTONS --- */}
      <div
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3.5 transition-opacity duration-500 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* WhatsApp Button (Square 50x50px with rounded-[10px] corners, aligned on same vertical axis) */}
        <a
          href="https://wa.me/919667652196"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact RKGIT Admission on WhatsApp"
          className="w-[50px] h-[50px] rounded-[10px] bg-[#25D366] text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-[1.08] hover:bg-[#20bd5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>

        {/* Admission Button (Vertical Text) */}
        <a
          href="https://admission.rkgit.edu.in/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Register For Admission 2026-27"
          className="group flex items-center justify-center bg-[#0B4F8A] text-white py-4 px-3.5 rounded-l-lg shadow-xl cursor-pointer hover:bg-[#1565C0] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B4F8A] no-underline"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          <span className="font-semibold text-sm tracking-wider select-none whitespace-nowrap">
            Register For Admission 2026-27
          </span>
        </a>
      </div>
    </>
  );
};
