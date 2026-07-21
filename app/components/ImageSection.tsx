import Image from "next/image";
import {Fragment, useRef} from "react";
import styles from "../page.module.scss";
import {splitText} from "@/app/utils/splitText";
import {useCharAnimation} from "@/app/hooks/useCharAnimation";
import type {Dictionary, Lang} from "../dictionaries";

interface ImageSectionProps {
  lang: Lang;
  dict: Dictionary;
}

export default function ImageSection({lang, dict}: ImageSectionProps) {
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
          {dict.imageLines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {splitText(line, lang)}
            </Fragment>
          ))}
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
