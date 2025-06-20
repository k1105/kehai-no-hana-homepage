import {useState, ReactNode} from "react";
import Image from "next/image";
import styles from "./UsageSlideshow.module.scss";

interface UsageStep {
  text: ReactNode;
  image: string;
}

const usageSteps: UsageStep[] = [
  {
    text: (
      <>
        <span className={styles.segment}>「気配の花」は、</span>
        <span className={styles.segment}>花とマイクで1セット。</span>
        <span className={styles.segment}>1セットは自宅に。</span>
        <span className={styles.segment}>もう1セットは</span>
        <span className={styles.segment}>大切な人の家に。</span>
        <span className={styles.segment}>それぞれの家には、</span>
        <span className={styles.segment}>あなたの</span>
        <span className={styles.segment}>気配を</span>
        <span className={styles.segment}>届ける</span>
        <span className={styles.segment}>花があります。</span>
      </>
    ),
    image: "/img/usage/step1.png",
  },
  {
    text: (
      <>
        <span className={styles.segment}>花とマイクを</span>
        <span className={styles.segment}>Wi-Fiにつないだら、</span>
        <span className={styles.segment}>準備完了です。</span>
      </>
    ),
    image: "/img/usage/step2.png",
  },
  {
    text: (
      <>
        <span className={styles.segment}>マイクの近くで</span>
        <span className={styles.segment}>「おはよう」</span>
        <span className={styles.segment}>「いってきます」</span>
        <span className={styles.segment}>「ただいま」</span>
        <span className={styles.segment}>を</span>
        <span className={styles.segment}>言ってみて</span>
        <span className={styles.segment}>ください。</span>
        <span className={styles.segment}>その声に反応して、</span>
        <span className={styles.segment}>相手の家の花から</span>
        <span className={styles.segment}>香りが広がり、</span>
        <span className={styles.segment}>あなたの気配を</span>
        <span className={styles.segment}>届けます。</span>
      </>
    ),
    image: "/img/usage/step3.png",
  },
  {
    text: (
      <>
        <span className={styles.segment}>香りや</span>
        <span className={styles.segment}>先端のアタッチメントは</span>
        <span className={styles.segment}>さまざまなものを</span>
        <span className={styles.segment}>お選びいただけます。</span>
      </>
    ),
    image: "/img/usage/step4.jpg",
  },
];

function UsageStepText({step, isVisible}: {step: number; isVisible: boolean}) {
  return (
    <div
      className={`${styles.stepText} ${
        isVisible ? styles.textVisible : styles.textHidden
      }`}
    >
      {usageSteps[step].text}
    </div>
  );
}

export default function UsageSlideshow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [isImageVisible, setIsImageVisible] = useState(true);

  const handleStepChange = (newStep: number) => {
    if (newStep === currentStep || isTransitioning) return;

    setIsTransitioning(true);
    setIsTextVisible(false);
    setIsImageVisible(false);

    setTimeout(() => {
      setCurrentStep(newStep);
      setIsTextVisible(true);
      setIsImageVisible(true);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className={styles.slideshowContainer}>
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <Image
            src={usageSteps[currentStep].image}
            alt={`Step ${currentStep + 1}`}
            fill
            style={{objectFit: "cover"}}
            sizes="100vw"
            priority
            className={`${styles.slideshowImage} ${
              isImageVisible ? styles.imageVisible : styles.imageHidden
            }`}
          />
        </div>
      </div>
      <div className={styles.textSection}>
        <UsageStepText step={currentStep} isVisible={isTextVisible} />
        <div className={styles.navigation}>
          <span className={styles.stepIndicator}>
            {usageSteps.map((_, idx) => (
              <span
                key={idx}
                className={
                  idx === currentStep
                    ? `${styles.dot} ${styles.dotActive}`
                    : styles.dot
                }
                onClick={() => handleStepChange(idx)}
                style={{cursor: "pointer"}}
                aria-label={`ステップ${idx + 1}`}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
