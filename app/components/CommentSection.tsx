import Image from "next/image";
import styles from "../page.module.scss";
import localStyles from "./CommentSection.module.scss";
import {Zen_Old_Mincho} from "next/font/google";
import AnimatedSection from "./AnimatedSection";
import {splitTextByLine} from "../utils/splitTextByLine";
import {useRef} from "react";

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400"],
  subsets: ["latin"],
});

export default function CommentSection() {
  const leftCommentRef = useRef<HTMLDivElement>(null);
  const rightCommentRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatedSection id="comment" style={{padding: 0}}>
      <div className={styles.commentSectionContainer}>
        <h2
          className={`${styles.headline} ${zenOldMincho.className} ${localStyles.headline}`}
        >
          例えば、こんな方に
        </h2>

        <div className={styles.commentColumns}>
          {/* 左側セクション */}
          <div className={styles.commentColumn}>
            <div className={styles.commentContent}>
              <div className={styles.commentHeader}>
                <h3 className={styles.commentTitle}>
                  <span className={styles.segment}>家族と</span>
                  <span className={styles.segment}>離れて</span>
                  <span className={styles.segment}>暮らす</span>
                  <span className={styles.segment}>お子さん</span>
                  <span className={styles.segment}>ご夫婦</span>
                </h3>
                <div className={styles.profileImageWrapper}>
                  <Image
                    src="/img/otaki_family.png"
                    alt="otaki"
                    fill
                    className={styles.profileImage}
                  />
                </div>
              </div>
              <div className={styles.commentText} ref={leftCommentRef}>
                {splitTextByLine(
                  `「あと何回会えるんだろう」と思うことが増えました。\n上京してもうすぐ20年。実家に帰るのはお盆とお正月の2回程度で、仕事が忙しく帰れない年もあったりします。もっと頻繁に帰れたらいいけれど、それも難しい。LINEや電話も、なかなかできなかったり、用もないのにするのは照れくさかったり。\n「気配の花」は、毎日の挨拶の延長線上で両親に自分の気配を送れるところが気軽でいいと思いました。朝起きて花が香っていると、「あ、母さん今日も早起きだな」とか。両親が元気でいることがわかるのも安心します。`
                )}
              </div>
            </div>
          </div>

          {/* 右側セクション */}
          <div className={styles.commentColumn}>
            <div className={styles.commentContent}>
              <div className={styles.commentHeader}>
                <h3 className={styles.commentTitle}>
                  <span className={styles.segment}>子どもと</span>
                  <span className={styles.segment}>離れて</span>
                  <span className={styles.segment}>暮らす</span>
                  <span className={styles.segment}>ご両親</span>
                </h3>
                <div className={styles.profileImageWrapper}>
                  <Image
                    src="/img/ito_family.png"
                    alt="otaki-parents"
                    fill
                    className={styles.profileImage}
                  />
                </div>
              </div>
              <div className={styles.commentText} ref={rightCommentRef}>
                {splitTextByLine(
                  `正直に言えば「もっと帰ってきてくれたら嬉しいな」とは思います。でも東京で家庭を持って、向こうの生活があるのもわかるから口うるさく言うのはやめようと思っていました。\nLINEも用があるとき以外は送らないですね、返信がこなかったら寂しいので（笑）\n「気配の花」は、子どもとの毎日のちょっとしたコミュニケーションのようになっています。\n一緒に暮らしていた頃みたいに「おはよう」とか「ただいま」が言えて、それが香りで残るのはけっこう嬉しいものですね。`
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
