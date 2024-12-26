import tisButAScratchSrc from "@/assets/tis-but-a-scratch.png";
import LandingLayout from "./(landing)/layout";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { APOSTROPHE } from "@/lib/text";
import Link from "next/link";

export default function NotFound() {
  return (
    <LandingLayout>
      <div className="w-full h-[100dvh]">
        <figure className="absolute top-0 left-0 h-full w-full">
          <Image
            src={tisButAScratchSrc}
            className="w-full h-full object-cover pointer-events-none select-none"
            alt=""
          />
          <figcaption
            className={cn(
              "absolute pointer-events-auto",

              "top-4 right-4",
              "2xl:translate-y-full",

              "max-md:left-4 max-md:text-center",

              "opacity-100 transition-opacity duration-200"
            )}
          >
            <a
              href="https://www.imdb.com/title/tt0071853/"
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
                  "group-hover/source:opacity-100 group-focus-visible/source:opacity-100",
                  "hidden md:inline"
                )}
              >
                Image source:{" "}
              </span>
              <span className="text-nowrap">
                <span className="italic">Monty Python and the Holy Grail</span>
              </span>
            </a>
          </figcaption>
        </figure>

        <div className="absolute w-full bottom-8 sm:bottom-16 z-10 select-none">
          <div className={cn("container mx-auto")}>
            <div className="inline-grid px-4 -mx-4 pt-4 pb-3 -my-2 sm:px-8 sm:-mx-8 sm:pb-7 sm:-my-4 dark:bg-background/75 bg-background/65 backdrop-blur-lg rounded-md motion-reduce:animate-none animate-in fill-mode-both duration-500 delay-300 transition-none slide-in-from-bottom-1/4 fade-in">
              <h2 className="inline-block font-display font-bold mb-4 text-3xl sm:text-6xl [word-spacing:0.15em]">
                The page you{APOSTROPHE}re looking for isn{APOSTROPHE}t here…
              </h2>

              <div className="sm:text-xl font-semibold text-foreground/80 link-text-wrapper">
                {APOSTROPHE}Tis but a scratch! Try again or{" "}
                <Link href="/">go home</Link>, brave knight.
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
