"use client";

import { APOSTROPHE, BULLET } from "@/lib/text";
import { cn } from "@/lib/utils";
import { Contact } from "../contact/Contact";
import { ContactMeans, Hero as CMSHero } from "@/lib/cms";
import { useShowCitation } from "./Hero.hooks";
import { useLayoutEffect, useRef } from "react";

const isSafari26 = (() => {
  if (typeof window === "undefined") {
    return false;
  }

  const isIOS = /iP(ad|od|hone)/i.test(window.navigator.userAgent);
  const safariVersionMatch = navigator.userAgent.match(
    /Version\/([\d\.]+).*Safari/
  );

  if (!isIOS || safariVersionMatch == null) {
    return false;
  }

  const [major] = safariVersionMatch[1]?.split(".");
  const majorNumber = Number(major);

  if (Number.isNaN(majorNumber)) {
    return false;
  }

  return majorNumber >= 26;
})();

interface HeroProps {
  contactMeans: ContactMeans[];
  hero: CMSHero;
}
export const Hero = ({ contactMeans, hero }: HeroProps) => {
  const [isSticky, stickyRef, detectorRef] = useShowCitation();
  const animatedRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (animatedRef.current == null) {
      return;
    }

    animatedRef.current.classList.remove("hidden");
    animatedRef.current.classList.add("inline-grid");
    if (isSafari26) {
      animatedRef.current.classList.add("slide-in-from-bottom-[16px]");
    } else {
      animatedRef.current.classList.add("slide-in-from-bottom-1/4");
    }
  }, []);

  return (
    <>
      <header className="flex flex-col-reverse">
        <div
          ref={detectorRef}
          className={"w-full h-px -translate-y-6 pointer-events-none -z-10"}
        />

        <div
          className={cn(
            "container mx-auto sticky bottom-8 sm:bottom-16 my-8 z-10 pointer-events-none"
          )}
          ref={stickyRef}
        >
          <div
            suppressHydrationWarning
            className={cn(
              "hidden",
              "noscript:inline-grid",
              "noscript:slide-in-from-bottom-1/4",
              "px-4 -mx-4 pt-4 pb-3 -my-2 sm:px-8 sm:-mx-8 sm:pb-7 sm:-my-4",
              "rounded-md pointer-events-auto",
              "dark:bg-background/75 bg-background/65 backdrop-blur-lg",
              "motion-reduce:animate-none animate-in fill-mode-both duration-500 delay-300 transition-none fade-in"
            )}
            ref={animatedRef}
          >
            <h1 className="inline-block font-display font-bold text-6xl sm:text-9xl mb-4 [word-spacing:0.15em]">
              {hero.heading}
            </h1>

            <div
              className="inline-flex flex-col gap-2 sm:text-xl font-semibold text-foreground/80 select-none link-text-wrapper"
              dangerouslySetInnerHTML={{ __html: hero.subheading }}
            />
          </div>
        </div>

        <div className="h-screen w-full relative pointer-events-none">
          <div className="inline-flex gap-3 sticky top-2 left-0 m-2 p-2 z-10 rounded-md items-center backdrop-blur-lg backdrop-brightness-75 pointer-events-auto motion-reduce:animate-none animate-in fill-mode-both duration-500 delay-500 fade-in">
            <Contact
              contactMeans={contactMeans}
              className="w-8 fill-foreground-contrast text-foreground-contrast"
            />
          </div>
          <figure className="absolute top-0 left-0 h-full w-full">
            <video
              muted
              loop
              autoPlay
              playsInline
              className="h-full w-full object-cover object-top"
              controls={false}
            >
              <source src="/spain.mp4" type="video/mp4" />
              <source src="/spain.webm" type="video/webm;codecs=vp9" />
            </video>
            <figcaption
              className={cn(
                "absolute right-2 pointer-events-auto",
                "max-md:bottom-2 max-md:left-2",

                "md:max-2xl:top-4 md:max-2xl:right-4",
                "2xl:translate-y-full",

                "max-md:opacity-0 transition-opacity duration-200 max-md:has-focus-visible:opacity-100",
                { "max-md:opacity-100": isSticky }
              )}
            >
              <a
                href="https://www.imdb.com/title/tt0651001/"
                target="_blank"
                className={cn(
                  "px-2 py-1 font-semibold underline underline-offset-2 select-auto text-foreground/30 rounded-md transition-colors duration-200 group/source",
                  "max-2xl:text-foreground-contrast/50 max-2xl:decoration-transparent",
                  "hover:text-link-hover hover:bg-background/75 hover:backdrop-blur-lg focus-visible:text-link-hover focus-visible:bg-background/75 focus-visible:backdrop-blur-lg",
                  "max-md:w-full max-md:block"
                )}
              >
                <span
                  className={cn(
                    "opacity-0 transition-opacity duration-200",
                    "group-hover/source:opacity-100 group-focus-visible/source:opacity-100"
                  )}
                >
                  Video source:{" "}
                </span>
                <span className="text-nowrap">
                  <span className="italic">
                    Monty Python{APOSTROPHE}s Flying Circus
                  </span>{" "}
                  {BULLET} S2 E2
                </span>
              </a>
            </figcaption>
          </figure>
        </div>
      </header>
    </>
  );
};
