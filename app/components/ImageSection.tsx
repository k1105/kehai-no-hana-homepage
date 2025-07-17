import Image from "next/image";
import {useRef} from "react";
import styles from "../page.module.scss";
import {splitText} from "@/app/utils/splitText";
import {useCharAnimation} from "@/app/hooks/useCharAnimation";

export default function ImageSection() {
  const textRef = useRef<HTMLParagraphElement>(null);

  // 文字アニメーションを適用（imageSectionの上端がビューポートの上端に到達したときに開始）
  useCharAnimation(textRef as React.RefObject<HTMLElement>, {
    start: "top top",
  });

  return (
    <div className={styles.imageSection}>
      <p
        ref={textRef}
        className={styles.statement}
        style={{
          color: "white",
          position: "sticky",
          top: "40vh",
          marginLeft: "10vw",
          marginBottom: "20rem",
          zIndex: 1000,
        }}
      >
        {/* 1 行ずつ splitText で <span class="char">…</span> 化 */}
        <span className={styles.shortHeight}>
          {splitText("私たちは")}
          <br />
          {splitText("ゆるやかに")}
          <br />
          {splitText("でもたしかに")}
          <br />
          {splitText("つながっている。")}
        </span>
      </p>

      {/* 画像はそのまま */}
      <div className={styles.statementImages}>
        <div className={styles.moodMicWrapper}>
          <div className={styles.statementImageWrapper}>
            <Image
              src="/img/mood_mic.jpg"
              alt="mood mic"
              fill
              style={{objectFit: "cover"}}
            />
          </div>
        </div>
        <div className={styles.moodFlowerWrapper}>
          <div className={styles.statementImageWrapper}>
            <Image
              src="/img/mood_flower.jpg"
              alt="mood flower"
              fill
              style={{objectFit: "cover"}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
