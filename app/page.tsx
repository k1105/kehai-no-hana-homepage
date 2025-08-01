"use client";
import styles from "./page.module.scss";
import AnimatedSection from "./components/AnimatedSection";
import {useEffect, useRef, useState} from "react";
import {Zen_Kaku_Gothic_New, Zen_Old_Mincho} from "next/font/google";
import UsageSlideshow from "./components/UsageSlideshow";
import WebGLBackground from "./components/WebGLBackground";
import Logo from "./components/Logo";
import CommentSection from "./components/CommentSection";
import ImageSection from "./components/ImageSection";
import MovieSection from "./components/MovieSection";
import StatementSection from "./components/StatementSection";
import ContactSection from "./components/ContactSection";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useIsomorphicLayoutEffect} from "./hooks/useIsomorphicLayoutEffect";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400"],
  subsets: ["latin"],
});
const zenOldMincho = Zen_Old_Mincho({weight: ["400"], subsets: ["latin"]});

export default function Home() {
  const [showLogo, setShowLogo] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoId, setVideoId] = useState("");

  const handleOpenVideo = (id: string) => {
    setVideoId(id);
    setIsVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
    setVideoId(""); // 動画IDをクリアして再生を停止
  };

  const sectionRef = useRef<HTMLDivElement>(null); // pin 対象
  const containerRef = useRef<HTMLDivElement>(null); // 横に動かす

  /* モバイル判定 */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 600);
    }
  }, []);

  /* 横スクロール初期化 */
  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    /* パネル枚数と固定距離 */
    const panels = gsap.utils.toArray<HTMLElement>(
      ".panel",
      containerRef.current
    );
    const total = panels.length;
    const panelWidth = 40; // 40vw per panel
    const gapWidth = 5; // 5vw gap between panels
    const totalWidth = panelWidth * total + gapWidth * (total - 1); // 40vw × 5 + 5vw × 4 = 220vw
    const scrollLength =
      ((window.innerWidth * (panelWidth + gapWidth)) / 100) * (total - 1); // (40vw + 5vw) × 4

    /* 必要分の高さを確保 (pinSpacing:false の代わり) */
    sectionRef.current.style.height = `${scrollLength + window.innerHeight}px`;

    /* パネル列の幅を強制 */
    containerRef.current.style.width = `${totalWidth}vw`;

    /* 初期位置を設定（最初の要素を中央に配置） */
    const initialOffset = (window.innerWidth * 30) / 100; // 50vw - 20vw = 30vw
    gsap.set(containerRef.current, {x: initialOffset});

    /* GSAP アニメーション */
    const tween = gsap.to(containerRef.current, {
      x: initialOffset - scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollLength}`,
        scrub: 1,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        // markers: true,
        onUpdate: (self) => {
          // アニメーション完了時に高さを戻す
          if (
            self.progress >= 1 &&
            containerRef.current &&
            sectionRef.current
          ) {
            gsap.set(containerRef.current, {
              height: "100vh",
              width: "220vw",
            });
            sectionRef.current.style.height = "100vh";
          }
        },
      },
    });

    /* 画像ロード/リサイズでリフレッシュ */
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
    };
  }, []);

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

  /* 使い方画像 */
  const steps = [
    {step: "/img/usage/tmp.png", stepSp: "/img/usage/tmp.png"},
    {step: "/img/usage/tmp.png", stepSp: "/img/usage/tmp.png"},
    {step: "/img/usage/tmp.png", stepSp: "/img/usage/tmp.png"},
    {step: "/img/usage/tmp.png", stepSp: "/img/usage/tmp.png"},
    {step: "/img/usage/tmp.png", stepSp: "/img/usage/tmp.png"},
  ];

  return (
    <>
      <WebGLBackground />

      <main className={`${styles.main} ${zenKakuGothicNew.className}`}>
        <div
          className={`${styles.fixedLogo} ${showLogo ? styles.visible : ""}`}
        >
          <Logo style={{objectFit: "contain", fill: "white"}} />
        </div>

        <p className={styles.initialTagline}>
          離れて暮らす、
          <br />
          大切な人へ。
        </p>

        <div className={styles.firstView}>
          <div className={styles.logoWrapper}>
            <p>元気だよ、のかわりに</p>
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
          <StatementSection />
        </AnimatedSection>

        <AnimatedSection id="image" style={{padding: 0}}>
          <ImageSection />
        </AnimatedSection>
        <AnimatedSection id="movie" style={{background: "#b1bcbe", padding: 0}}>
          <MovieSection onOpenVideo={handleOpenVideo} />
        </AnimatedSection>

        {/* 横スクロールセクション */}
        <section
          ref={sectionRef}
          className={styles.horizontalSection} /* flex gap の干渉回避用に追加 */
        >
          <h2
            className={`${styles.headline} ${zenOldMincho.className}`}
            style={{
              position: "sticky",
              top: "3rem",
              zIndex: 1000,
              width: "100%",
              textAlign: "center",
            }}
          >
            使い方
          </h2>

          <div ref={containerRef} className={styles.horizontalContainer}>
            {steps.map((s, i) => (
              <div key={i} className={`${styles.panel} panel`}>
                <UsageSlideshow {...s} index={i} />
              </div>
            ))}
          </div>
        </section>

        <CommentSection />
        <ContactSection />
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
