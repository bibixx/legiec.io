import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Talks } from "./sections/talks/Talks";
import { Hero } from "./sections/hero/Hero";
import { Contact } from "./sections/contact/Contact";
import { STAR } from "@/lib/text";
import { Teach } from "./sections/teach/Teach";
import { Code } from "./sections/code/Code";
import { Write } from "./sections/write/Write";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />

      <main className="container mx-auto">
        <Section className="mt-12" id="code">
          <H2>
            I <H2Highlight>code</H2Highlight>&nbsp;
            <H2Caption>a lot</H2Caption>
          </H2>
          <main>
            <Code />
          </main>
        </Section>
        <Section id="talks">
          <H2>
            I <H2Highlight>talk</H2Highlight> <H2Caption>a bit</H2Caption>
          </H2>
          <main>
            <Talks />
          </main>
        </Section>
        <Section id="teach">
          <H2>
            I <H2Highlight>teach</H2Highlight> <H2Caption>from love</H2Caption>
          </H2>
          <main>
            <Teach />
          </main>
        </Section>
        <Section>
          <H2>
            I <H2Highlight>write</H2Highlight>{" "}
            <H2Caption>occasionally</H2Caption>
          </H2>
          <main>
            <Write />
          </main>
        </Section>
        <Section id="contact">
          <H2>
            I <H2Highlight>chat</H2Highlight> <H2Caption>at</H2Caption>
          </H2>
          <main className="flex gap-5">
            <Contact className="w-12" />
          </main>
        </Section>
      </main>
      <footer className="text-center select-none text-xs mt-64 mb-24">
        <a
          href="/easter-egg"
          target="_blank"
          className="text-foreground/50 hover:text-yellow-500 transition-colors duration-200"
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

const Section = ({ className, ...props }: ComponentProps<"section">) => (
  <section className={cn("my-24 scroll-my-8", className)} {...props} />
);

export const dynamic = "force-static";
