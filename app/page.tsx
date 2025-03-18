import Link from "next/link";
import styles from "./page.module.css";
import {YouTubeEmbed} from "@next/third-parties/google";
export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.firstView}>
          <p className={styles.tagline}>離れて暮らす大事な人へ</p>
          <p>気配の花</p>
        </div>
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
            <br />{" "}
            <span className={styles.segment}>ゆるやかに でもたしかに</span>
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
        <div className={styles.section}>
          <h2 className={styles.headline}>例えば、こんな方に</h2>
          <div>
            <h3>
              家族と離れて暮らす
              <br />
              大瀧さん夫婦
            </h3>
            <div className={styles.commentContainer}>
              <p>
                <span className={styles.segment}>
                  「あと何回会えるんだろう」
                </span>
                <span className={styles.segment}>と思うことが増えました。</span>
                <br />
                <span className={styles.segment}>上京してもうすぐ20年。</span>
                <span className={styles.segment}>
                  実家に帰るのはお盆とお正月の
                </span>
                <br />
                <span className={styles.segment}>2回程度で、仕事が忙しく</span>
                <span className={styles.segment}>
                  帰れない年もあったりします。
                </span>
                <br />
                <span className={styles.segment}>
                  もっと頻繁に帰れたらいいけれど、
                </span>
                <span className={styles.segment}>それも難しい。</span>
                <br /> <span className={styles.segment}>LINEや電話も</span>、
                <span className={styles.segment}>
                  なかなか頻繁にはできなかったり、
                </span>
                <span className={styles.segment}>
                  用もないのにするのは照れくさかったり。
                </span>
                <br /> <span className={styles.segment}>「気配の花」は、</span>
                <span className={styles.segment}>毎日の挨拶の延長線上で</span>
                <span className={styles.segment}>
                  両親に自分の気配を送れるところが
                </span>
                <span className={styles.segment}>気軽でいいと思いました。</span>
                <br />
                <span className={styles.segment}>
                  朝起きて花が香っていると、
                </span>
                <span className={styles.segment}>
                  「あ、母さん今日も早起きだな 」とか。
                </span>
                <br />
                <span className={styles.segment}>
                  両親が元気でいることがわかるのも
                </span>
                <span className={styles.segment}>安心します。</span>
                <br />
              </p>
            </div>
          </div>
          <div>
            <h3>
              子どもと離れて暮らす
              <br />
              伊藤さん夫婦
            </h3>
            <div className={styles.commentContainer}>
              <p>
                <span className={styles.segment}>正直に言えば</span>
                <span className={styles.segment}>
                  「もっと帰ってきてくれたら嬉しいな」
                </span>
                <span className={styles.segment}>とは思います。</span>
                <br />
                <span className={styles.segment}>でも東京で家庭を持って、</span>
                <span className={styles.segment}>
                  向こうの生活があるのもわかるから
                </span>
                <span className={styles.segment}>
                  口うるさく言うのはやめよう
                </span>
                <span className={styles.segment}>と思っていました。</span>
                <br />
                <span className={styles.segment}>LINEも用があるとき以外は</span>
                <span className={styles.segment}>送らないですね、</span>
                <span className={styles.segment}>
                  返信がこなかったら寂しいので（笑）
                </span>
                <br />
                <span className={styles.segment}>
                  「気配の花」は、子どもとの
                </span>
                <span className={styles.segment}>毎日のちょっとした</span>
                <span className={styles.segment}>
                  コミュニケーションのようになっています。
                </span>
                <br />
                <span className={styles.segment}>
                  一緒に暮らしていた頃みたいに
                </span>
                <span className={styles.segment}>
                  「おはよう」とか「ただいま」が言えて、
                </span>
                <span className={styles.segment}>
                  それが香りで残るのはけっこう
                </span>
                <span className={styles.segment}>嬉しいものですね。</span>
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className={styles.contact}>
          <h2>お問い合わせ</h2>
          <h1>Dentsu Lab Tokyo</h1>
          <div>
            <Link href={""}>公式サイトへ</Link>
          </div>
          <div className={styles.address}>
            <p>東京都中央区銀座7-14-16 太陽銀座ビル1階</p>
            <p>dentsu-lab-tokyo@dentsu.co.jp</p>
          </div>
        </div>
      </main>
      <div className={styles.footer}></div>
    </>
  );
}
