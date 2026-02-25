import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experienceData } from '../data';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ExperienceTimeline = () => {
    const [expandedId, setExpandedId] = useState(experienceData[0]?.id || null);

    return (
        <section className="section-pad relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="section-container">
                <div className="mb-14">
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

                <div className="max-w-4xl">
                    <div className="relative border-l border-slate-200 dark:border-slate-800 ml-6 md:ml-8">
                        {experienceData.map((exp, index) => {
                            const isExpanded = expandedId === exp.id;
                            const Icon = exp.icon;

                            return (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ delay: index * 0.1 }}
                                    className="mb-8 ml-10 relative group"
                                >
                                    {/* Timeline Dot */}
                                    <span className="absolute -left-[3.4rem] flex items-center justify-center w-11 h-11 bg-white dark:bg-slate-950 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors z-10">
                                        <Icon className={`w-4 h-4 ${isExpanded ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                                    </span>

                                    <div
                                        onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                                        className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${isExpanded
                                            ? 'bg-white dark:bg-slate-900/80 border-blue-200 dark:border-slate-700 shadow-xl shadow-slate-200/30 dark:shadow-none'
                                            : 'bg-slate-100/80 dark:bg-slate-900/30 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-1.5 mb-1">
                                            <h3 className={`text-lg font-bold ${isExpanded ? 'text-slate-800 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                                                {exp.role}
                                            </h3>
                                            <span className="px-3 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap flex-shrink-0">
                                                {exp.duration}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                                                {exp.company}
                                            </h4>
                                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-2">
                                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-5 mt-4 border-t border-slate-200 dark:border-slate-800">
                                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-5 text-sm">
                                                            {exp.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {exp.technologies.map((tech, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
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
