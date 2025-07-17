import styles from "../page.module.scss";

export default function StatementSection() {
  return (
    <div className={styles.statementSection}>
      <div className={styles.statementLogoWrapper}></div>
      <p className={styles.statement}>
        ちゃんと元気でいるか、気になる。
        <br />
        <span className={styles.segment}>けれど、毎日連絡をとるのは</span>
        <span className={styles.segment}>なかなか難しい。</span>
        <br />
        離れて暮らす、大切な人とのあいだに
        <br />
        <span className={styles.segment}>お互いの気配を気軽に感じる</span>
        <span className={styles.segment}>きっかけができました。</span>
        <br />
        <span className={styles.segment}>
          <span style={{marginLeft: "-0.5rem"}}>
            「おはよう」「いってきます」「ただいま」
          </span>
        </span>
        <br />
        <span className={styles.segment}>3つの声に反応して、</span>
        <span className={styles.segment}>香りを届けます。</span>
      </p>
    </div>
  );
}
