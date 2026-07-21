import {Fragment, useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import styles from "../page.module.scss";
import type {Dictionary, Lang} from "../dictionaries";
import {splitTextWithClass} from "../utils/splitText";

gsap.registerPlugin(ScrollTrigger);

interface StatementSectionProps {
  lang: Lang;
  dict: Dictionary;
}

export default function StatementSection({lang, dict}: StatementSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // 早出し＆遅出しの 2 グループを取得
    const earlyChars = el.querySelectorAll(
      `.${styles.char}:not([data-late] .${styles.char})`
    );
    const lateChars = el.querySelectorAll(`[data-late] .${styles.char}`);

    // 初期状態
    gsap.set([earlyChars, lateChars], {opacity: 0, y: 15, filter: "blur(2px)"});

    // タイムラインで順番制御
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        },
      })
      .to(earlyChars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: 0.03,
        ease: "power2.out",
      })
      // 0.5 秒待ってから後段を再生（調整可）
      .to(
        lateChars,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.out",
        },
        "+=0.5"
      );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [lang]);

  const renderLines = (lines: string[][], late = false) =>
    lines.map((segments, lineIndex) => (
      <Fragment key={lineIndex}>
        {lineIndex > 0 && <br />}
        {segments.map((segment, segmentIndex) => (
          <Fragment key={segmentIndex}>
            {segmentIndex > 0 && lang === "en" ? " " : null}
            <span
              className={styles.segment}
              {...(late ? {"data-late": ""} : {})}
            >
              {splitTextWithClass(segment, lang, styles.char)}
            </span>
          </Fragment>
        ))}
      </Fragment>
    ));

  return (
    <div className={styles.statementSection} ref={sectionRef}>
      <div className={styles.statementLogoWrapper}></div>

      <p className={styles.statement}>
        {/* --- 早出しブロック --- */}
        {renderLines(dict.statement.early)}
        <br />
        <span style={{display: "block", marginBottom: "3rem"}} />

        {/* --- 遅出しブロック --- */}
        {renderLines(dict.statement.late, true)}
      </p>
    </div>
  );
}
