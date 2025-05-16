import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()} My Creative Blog. All rights reserved.</p>
        <p className={styles.powered}>Powered by Next.js, GSAP, and Lenis</p>
      </div>
    </footer>
  );
};

export default Footer; 