"use client";
import Image from "next/image";
import styles from "./Noise.module.css";
import animationStyles from "./Noise.animation.module.css";
import noiseSrc from "@/assets/noise.jpg";
import { cn } from "@/lib/utils";
import { useCallback, useRef } from "react";
import { randomBoolean, randomNumber } from "@/lib/random";
import { safeParseInt } from "@/lib/number";

export const Noise = () => {
  const noiseForTextRef = useRef<HTMLDivElement>(null);
  const noiseForRestRef = useRef<HTMLDivElement>(null);

  const onAnimationIteration = useCallback(() => {
    const $noiseForText = noiseForTextRef.current;
    const $noiseForRest = noiseForRestRef.current;
    if (!$noiseForText || !$noiseForRest) {
      return;
    }

    const style = window.getComputedStyle($noiseForText);
    const framesCountString = style.getPropertyValue("--framesCount");
    const framesCount = safeParseInt(framesCountString, 10);

    for (let i = 1; i <= framesCount; i++) {
      const setProperties = (
        $el: HTMLDivElement,
        translateX: number,
        translateY: number,
        rotate: number,
        scaleX: number,
        scaleY: number
      ) => {
        $el.style.setProperty(`--noise-translate-x-${i}`, String(translateX));
        $el.style.setProperty(`--noise-translate-y-${i}`, String(translateY));
        $el.style.setProperty(`--noise-rotate-${i}`, String(rotate));
        $el.style.setProperty(`--noise-scale-x-${i}`, String(scaleX));
        $el.style.setProperty(`--noise-scale-y-${i}`, String(scaleY));
      };

      const translateX = randomNumber(-20, 20, 2);
      const translateY = randomNumber(-20, 20, 2);
      const rotate = randomNumber(-10, 10, 2);
      const scaleX = randomBoolean() ? 1 : -1;
      const scaleY = randomBoolean() ? 1 : -1;
      setProperties(
        $noiseForText,
        translateX,
        translateY,
        rotate,
        scaleX,
        scaleY
      );
      setProperties(
        $noiseForRest,
        translateX,
        translateY,
        rotate,
        scaleX,
        scaleY
      );
    }
  }, []);

  return (
    <>
      <div className={cn(styles.noise, styles.noiseForText)}>
        <div
          className={cn(
            styles.noiseImageWrapper,
            animationStyles.noiseAnimation
          )}
          ref={noiseForTextRef}
          onAnimationIteration={onAnimationIteration}
        >
          <Image src={noiseSrc} fill alt="" priority />
        </div>
      </div>
      <div className={cn(styles.noise, styles.noiseForRest)}>
        <div
          className={cn(
            styles.noiseImageWrapper,
            animationStyles.noiseAnimation
          )}
          ref={noiseForRestRef}
        >
          <Image src={noiseSrc} fill alt="" priority />
        </div>
      </div>
    </>
  );
};
