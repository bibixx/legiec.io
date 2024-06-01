import a1 from "@/assets/write/make-page-faster.png";
import a2 from "@/assets/write/gradient.png";
import a3 from "@/assets/write/css-grid.png";
import { StaticImageData } from "next/image";

export interface Article {
  url: string;
  img: string | StaticImageData;
  title: string;
}

export const ARTICLES: Article[] = [
  {
    title: "10 Things That Can Make Your Page Faster",
    url: "https://www.netguru.com/blog/10-things-that-can-make-your-page-faster",
    img: a1,
  },
  {
    title: "Dynamic shadows in CSS",
    url: "https://blog.legiec.io/2018/07/04/How-to-create-dynamic-shadows-in-CSS/",
    img: a2,
  },
  {
    title: "CSS Grid",
    url: "https://blog.legiec.io/2018/06/10/CSS-Grid-vol-1/",
    img: a3,
  },
];
