import t1 from "@/assets/teach/javascript-for-every-level.png";
import t2 from "@/assets/teach/javascript-basics-green.png";
import t3 from "@/assets/teach/javascript-basics.png";
import t4 from "@/assets/teach/advanced-react.png";
import t5 from "@/assets/teach/react-basics.png";
import { StaticImageData } from "next/image";

export interface Talk {
  url: string;
  img: StaticImageData | string;
  title: string;
  location: string;
}

export const TALKS: Talk[] = [
  {
    title: "JavaScript for Every Level",
    location: "WarsawJS Workshop #62",
    url: "https://legiec.io/warsawjs-62",
    img: t1,
  },
  {
    title: "JavaScript Basics",
    location: "BongoHive in Zambia 🇿🇲",
    url: "https://github.com/bibixx/bongohive-js-workshops",
    img: t2,
  },
  {
    title: "JavaScript Basics",
    location: "WarsawJS Workshop #36",
    url: "https://github.com/bibixx/warsawjs-workshop-36-js-basics",
    img: t3,
  },
  {
    title: "Advanced React",
    location: "WarsawJS Workshop #21",
    url: "https://github.com/bibixx/warsawjs-workshop-21-zeppelin",
    img: t4,
  },
  {
    title: "React Basics",
    location: "WarsawJS Workshop #20",
    url: "https://github.com/bibixx/warsawjs-workshop-20-flights-search",
    img: t5,
  },
];
