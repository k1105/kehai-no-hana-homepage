import {YouTubeEmbed} from "@next/third-parties/google";
import styles from "./VideoModal.module.scss";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoId,
}: VideoModalProps) {
  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.visible : ""}`}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.videoWrapper}>
          <YouTubeEmbed videoid={videoId} />
        </div>
      </div>
    </div>
  );
}
