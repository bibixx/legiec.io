import ziumSrc from "@/assets/code/zium.png";
import zdajSeSrc from "@/assets/code/zdaj-se.png";
import bodgingBearSrc from "@/assets/code/bodging-bear.png";
import traceThatSrc from "@/assets/code/trace-that.png";
import obejrzyjSeSrc from "@/assets/code/obejrzyj-se.png";
import charDetectiveSrc from "@/assets/code/char-detective.png";
import pjaitSrc from "@/assets/code/pjait.png";

import { APOSTROPHE, TM_SIGN } from "@/lib/text";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface Project {
  url: string;
  img: string | StaticImageData;
  title: string;
  subtitle?: string;
  github?: string;
  action?: ReactNode;
  video?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Zium",
    subtitle: `Formula 1${TM_SIGN} Multi-View Experience`,
    url: "https://zium.app",
    img: ziumSrc,
    github: "https://github.com/bibixx/zium.app",
  },
  {
    title: "zdaj.se",
    subtitle: "PJAIT Exams Archive",
    url: "https://zdaj.se",
    img: zdajSeSrc,
    github: "https://github.com/bibixx/zdaj-se-pjatk",
  },
  {
    title: "obejrzyj.se",
    subtitle: "Available Seats in Cinema-City",
    url: "https://obejrzyj.se",
    img: obejrzyjSeSrc,
  },
  {
    title: "Bodging Bear",
    subtitle: "The Art of the Bodge in Game Development",
    url: "https://bodgingbear.dev",
    img: bodgingBearSrc,
    github: "https://github.com/bodgingbear",
    video: "https://www.youtube.com/watch?v=lIFE7h3m40U",
  },
  {
    title: "chardetective.com",
    subtitle: "Fix Encoding With Ease",
    url: "https://chardetective.com",
    img: charDetectiveSrc,
    github: "https://github.com/bibixx/chardetective",
  },
  {
    title: "Archipelag Fizyki",
    subtitle: "Interactive Physics Experiments",
    url: "https://zpe.gov.pl/szukaj?query=&stage=E4&subject=Fizyka+LICEUM/TECHNIKUM",
    img: "https://place-hold.it/1600x900&fontsize=0",
  },
  {
    title: "Tab Pinner",
    subtitle: "Pin Tabs in Chrome",
    url: "https://chrome.google.com/webstore/detail/tab-pinner/mcclikmfcmcpejkaobpfkmmbekbhedoi",
    img: "https://place-hold.it/1600x900&fontsize=0",
    github: "https://github.com/bibixx/tab-pinner",
  },
  {
    title: "React Adobe Animate",
    subtitle: "Interactive Physics Experiments",
    url: "https://github.com/bibixx/react-adobe-animate",
    img: "https://place-hold.it/1600x900&fontsize=0",
  },
  {
    title: "PJAIT Projects",
    subtitle: "Projects Created During Studies",
    url: "https://github.com/bibixx/PJATK",
    img: pjaitSrc,
  },
  {
    title: "losowehaslo.pl",
    subtitle: `Polish Words Password Generator`,
    url: "https://losowehaslo.pl",
    img: "https://place-hold.it/1600x900&fontsize=0",
    github: "https://github.com/bibixx/losowehaslo",
  },
  {
    title: "PJAIT Class Schedule Sync",
    subtitle: `Sync your calendar with PJAIT${APOSTROPHE}s schedule`,
    url: "https://github.com/bibixx/pjatk-ical-sync",
    img: "https://place-hold.it/1600x900&fontsize=0",
  },
  {
    title: "tracethat.dev",
    subtitle: "No-Setup Remote Debugging for Any App",
    url: "https://tracethat.dev",
    img: traceThatSrc,
    github: "https://github.com/pietrzakacper/tracethat.dev",
  },
];
