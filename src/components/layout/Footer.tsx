import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()} OwenBueno. All rights reserved. OwenBueno.com</p>
        <p className={styles.powered}>Powered by Next.js</p>
        <p className={styles.powered}>Made with ❤️ in Mexico</p>
      </div>
    </footer>
  );
};

export default Footer;