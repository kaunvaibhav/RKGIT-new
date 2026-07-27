import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { CustomDropdown, DropdownOption } from "@/components/ui/CustomDropdown";

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

const LANGUAGE_OPTIONS: DropdownOption[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
];

export function LanguageSelector({ className = "", variant = "dark" }: LanguageSelectorProps) {
  const [currentLang, setCurrentLang] = useState<"en" | "hi">("en");

  useEffect(() => {
    // Check saved language preference. Default to "en".
    const saved = localStorage.getItem(STORAGE_KEY);
    const initialLang: "en" | "hi" = saved === "hi" ? "hi" : "en";
    setCurrentLang(initialLang);

    if (initialLang === "hi") {
      setCookie("googtrans", "/en/hi");
    } else {
      deleteCookie("googtrans");
      setCookie("googtrans", "/en/en");
    }

    // Inject Google Translate script dynamically if not present
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

  const switchLanguage = (langVal: string) => {
    const lang = langVal as "en" | "hi";
    if (lang === currentLang) return;

    setCurrentLang(lang);
    localStorage.setItem(STORAGE_KEY, lang);

    if (lang === "hi") {
      setCookie("googtrans", "/en/hi");
    } else {
      deleteCookie("googtrans");
      setCookie("googtrans", "/en/en");
    }

    // Trigger select change event if Google Translate dropdown exists
    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
    }

    // Reload page to perform or revert full-page translation cleanly
    window.location.reload();
  };

  const isDark = variant === "dark";

  return (
    <div className={`relative inline-flex items-center min-w-[110px] ${className}`}>
      <CustomDropdown
        options={LANGUAGE_OPTIONS}
        value={currentLang}
        onChange={switchLanguage}
        variant={isDark ? "dark" : "light"}
        size="sm"
        searchable={false}
        leftIcon={<Globe className={`h-3.5 w-3.5 shrink-0 ${isDark ? "text-accent" : "text-primary"}`} />}
        aria-label="Select Language"
        className="w-auto"
      />
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
    </div>
  );
}
