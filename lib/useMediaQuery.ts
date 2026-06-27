"use client";
import { useState, useEffect } from "react";

const safeMatchMedia = (query: string): MediaQueryList | null => {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return null;
  }

  return window.matchMedia(query);
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    safeMatchMedia(query)?.matches || false,
  );

  useEffect(() => {
    const mediaQueryList = safeMatchMedia(query);

    if (!mediaQueryList) {
      return;
    }

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set the initial value
    setMatches(mediaQueryList.matches);

    // Add the listener
    mediaQueryList.addEventListener("change", listener);

    // Cleanup function to remove the listener
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
};
