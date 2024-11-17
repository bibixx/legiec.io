import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Hero } from "./sections/hero/Hero";
import { Contact } from "./sections/contact/Contact";
import { STAR } from "@/lib/text";
import { getSections } from "@/lib/cms";
import { Section } from "../../components/landing/section/Section";

export default async function Home() {
  const { sections, contactMeans, hero } = await getSections();

  return (
    <div className="w-full">
      <Hero contactMeans={contactMeans} hero={hero} />

      <main className="container mx-auto">
        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
        <SectionWrapper id="contact">
          <H2>
            I <H2Highlight>chat</H2Highlight> <H2Caption>at</H2Caption>
          </H2>
          <main className="flex gap-5">
            <Contact className="w-12" contactMeans={contactMeans} />
          </main>
        </SectionWrapper>
      </main>
      <footer className="text-center select-none text-xs mt-64 mb-24">
        <a
          href="/easter-egg"
          target="_blank"
          className="link-text !text-foreground/50 hover:!text-primary-foreground focus-visible:!text-primary-foreground w-4 h-5 flex items-center justify-center mx-auto !no-underline before:bottom-px before:-top-px"
        >
          {STAR}
        </a>
      </footer>
    </div>
  );
}

const H2 = ({ className, ...props }: ComponentProps<"h2">) => (
  <h2
    className={cn(
      "font-display font-bold text-3xl sm:text-5xl mt-12 mb-8 select-none",
      className
    )}
    {...props}
  />
);

const H2Caption = ({ className, ...props }: ComponentProps<"span">) => (
  <span
    className={cn(
      "text-[0.66em] text-foreground/50 italic font-semibold",
      className
    )}
    {...props}
  />
);

const H2Highlight = ({ className, ...props }: ComponentProps<"strong">) => (
  <strong className={cn("text-primary font-bold", className)} {...props} />
);

const SectionWrapper = ({ className, ...props }: ComponentProps<"section">) => (
  <section className={cn("my-24 scroll-my-8", className)} {...props} />
);

export const dynamic = "error";
