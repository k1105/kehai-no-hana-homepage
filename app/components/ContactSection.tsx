import Link from "next/link";
import styles from "../page.module.scss";
import {DLLogo} from "./DLLogo";
import {Inter} from "next/font/google";
import type {Dictionary} from "../dictionaries";

const inter = Inter({
  weight: ["400"],
  subsets: ["latin"],
});

interface ContactSectionProps {
  dict: Dictionary;
}

export default function ContactSection({dict}: ContactSectionProps) {
  return (
    <section id="contact">
      <div className={styles.contact}>
        <div className={styles.contactItemsWrapper}>
          <div className={`${styles.contactItem} ${styles.contactForm}`}>
            <div className={`${styles.contactItem}`}>
              <p>{dict.contact.label}</p>
              <h2 className={inter.className} style={{fontWeight: "700"}}>
                Dentsu Lab Tokyo
              </h2>
              <div className={styles.address}>
                <p>{dict.contact.address}</p>
                <p>dentsu-lab-tokyo@dentsu.co.jp</p>
              </div>
            </div>
          </div>
          <div className={styles.contactItem}>
            <Link href="https://dentsulab.tokyo/">
              <div className={styles.bottomLogoWrapper}>
                <DLLogo style={{width: "100%", height: "auto"}} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
