import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data';

const SkillsMatrix = () => {
    return (
        <section className="py-24 px-6 relative bg-slate-100 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-[20%] w-[30%] h-[40%] bg-blue-400/10 dark:bg-blue-600/10 blur-[120px] rounded-full point-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 md:flex justify-between items-end">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-white mb-4"
                        >
                            Technical Matrix
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-600 dark:text-slate-400"
                        >
                            A quantitative breakdown of my core competencies across infrastructure, backend development, and strategic operations.
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsData.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.15 }}
                            className="glass p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
                        >
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                                {category.domain}
                            </h3>

                            <div className="space-y-6">
                                {category.skills.map((skill, idx) => (
                                    <div key={idx} className="group">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {skill.name}
                                            </span>
                                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
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
