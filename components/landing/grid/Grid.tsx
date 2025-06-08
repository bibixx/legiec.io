import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import styles from "./Grid.module.css";

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
    <div className={styles.boxWrapper}>
      {item.background == null ? (
        <Img className={styles.imageBackground} src={item.img.src} alt="" />
      ) : (
        <div
          className={styles.imageBackground}
          style={{ backgroundColor: item.background }}
        />
      )}

      <a
        href={item.url}
        target="_blank"
        tabIndex={-1}
        className={cn("block relative", "mb-2")}
      >
        <div className="aspect-video w-full" />
        <Img className={styles.blockImage} src={item.img.src} alt="" />
      </a>

      <footer className={styles.footer}>
        <div className="relative z-10">
          <a
            href={item.url}
            target="_blank"
            className="block p-2 py-3 select-none outline-hidden relative z-10"
          >
            {item.title}
          </a>
        </div>

        {item.actions && <div className={styles.actions}>{item.actions}</div>}
      </footer>
    </div>
  );
};

type ImgProps = {
  src: StaticImageData | string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
};

const Img = ({ src, className, alt, ...props }: ImgProps) => {
  if (typeof src === "string") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        className={className}
        src={src}
        alt={alt || ""}
        draggable={false}
      />
    );
  }

  return (
    <Image
      {...props}
      className={className}
      src={src}
      alt={alt || ""}
      draggable={false}
      placeholder="blur"
    />
  );
};
