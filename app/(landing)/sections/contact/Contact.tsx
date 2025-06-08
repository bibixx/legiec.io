import { ContactMeans } from "@/lib/cms";
import { cn } from "@/lib/utils";

interface ContactProps {
  className?: string;
  contactMeans: ContactMeans[];
}

export const Contact = ({ className, contactMeans }: ContactProps) => {
  const icons = contactMeans.map((m) => ({
    url: m.url,
    alt: m.alt,
    iconString: m.icon,
  }));

  return (
    <>
      {icons.map((i) => (
        <a
          key={i.url}
          target="_blank"
          href={i.url}
          className={cn(
            "text-foreground opacity-50 hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 no-underline min-h-0 aspect-square focus-visible:outline-offset-2 rounded-xs",
            className
          )}
        >
          <div
            aria-hidden
            className="min-h-0 h-full flex items-center [&_svg]:h-full [&_svg]:w-full [&_svg]:fill-current"
            dangerouslySetInnerHTML={{ __html: i.iconString }}
          />
          <span className="sr-only">{i.alt}</span>
        </a>
      ))}
    </>
  );
};
