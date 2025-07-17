// hooks/useCharAnimation.ts
import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  delay?: number; // late ブロック開始までの待ち時間
  start?: string; // ScrollTrigger の開始位置
  offset?: number; // y 移動量（px）
  duration?: number; // 1文字のアニメーション時間
  stagger?: number; // 1文字ごとの遅延
}

export function useCharAnimation<T extends HTMLElement>(
  containerRef: React.RefObject<T>,
  {
    delay = 0.5,
    start = "top 75%",
    offset = 30,
    duration = 0.6,
    stagger = 0.035,
  }: Options = {}
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const early = el.querySelectorAll(`.char:not([data-late] .char)`);
    const late = el.querySelectorAll(`[data-late] .char`);

    // タイムライン
    gsap
      .timeline({scrollTrigger: {trigger: el, start}})
      .from(early, {
        opacity: 0,
        y: offset,
        filter: "blur(4px)",
        duration,
        stagger,
        ease: "power3.out",
      })
      .from(
        late,
        {
          opacity: 0,
          y: offset,
          filter: "blur(4px)",
          duration,
          stagger,
          ease: "power3.out",
        },
        `+=${delay}`
      );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [containerRef, delay, start, offset, duration, stagger]);
}
