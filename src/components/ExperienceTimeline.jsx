import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experienceData } from '../data';
import { ChevronDown, Briefcase, MapPin, Calendar } from 'lucide-react';

// Accent colours per entry index
const ACCENTS = [
    {
        dot: 'from-blue-500 to-indigo-600',
        badge: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
        border: 'border-blue-500/60',
        glow: 'shadow-blue-500/20',
        tech: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/50',
        line: 'bg-gradient-to-b from-blue-500 to-indigo-500',
    },
    {
        dot: 'from-emerald-500 to-teal-600',
        badge: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
        border: 'border-emerald-500/60',
        glow: 'shadow-emerald-500/20',
        tech: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/50',
        line: 'bg-gradient-to-b from-emerald-500 to-teal-500',
    },
    {
        dot: 'from-violet-500 to-purple-600',
        badge: 'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/60',
        border: 'border-violet-500/60',
        glow: 'shadow-violet-500/20',
        tech: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200/60 dark:border-violet-800/50',
        line: 'bg-gradient-to-b from-violet-500 to-purple-500',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const ExperienceTimeline = () => {
    const [expandedId, setExpandedId] = useState(experienceData[0]?.id || null);

    return (
        <section className="section-pad relative bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
            {/* Background accent blobs */}
            <div className="absolute top-[10%] right-[-6%] w-[32%] h-[45%] bg-blue-300/10 dark:bg-blue-600/6 blur-[110px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[5%] left-[-6%] w-[28%] h-[40%] bg-indigo-300/10 dark:bg-indigo-600/6 blur-[110px] rounded-full pointer-events-none" />

            <div className="section-container">
                {/* Header */}
                <div className="mb-16">
                    <p className="section-label">01 / Background</p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-white"
                    >
                        Career Trajectory
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base text-slate-600 dark:text-slate-400 mt-3 max-w-2xl"
                    >
                        A timeline of professional experience blending technical execution with enterprise strategy.
                    </motion.p>
                </div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto relative">

                    {/* Vertical connector line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        className="absolute left-7 md:left-9 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 via-emerald-400 to-violet-400 opacity-30 dark:opacity-20 origin-top"
                    />

                    <div className="space-y-8">
                        {experienceData.map((exp, index) => {
                            const isExpanded = expandedId === exp.id;
                            const Icon = exp.icon;
                            const accent = ACCENTS[index % ACCENTS.length];

                            return (
                                <motion.div
                                    key={exp.id}
                                    custom={index}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-60px' }}
                                    className="relative pl-20 md:pl-24"
                                >
                                    {/* Animated dot badge */}
                                    <motion.div
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                                        className="absolute left-0 top-5 flex items-center justify-center"
                                    >
                                        <div className={`relative w-[3.25rem] h-[3.25rem] rounded-full bg-gradient-to-br ${accent.dot} flex items-center justify-center shadow-lg ${accent.glow} z-10`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        {/* Step number */}
                                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[9px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center z-20">
                                            {index + 1}
                                        </span>
                                    </motion.div>

                                    {/* Card */}
                                    <motion.div
                                        onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                                        whileHover={{ y: isExpanded ? 0 : -3 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                                        className={`relative cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded
                                            ? `bg-white dark:bg-slate-900 ${accent.border} shadow-xl ${accent.glow}`
                                            : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900/60 hover:shadow-lg'
                                            }`}
                                    >
                                        {/* Top coloured accent strip */}
                                        <div className={`h-0.5 w-full bg-gradient-to-r ${accent.dot} ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />

                                        <div className="p-6">
                                            {/* Row 1 — Role + Duration */}
                                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                                <h3 className={`text-lg font-bold leading-snug transition-colors ${isExpanded ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                                                    {exp.role}
                                                </h3>
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${accent.badge} flex-shrink-0`}>
                                                    <Calendar className="w-3 h-3 opacity-70" />
                                                    {exp.duration}
                                                </span>
                                            </div>

                                            {/* Row 2 — Company + Expand toggle */}
                                            <div className="flex items-center justify-between">
                                                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${isExpanded ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                                                    <Briefcase className="w-3.5 h-3.5 opacity-60" />
                                                    {exp.company}
                                                </span>
                                                <motion.div
                                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="text-slate-400 dark:text-slate-500"
                                                >
                                                    <ChevronDown className="w-4 h-4" />
                                                </motion.div>
                                            </div>

                                            {/* Expandable Detail */}
                                            <AnimatePresence initial={false}>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800">
                                                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-[1.8] mb-5">
                                                                {exp.description}
                                                            </p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {exp.technologies.map((tech, idx) => (
                                                                    <motion.span
                                                                        key={idx}
                                                                        initial={{ opacity: 0, scale: 0.85 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{ delay: idx * 0.04 }}
                                                                        className={`text-xs font-medium px-2.5 py-1 rounded-md border ${accent.tech}`}
                                                                    >
                                                                        {tech}
                                                                    </motion.span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;
