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
import { ComponentProps, forwardRef, useMemo } from "react";

interface SectionProps {
  section: CMSSection;
}

export const Section = ({ section }: SectionProps) => {
  const items = section.cards.map((c): GridItem => {
    return {
      id: c.id,
      img: {
        alt: c.image.responsiveImage.alt,
        src: {
          src: c.image.responsiveImage.src,
          height: c.image.responsiveImage.height,
          width: c.image.responsiveImage.width,
          blurDataURL: c.image.responsiveImage.base64,
        },
      },
      url: c.url,
      background: c.background?.hex,
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
        <div className="text-sm opacity-70">{titleBlock.subtitle}</div>
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
      <div className="text-sm opacity-70">
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

const CraftIcon: LucideIcon = forwardRef((props, ref) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
      ref={ref}
    >
      <path d="M13.2616 23.3255C13.2616 23.7005 13.5616 24.0005 13.9516 24.0005H23.3416C23.7166 24.0005 24.0166 23.7005 24.0016 23.3255C23.8354 20.7146 22.7232 18.2538 20.8733 16.4038C19.0233 14.5539 16.5625 13.4417 13.9516 13.2755C13.8632 13.2693 13.7745 13.2814 13.6909 13.3111C13.6074 13.3407 13.5309 13.3872 13.4661 13.4477C13.4014 13.5083 13.3498 13.5815 13.3146 13.6628C13.2794 13.7442 13.2614 13.8319 13.2616 13.9205V23.3255Z" />
      <path d="M10.7415 13.9506C10.7415 13.5756 10.4415 13.2606 10.0515 13.2606H0.661516C0.286516 13.2606 -0.0134844 13.5606 0.00151556 13.9506C0.167725 16.5615 1.27992 19.0223 3.12986 20.8722C4.97979 22.7222 7.4406 23.8344 10.0515 24.0006C10.4265 24.0156 10.7415 23.7156 10.7415 23.3406V13.9506Z" />
      <path d="M10.7416 10.0505C10.7416 10.4255 10.4416 10.7405 10.0516 10.7405H0.661587C0.571708 10.7429 0.482338 10.7263 0.399212 10.6921C0.316087 10.6578 0.241043 10.6066 0.178896 10.5416C0.116749 10.4766 0.0688717 10.3994 0.0383369 10.3148C0.00780208 10.2302 -0.00471576 10.1402 0.00158669 10.0505C0.167796 7.43962 1.27999 4.97881 3.12993 3.12888C4.97986 1.27895 7.44067 0.166748 10.0516 0.000538998C10.4266 -0.014461 10.7416 0.285539 10.7416 0.660539V10.0505Z" />
      <path d="M13.2616 0.675549C13.2616 0.300549 13.5616 0.000549316 13.9516 0.000549316H23.3416C23.7166 0.000549316 24.0166 0.300549 24.0016 0.675549C23.8354 3.28647 22.7232 5.74728 20.8733 7.59721C19.0233 9.44714 16.5625 10.5593 13.9516 10.7255C13.8632 10.7317 13.7745 10.7196 13.6909 10.69C13.6074 10.6604 13.5309 10.6138 13.4661 10.5533C13.4014 10.4928 13.3498 10.4196 13.3146 10.3382C13.2794 10.2569 13.2614 10.1692 13.2616 10.0806V0.675549Z" />
    </svg>
  );
});
CraftIcon.displayName = "CraftIcon";

const ACTION_TO_ICON: Record<CardAction["icon"], LucideIcon> = {
  Github: GithubIcon,
  Youtube: YoutubeIcon,
  File: FileTextIcon,
  Craft: CraftIcon,
};

const ICON_TO_DEFAULT_TOOLTIP: Record<CardAction["icon"], string> = {
  Github: "See on GitHub",
  Youtube: "See on YouTube",
  File: "Download",
  Craft: "Read as Article",
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
          <Icon className="h-4.5 w-4.5" />
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
