import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data';

const domainColors = [
    {
        bg: 'from-blue-500/10 to-indigo-500/10',
        border: 'border-blue-400/30',
        heading: 'text-blue-600 dark:text-blue-400',
        bar: 'from-blue-500 to-indigo-500',
        glow: 'shadow-blue-500/20',
    },
    {
        bg: 'from-violet-500/10 to-purple-500/10',
        border: 'border-violet-400/30',
        heading: 'text-violet-600 dark:text-violet-400',
        bar: 'from-violet-500 to-purple-500',
        glow: 'shadow-violet-500/20',
    },
    {
        bg: 'from-emerald-500/10 to-teal-500/10',
        border: 'border-emerald-400/30',
        heading: 'text-emerald-600 dark:text-emerald-400',
        bar: 'from-emerald-500 to-teal-500',
        glow: 'shadow-emerald-500/20',
    },
];

const SkillsMatrix = () => {
    return (
        <section className="section-pad relative bg-slate-100 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
            {/* Background blur */}
            <div className="absolute top-0 right-[20%] w-[30%] h-[50%] bg-blue-400/10 dark:bg-blue-600/8 blur-[130px] rounded-full pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="mb-14">
                    <p className="section-label">03 / Capabilities</p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-white"
                    >
                        Technical Matrix
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base text-slate-600 dark:text-slate-400 mt-3 max-w-2xl"
                    >
                        A quantitative breakdown of core competencies across cloud infrastructure, AI/ML engineering, and strategic operations.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData.map((category, index) => {
                        const palette = domainColors[index % domainColors.length];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: index * 0.12 }}
                                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
                                className={`group relative glass p-7 rounded-2xl border bg-white/60 dark:bg-slate-900/50 transition-shadow duration-300 hover:shadow-xl ${palette.glow} cursor-default`}
                            >
                                {/* Subtle coloured background tint on hover */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${palette.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                                <div className="relative z-10">
                                    {/* Domain heading */}
                                    <h3 className={`text-xs font-bold uppercase tracking-wider pb-3 mb-6 border-b border-slate-200 dark:border-slate-800 ${palette.heading}`}>
                                        {category.domain}
                                    </h3>

                                    <div className="space-y-5">
                                        {category.skills.map((skill, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                        {skill.name}
                                                    </span>
                                                    <span className={`text-xs font-bold tabular-nums transition-colors duration-200 ${palette.heading}`}>
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.level}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1.2, delay: 0.2 + idx * 0.08, ease: 'easeOut' }}
                                                        className={`h-full bg-gradient-to-r ${palette.bar} rounded-full`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SkillsMatrix;
