import {useState} from "react";
import Image from "next/image";
import styles from "./UsageSlideshow.module.scss";

const usageSteps = [
  "/img/usage/pc/step1.png",
  "/img/usage/pc/step2.png",
  "/img/usage/pc/step3.png",
  "/img/usage/pc/step4.png",
  "/img/usage/pc/step5.png",
];

const usageStepsSp = [
  "/img/usage/sp/step1.png",
  "/img/usage/sp/step2.png",
  "/img/usage/sp/step3.png",
  "/img/usage/sp/step4.png",
  "/img/usage/sp/step5.png",
];

export default function UsageSlideshow() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (newStep: number) => {
    if (newStep === currentStep) return;
    setCurrentStep(newStep);
  };

  // 各画像の幅が20%なので、移動量は20%ずつ
  const translateX = currentStep * 20;

  return (
    <div className={styles.container}>
      <div className={styles.slideshowContainer}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            {/* PC用画像 */}
            <div
              className={`${styles.slideshowTrack} ${styles.pcTrack}`}
              style={{
                transform: `translateX(-${translateX}%)`,
              }}
            >
              {usageSteps.map((step, index) => (
                <div key={index} className={styles.slideItem}>
                  <Image
                    src={step}
                    alt={`Step ${index + 1}`}
                    fill
                    style={{objectFit: "contain"}}
                    sizes="100vw"
                    priority
                    className={`${styles.slideshowImage} ${styles.pcImage}`}
                  />
                </div>
              ))}
            </div>
            {/* SP用画像 */}
            <div
              className={`${styles.slideshowTrack} ${styles.spTrack}`}
              style={{
                transform: `translateX(-${translateX}%)`,
              }}
            >
              {usageStepsSp.map((step, index) => (
                <div key={`sp-${index}`} className={styles.slideItem}>
                  <Image
                    src={step}
                    alt={`Step ${index + 1}`}
                    fill
                    style={{objectFit: "contain"}}
                    sizes="100vw"
                    priority
                    className={`${styles.slideshowImage} ${styles.spImage}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
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
