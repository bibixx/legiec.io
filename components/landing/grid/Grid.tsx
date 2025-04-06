import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface GridItem {
  id: string;
  url: string;
  img: { alt?: string; src: StaticImageData | string };
  title: ReactNode;
  actions?: ReactNode;
  background?: string;
}

interface GridProps {
  items: GridItem[];
}
export const Grid = ({ items }: GridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 items-start">
      {items.map((item) => (
        <Box key={item.id} item={item} />
      ))}
    </div>
  );
};

interface BoxProps {
  item: GridItem;
}
const Box = ({ item }: BoxProps) => {
  return (
    <div
      className="group/box overflow-hidden rounded-sm relative flex flex-col justify-between transition-transform duration-200 hover:scale-[102%] has-[footer_a:focus-visible]:outline-dashed has-[footer_a:focus-visible]:outline-2 has-[footer_a:focus-visible]:outline-offset-2 has-[footer_a:focus-visible]:outline-primary"
      style={{ backgroundColor: item.background }}
    >
      {item.background == null && (
        <Img
          className="aspect-video absolute top-0 left-0 w-full h-full"
          src={item.img.src}
          alt=""
        />
      )}

      <a
        href={item.url}
        target="_blank"
        tabIndex={-1}
        className="block aspect-video w-full"
      >
        <Img className="aspect-video relative" src={item.img.src} alt="" />
      </a>

      <footer className="text-foreground-contrast w-full font-semibold text-center z-10 relative">
        <div className="relative z-10">
          <a
            href={item.url}
            target="_blank"
            className="block p-2 backdrop-invert-[0.05] backdrop-blur-sm backdrop-brightness-[0.3] select-none outline-hidden"
          >
            {item.title}
          </a>
        </div>

        {item.actions && (
          <div className="absolute z-10 top-0 right-0 -translate-y-full transition-opacity duration-200 sm:opacity-0 group-hover/box:opacity-100 group-has-[:focus-visible]/box:opacity-100">
            {item.actions}
          </div>
        )}
      </footer>

      <div className="absolute inset-0 z-10 pointer-events-none border-2 rounded-[inherit] border-solid border-foreground/10"></div>
    </div>
  );
};

interface ImgProps {
  src: StaticImageData | string;
  alt?: string;
  className?: string;
}

const Img = ({ src, className, alt }: ImgProps) => {
  if (typeof src === "string") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={className} src={src} alt={alt || ""} draggable={false} />
    );
  }

  return (
    <Image
      className={className}
      src={src}
      alt={alt || ""}
      draggable={false}
      placeholder="blur"
    />
  );
};
