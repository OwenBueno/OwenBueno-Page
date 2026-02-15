'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './AndreaPage.module.css';

export default function AndreaPageClient() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeLightbox]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Memorándum de Andrea</h1>
        <p className={styles.heroText}>
          Un rincón para recordar lo que importa.
        </p>
      </section>

      <section className={styles.collageSection}>
        <h2 className={styles.sectionTitle}>Collage conmemorativo</h2>
        <p className={styles.collageSubtitle}>San Valentín 14/02/2026</p>
        <p className={styles.sectionText}>
          Te dejo este collage como quien deja una piedrita en el camino para acordarse de que sí pasó algo bonito aquí. 
          No es “gran cosa” en tamaño, pero sí en intención: en estos hilos, entre hormigas, audios y letras, te has ido ganando un pedacito de mi corazón sin prisa, sin ruido, a tu ritmo.
        </p>
        <div className={styles.sectionText} style={{ whiteSpace: 'pre-line', textAlign: 'left', margin: '0 auto 1.5rem', maxWidth: '40ch' }}>
          <strong>Poema (modo Owen):</strong>
          {'\n'}
          No sé en qué momento pasó,
          {'\n'}pero tu voz se volvió casa,
          {'\n'}de esas que no aprietan
          {'\n'}y aun así sostienen.
          {'\n'}Amistad que no presume,
          {'\n'}solo aparece
          {'\n'}como luz tibia en la tarde
          {'\n'}cuando el día pesa.
          {'\n'}Y si un día el mundo corre,
          {'\n'}yo guardo este pedacito:
          {'\n'}tu risa, tus historias,
          {'\n'}y la calma de saber
          {'\n'}que aquí… se puede ser.
        </div>
        <button
          type="button"
          className={styles.collageWrapper}
          onClick={() => setLightboxOpen(true)}
          aria-label="Ver collage a pantalla completa"
        >
          <Image
            src="/images/collage.png"
            alt="Collage conmemorativo San Valentín 14/02/2026"
            width={800}
            height={800}
            className={styles.collageImage}
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </button>
      </section>

      <section className={styles.footerSection}>
        <p className={styles.footerMessage}>¿Qué buscas? No hay más de momento.</p>
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className={styles.lightboxBackdrop}
              onClick={closeLightbox}
                aria-label="Cerrar pantalla completa"
            />
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.lightboxClose}
                onClick={closeLightbox}
                aria-label="Cerrar"
              >
                <X size={28} strokeWidth={2} />
              </button>
              <div className={styles.lightboxImageWrapper}>
                <Image
                  src="/images/collage.png"
                  alt="Collage conmemorativo San Valentín 14/02/2026 - tamaño completo"
                  fill
                  className={styles.lightboxImage}
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
