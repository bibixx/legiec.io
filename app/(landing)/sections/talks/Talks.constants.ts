import t1 from "@/assets/talks/linux-from-scratch.png";
import t2 from "@/assets/talks/thesis-defence.png";
import t3 from "@/assets/talks/not-legal-advice.png";
import t4 from "@/assets/talks/figma-tokens.png";
import t5 from "@/assets/talks/a-journey-of-a-single-request.png";
import t6 from "@/assets/talks/deploying-js-app.png";
import t7 from "@/assets/talks/wtf-js.png";
import t8 from "@/assets/talks/ssr-made-easy.png";
import t9 from "@/assets/talks/roboty-i-javascript-czyli-jak-posypac-rane-sola.png";
import t10 from "@/assets/talks/jak-zrobic-prototyp-w-7-godzin-i-nie-zwariowac.png";
import { StaticImageData } from "next/image";

export interface Talk {
  location: string;
  date: Date;
  url: string;
  img: string | StaticImageData;
  title: string;
  file?: string;
  video?: string;
}

export const TALKS: Talk[] = [
  {
    location: "WarsawJS #109",
    date: new Date(2023, 10, 8),
    title: "Linux From Scratch",
    url: "/linux-from-scratch",
    img: t1,
    file: "/linux-from-scratch/linux-from-scratch.pdf",
  },
  {
    location: "Engineering Thesis Defense",
    date: new Date(2023, 8, 20),
    title: "Thesis Defence",
    url: "/thesis-defence",
    img: t2,
  },
  {
    location: "WarsawJS #107",
    date: new Date(2023, 8, 13),
    title: "Disclaimer: This is not legal advice.",
    url: "/not-legal-advice",
    img: t3,
    file: "/not-legal-advice/not-legal-advice.pdf",
    video: "https://www.youtube.com/watch?v=PrvDNJw67Yw",
  },
  {
    location: "WarsawJS #106",
    date: new Date(2023, 7, 9),
    title: "Figma Design Tokens + JS = ❤️",
    url: "/figma-tokens",
    img: t4,
  },
  {
    location: "WarsawJS #65",
    date: new Date(2020, 0, 8),
    title: "A Journey of a Single Request",
    url: "https://slides.legiec.io/a-journey-of-a-single-request",
    img: t5,
    video: "https://www.youtube.com/watch?v=D1wykjTstr4",
  },
  {
    location: "Meet.js Olsztyn #6",
    date: new Date(2019, 4, 9),
    title: "Deploying JS app — from hours of setup to seconds of joy",
    url: "https://slides.legiec.io/deploying-js-app",
    img: t6,
  },
  {
    location: "WarsawJS #42",
    date: new Date(2018, 1, 14),
    title: "WTF.JS",
    url: "https://slides.legiec.io/wtf-js",
    img: t7,
    video: "https://www.youtube.com/watch?v=PpkXrqdJKJo",
  },
  {
    location: "WarsawJS #52",
    date: new Date(2018, 11, 12),
    title: "SSR Made Easy — Next.js",
    url: "https://slides.legiec.io/ssr-made-easy",
    img: t8,
    video: "https://www.youtube.com/watch?v=F2-I3FMreog",
  },
  {
    location: "WarsawJS #40",
    date: new Date(2017, 11, 13),
    title: "Roboty i Javascript Czyli Jak Posypac Rane Sola",
    url: "https://slides.legiec.io/roboty-i-javascript-czyli-jak-posypac-rane-sola",
    img: t9,
    video: "https://www.youtube.com/watch?v=VR4YuuP3JHs",
  },
  {
    location: "Gamedev.js Warszawa #4",
    date: new Date(2017, 5, 20),
    title: "Jak Zrobic Prototyp w 7 Godzin i Nie Zwariowac",
    url: "https://slides.legiec.io/jak-zrobic-prototyp-w-7-godzin-i-nie-zwariowac",
    img: t10,
    video: "https://www.youtube.com/watch?v=xZF4C2HgT_Q",
  },
].sort((a, b) => b.date.getTime() - a.date.getTime());

for (let i = 0; i < TALKS.length; i++) {
  const talk = TALKS[i];

  if (talk.file && talk.file.startsWith("/")) {
    talk.file = `https://slides.legiec.io${talk.file}`;
  }

  if (talk.video && talk.video.startsWith("/")) {
    talk.video = `https://slides.legiec.io${talk.video}`;
  }

  TALKS[i] = talk;
}
