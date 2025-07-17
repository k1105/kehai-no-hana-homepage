import {useState} from "react";
import styles from "../page.module.scss";
import VideoModal from "./VideoModal";
import {PlayButton} from "./play_button";

export default function MovieSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
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
      </div>
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId="aOPO_Qeg3zE"
      />
    </>
  );
}
