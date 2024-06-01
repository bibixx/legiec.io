"use client";
import Image from "next/image";
import styles from "./Noise.module.css";
import noiseSrc from "@/assets/noise.jpg";
import { cn } from "@/lib/utils";

export const Noise = () => {
  return (
    <>
      <div className={cn(styles.noise, styles.noiseForText)}>
        <div className={styles.noiseImageWrapper}>
          <Image src={noiseSrc} fill alt="" priority />
        </div>
      </div>
      <div className={cn(styles.noise, styles.noiseForRest)}>
        <div className={styles.noiseImageWrapper}>
          <Image src={noiseSrc} fill alt="" priority />
        </div>
      </div>
    </>
  );
};
