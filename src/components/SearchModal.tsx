import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  X,
  Clock,
  Trash2,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Building2,
  Users,
  CreditCard,
  Trophy,
  Briefcase,
  FlaskConical,
  Calendar,
  Megaphone,
  Bell,
  Image,
  PhoneCall,
  HelpCircle,
  ExternalLink,
  FileText,
  Loader2,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import { useSearch } from "./SearchContext";
import { searchIndex, SearchItem, SearchCategory } from "../data/searchIndexData";

const POPULAR_SEARCHES = [
  "Admission 2026",
  "B.Tech CSE",
  "Placements",
  "Fee Structure",
  "ERP Portal",
  "Faculty",
  "Hostel",
];

const RECENT_KEY = "rkgit_recent_searches";

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  "Courses & Programs": GraduationCap,
  Departments: Building2,
  "Faculty & Staff": Users,
  Admissions: Sparkles,
  Placements: Trophy,
  "Training & Internship": Briefcase,
  Research: FlaskConical,
  "Campus Life": Building2,
  Events: Calendar,
  "News & Announcements": Megaphone,
  Notices: Bell,
  Gallery: Image,
  "Contact & Location": PhoneCall,
  FAQs: HelpCircle,
  "Important Links": ExternalLink,
  "Policies & Ordinances": FileText,
  "Student Services": CreditCard,
};

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const tokens = query.trim().split(/\s+/).filter(Boolean).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (tokens.length === 0) return <>{text}</>;

  const regex = new RegExp(`(${tokens.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-amber-200/90 text-slate-900 font-semibold px-0.5 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function SearchModal() {
  const { isOpen, closeSearch, initialQuery } = useSearch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_KEY);
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch { 
      // Ignore storage error
    }
  }, []);

  // Sync initial query when opened
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery || "");
      setDebouncedQuery(initialQuery || "");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, initialQuery]);

  // Debounce search query input (250ms)
  useEffect(() => {
    if (!query.trim()) {
      setDebouncedQuery("");
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setIsSearching(false);
    }, 250);

    return () => clearTimeout(handler);
  }, [query]);

  // Execute search filtering
  const results = useMemo(() => {
    if (!debouncedQuery) return [];
    return searchIndex(debouncedQuery);
  }, [debouncedQuery]);

  // Group search results by category
  const groupedResults = useMemo(() => {
    const map: Record<string, SearchItem[]> = {};
    for (const item of results) {
      if (!map[item.category]) {
        map[item.category] = [];
      }
      map[item.category].push(item);
    }
    return map;
  }, [results]);

  // Flattened results for keyboard navigation
  const flatResults = useMemo(() => {
    return results;
  }, [results]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [debouncedQuery]);

  // Add query to recent searches
  const saveRecentSearch = useCallback((searchTerm: string) => {
    const term = searchTerm.trim();
    if (!term) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== term.toLowerCase());
      const updated = [term, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch {
      // Ignore
    }
  }, []);

  // Navigate to result URL
  const handleSelectResult = useCallback(
    (item: SearchItem) => {
      saveRecentSearch(query || item.title);
      closeSearch();

      if (item.isExternal || item.url.startsWith("http")) {
        window.open(item.url, "_blank", "noopener,noreferrer");
      } else {
        navigate({ to: item.url });
      }
    },
    [navigate, closeSearch, saveRecentSearch, query]
  );

  const handleSelectQuery = useCallback(
    (text: string) => {
      setQuery(text);
      setDebouncedQuery(text);
      saveRecentSearch(text);
    },
    [saveRecentSearch]
  );

  // Global Keyboard Listeners: Ctrl+K / ⌘+K, Esc, ArrowUp, ArrowDown, Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global Ctrl+K / Cmd+K toggle
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) closeSearch();
        else setQuery("");
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeSearch();
        return;
      }

      if (flatResults.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < flatResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatResults.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatResults[selectedIndex]) {
          handleSelectResult(flatResults[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSearch, flatResults, selectedIndex, handleSelectResult]);

  // Scroll active item into view
  useEffect(() => {
    if (!isOpen || flatResults.length === 0) return;
    const activeEl = document.getElementById(`search-item-${selectedIndex}`);
    if (activeEl && resultsContainerRef.current) {
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex, isOpen, flatResults]);

  if (!isOpen) return null;

  let currentItemOffset = 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-10 md:pt-20 px-3 sm:px-4 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={() => closeSearch()}
      role="dialog"
      aria-modal="true"
      aria-label="Search website"
    >
      {/* Search Modal Container */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[82vh] md:max-h-[75vh] animate-in zoom-in-95 duration-200"
      >
        {/* Search Header Input Bar */}
        <div className="relative flex items-center px-4 md:px-5 py-4 border-b border-slate-100 bg-white/90 shrink-0">
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0 mr-3" />
          ) : (
            <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          )}

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, admissions, faculty, placements, hostels..."
            className="flex-1 bg-transparent text-base md:text-lg text-slate-800 placeholder-slate-400 outline-none font-medium"
            aria-autocomplete="list"
            aria-controls="search-results-list"
          />

          {query && (
            <button
              onClick={() => {
                setQuery("");
                setDebouncedQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors mr-2 cursor-pointer"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => closeSearch()}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Results / Empty Body */}
        <div ref={resultsContainerRef} id="search-results-list" className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {/* STATE 1: Empty Query — Display Recent & Popular Searches */}
          {!query.trim() && (
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Recent Searches
                    </span>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-rose-500 hover:text-rose-600 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Trash2 className="w-3 h-3" /> Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectQuery(item)}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-primary-soft hover:text-primary text-slate-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer group"
                      >
                        <span>{item}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3 px-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuery(item)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-primary hover:text-white hover:border-primary text-slate-700 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs cursor-pointer group"
                    >
                      <span>{item}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STATE 2: Loading Spinner */}
          {query.trim() && isSearching && (
            <div className="py-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm font-medium">Searching RKGIT records...</p>
            </div>
          )}

          {/* STATE 3: No Results Found */}
          {query.trim() && !isSearching && flatResults.length === 0 && (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-500">
                <Search className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">No results found for "{query}"</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Try checking spelling, using broader terms, or explore popular sections below.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-2">
                {["B.Tech Admission", "Placements", "Fee Structure", "Contact Admission Office"].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectQuery(term)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary-soft text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STATE 4: Search Results Categorized List */}
          {query.trim() && !isSearching && flatResults.length > 0 && (
            <div className="space-y-5">
              {Object.entries(groupedResults).map(([category, items]) => {
                const CategoryIcon = CATEGORY_ICONS[category] || Building2;

                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <CategoryIcon className="w-3.5 h-3.5 text-primary" />
                      <span>{category}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-semibold">
                        {items.length}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {items.map((item) => {
                        const globalIdx = currentItemOffset++;
                        const isSelected = selectedIndex === globalIdx;

                        return (
                          <div
                            id={`search-item-${globalIdx}`}
                            key={item.id}
                            onClick={() => handleSelectResult(item)}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            className={`group flex items-start justify-between gap-3 p-3.5 rounded-2xl cursor-pointer transition-all duration-150 border ${
                              isSelected
                                ? "bg-primary-soft/80 border-primary/40 shadow-sm"
                                : "bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-200"
                            }`}
                          >
                            <div className="space-y-1 min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <h4
                                  className={`text-sm font-bold truncate ${
                                    isSelected ? "text-primary" : "text-slate-800 group-hover:text-primary"
                                  }`}
                                >
                                  <HighlightText text={item.title} query={query} />
                                </h4>
                                {item.badge && (
                                  <span className="shrink-0 rounded-full bg-accent/20 text-accent-foreground px-2 py-0.5 text-[10px] font-extrabold uppercase">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                <HighlightText text={item.description} query={query} />
                              </p>
                              <div className="text-[11px] font-medium text-slate-400 truncate pt-0.5">
                                {item.url}
                              </div>
                            </div>

                            <div className="flex items-center shrink-0 pt-1">
                              {item.isExternal ? (
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                              ) : (
                                <CornerDownLeft
                                  className={`w-4 h-4 transition-transform ${
                                    isSelected ? "text-primary translate-x-0.5" : "text-slate-300 opacity-0 group-hover:opacity-100"
                                  }`}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer Controls Helper */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono shadow-2xs">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono shadow-2xs">
                ↓
              </kbd>
              <span className="hidden sm:inline">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono shadow-2xs">
                ↵
              </kbd>
              <span className="hidden sm:inline">Select</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-slate-400">Shortcut:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono text-[10px] shadow-2xs">
              Ctrl + K
            </kbd>
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-slate-600">RKGIT Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}
