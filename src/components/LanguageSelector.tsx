import { useEffect, useState, useRef } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

/**
 * LanguageSelector Component
 * 
 * Premium compact language selector for English & Hindi full-page translation.
 * Uses Google Translate under the hood with local cookie/storage persistence.
 * 
 * Features:
 * - Ultra-compact width (reduced by 25-30% for a clean header layout).
 * - Theme-aware palette using Website Navy, White, and Gold (#F5A623) accents.
 * - Smooth open/close dropdown animation and micro-interactions.
 * - Accessibility with click-outside listener and ARIA attributes.
 */

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const STORAGE_KEY = "rkgit_lang_pref";

function setCookie(name: string, value: string, days?: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  const domain = window.location.hostname;
  document.cookie = `${name}=${value}${expires}; path=/`;
  if (domain && domain !== "localhost" && domain !== "127.0.0.1") {
    document.cookie = `${name}=${value}${expires}; path=/; domain=.${domain}`;
  }
}

function deleteCookie(name: string) {
  const domain = window.location.hostname;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  if (domain && domain !== "localhost" && domain !== "127.0.0.1") {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
  }
}

interface LanguageSelectorProps {
  className?: string;
  variant?: "dark" | "light";
}

interface LanguageOption {
  value: "en" | "hi";
  label: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
];

export function LanguageSelector({ className = "", variant = "dark" }: LanguageSelectorProps) {
  const [currentLang, setCurrentLang] = useState<"en" | "hi">("en");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read saved language preference. Default to "en".
    const saved = localStorage.getItem(STORAGE_KEY);
    const initialLang: "en" | "hi" = saved === "hi" ? "hi" : "en";
    setCurrentLang(initialLang);

    if (initialLang === "hi") {
      setCookie("googtrans", "/en/hi");
    } else {
      deleteCookie("googtrans");
      setCookie("googtrans", "/en/en");
    }

    // Inject Google Translate script dynamically if missing
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const switchLanguage = (lang: "en" | "hi") => {
    if (lang === currentLang) {
      setIsOpen(false);
      return;
    }

    setCurrentLang(lang);
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, lang);

    if (lang === "hi") {
      setCookie("googtrans", "/en/hi");
    } else {
      deleteCookie("googtrans");
      setCookie("googtrans", "/en/en");
    }

    // Trigger select change event if Google Translate element is active
    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
    }

    // Reload page to apply/revert full page translation
    window.location.reload();
  };

  const isDark = variant === "dark";
  const activeOption = LANGUAGE_OPTIONS.find((opt) => opt.value === currentLang);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Compact Dropdown Trigger Button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select Language"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-[88px] h-8 px-2.5 flex items-center justify-between gap-1.5 rounded-lg text-xs font-medium transition-all duration-200 border cursor-pointer select-none ${
          isDark
            ? "bg-white/10 border-white/15 text-white hover:bg-white/15 hover:border-white/25 active:bg-white/20 backdrop-blur-md"
            : "bg-white/90 border-slate-200 text-slate-800 hover:bg-white hover:border-slate-300 shadow-2xs"
        }`}
      >
        <div className="flex items-center gap-1.5 truncate">
          <Globe className={`h-3.5 w-3.5 shrink-0 ${isDark ? "text-[#F5A623]" : "text-amber-600"}`} />
          <span className="truncate">{activeOption?.label || "English"}</span>
        </div>
        <ChevronDown
          className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
            isDark ? "text-white/60" : "text-slate-400"
          } ${isOpen ? "rotate-180 text-[#F5A623]" : ""}`}
        />
      </button>

      {/* Premium Compact Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Language options"
          className={`absolute right-0 mt-1 w-[96px] z-50 p-1 rounded-lg border shadow-xl backdrop-blur-xl transition-all duration-200 animate-in fade-in-50 zoom-in-95 ${
            isDark
              ? "bg-[#0F172A]/95 border-white/15 text-white shadow-black/40"
              : "bg-white/95 border-slate-200 text-slate-800 shadow-slate-900/10"
          }`}
        >
          {LANGUAGE_OPTIONS.map((option) => {
            const isSelected = option.value === currentLang;
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => switchLanguage(option.value)}
                className={`flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md cursor-pointer transition-colors duration-150 select-none ${
                  isSelected
                    ? isDark
                      ? "bg-[#F5A623]/15 text-[#F5A623] font-semibold"
                      : "bg-amber-50 text-[#D97706] font-semibold"
                    : isDark
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-slate-700 hover:bg-amber-500/10 hover:text-slate-900"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <Check className={`h-3.5 w-3.5 shrink-0 ${isDark ? "text-[#F5A623]" : "text-[#D97706]"}`} />
                )}
              </div>
            );
          })}
        </div>
      )}

      <div id="google_translate_element" className="hidden" aria-hidden="true" />
    </div>
  );
}
