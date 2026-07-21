import Image from "next/image";
import {Fragment} from "react";
import styles from "../page.module.scss";
import localStyles from "./CommentSection.module.scss";
import {Zen_Old_Mincho} from "next/font/google";
import AnimatedSection from "./AnimatedSection";
import {splitTextByLine} from "../utils/splitTextByLine";
import {useRef} from "react";
import type {Dictionary, Lang} from "../dictionaries";

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400"],
  subsets: ["latin"],
});

interface CommentSectionProps {
  lang: Lang;
  dict: Dictionary;
}

export default function CommentSection({lang, dict}: CommentSectionProps) {
  const leftCommentRef = useRef<HTMLDivElement>(null);
  const rightCommentRef = useRef<HTMLDivElement>(null);

  const renderTitle = (segments: string[]) =>
    segments.map((segment, i) => (
      <Fragment key={i}>
        {i > 0 && lang === "en" ? " " : null}
        <span className={styles.segment}>{segment}</span>
      </Fragment>
    ));

  return (
    <AnimatedSection id="comment" style={{padding: 0}}>
      <div className={styles.commentSectionContainer}>
        <h2
          className={`${styles.headline} ${zenOldMincho.className} ${localStyles.headline}`}
        >
          {dict.comment.headline}
        </h2>

        <div className={styles.commentColumns}>
          {/* 左側セクション */}
          <div className={styles.commentColumn}>
            <div className={styles.commentContent}>
              <div className={styles.commentHeader}>
                <h3 className={styles.commentTitle}>
                  {renderTitle(dict.comment.left.titleSegments)}
                </h3>
                <div className={styles.profileImageWrapper}>
                  <Image
                    src={dict.comment.left.image}
                    alt={dict.comment.left.alt}
                    fill
                    className={styles.profileImage}
                  />
                </div>
              </div>
              <div className={styles.commentText} ref={leftCommentRef}>
                {splitTextByLine(dict.comment.left.text)}
              </div>
            </div>
          </div>

          {/* 右側セクション */}
          <div className={styles.commentColumn}>
            <div className={styles.commentContent}>
              <div className={styles.commentHeader}>
                <h3 className={styles.commentTitle}>
                  {renderTitle(dict.comment.right.titleSegments)}
                </h3>
                <div className={styles.profileImageWrapper}>
                  <Image
                    src={dict.comment.right.image}
                    alt={dict.comment.right.alt}
                    fill
                    className={styles.profileImage}
                  />
                </div>
              </div>
              <div className={styles.commentText} ref={rightCommentRef}>
                {splitTextByLine(dict.comment.right.text)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
