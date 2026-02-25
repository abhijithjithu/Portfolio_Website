import React, { useEffect, useRef, useState } from 'react';

/**
 * CursorSpotlight
 * A glowing radial gradient that follows the mouse cursor,
 * making the page feel alive and premium.
 * Only renders on non-touch devices.
 */
const CursorSpotlight = () => {
    const spotlightRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Don't render on touch-only devices
        if (window.matchMedia('(hover: none)').matches) return;

        const handleMove = (e) => {
            if (!spotlightRef.current) return;
            if (!visible) setVisible(true);
            spotlightRef.current.style.left = `${e.clientX}px`;
            spotlightRef.current.style.top = `${e.clientY}px`;
        };

        const handleLeave = () => setVisible(false);
        const handleEnter = () => setVisible(true);

        window.addEventListener('mousemove', handleMove, { passive: true });
        document.addEventListener('mouseleave', handleLeave);
        document.addEventListener('mouseenter', handleEnter);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseleave', handleLeave);
            document.removeEventListener('mouseenter', handleEnter);
        };
    }, [visible]);

    return (
        <div
            ref={spotlightRef}
            className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
            aria-hidden="true"
        >
            {/* Outer soft glow */}
            <div className="w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
        </div>
    );
};

export default CursorSpotlight;
