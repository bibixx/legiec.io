import { APOSTROPHE, BULLET, NON_BREAKING_HYPHEN } from "@/lib/text";
import { cn } from "@/lib/utils";
import { Contact } from "../contact/Contact";

export const Hero = () => {
  return (
    <>
      <header className="flex flex-col-reverse">
        <div
          className={cn(
            "container mx-auto sticky bottom-8 sm:bottom-16 my-8 z-10"
          )}
        >
          <div className="dark:bg-background/75 bg-background/65 inline-grid px-4 -mx-4 pt-8 pb-3 -my-2 sm:px-8 sm:-mx-8 sm:pt-4 sm:pb-7 sm:-my-4 backdrop-blur-lg rounded-md motion-reduce:animate-none animate-in fill-mode-both duration-500 delay-300 transition-none slide-in-from-bottom-1/4 fade-in">
            <h1 className="inline-block font-display font-bold text-6xl sm:text-9xl mb-4 [word-spacing:0.15em]">
              Bartek Legięć
            </h1>

            <div className="inline-flex flex-col gap-2 sm:text-xl font-semibold text-foreground/80 select-none">
              <span>
                Senior Product Engineer at{" "}
                <a
                  href="https://craft.do/"
                  className="link-text"
                  target="_blank"
                >
                  Craft Docs
                </a>
                , co{NON_BREAKING_HYPHEN}founder of{" "}
                <a
                  href="https://bbear.dev/"
                  className="link-text"
                  target="_blank"
                >
                  Bodging Bear
                </a>{" "}
                and{" "}
                <a
                  href="https://zium.app/"
                  className="link-text"
                  target="_blank"
                >
                  zium.app
                </a>
                .
              </span>
            </div>
          </div>
        </div>

        <div className="h-[100vh] w-full relative pointer-events-none">
          <div className="inline-flex gap-3 sticky top-2 left-0 m-2 p-2 z-10 rounded-md items-center backdrop-blur-lg backdrop-brightness-75 pointer-events-auto motion-reduce:animate-none animate-in fill-mode-both duration-500 delay-500 fade-in">
            <Contact className="w-8 fill-foreground-contrast" />
          </div>
          <figure className="absolute top-0 left-0 h-full w-full">
            <video
              muted
              loop
              autoPlay
              playsInline
              className="h-full w-full object-cover object-top"
            >
              <source src="/spain.mp4" type="video/mp4" />
              <source src="/spain.webm" type="video/webm;codecs=vp9" />
            </video>
            <figcaption className="max-md:hidden absolute max-md:-bottom-2 md:max-2xl:top-4 2xl:-bottom-2 right-2 md:max-2xl:translate-y-full 2xl:translate-y-full pointer-events-auto">
              <a
                href="https://www.imdb.com/title/tt0651001/"
                target="_blank"
                className="px-2 py-1 font-semibold link-text !text-foreground/30 max-2xl:!text-foreground-contrast/50 max-2xl:decoration-transparent hover:!text-link-hover hover:bg-background/75 hover:backdrop-blur-lg hover:decoration-current focus-visible:!text-link-hover focus-visible:bg-background/75 focus-visible:backdrop-blur-lg focus-visible:decoration-current rounded-md transition-all duration-200 group/source"
              >
                <span className="opacity-0 group-hover/source:opacity-100 group-focus-visible/source:opacity-100 transition-opacity duration-200">
                  Video source:{" "}
                </span>
                <span className="italic">
                  Monty Python{APOSTROPHE}s Flying Circus
                </span>{" "}
                {BULLET} S2 E2
              </a>
            </figcaption>
          </figure>
        </div>
      </header>
    </>
  );
};
