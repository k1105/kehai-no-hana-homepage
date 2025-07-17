import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  delay?: number;
  start?: string;
  stagger?: number;
  duration?: number;
  xOffset?: number;
}

export function useLineAnimation<T extends HTMLElement>(
  containerRef: React.RefObject<T>,
  {
    delay = 0.1,
    start = "top 80%",
    stagger = 0.1,
    duration = 0.8,
    xOffset = 50,
  }: Options = {}
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lines = el.querySelectorAll(".line-animation");

    gsap.timeline({scrollTrigger: {trigger: el, start}}).from(lines, {
      opacity: 0,
      x: xOffset,
      duration,
      stagger,
      ease: "power2.out",
      filter: "blur(4px)",
      delay,
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [containerRef, delay, start, stagger, duration, xOffset]);
}
