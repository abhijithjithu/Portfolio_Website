import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { EASE } from '../../lib/motion';

/**
 * Full-viewport view of a single figure.
 *
 * Architecture diagrams and dashboards are unreadable at the inline size the
 * reading column allows. Closing is available by Escape, by the button, and
 * by clicking the backdrop; focus moves to the close button on open and
 * returns to the trigger on close.
 */
const Lightbox = ({ open, src, alt, caption, onClose }) => {
  const closeRef = useRef(null);
  const restoreRef = useRef(null);

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      // Only two focusable stops exist, so keep Tab on the close button.
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return undefined;

    restoreRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', handleKey);
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus();
    };
  }, [open, handleKey]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt || 'Enlarged figure'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="u-focus absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-ground/25 text-ground transition-colors duration-fast ease-smooth hover:bg-ground/10 sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" />
          </button>

          <img
            src={src}
            alt={alt || ''}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-auto max-w-full rounded-sm object-contain shadow-xl"
          />

          {caption && (
            <p
              onClick={(e) => e.stopPropagation()}
              className="max-w-[70ch] text-center font-sans text-meta leading-relaxed text-ground/75"
            >
              {caption}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
