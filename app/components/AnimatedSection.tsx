"use client";

import {useEffect, useRef} from "react";
import styles from "../page.module.scss";

interface AnimatedSectionProps {
  children: React.ReactNode;
  id: string;
  style?: React.CSSProperties;
}

export default function AnimatedSection({
  children,
  id,
  style,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id={id} style={style}>
      {children}
    </section>
  );
}
