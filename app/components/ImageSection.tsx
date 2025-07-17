import Image from "next/image";
import styles from "../page.module.scss";

export default function ImageSection() {
  return (
    <div className={styles.imageSection}>
      <p
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
        <span className={styles.shortHeight}>
          私たちは
          <br />
          ゆるやかに
          <br />
          でもたしかに
          <br />
          つながっている。
        </span>
      </p>

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
