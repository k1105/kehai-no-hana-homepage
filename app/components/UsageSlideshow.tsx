import Image from "next/image";
import styles from "./UsageSlideshow.module.scss";

interface UsageSlideshowProps {
  step: string;
  stepSp: string;
  index: number;
}

export default function UsageSlideshow({
  step,
  stepSp,
  index,
}: UsageSlideshowProps) {
  return (
    <div className={styles.panelContent}>
      {/* PC用画像 */}
      <Image
        src={step}
        alt={`Step ${index + 1}`}
        fill
        style={{objectFit: "contain"}}
        sizes="(max-width: 600px) 100vw, 50vw"
        priority
        className={`${styles.panelImage} ${styles.pcImage}`}
      />
      {/* SP用画像 */}
      <Image
        src={stepSp}
        alt={`Step ${index + 1}`}
        fill
        style={{objectFit: "contain"}}
        sizes="(max-width: 600px) 100vw, 50vw"
        priority
        className={`${styles.panelImage} ${styles.spImage}`}
      />
    </div>
  );
}
