import { Grid, GridItem } from "@/components/landing/grid/Grid";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { assertNever } from "@/lib/assertNever";
import { CardAction, Section as CMSSection, Card as CMSCard } from "@/lib/cms";
import { cn } from "@/lib/utils";
import {
  FileTextIcon,
  GithubIcon,
  LucideIcon,
  YoutubeIcon,
} from "lucide-react";
import { ComponentProps, useMemo } from "react";

interface SectionProps {
  section: CMSSection;
}

export const Section = ({ section }: SectionProps) => {
  const items = section.cards.map((c): GridItem => {
    return {
      id: c.id,
      img: { alt: c.image.responsiveImage.alt, src: c.image.responsiveImage },
      url: c.url,
      title: <CardTitle card={c} />,
      actions: c.actions != null && c.actions.length > 0 && (
        <div className="mb-2 px-2 w-full flex justify-end gap-2">
          {c.actions.map((action) => (
            <Action key={action.id} action={action} />
          ))}
        </div>
      ),
    };
  });

  return (
    <SectionWrapper className="first:mt-12" id={section.verb}>
      <H2>
        I <H2Highlight>{section.verb}</H2Highlight>&nbsp;
        <H2Caption>{section.adjective}</H2Caption>
      </H2>
      <main>
        <Grid items={items} />
      </main>
    </SectionWrapper>
  );
};

interface CardTitleProps {
  card: CMSCard;
}
const CardTitle = ({ card: c }: CardTitleProps) => {
  const titleBlock = c.titleBlock;
  if (titleBlock.__typename === "ProjectTitleRecord") {
    return (
      <>
        <div>{c.title}</div>
        <div className="text-sm text-foreground-contrast/70">
          {titleBlock.subtitle}
        </div>
      </>
    );
  }

  if (titleBlock.__typename === "ArticleTitleRecord") {
    return <div>{c.title}</div>;
  }

  if (titleBlock.__typename === "TalkTitleRecord") {
    const heading = titleBlock.location ? (
      <>
        <div className="sr-only">{c.title}</div>
        <div>
          <span className="sr-only">Location: </span>
          {titleBlock.location}
        </div>
      </>
    ) : (
      <div>
        <span className="sr-only">Title: </span>
        {c.title}
      </div>
    );

    const subtitle = titleBlock.date && (
      <div className="text-sm text-foreground-contrast/70">
        <span className="sr-only">Date: </span>
        {formatDate(new Date(titleBlock.date))}
      </div>
    );

    return (
      <>
        {heading}
        {subtitle}
      </>
    );
  }

  if (titleBlock.__typename === "TeachTitleRecord") {
    return titleBlock.location ? (
      <>
        <div className="sr-only">{c.title}</div>
        <div>
          <span className="sr-only">Location: </span>
          {titleBlock.location}
        </div>
      </>
    ) : (
      <div>
        <span className="sr-only">Title: </span>
        {c.title}
      </div>
    );
  }

  return assertNever(titleBlock);
};

const ACTION_TO_ICON: Record<CardAction["icon"], LucideIcon> = {
  Github: GithubIcon,
  Youtube: YoutubeIcon,
  File: FileTextIcon,
};

const ICON_TO_DEFAULT_TOOLTIP: Record<CardAction["icon"], string> = {
  Github: "See on GitHub",
  Youtube: "See on YouTube",
  File: "Download",
};

interface ActionProps {
  action: CardAction;
}
const Action = ({ action }: ActionProps) => {
  const url = action.asset?.url || action.url;
  const Icon = useMemo(() => {
    return ACTION_TO_ICON[action.icon];
  }, [action.icon]);

  const tooltip = useMemo(() => {
    if (action.tooltip) {
      return action.tooltip;
    }

    if (action.icon === "File" && action.asset?.format != null) {
      const format = mapFilePathToExtension(action.asset.format);
      if (format != null) {
        return `Download as ${format}`;
      }
    }

    return ICON_TO_DEFAULT_TOOLTIP[action.icon];
  }, [action.asset?.format, action.icon, action.tooltip]);

  return (
    <Tooltip content={tooltip}>
      <Button variant="secondary" size="icon" asChild>
        <a
          href={url}
          target="_blank"
          rel="noopener"
          className="pointer-events-auto"
        >
          <Icon className="h-[1.125rem] w-[1.125rem]" />
        </a>
      </Button>
    </Tooltip>
  );
};

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

const extensionMap = {
  pdf: "PDF",
  pptx: "PowerPoint",
  ppt: "PowerPoint",
};

function mapFilePathToExtension(format: string) {
  return (extensionMap as Record<string, string>)[format] as string | undefined;
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
