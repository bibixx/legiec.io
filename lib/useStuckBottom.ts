import { RefObject, useEffect } from "react";

// The card carries `-mb-8`, which pulls the sentinel 32px above the card's true
// bottom edge. Shrinking the observer's bottom edge by the same amount moves the
// stuck ↔ settled flip to where the card actually lands.
const CARD_MARGIN_BOTTOM_PX = 64;

export const useStuckBottom = (
  sentinelRef: RefObject<HTMLElement | null>,
  stickyRef: RefObject<HTMLElement | null>,
) => {
  useEffect(() => {
    const $sentinel = sentinelRef.current;
    const $sticky = stickyRef.current;

    if ($sentinel == null || $sticky == null) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Sentinel off-screen *below* the viewport ⟺ card still pinned to the
        // bottom (not settled). The `top > 0` guard keeps it settled once the
        // whole header scrolls off the TOP (sentinel also off-screen, but above).
        const stuck = !entry.isIntersecting && entry.boundingClientRect.top > 0;
        $sticky.toggleAttribute("data-settled", !stuck);
      },
      { rootMargin: `0px 0px -${CARD_MARGIN_BOTTOM_PX}px 0px` },
    );

    observer.observe($sentinel);

    return () => observer.disconnect();
  }, [sentinelRef, stickyRef]);
};
