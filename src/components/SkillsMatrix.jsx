import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data';

const SkillsMatrix = () => {
    return (
        <section className="section-pad relative bg-slate-100 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
            {/* Background blur */}
            <div className="absolute top-0 right-[20%] w-[30%] h-[50%] bg-blue-400/10 dark:bg-blue-600/8 blur-[130px] rounded-full pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="mb-14">
                    <p className="section-label">02 / Capabilities</p>
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
                        A quantitative breakdown of core competencies across infrastructure, backend development, and strategic operations.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ delay: index * 0.12 }}
                            className="glass p-7 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 hover:shadow-lg hover:shadow-slate-200/30 dark:hover:shadow-none transition-shadow"
                        >
                            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-3 uppercase tracking-wider text-xs">
                                {category.domain}
                            </h3>

                            <div className="space-y-5">
                                {category.skills.map((skill, idx) => (
                                    <div key={idx} className="group">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {skill.name}
                                            </span>
                                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, delay: 0.2 + (idx * 0.08), ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsMatrix;
