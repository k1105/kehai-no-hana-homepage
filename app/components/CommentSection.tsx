import Image from "next/image";
import styles from "../page.module.scss";
import {Zen_Old_Mincho} from "next/font/google";
import AnimatedSection from "./AnimatedSection";
import {splitTextByLine} from "../utils/splitTextByLine";
import {useLineAnimation} from "../hooks/useLineAnimation";
import {useRef} from "react";

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400"],
  subsets: ["latin"],
});

export default function CommentSection() {
  const leftCommentRef = useRef<HTMLDivElement>(null);
  const rightCommentRef = useRef<HTMLDivElement>(null);

  useLineAnimation(leftCommentRef as React.RefObject<HTMLElement>, {
    delay: 0.1,
    start: "top 80%",
    stagger: 0.08,
    duration: 1.5,
    xOffset: 30,
  });

  useLineAnimation(rightCommentRef as React.RefObject<HTMLElement>, {
    delay: 0.1,
    start: "top 80%",
    stagger: 0.08,
    duration: 1.5,
    xOffset: 30,
  });

  return (
    <AnimatedSection id="comment" style={{padding: 0}}>
      <div className={styles.commentSectionContainer}>
        <div className={`${styles.commentSectionWrapper} ${styles.left}`}>
          <h2
            className={`${styles.headline} ${zenOldMincho.className}`}
            style={{
              textAlign: "center",
              width: "100vw",
            }}
          >
            {splitTextByLine("例えば、\nこんな方に")}
          </h2>
          <div className={styles.commentContentWrapper}>
            <div className={styles.profileContainer}>
              <h3 className={styles.red}>
                家族と離れて暮らす
                <br />
                お子さんご夫婦
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
            <div className={`${styles.commentContainer}`} ref={leftCommentRef}>
              {splitTextByLine(
                `「あと何回会えるんだろう」と思うことが増えました。\n上京してもうすぐ20年。実家に帰るのはお盆とお正月の2回程度で、仕事が忙しく帰れない年もあったりします。もっと頻繁に帰れたらいいけれど、それも難しい。LINEや電話も、なかなかできなかったり、用もないのにするのは照れくさかったり。\n「気配の花」は、毎日の挨拶の延長線上で両親に自分の気配を送れるところが気軽でいいと思いました。朝起きて花が香っていると、「あ、母さん今日も早起きだな」とか。両親が元気でいることがわかるのも安心します。`
              )}
            </div>
          </div>
        </div>

        <div className={`${styles.commentSectionWrapper} ${styles.right}`}>
          <div className={`${styles.commentContentWrapper} ${styles.right}`}>
            <div className={`${styles.profileContainer} ${styles.right}`}>
              <div className={styles.profileImageWrapper}>
                <Image
                  src="/img/ito_family.png"
                  alt="otaki-parents"
                  fill
                  className={styles.profileImage}
                />
              </div>
              <h3 className={styles.blue}>
                子どもと離れて暮らす
                <br />
                ご両親
              </h3>
            </div>
            <div className={styles.commentContainer} ref={rightCommentRef}>
              {splitTextByLine(
                `正直に言えば「もっと帰ってきてくれたら嬉しいな」とは思います。でも東京で家庭を持って、向こうの生活があるのもわかるから口うるさく言うのはやめようと思っていました。\nLINEも用があるとき以外は送らないですね、返信がこなかったら寂しいので（笑）\n「気配の花」は、子どもとの毎日のちょっとしたコミュニケーションのようになっています。\n一緒に暮らしていた頃みたいに「おはよう」とか「ただいま」が言えて、それが香りで残るのはけっこう嬉しいものですね。`
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
