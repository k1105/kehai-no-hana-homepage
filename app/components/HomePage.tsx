"use client";
import styles from "../page.module.scss";
import AnimatedSection from "./AnimatedSection";
import {Fragment, useEffect, useRef, useState} from "react";
import {Zen_Kaku_Gothic_New, Zen_Old_Mincho} from "next/font/google";
import UsageSlideshow from "./UsageSlideshow";
import WebGLBackground from "./WebGLBackground";
import Logo from "./Logo";
import CommentSection from "./CommentSection";
import ImageSection from "./ImageSection";
import MovieSection from "./MovieSection";
import StatementSection from "./StatementSection";
import ContactSection from "./ContactSection";
import {Icon} from "@iconify/react";
import Link from "next/link";
import gsap from "gsap";
import {useIsomorphicLayoutEffect} from "../hooks/useIsomorphicLayoutEffect";
import {dictionaries, type Lang} from "../dictionaries";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400"],
  subsets: ["latin"],
});
const zenOldMincho = Zen_Old_Mincho({weight: ["400"], subsets: ["latin"]});

interface HomePageProps {
  lang: Lang;
}

export default function HomePage({lang}: HomePageProps) {
  const dict = dictionaries[lang];

  /* 使い方画像 */
  const steps = [
    {step: "/img/usage/pc/step1.png", stepSp: "/img/usage/sp/step1.png"},
    {step: "/img/usage/pc/step2.png", stepSp: "/img/usage/pc/step2.png"},
    {step: "/img/usage/pc/step3.png", stepSp: "/img/usage/pc/step3.png"},
    {step: "/img/usage/pc/step4.png", stepSp: "/img/usage/pc/step4.png"},
    {step: "/img/usage/pc/step5.png", stepSp: "/img/usage/pc/step5.png"},
  ];

  const [showLogo, setShowLogo] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleOpenVideo = (id: string) => {
    setVideoId(id);
    setIsVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
    setVideoId(""); // 動画IDをクリアして再生を停止
  };

  const handleSlideChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else if (direction === "next" && currentSlideIndex < steps.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const sectionRef = useRef<HTMLDivElement>(null); // pin 対象
  const containerRef = useRef<HTMLDivElement>(null); // 横に動かす

  /* モバイル判定 */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 600);
    }
  }, []);

  /* 横スクロール初期化（PC版でもカルーセル形式のため無効化） */
  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // スマホとデスクトップで異なる設定
    const isMobileDevice = window.innerWidth <= 600;

    // スマホ版では通常の縦スクロール表示
    if (isMobileDevice) {
      sectionRef.current.style.height = "auto";
      containerRef.current.style.transform = "none";

      const panelWidth = 100; // スマホでは100vw（1枚ずつ表示）
      const gapWidth = 0;
      const total = steps.length;
      const totalWidth = panelWidth * total + gapWidth * (total - 1);
      containerRef.current.style.width = `${totalWidth}vw`;

      gsap.set(containerRef.current, {x: 0});
      return;
    }

    // PC版でもカルーセル形式のため、横スクロールアニメーションは無効化
    sectionRef.current.style.height = "auto";
    containerRef.current.style.transform = "none";
    const total = steps.length;
    const panelWidth = 100; // PC版でも100vw（1枚ずつ表示）
    const totalWidth = panelWidth * total;
    containerRef.current.style.width = `${totalWidth}vw`;
    gsap.set(containerRef.current, {x: 0});
  }, [steps.length]);

  /* スライド移動制御（PC版・スマホ版共通） */
  useEffect(() => {
    if (!containerRef.current) return;

    const panelWidth = isMobile ? 100 : 100; // スマホでは100vw、PC版でも100vw（1枚ずつ表示）
    const targetX = -(currentSlideIndex * panelWidth);

    gsap.to(containerRef.current, {
      x: `${targetX}vw`,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [currentSlideIndex, isMobile]);

  /* ロゴ表示制御（変更なし） */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const vh = window.innerHeight;
          const down = y > lastScrollY;
          setShowLogo(isMobile ? y > vh && !down : y > vh && down);
          setLastScrollY(y);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [lastScrollY, isMobile]);

  /* モーダル表示時のスクロールロック */
  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVideoModalOpen]);

  return (
    <>
      <WebGLBackground />

      <main className={`${styles.main} ${zenKakuGothicNew.className}`}>
        <Link
          href={lang === "ja" ? "/en/" : "/"}
          className={styles.langSwitch}
          aria-label={lang === "ja" ? "Switch to English" : "日本語に切り替え"}
        >
          {lang === "ja" ? "EN" : "JA"}
        </Link>

        <div
          className={`${styles.fixedLogo} ${showLogo ? styles.visible : ""}`}
        >
          <Logo style={{objectFit: "contain", fill: "white"}} />
        </div>

        <p
          className={`${styles.initialTagline} ${
            lang === "en" ? styles.initialTaglineHorizontal : ""
          }`}
        >
          {dict.initialTagline.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>

        <div className={styles.firstView}>
          <div className={styles.logoWrapper}>
            <p>{dict.heroLead}</p>
            <div className={styles.logoImageWrapper}>
              <Logo style={{objectFit: "contain", fill: "white"}} />
            </div>
          </div>
          <video autoPlay muted loop playsInline style={{objectFit: "cover"}}>
            {isMobile ? (
              <source src="/mov/movie_mobile.mp4" type="video/mp4" />
            ) : (
              <source src="/mov/movie.mp4" type="video/mp4" />
            )}
          </video>
        </div>
        <AnimatedSection id="statement" style={{padding: 0}}>
          <StatementSection lang={lang} dict={dict} />
        </AnimatedSection>

        <AnimatedSection id="image" style={{padding: 0}}>
          <ImageSection lang={lang} dict={dict} />
        </AnimatedSection>
        <AnimatedSection id="movie" style={{background: "#b1bcbe", padding: 0}}>
          <MovieSection
            onOpenVideo={handleOpenVideo}
            watchLabel={dict.movie.watchLabel}
          />
        </AnimatedSection>

        {/* 横スクロールセクション */}
        <section
          ref={sectionRef}
          className={styles.horizontalSection} /* flex gap の干渉回避用に追加 */
        >
          <h2
            className={`${styles.headline} ${zenOldMincho.className} ${styles.usageHeadline}`}
          >
            {dict.usage.headline}
          </h2>

          <div ref={containerRef} className={styles.horizontalContainer}>
            {steps.map((s, i) => (
              <div key={i} className={`${styles.panel} panel`}>
                <UsageSlideshow {...s} index={i} />
              </div>
            ))}
          </div>

          {/* カルーセルナビゲーション（PC・SP共通） */}
          <div className={styles.carouselNavigation}>
            <button
              className={styles.navButton}
              onClick={() => handleSlideChange("prev")}
              disabled={currentSlideIndex === 0}
            >
              <Icon icon="mdi:chevron-left" />
            </button>
            <div className={styles.carouselIndicator}>
              {steps.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.indicatorDot} ${
                    i === currentSlideIndex ? styles.indicatorDotActive : ""
                  }`}
                  onClick={() => setCurrentSlideIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              className={styles.navButton}
              onClick={() => handleSlideChange("next")}
              disabled={currentSlideIndex === steps.length - 1}
            >
              <Icon icon="mdi:chevron-right" />
            </button>
          </div>
        </section>

        <CommentSection lang={lang} dict={dict} />
        <ContactSection dict={dict} />
      </main>

      {/* Video Modal */}
      <div
        className={`${styles.modalOverlay} ${
          isVideoModalOpen ? styles.visible : ""
        }`}
        onClick={handleCloseVideo}
      >
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={handleCloseVideo}>
            ×
          </button>
          <div className={styles.videoWrapper}>
            {videoId && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
