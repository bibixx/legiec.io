import { useRef, useState, useEffect } from "react";

export const useShowCitation = () => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const detectorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const $sticky = stickyRef.current;
    const $detector = detectorRef.current;

    if ($sticky == null || $detector == null) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        return setIsSticky(entry.isIntersecting);
      },
      {
        threshold: 1,
      }
    );

    observer.observe($detector);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [isSticky, stickyRef, detectorRef] as const;
};
