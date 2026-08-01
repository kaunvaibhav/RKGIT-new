import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";

/**
 * VisitorCounter Component
 * 
 * Reusable visitor counter module that stores and retrieves site visits via CountAPI.
 * 
 * Features:
 * - Increments visit count on the first visit per browser (flagged via localStorage 'visitorCounted').
 * - Subsequent page views / refreshes fetch the total count without incrementing.
 * - Displays a skeleton pulsing loader while fetching data asynchronously.
 * - Graceful fallback to '--' if the CountAPI endpoint is unavailable.
 * - Premium dark glassmorphism UI with golden accent (#F5A623) matching footer aesthetics.
 */
export const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const STORAGE_KEY = "visitorCounted";
  const NAMESPACE = "rkgit.edu.in";
  const COUNTER_KEY = "website-visitors";

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    // 5-second timeout safeguard to prevent stalled requests from impacting UI
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const fetchVisitorCount = async () => {
      try {
        let hasBeenCounted = false;
        try {
          hasBeenCounted = localStorage.getItem(STORAGE_KEY) === "true";
        } catch {
          // Safeguard if localStorage is restricted by browser settings
          hasBeenCounted = false;
        }

        const endpoint = hasBeenCounted
          ? `https://api.countapi.xyz/get/${NAMESPACE}/${COUNTER_KEY}`
          : `https://api.countapi.xyz/hit/${NAMESPACE}/${COUNTER_KEY}`;

        const response = await fetch(endpoint, { signal: controller.signal });

        if (!response.ok) {
          // If GET returns 404 (key not created yet), fallback to HIT to initialize key
          if (hasBeenCounted && response.status === 404) {
            const hitResponse = await fetch(
              `https://api.countapi.xyz/hit/${NAMESPACE}/${COUNTER_KEY}`,
              { signal: controller.signal }
            );
            if (hitResponse.ok) {
              const hitData = await hitResponse.json();
              if (isMounted && typeof hitData.value === "number") {
                setCount(hitData.value);
                setIsLoading(false);
                return;
              }
            }
          }
          throw new Error(`CountAPI returned HTTP status ${response.status}`);
        }

        const data = await response.json();
        if (typeof data.value === "number") {
          if (isMounted) {
            setCount(data.value);
            setIsError(false);

            if (!hasBeenCounted) {
              try {
                localStorage.setItem(STORAGE_KEY, "true");
              } catch {
                // Ignore storage write errors
              }
            }
          }
        } else {
          throw new Error("Invalid response schema from CountAPI");
        }
      } catch (err) {
        console.warn("VisitorCounter: CountAPI fetch error or service offline.", err);
        if (isMounted) {
          setIsError(true);
          setCount(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          clearTimeout(timeoutId);
        }
      }
    };

    fetchVisitorCount();

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-white/10 hover:border-[#F5A623]/50 hover:shadow-lg hover:shadow-[#F5A623]/10 transition-all duration-300 transform hover:-translate-y-0.5 group cursor-default select-none"
      aria-label="Website Visitors Counter"
    >
      <Eye className="w-4 h-4 text-[#F5A623] group-hover:scale-110 transition-transform duration-300 shrink-0" />
      
      <span className="text-white/90 font-medium tracking-wide">
        Website Visitors
      </span>

      <span className="h-3 w-px bg-white/20" aria-hidden="true" />

      {isLoading ? (
        <span className="inline-block h-3.5 w-12 rounded bg-white/20 animate-pulse" aria-label="Loading counter..." />
      ) : (
        <span className="font-bold text-[#F5A623] tracking-wider">
          {isError || count === null ? "--" : count.toLocaleString()}
        </span>
      )}
    </div>
  );
};

export default VisitorCounter;
