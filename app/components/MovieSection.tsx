import styles from "../page.module.scss";
import {PlayButton} from "./play_button";

interface MovieSectionProps {
  onOpenVideo: (videoId: string) => void;
}

export default function MovieSection({ onOpenVideo }: MovieSectionProps) {

  return (
    <>
      <div className={styles.movieContainer}>
        <div className={styles.movieWrapper}>
          <div
            className={styles.thumbnailWrapper}
            onClick={() => onOpenVideo("aOPO_Qeg3zE")}
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
      </div>
    </>
  );
}
