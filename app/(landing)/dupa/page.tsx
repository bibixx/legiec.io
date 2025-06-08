import dupaSrc from "@/assets/dupa.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    type: "profile",
    username: "bibixx",
    firstName: "Bartek",
    lastName: "Legięć",
    gender: "male",
    images: [
      {
        url: "/og-dupa.png",
        width: 1200,
        height: 630,
        alt: `On the left side there is a big white text saying "Bartek Legięć". On the right, there's Mike Tyson, before his fight with Jake Paul, stands in a locker room with his back to the camera, wearing boxing gloves and a belt. His bare backside is visible. Several people are around him, and there are lockers in the background. The image has a purple tint.`,
      },
    ],
  },
};

export default function Dupa() {
  return (
    <div className="w-full h-dvh">
      <figure className="absolute top-0 left-0 h-full w-full">
        <Image
          src={dupaSrc}
          className="w-full h-full object-cover pointer-events-none select-none"
          alt=""
        />
        <figcaption
          className={cn(
            "absolute pointer-events-auto",

            "bottom-4 right-4",
            "2xl:translate-y-full",

            "max-md:left-4 max-md:text-center",

            "opacity-100 transition-opacity duration-200"
          )}
        >
          <a
            href="https://www.netflix.com/title/81764952/"
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
              <span className="italic">Jake Paul vs. Mike Tyson</span>
            </span>
          </a>
        </figcaption>
      </figure>

      <div className="absolute w-full top-8 sm:top-16 z-10 select-none">
        <div className={cn("container mx-auto")}>
          <div className="inline-grid px-4 -mx-4 py-4 -my-2 sm:px-8 sm:-mx-8 sm:py-7 sm:-my-4 dark:bg-background/75 bg-background/65 backdrop-blur-lg rounded-md motion-reduce:animate-none animate-in fill-mode-both duration-500 delay-300 transition-none slide-in-from-bottom-1/4 fade-in">
            <h2 className="inline-block font-display font-bold text-3xl sm:text-6xl [word-spacing:0.15em]">
              Ha, ha... Bardzo śmieszne...
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
