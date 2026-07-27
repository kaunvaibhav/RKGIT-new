import React, { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Check, Search, AlertCircle } from "lucide-react";

export type DropdownOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export interface CustomDropdownProps {
  options: Array<string | DropdownOption>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  error?: boolean | string;
  required?: boolean;
  className?: string;
  menuClassName?: string;
  variant?: "default" | "dark" | "light" | "outline" | "ghost" | "admin";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  id?: string;
  name?: string;
  "aria-label"?: string;
}

export function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchable,
  searchPlaceholder = "Search...",
  disabled = false,
  error = false,
  required = false,
  className = "",
  menuClassName = "",
  variant = "default",
  size = "md",
  leftIcon,
  id,
  name,
  "aria-label": ariaLabel,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsListRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const dropdownId = id || generatedId;

  // Normalize options array into DropdownOption objects
  const normalizedOptions: DropdownOption[] = options.map((opt) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    }
    return opt;
  });

  // Filter options based on search query
  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto enable search if > 6 options and not explicitly set to false
  const shouldShowSearch = searchable !== undefined ? searchable : normalizedOptions.length > 6;

  // Find active option label
  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

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

  // Focus search input when opening
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setHighlightedIndex(-1);
      if (shouldShowSearch) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    }
  }, [isOpen, shouldShowSearch]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionsListRef.current) {
      const activeEl = optionsListRef.current.children[highlightedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  const handleSelect = (optValue: string, isDisabled?: boolean) => {
    if (isDisabled || disabled) return;
    onChange(optValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          const item = filteredOptions[highlightedIndex];
          handleSelect(item.value, item.disabled);
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  // Base Size Styles
  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs min-h-[32px] gap-1.5 rounded-md",
    md: "px-3.5 py-2 text-sm min-h-[40px] gap-2 rounded-lg",
    lg: "px-4 py-2.5 text-base min-h-[46px] gap-2.5 rounded-xl",
  };

  // Variant Styles
  const variantStyles = {
    default:
      "bg-white border-slate-200 text-slate-800 shadow-xs hover:border-slate-300 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500",
    dark:
      "bg-white/10 border-white/20 text-white hover:bg-white/15 focus-within:ring-2 focus-within:ring-white/30 backdrop-blur-md",
    light:
      "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200/80 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500",
    outline:
      "bg-transparent border-slate-300 text-slate-700 hover:bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500",
    ghost:
      "bg-transparent border-transparent text-slate-700 hover:bg-slate-100 focus-within:ring-2 focus-within:ring-slate-300",
    admin:
      "bg-white border-slate-200 text-slate-800 shadow-xs hover:border-slate-300 focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-400",
  };

  const hasError = Boolean(error);
  const errorBorderStyles = hasError
    ? "border-red-500 ring-2 ring-red-500/20 text-red-900 focus-within:border-red-500"
    : "";

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none select-none bg-slate-50"
    : "cursor-pointer";

  return (
    <div
      ref={containerRef}
      className={`relative inline-block w-full text-left font-sans ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden input for HTML form submissions if needed */}
      {name && <input type="hidden" name={name} value={value} required={required} />}

      {/* Dropdown Trigger */}
      <button
        type="button"
        id={dropdownId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || placeholder}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between border transition-all duration-200 ${sizeStyles[size]} ${variantStyles[variant]} ${errorBorderStyles} ${disabledStyles}`}
      >
        <div className="flex items-center gap-2 truncate">
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {selectedOption ? (
            <span className="flex items-center gap-2 truncate font-medium">
              {selectedOption.icon && <span className="shrink-0">{selectedOption.icon}</span>}
              {selectedOption.label}
            </span>
          ) : (
            <span className={variant === "dark" ? "text-white/60" : "text-slate-400"}>
              {placeholder}
            </span>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
            variant === "dark" ? "text-white/70" : "text-slate-400"
          } ${isOpen ? "rotate-180 text-blue-500" : ""}`}
        />
      </button>

      {/* Validation Error Message */}
      {typeof error === "string" && (
        <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Menu Overlay Dropdown */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 mt-1.5 z-50 rounded-xl bg-white border border-slate-200 shadow-xl shadow-slate-900/10 overflow-hidden transition-all duration-200 transform opacity-100 scale-100 animate-in fade-in-50 zoom-in-95 ${
            variant === "dark" ? "bg-slate-900 border-slate-700 text-white" : "text-slate-800"
          } ${menuClassName}`}
          role="listbox"
          aria-labelledby={dropdownId}
        >
          {/* Optional Search Input */}
          {shouldShowSearch && (
            <div className={`p-2 border-b ${variant === "dark" ? "border-slate-800" : "border-slate-100"}`}>
              <div className="relative flex items-center">
                <Search
                  className={`absolute left-2.5 h-3.5 w-3.5 ${
                    variant === "dark" ? "text-slate-400" : "text-slate-400"
                  }`}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-md focus:outline-none transition-colors ${
                    variant === "dark"
                      ? "bg-slate-800 text-white placeholder-slate-400 focus:bg-slate-700"
                      : "bg-slate-100 text-slate-800 placeholder-slate-400 focus:bg-slate-200/70"
                  }`}
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div ref={optionsListRef} className="max-h-60 overflow-y-auto p-1.5 scrollbar-thin">
            {filteredOptions.length === 0 ? (
              <div
                className={`py-3 text-center text-xs ${
                  variant === "dark" ? "text-slate-400" : "text-slate-400"
                }`}
              >
                No options found
              </div>
            ) : (
              filteredOptions.map((opt, index) => {
                const isSelected = opt.value === value;
                const isHighlighted = index === highlightedIndex;
                const isDisabled = opt.disabled;

                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value, isDisabled)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`flex items-center justify-between px-3 py-2 text-xs md:text-sm rounded-lg cursor-pointer transition-colors duration-150 select-none ${
                      isDisabled
                        ? "opacity-40 cursor-not-allowed"
                        : isSelected
                        ? variant === "dark"
                          ? "bg-blue-600/30 text-blue-300 font-semibold"
                          : "bg-blue-50 text-blue-700 font-semibold"
                        : isHighlighted
                        ? variant === "dark"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-slate-900"
                        : variant === "dark"
                        ? "text-slate-200 hover:bg-slate-800"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                      {opt.label}
                    </span>
                    {isSelected && (
                      <Check className={`h-4 w-4 shrink-0 ${variant === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
