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
        <span className={styles.segment}>
          「気配の花」は、花とマイクで1セット。
        </span>
        <span className={styles.segment}>1セットは自宅に。</span>
        <span className={styles.segment}>もう1セットは大切な人の家に。</span>
      </>
    ),
    image: "/img/usage/step1.jpg",
  },
  {
    text: (
      <>
        <span className={styles.segment}>
          花とマイクそれぞれをWi-Fiにつないだら、
        </span>
        <span className={styles.segment}>準備完了です。</span>
      </>
    ),
    image: "/img/usage/step2.jpg",
  },
  {
    text: (
      <>
        <span className={styles.segment}>マイクの近くで</span>
        <span className={styles.segment}>
          「おはよう」「いってきます」「ただいま」を
        </span>
        <span className={styles.segment}>言ってみてください。</span>
        <span className={styles.segment}>その声に反応して、</span>
        <span className={styles.segment}>相手の家の花に香りが噴射され、</span>
        <span className={styles.segment}>あなたの気配を届けます。</span>
      </>
    ),
    image: "/img/usage/step3.jpg",
  },
  {
    text: (
      <>
        <span className={styles.segment}>
          香りはお好きな香水やアロマオイル等を
        </span>
        <span className={styles.segment}>お選びください。</span>
      </>
    ),
    image: "/img/usage/step4.jpg",
  },
];

function UsageStepText({step}: {step: number}) {
  return <div className={styles.stepText}>{usageSteps[step].text}</div>;
}

export default function UsageSlideshow() {
  const [currentStep, setCurrentStep] = useState(0);

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
          />
        </div>
      </div>
      <div className={styles.textSection}>
        <UsageStepText step={currentStep} />
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
                onClick={() => setCurrentStep(idx)}
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
