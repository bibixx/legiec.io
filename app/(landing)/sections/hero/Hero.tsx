"use client";

import { APOSTROPHE, STAR } from "@/lib/text";
import { cn } from "@/lib/utils";
import { Contact } from "../contact/Contact";
import { ContactMeans, Hero as CMSHero } from "@/lib/cms";
import { useLayoutEffect, useRef } from "react";
import styles from "./Hero.module.css";
import Image from "next/image";

const isSafari26 = (() => {
  if (typeof window === "undefined") {
    return false;
  }

  const isIOS = /iP(ad|od|hone)/i.test(window.navigator.userAgent);
  const safariVersionMatch = navigator.userAgent.match(
    /Version\/([\d\.]+).*Safari/,
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
  const animatedRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (animatedRef.current == null) {
      return;
    }

    animatedRef.current.classList.remove("hidden");
    animatedRef.current.classList.add("inline-flex");
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
          className={cn(
            "container sticky max-sm:px-0 max-sm:mx-auto bottom-0 sm:bottom-8 -mb-8 z-10 pointer-events-none",
          )}
        >
          <div
            suppressHydrationWarning
            className={cn(
              styles.heroWrapper,

              "hidden",
              "noscript:inline-flex",
              "noscript:slide-in-from-bottom-1/4",
              "flex-row-reverse",
              "gap-2",
              "dark:bg-background/75 bg-background/65 backdrop-blur-lg",
              "motion-reduce:animate-none animate-in fill-mode-both duration-500 delay-300 transition-none fade-in",

              "p-8",
              "sm:-mx-8",
              "xl:p-0",
            )}
            ref={animatedRef}
          >
            <div
              className={cn(
                styles.contentWrapper,
                "flex flex-1 flex-col justify-center",
              )}
            >
              <h1
                className={cn(
                  "inline-block",
                  "font-display font-bold",
                  "max-lg:mb-1 max-sm:mb-3",
                  "text-6xl sm:text-7xl lg:text-8xl [word-spacing:0.15em]",
                  "sm:text-nowrap",
                  "-mt-[0.1em]",
                )}
              >
                {hero.heading}
              </h1>

              <div
                className="inline-flex flex-col gap-2 sm:text-xl font-semibold text-foreground/80 select-none link-text-wrapper"
                dangerouslySetInnerHTML={{ __html: hero.subheading }}
              />
            </div>

            <div className={cn("aspect-square p-4", styles.avatarWrapper)}>
              <a
                className="block link-text-wrapper relative w-full h-full rounded-full overflow-hidden group outline-0"
                href="https://bartek.craft.me/info"
                target="_blank"
                rel="noopener"
              >
                <Image
                  src="/photo.jpg"
                  fill
                  alt=""
                  priority
                  className="w-full -scale-x-100"
                />
                <div
                  className={cn(
                    "absolute inset-0 z-10 flex items-center text-center justify-center",
                    "rounded-full overflow-hidden",
                  )}
                >
                  <div className="absolute inset-0 bg-primary/60 backdrop-blur-md translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-150"></div>
                  <span className="relative opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 font-semibold text-primary-foreground text-lg underline underline-offset-2">
                    Speaker Info
                  </span>
                </div>
                <div className="absolute pointer-events-none inset-1 ring-4 ring-foreground/10 rounded-[inherit] z-10"></div>
              </a>
            </div>
          </div>
        </div>

        <div className="h-screen w-full relative pointer-events-none">
          <div
            className={cn(
              "inline-flex gap-3 sticky top-2 left-0 m-2 p-2 z-10 rounded-md items-center backdrop-blur-lg backdrop-brightness-75 pointer-events-auto",
              "motion-reduce:animate-none animate-in fill-mode-both duration-500 delay-500 fade-in",
            )}
          >
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
              className="h-full w-full object-cover object-top select-none"
              controls={false}
            >
              <source src="/spain.mp4" type="video/mp4" />
              <source src="/spain.webm" type="video/webm;codecs=vp9" />
            </video>
            <figcaption
              className={cn(
                "absolute right-2 pointer-events-auto",
                "max-md:bottom-2 max-sm:left-6 max-md:left-14",
                "md:top-4 md:right-4",
              )}
            >
              <a
                href="https://www.imdb.com/title/tt0651001/"
                target="_blank"
                className={cn(
                  "group/source",

                  "font-semibold underline underline-offset-2",
                  "select-auto",
                  "rounded-md",

                  "text-foreground/30 transition-colors duration-200",
                  "hover:text-link-hover hover:bg-background/75 hover:backdrop-blur-lg focus-visible:text-link-hover focus-visible:bg-background/75 focus-visible:backdrop-blur-lg",

                  "px-2 py-1",
                  "max-md:inline-flex max-md:flex-col",

                  "select-none",
                )}
              >
                <span
                  className={cn(
                    "opacity-0 transition-opacity duration-200",
                    "group-hover/source:opacity-100 group-focus-visible/source:opacity-100",
                  )}
                >
                  Video source:{" "}
                </span>
                <span className="text-nowrap">
                  <span className="italic">
                    Monty Python{APOSTROPHE}s Flying Circus
                  </span>{" "}
                  <span className="star-divider">{STAR}</span> S2 E2
                </span>
              </a>
            </figcaption>
          </figure>
        </div>
      </header>
    </>
  );
};
