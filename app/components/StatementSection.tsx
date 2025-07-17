import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import styles from "../page.module.scss";

gsap.registerPlugin(ScrollTrigger);

// 1 文字ずつ <span class="char"> に分割
const split = (txt: string) =>
  txt.split("").map((c, i) => (
    <span key={i} className={styles.char}>
      {c}
    </span>
  ));

export default function StatementSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // 早出し＆遅出しの 2 グループを取得
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
      // 0.5 秒待ってから後段を再生（調整可）
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
  }, []);

  return (
    <div className={styles.statementSection} ref={sectionRef}>
      <div className={styles.statementLogoWrapper}></div>

      <p className={styles.statement}>
        {/* --- 早出しブロック --- */}
        {split("ちゃんと元気でいるか、気になる。")}
        <br />
        <span className={styles.segment}>
          {split("けれど、毎日連絡をとるのは")}
        </span>
        <span className={styles.segment}>{split("なかなか難しい。")}</span>
        <br />
        {split("離れて暮らす、大切な人とのあいだに")}
        <br />
        <span className={styles.segment}>
          {split("お互いの気配を気軽に感じる")}
        </span>
        <span className={styles.segment}>
          {split("きっかけができました。")}
        </span>
        <br />
        <span style={{display: "block", marginBottom: "3rem"}} />

        {/* --- 遅出しブロック --- */}
        <span data-late className={styles.segment}>
          {split("「おはよう」「いってきます」「ただいま」")}
        </span>
        <br />
        <span data-late className={styles.segment}>
          {split("3つの声に反応して、")}
        </span>
        <span data-late className={styles.segment}>
          {split("香りを届けます。")}
        </span>
      </p>
    </div>
  );
}
