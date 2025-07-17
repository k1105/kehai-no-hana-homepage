"use client";
import styles from "./page.module.scss";
import Image from "next/image";
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

  const sectionRef = useRef<HTMLDivElement>(null); // pin 対象
  const containerRef = useRef<HTMLDivElement>(null); // 横に動かす

  /* モバイル判定 */
  useEffect(() => {
    if (typeof window !== "undefined") setIsMobile(window.innerWidth <= 600);
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
    const scrollLength = window.innerWidth * (total - 1); // 固定距離で OK

    /* 必要分の高さを確保 (pinSpacing:false の代わり) */
    sectionRef.current.style.height = `${scrollLength + window.innerHeight}px`;

    /* パネル列の幅を強制 */
    containerRef.current.style.width = `${total * 100}vw`;

    /* GSAP アニメーション */
    const tween = gsap.to(containerRef.current, {
      x: -scrollLength,
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
              width: "100vw",
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

  /* 使い方画像 */
  const steps = [
    {step: "/img/usage/pc/step1.png", stepSp: "/img/usage/sp/step1.png"},
    {step: "/img/usage/pc/step2.png", stepSp: "/img/usage/sp/step2.png"},
    {step: "/img/usage/pc/step3.png", stepSp: "/img/usage/sp/step3.png"},
    {step: "/img/usage/pc/step4.png", stepSp: "/img/usage/sp/step4.png"},
    {step: "/img/usage/pc/step5.png", stepSp: "/img/usage/sp/step5.png"},
  ];

  return (
    <>
      <WebGLBackground />

      <main className={`${styles.main} ${zenKakuGothicNew.className}`}>
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

        <div className={styles.stickyLogoWrapper}>
          <div className={styles.logoWrapper}>
            <p>元気だよ、のかわりに</p>
            <div className={styles.logoImageWrapper}>
              <Logo style={{objectFit: "contain", fill: "white"}} />
            </div>
          </div>
          <div className={styles.firstView}>
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
        </div>

        <AnimatedSection id="image" style={{padding: 0}}>
          <ImageSection />
        </AnimatedSection>
        <AnimatedSection id="movie" style={{background: "#b1bcbe", padding: 0}}>
          <MovieSection />
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
    </>
  );
}
