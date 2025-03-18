import styles from "./page.module.css";
import {YouTubeEmbed} from "@next/third-parties/google";
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.firstView}>気配の花</div>
      <div className={styles.section}>
        <p className={styles.statement}>
          ちゃんと元気でいるか、気になる。
          <br />
          <span className={styles.segment}>けれど、毎日連絡をとるのは</span>
          <span className={styles.segment}>なかなか難しい。</span>
          <br />
          離れて暮らす、大切な人とのあいだに
          <br />
          <span className={styles.segment}>お互いの気配を気軽に感じる</span>
          <span className={styles.segment}>きっかけができました。</span>
          <br />
          <span className={styles.segment}>
            「おはよう」「いってきます」「ただいま」
          </span>
          <br />
          <span className={styles.segment}>3つの声に反応して、</span>
          <span className={styles.segment}>香りを届けます。</span>
          <br /> <span className={styles.segment}>ゆるやかに でもたしかに</span>
          <br />
          <span className={styles.segment}>私たちは つながっている。</span>
        </p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.headline}>紹介動画</h2>
        <div className={styles.movieContainer}>
          <div className={styles.movieWrapper}>
            <YouTubeEmbed videoid="k2i73lmL3CM" />
          </div>
          <div className={styles.textWrapper}>
            <p>
              懐かしい香りがして、
              <br />
              ふと誰かのことを思い出した経験はありませんか？
              <br />
              「気配の花」はそんな香りの力を使って
              <br />
              大切な人にあなたの気配を届けます。
            </p>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.headline}>使い方</h2>
      </div>
    </main>
  );
}
