import Image from "next/image";
import styles from "../page.module.scss";
import {Zen_Old_Mincho} from "next/font/google";
import AnimatedSection from "./AnimatedSection";

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400"],
  subsets: ["latin"],
});

export default function CommentSection() {
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
            <span className={styles.segment}>例えば、</span>
            <span className={styles.segment}>こんな方に</span>
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

            <div className={`${styles.commentContainer}`}>
              <p>
                <span
                  className={styles.segment}
                  style={{marginLeft: "-0.5rem"}}
                >
                  「あと
                </span>
                <span className={styles.segment}>何回</span>
                <span className={styles.segment}>会えるんだろう」</span>
                <span className={styles.segment}>と</span>
                <span className={styles.segment}>思う</span>
                <span className={styles.segment}>ことが</span>
                <span className={styles.segment}>増えました。</span>
                <br />
                <span className={styles.segment}>上京して</span>
                <span className={styles.segment}>もうすぐ</span>
                <span className={styles.segment}>20年。</span>
                <span className={styles.segment}>実家に</span>
                <span className={styles.segment}>帰るのは</span>
                <span className={styles.segment}>お盆と</span>
                <span className={styles.segment}>お正月の</span>
                <span className={styles.segment}>2回程度で、</span>
                <span className={styles.segment}>仕事が</span>
                <span className={styles.segment}>忙しく</span>
                <span className={styles.segment}>帰れない</span>
                <span className={styles.segment}>年も</span>
                <span className={styles.segment}>あったりします。</span>
                <span className={styles.segment}>もっと</span>
                <span className={styles.segment}>頻繁に</span>
                <span className={styles.segment}>帰れたら</span>
                <span className={styles.segment}>いいけれど、</span>
                <span className={styles.segment}>それも</span>
                <span className={styles.segment}>難しい。</span>
                <span className={styles.segment}>LINEや</span>
                <span className={styles.segment}>電話も、</span>
                <span className={styles.segment}>なかなか</span>
                <span className={styles.segment}>できなかったり、</span>
                <span className={styles.segment}>用も</span>
                <span className={styles.segment}>ないのに</span>
                <span className={styles.segment}>するのは</span>
                <span className={styles.segment}>照れくさかったり。</span>
                <br />
                <span
                  className={styles.segment}
                  style={{marginLeft: "-0.5rem"}}
                >
                  「気配の花」は、
                </span>
                <span className={styles.segment}>毎日の</span>
                <span className={styles.segment}>挨拶の</span>
                <span className={styles.segment}>延長線上で</span>
                <span className={styles.segment}>両親に</span>
                <span className={styles.segment}>自分の</span>
                <span className={styles.segment}>気配を</span>
                <span className={styles.segment}>送れる</span>
                <span className={styles.segment}>ところが</span>
                <span className={styles.segment}>気軽で</span>
                <span className={styles.segment}>いいと</span>
                <span className={styles.segment}>思いました。</span>
                <span className={styles.segment}>朝</span>
                <span className={styles.segment}>起きて</span>
                <span className={styles.segment}>花が</span>
                <span className={styles.segment}>香っていると、</span>
                <span className={styles.segment}>「あ、母さん</span>
                <span className={styles.segment}>今日も</span>
                <span className={styles.segment}>早起きだな」</span>
                <span className={styles.segment}>とか。</span>
                <span className={styles.segment}>両親が</span>
                <span className={styles.segment}>元気で</span>
                <span className={styles.segment}>いることが</span>
                <span className={styles.segment}>わかるのも</span>
                <span className={styles.segment}>安心します。</span>
              </p>
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
            <div className={styles.commentContainer}>
              <p>
                <span className={styles.segment}>正直に</span>
                <span className={styles.segment}>言えば</span>
                <span className={styles.segment}>「もっと</span>
                <span className={styles.segment}>帰ってきて</span>
                <span className={styles.segment}>くれたら</span>
                <span className={styles.segment}>嬉しいな」</span>
                <span className={styles.segment}>とは</span>
                <span className={styles.segment}>思い</span>
                <span className={styles.segment}>ます。</span>
                <br />
                <span className={styles.segment}>でも</span>
                <span className={styles.segment}>東京で</span>
                <span className={styles.segment}>家庭を</span>
                <span className={styles.segment}>持って、</span>
                <span className={styles.segment}>向こうの</span>
                <span className={styles.segment}>生活が</span>
                <span className={styles.segment}>あるのも</span>
                <span className={styles.segment}>わかるから</span>
                <span className={styles.segment}>口うるさく</span>
                <span className={styles.segment}>言うのは</span>
                <span className={styles.segment}>やめよう</span>
                <span className={styles.segment}>と</span>
                <span className={styles.segment}>思って</span>
                <span className={styles.segment}>いました。</span>
                <br />
                <span className={styles.segment}>LINEも</span>
                <span className={styles.segment}>用が</span>
                <span className={styles.segment}>あるとき</span>
                <span className={styles.segment}>以外は</span>
                <span className={styles.segment}>送らないですね、</span>
                <span className={styles.segment}>返信が</span>
                <span className={styles.segment}>こなかったら</span>
                <span className={styles.segment}>寂しいので（笑）</span>
                <br />
                <span
                  className={styles.segment}
                  style={{marginLeft: "-0.5rem"}}
                >
                  「気配の花」は、
                </span>
                <span className={styles.segment}>子どもとの</span>
                <span className={styles.segment}>毎日の</span>
                <span className={styles.segment}>ちょっとした</span>
                <span className={styles.segment}>コミュニケーション</span>
                <span className={styles.segment}>のように</span>
                <span className={styles.segment}>なって</span>
                <span className={styles.segment}>います。</span>
                <br />
                <span className={styles.segment}>一緒に</span>
                <span className={styles.segment}>暮らして</span>
                <span className={styles.segment}>いた</span>
                <span className={styles.segment}>頃みたいに</span>
                <span
                  className={styles.segment}
                  style={{marginLeft: "-0.5rem"}}
                >
                  「おはよう」とか
                </span>
                <span
                  className={styles.segment}
                  style={{marginLeft: "-0.5rem"}}
                >
                  「ただいま」が
                </span>
                <span className={styles.segment}>言えて、</span>
                <span className={styles.segment}>それが</span>
                <span className={styles.segment}>香りで</span>
                <span className={styles.segment}>残るのは</span>
                <span className={styles.segment}>けっこう</span>
                <span className={styles.segment}>嬉しい</span>
                <span className={styles.segment}>ものですね。</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
