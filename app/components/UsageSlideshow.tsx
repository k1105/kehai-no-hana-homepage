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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);

  const handleStepChange = (newStep: number) => {
    if (newStep === currentStep || isTransitioning) return;

    setIsTransitioning(true);
    setIsImageVisible(false);

    setTimeout(() => {
      setCurrentStep(newStep);
      setIsImageVisible(true);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className={styles.slideshowContainer}>
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          {/* PC用画像 */}
          <Image
            src={usageSteps[currentStep]}
            alt={`Step ${currentStep + 1}`}
            fill
            style={{objectFit: "contain"}}
            sizes="100vw"
            priority
            className={`${styles.slideshowImage} ${styles.pcImage} ${
              isImageVisible ? styles.imageVisible : styles.imageHidden
            }`}
          />
          {/* SP用画像 */}
          <Image
            src={usageStepsSp[currentStep]}
            alt={`Step ${currentStep + 1}`}
            fill
            style={{objectFit: "contain"}}
            sizes="100vw"
            priority
            className={`${styles.slideshowImage} ${styles.spImage} ${
              isImageVisible ? styles.imageVisible : styles.imageHidden
            }`}
          />
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
  );
}
