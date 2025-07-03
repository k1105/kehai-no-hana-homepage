"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import AnimatedSection from "./components/AnimatedSection";
import {useEffect, useState} from "react";
import {Zen_Kaku_Gothic_New} from "next/font/google";
import {Zen_Old_Mincho} from "next/font/google";
import {Inter} from "next/font/google";
import VideoModal from "./components/VideoModal";
import {PlayButton} from "./components/play_button";
import UsageSlideshow from "./components/UsageSlideshow";
import {DLLogo} from "./components/DLLogo";
import WebGLBackground from "./components/WebGLBackground";
import Logo from "./components/Logo";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400"],
  subsets: ["latin"],
});

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400"],
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
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

    if (window) setIsMobile(window.innerWidth <= 600);

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const isScrollingDown = scrollPosition > lastScrollY;
          const isNearBottom =
            documentHeight - (scrollPosition + windowHeight) < windowHeight;

          setScrollY(scrollPosition);
          setShowFloatingMenu(
            scrollPosition > windowHeight && !isNearBottom && !isMobile
          );
          if (isMobile) {
            setShowLogo(scrollPosition > windowHeight && !isScrollingDown);
          } else {
            setShowLogo(scrollPosition > windowHeight && isScrollingDown);
          }
          setLastScrollY(scrollPosition);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [lastScrollY, isMobile]);

  return (
    <>
      <WebGLBackground />
      <main className={`${styles.main} ${zenKakuGothicNew.className}`}>
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
        <p className={styles.initialTagline}>
          離れて暮らす、
          <br />
          大切な人へ。
        </p>
        <div className={styles.firstView}>
          <video autoPlay muted loop playsInline style={{objectFit: "cover"}}>
            {isMobile ? (
              <source src="/mov/movie_mobile.mp4" type="video/mp4" />
            ) : (
              <source src="/mov/movie.mp4" type="video/mp4" />
            )}
          </video>
          <div className={styles.logoWrapper}>
            <p>元気だよ、のかわりに</p>
            <div className={styles.logoImageWrapper}>
              <Logo
                style={{
                  objectFit: "contain",
                  fill: "white",
                }}
              />
            </div>
          </div>
        </div>
        <AnimatedSection id="statement">
          <div className={styles.statementSection}>
            <div className={styles.statementLogoWrapper}>
              <p>元気だよ、のかわりに</p>
              <div className={styles.logoImageWrapper}>
                <Logo
                  style={{
                    objectFit: "contain",
                    fill: "var(--brown)",
                  }}
                />
              </div>
            </div>
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
                <span style={{marginLeft: "-0.5rem"}}>
                  「おはよう」「いってきます」「ただいま」
                </span>
              </span>
              <br />
              <span className={styles.segment}>3つの声に反応して、</span>
              <span className={styles.segment}>香りを届けます。</span>
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection id="image" style={{padding: 0}}>
          <div className={styles.imageSection}>
            <div className={styles.statementImages}>
              <div
                className={styles.moodMicWrapper}
                style={{
                  transform: isMobile
                    ? "none"
                    : `translateY(${scrollY * 0.15}px)`,
                  willChange: isMobile ? "auto" : "transform",
                }}
              >
                <div className={styles.statementImageWrapper}>
                  <Image
                    src="/img/mood_mic.jpg"
                    alt="mood mic"
                    fill
                    style={{objectFit: "cover"}}
                  />
                </div>
              </div>
              <div
                className={styles.moodFlowerWrapper}
                style={{
                  transform: isMobile
                    ? "none"
                    : `translateY(${scrollY * 0.1}px)`,
                  willChange: isMobile ? "auto" : "transform",
                }}
              >
                <p
                  className={styles.statement}
                  style={{
                    color: "white",
                    position: "absolute",
                    top: "-5rem",
                    left: "20vw",
                    zIndex: 10,
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
        </AnimatedSection>
        <AnimatedSection id="movie" style={{background: "#b1bcbe", padding: 0}}>
          {/* <h2 className={`${styles.headline} ${zenOldMincho.className}`}>
            紹介動画
          </h2> */}
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
            {/* <div className={styles.textWrapper}>
              <p>
                <span className={styles.segment}>懐かしい香りがして、</span>
                <span className={styles.segment}>
                  ふと誰かのことを思い出した
                </span>
                <span className={styles.segment}>経験はありませんか？</span>
                <br />
                <span
                  className={styles.segment}
                  style={{marginLeft: "-0.5rem"}}
                >
                  「気配の花」はそんな香りの力を使って
                </span>
                <span className={styles.segment}>
                  大切な人にあなたの気配を届けます。
                </span>
              </p>
            </div> */}
          </div>
        </AnimatedSection>
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoId="aOPO_Qeg3zE"
        />
        <AnimatedSection id="usage" style={{padding: 0}}>
          <h2
            className={`${styles.headline} ${zenOldMincho.className}`}
            style={{textAlign: "center"}}
          >
            使い方
          </h2>
          <UsageSlideshow />
        </AnimatedSection>
        <AnimatedSection id="comment" style={{padding: 0}}>
          <h2
            className={`${styles.headline} ${zenOldMincho.className}`}
            style={{
              textAlign: "center",
              position: "absolute",
              top: "5rem",
              left: 0,
              width: "100vw",
            }}
          >
            <span className={styles.segment}>例えば、</span>
            <span className={styles.segment}>こんな方に</span>
          </h2>
          <div className={styles.commentSectionContainer}>
            <div className={`${styles.commentSectionWrapper} ${styles.left}`}>
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
              <div
                className={`${styles.commentContentWrapper} ${styles.right}`}
              >
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
        <section id="contact">
          <div className={styles.contact}>
            <div className={styles.contactItemsWrapper}>
              <div className={`${styles.contactItem} ${styles.contactForm}`}>
                <div className={`${styles.contactItem}`}>
                  <p>お問い合わせ</p>
                  <h2 className={inter.className} style={{fontWeight: "700"}}>
                    Dentsu Lab Tokyo
                  </h2>
                  <div className={styles.address}>
                    <p>東京都中央区銀座7-14-16 太陽銀座ビル1階</p>
                    <p>dentsu-lab-tokyo@dentsu.co.jp</p>
                  </div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <Link href="https://dentsulab.tokyo/">
                  <div className={styles.bottomLogoWrapper}>
                    <DLLogo style={{width: "100%", height: "auto"}} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className={styles.footer}></div>
    </>
  );
}
