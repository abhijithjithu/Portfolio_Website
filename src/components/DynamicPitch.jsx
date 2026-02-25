import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { pitchData } from '../data';
import { User } from 'lucide-react';

// ── Scroll-parallax blob background ─────────────────────────
const ParallaxBlobs = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 600], [0, -80]);
    const y2 = useTransform(scrollY, [0, 600], [0, 60]);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            {/* Top-left blob — parallaxes upward */}
            <motion.div style={{ y: y1 }} className="absolute top-[-20%] left-[-10%] w-[55%] h-[75%] bg-blue-300/30 dark:bg-blue-600/15 blur-[140px] rounded-full" />
            {/* Bottom-right blob — parallaxes downward */}
            <motion.div style={{ y: y2 }} className="absolute bottom-[-25%] right-[-10%] w-[50%] h-[70%] bg-emerald-300/30 dark:bg-emerald-600/15 blur-[140px] rounded-full" />
            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
    );
};

// ── Profile photo with infinite float ───────────────────────
const ProfilePhoto = () => {
    const [imgError, setImgError] = useState(false);

    const photoContent = imgError ? (
        <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
            <User className="w-20 h-20 md:w-28 md:h-28 text-white/70" />
        </div>
    ) : (
        <img
            src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
            alt="Jithu Abhijith"
            onError={() => setImgError(true)}
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover"
        />
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-end"
        >
            {/* Outer glow + float */}
            <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative inline-block"
            >
                {/* Pulsing glow ring */}
                <motion.div
                    animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/30 blur-2xl"
                />
                <div className="absolute -inset-1 rounded-full border border-blue-400/20 dark:border-blue-400/10" />
                <div className="rounded-full overflow-hidden border-4 border-white/10 shadow-2xl flex-shrink-0">
                    {photoContent}
                </div>
            </motion.div>
        </motion.div>
    );
};

// ── Staggered text line ─────────────────────────────────────
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const lineVariants = {
    hidden: { opacity: 0, y: 30, skewX: -3 },
    visible: { opacity: 1, y: 0, skewX: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.5, delay, ease: 'easeOut' },
    }),
};

// ── Main Component ──────────────────────────────────────────
const DynamicPitch = () => {
    const [activeTab, setActiveTab] = useState(Object.keys(pitchData)[0]);
    const activeData = pitchData[activeTab];
    const Icon = activeData.icon;

    return (
        <section className="flex flex-col justify-center pt-[70px] relative overflow-hidden" style={{ minHeight: 'calc(100vh - 0px)' }}>
            <ParallaxBlobs />

            <div className="section-container py-10 pb-16 z-10 w-full">
                {/* ── Two-column hero ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* LEFT: staggered text */}
                    <div>
                        {/* Pulsing availability badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 mb-5 self-start"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                                Open to Opportunities
                            </span>
                        </motion.div>

                        {/* Staggered heading */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-6"
                        >
                            <motion.h1
                                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-800 dark:text-white leading-[1.05]"
                                aria-label="Digital Transformation Strategist"
                            >
                                <motion.span variants={lineVariants} className="block">
                                    Digital
                                </motion.span>
                                <motion.span
                                    variants={lineVariants}
                                    className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500"
                                >
                                    Transformation
                                </motion.span>
                                <motion.span variants={lineVariants} className="block">
                                    Strategist
                                </motion.span>
                            </motion.h1>
                        </motion.div>

                        {/* Sub-text */}
                        <motion.p
                            custom={0.45}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-10"
                        >
                            I architect enterprise systems, build MLOps pipelines, and lead cross-functional teams to deliver measurable business impact.
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            custom={0.6}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-7 py-3.5 rounded-full bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition-colors"
                            >
                                View Projects
                            </motion.button>
                            <motion.a
                                href="/assets/resume.pdf"
                                download
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-7 py-3.5 rounded-full glass border border-slate-300/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                            >
                                Download Resume
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* RIGHT: floating profile photo */}
                    <ProfilePhoto />
                </div>

                {/* ── Divider ── */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                    className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mb-16 origin-left"
                />

                {/* ── Interactive Pitch section ── */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <p className="section-label justify-center">Tailored Value Proposition</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                            Build Your Ideal Candidate
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                            Select a priority below to see how my experience aligns with your goals.
                        </p>
                    </motion.div>

                    {/* Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.4 }}
                        className="flex flex-wrap justify-center gap-3 mb-8"
                    >
                        {Object.keys(pitchData).map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'text-white shadow-lg shadow-blue-500/20'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 glass'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-blue-600 rounded-full"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab}</span>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Dynamic Content */}
                    <div className="glass-dark rounded-3xl p-8 md:p-10 min-h-[280px] flex flex-col justify-center relative overflow-hidden group">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="flex flex-col md:flex-row items-center md:items-start gap-8"
                            >
                                <motion.div
                                    whileHover={{ rotate: 6, scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className="flex-shrink-0"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <Icon className="w-8 h-8 text-blue-500" />
                                    </div>
                                </motion.div>

                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800 dark:text-slate-100">
                                        {activeData.title}
                                    </h3>
                                    <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                        {activeData.description}
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                        {activeData.highlights.map((highlight, idx) => (
                                            <motion.span
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.08 }}
                                                className="px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700 text-xs font-medium text-blue-700 dark:text-blue-300"
                                            >
                                                {highlight}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DynamicPitch;
