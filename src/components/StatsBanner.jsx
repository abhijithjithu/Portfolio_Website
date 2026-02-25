import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const stats = [
    { value: 3.3, suffix: '+', label: 'Years Experience', decimals: 1 },
    { value: 20, suffix: '+', label: 'Projects Delivered', decimals: 0 },
    { value: 95, suffix: '%', label: 'Max Turnaround Improvement', decimals: 0 },
    { value: 65, prefix: '$', suffix: 'B', label: 'Daily Volume Protected', decimals: 0 },
];

const AnimatedNumber = ({ value, suffix = '', prefix = '', decimals = 0 }) => {
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 1800;
                    const startTime = performance.now();

                    const tick = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = eased * value;
                        el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
                        if (progress < 1) requestAnimationFrame(tick);
                    };

                    requestAnimationFrame(tick);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [value, suffix, prefix, decimals]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}0{suffix}
        </span>
    );
};

const StatsBanner = () => {
    return (
        <section className="relative bg-slate-900 dark:bg-slate-950 overflow-hidden border-y border-slate-800">
            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-indigo-600/5" />

            <div className="section-container relative z-10 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-slate-800">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 }}
                            className="flex flex-col items-center text-center px-6"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
                                <AnimatedNumber
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    prefix={stat.prefix || ''}
                                    decimals={stat.decimals}
                                />
                            </div>
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsBanner;
