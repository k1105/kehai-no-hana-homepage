"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import AnimatedSection from "./components/AnimatedSection";
import {useEffect, useState} from "react";
import {Hina_Mincho} from "next/font/google";
import VideoModal from "./components/VideoModal";
import {PlayButton} from "./components/play_button";
import UsageSlideshow from "./components/UsageSlideshow";
import {DLLogo} from "./components/DLLogo";
const hinaMincho = Hina_Mincho({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isScrollingDown = scrollPosition > lastScrollY;
      const isNearBottom =
        documentHeight - (scrollPosition + windowHeight) < windowHeight;
      const isMobile = window.innerWidth <= 600;

      setShowFloatingMenu(
        scrollPosition > windowHeight && !isNearBottom && !isMobile
      );
      setShowLogo(scrollPosition > windowHeight && isScrollingDown);
      setLastScrollY(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <main className={styles.main}>
        <div
          className={`${styles.floatingMenu} ${
            showFloatingMenu ? styles.visible : ""
          }`}
        >
          <ul>
            <li className={activeSection === "movie" ? styles.active : ""}>
              <Link
                href="#movie"
                onClick={(e) => handleSmoothScroll(e, "movie")}
              >
                紹介動画
              </Link>
            </li>
            <li className={activeSection === "usage" ? styles.active : ""}>
              <Link
                href="#usage"
                onClick={(e) => handleSmoothScroll(e, "usage")}
              >
                使い方
              </Link>
            </li>
            <li className={activeSection === "comment" ? styles.active : ""}>
              <Link
                href="#comment"
                onClick={(e) => handleSmoothScroll(e, "comment")}
              >
                例えば、こんな方に
              </Link>
            </li>
            <li className={activeSection === "contact" ? styles.active : ""}>
              <Link
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`${styles.fixedLogo} ${showLogo ? styles.visible : ""}`}
        >
          <Image
            src="/logo.svg"
            alt="logo"
            width={200}
            height={51}
            style={{objectFit: "contain"}}
          />
        </div>
        <p className={styles.initialTagline}>離れて暮らす大事な人へ</p>
        <div className={styles.firstView}>
          <div className={styles.logoWrapper}>
            <p>げんきだよ、のかわりに</p>
            <div className={styles.logoImageWrapper}>
              <Image
                src="/logo.svg"
                alt="logo"
                fill
                priority
                style={{objectFit: "contain"}}
              />
            </div>
          </div>
        </div>
        <AnimatedSection id="statement">
          <div className={styles.statementSection}>
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
            <div className={styles.statementImages}>
              <img
                src="/img/mood_mic.jpg"
                alt="mood mic"
                className={styles.moodMic}
              />
              <img
                src="/img/mood_flower.jpg"
                alt="mood flower"
                className={styles.moodFlower}
              />
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection id="movie">
          <h2 className={`${styles.headline} ${hinaMincho.className}`}>
            紹介動画
          </h2>
          <div className={styles.movieContainer}>
            <div className={styles.movieWrapper}>
              <div
                className={styles.thumbnailWrapper}
                onClick={() => setIsVideoModalOpen(true)}
              >
                <div className={styles.buttonWrapper}>
                  <PlayButton
                    style={{
                      width: "60px",
                      height: "60px",
                      stroke: "white",
                      fill: "none",
                      strokeWidth: "10px",
                    }}
                  />
                  <p>動画を見る</p>
                </div>
              </div>
            </div>
            <div className={styles.textWrapper}>
              <p>
                <span className={styles.segment}>懐かしい香りがして、</span>
                <span className={styles.segment}>
                  ふと誰かのことを思い出した
                </span>
                <span className={styles.segment}>経験はありませんか？</span>
                <br />
                <span className={styles.segment}>
                  「気配の花」はそんな香りの力を使って
                </span>
                <span className={styles.segment}>
                  大切な人にあなたの気配を届けます。
                </span>
              </p>
            </div>
          </div>
        </AnimatedSection>
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoId="aOPO_Qeg3zE"
        />
        <AnimatedSection id="usage">
          <h2 className={`${styles.headline} ${hinaMincho.className}`}>
            使い方
          </h2>
          <UsageSlideshow />
        </AnimatedSection>
        <AnimatedSection id="comment">
          <h2 className={`${styles.headline} ${hinaMincho.className}`}>
            例えば、こんな方に
          </h2>
          <div className={styles.commentSectionContainer}>
            <div className={styles.commentSectionWrapper}>
              <div className={styles.profileContainer}>
                <div className={styles.profileImageWrapper}>
                  <Image
                    src="/img/otaki_family.png"
                    alt="otaki"
                    fill
                    className={styles.profileImage}
                  />
                </div>
                <h3 className={styles.red}>
                  家族と離れて暮らす
                  <br />
                  大瀧さん夫婦
                </h3>
              </div>

              <div className={`${styles.commentContainer} ${styles.red}`}>
                <p>
                  <span className={styles.segment}>
                    「あと何回会えるんだろう」
                  </span>
                  <span className={styles.segment}>
                    と思うことが増えました。
                  </span>
                  <br />
                  <span className={styles.segment}>上京してもうすぐ20年。</span>
                  <span className={styles.segment}>
                    実家に帰るのはお盆とお正月の
                  </span>
                  <br />
                  <span className={styles.segment}>
                    2回程度で、仕事が忙しく
                  </span>
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
                  <br />{" "}
                  <span className={styles.segment}>「気配の花」は、</span>
                  <span className={styles.segment}>毎日の挨拶の延長線上で</span>
                  <span className={styles.segment}>
                    両親に自分の気配を送れるところが
                  </span>
                  <span className={styles.segment}>
                    気軽でいいと思いました。
                  </span>
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

            <div className={`${styles.commentSectionWrapper} ${styles.right}`}>
              <div className={`${styles.profileContainer} ${styles.right}`}>
                <h3 className={styles.blue}>
                  子どもと離れて暮らす
                  <br />
                  伊藤さん夫婦
                </h3>
                <div className={styles.profileImageWrapper}>
                  <Image
                    src="/img/ito_family.png"
                    alt="itou"
                    fill
                    className={styles.profileImage}
                  />
                </div>
              </div>

              <div className={styles.commentContainer}>
                <p>
                  <span className={styles.segment}>正直に言えば</span>
                  <span className={styles.segment}>「もっと帰ってきて</span>
                  <span className={styles.segment}>くれたら嬉しいな」</span>
                  <span className={styles.segment}>とは思います。</span>
                  <br />
                  <span className={styles.segment}>
                    でも東京で家庭を持って、
                  </span>
                  <span className={styles.segment}>
                    向こうの生活があるのもわかるから
                  </span>
                  <span className={styles.segment}>
                    口うるさく言うのはやめよう
                  </span>
                  <span className={styles.segment}>と思っていました。</span>
                  <br />
                  <span className={styles.segment}>
                    LINEも用があるとき以外は
                  </span>
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
        </AnimatedSection>
        <section id="contact">
          <div className={styles.contact}>
            <div className={styles.contactItemsWrapper}>
              <div className={`${styles.contactItem} ${styles.contactForm}`}>
                <DLLogo style={{width: "80%", height: "auto"}} />
                <Link href="https://dentsulab.tokyo/">
                  <div className={`${styles.contactItem}`}>
                    <p>お問い合わせ</p>
                    <h2>Dentsu Lab Tokyo</h2>
                  </div>
                  <div className={styles.bottomLink}>
                    <p>公式サイトへ</p>
                  </div>
                </Link>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.address}>
                  <p>東京都中央区銀座7-14-16 太陽銀座ビル1階</p>
                  <p>dentsu-lab-tokyo@dentsu.co.jp</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className={styles.footer}></div>
    </>
  );
}
