import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Users, ExternalLink } from 'lucide-react';

const educationData = [
    {
        degree: 'MBA in Digital Enterprise Management',
        institution: 'Indian Institute of Management Udaipur',
        shortName: 'IIM Udaipur',
        period: 'Mar 2025 - Mar 2026',
        gpa: '3.44 GPA — Top 5% of Cohort',
        highlights: [
            'Member of the Technalytics Club',
            'Engineered a secure, MCP-based Enterprise Co-pilot automating M365 workflows',
            'MBA capstone project delivered in collaboration with Deloitte (AI security & M365)',
        ],
        tags: ['Digital Enterprise', 'AI Strategy', 'MCP', 'M365'],
        icon: GraduationCap,
        badge: 'IIM',
        color: 'from-blue-600/15 to-indigo-600/15',
        border: 'border-blue-500/25',
        accentColor: 'text-blue-600 dark:text-blue-400',
    },
];

const Education = () => {
    return (
        <section className="section-pad relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="section-container">
                <div className="mb-14">
                    <p className="section-label">02 / Education</p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-white"
                    >
                        Academic Foundation
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base text-slate-600 dark:text-slate-400 mt-3 max-w-2xl"
                    >
                        My MBA at IIM Udaipur bridges business rigor with technical depth. During the programme, I co-built an enterprise MCP Co-pilot in collaboration with Deloitte.
                    </motion.p>
                </div>

                <div className="max-w-5xl">
                    {educationData.map((edu, index) => {
                        const Icon = edu.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className={`relative glass rounded-2xl border ${edu.border} p-8 overflow-hidden hover:shadow-xl hover:shadow-slate-200/30 dark:hover:shadow-none transition-shadow`}
                            >
                                {/* Background gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-60 rounded-2xl`} />

                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="flex flex-col sm:flex-row gap-5 items-start mb-6">
                                        {/* Institution Badge */}
                                        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg shadow-blue-500/25">
                                            {edu.badge}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 uppercase tracking-wider">
                                                    {edu.period}
                                                </span>
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 uppercase tracking-wider">
                                                    {edu.gpa}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-0.5">
                                                {edu.degree}
                                            </h3>
                                            <p className={`text-sm font-bold uppercase tracking-widest ${edu.accentColor}`}>
                                                {edu.shortName}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-slate-200 dark:bg-slate-800 mb-6" />

                                    {/* Highlights */}
                                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                                        {edu.highlights.map((highlight, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <Award className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                                    {highlight}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {edu.tags.map((tag, i) => (
                                            <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                                                {tag}
                                            </span>
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

export default Education;
