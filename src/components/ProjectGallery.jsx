import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectData } from '../data';
import { ArrowUpRight } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 14 }
    }
};

const ProjectGallery = () => {
    return (
        <section className="section-pad relative bg-slate-100 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
            {/* Background blobs */}
            <div className="absolute top-[20%] right-[-8%] w-[35%] h-[50%] bg-purple-300/20 dark:bg-purple-600/8 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-8%] w-[30%] h-[40%] bg-blue-300/20 dark:bg-blue-600/8 blur-[120px] rounded-full pointer-events-none" />

            <div className="section-container relative z-10">
                {/* Section header */}
                <div className="mb-14 flex flex-col md:flex-row justify-between md:items-end gap-6">
                    <div>
                        <p className="section-label">04 / Work</p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-white"
                        >
                            Professional Blueprint
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-base text-slate-600 dark:text-slate-400 mt-3 max-w-xl"
                        >
                            Enterprise-scale implementations, entrepreneurial ventures, and strategic digital transformations.
                        </motion.p>
                    </div>
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 flex-shrink-0"
                    >
                        {projectData.length} projects
                    </motion.span>
                </div>

                {/* Project Grid — first card is featured (full width on md) */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {projectData.map((project, index) => {
                        const Icon = project.icon;
                        const isFeatured = index === 0;

                        return (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                className={`group relative glass rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 hover:border-blue-400/30 dark:hover:border-slate-600/80 ${isFeatured ? 'md:col-span-2' : ''}`}
                            >
                                <Link to={`/project/${project.id}`} className="absolute inset-0 z-20" aria-label={`View details for ${project.title}`} />

                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity duration-500`} />

                                <div className="relative z-10 p-7 h-full flex flex-col pointer-events-none">
                                    <div className="flex justify-between items-start mb-5">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${project.border} glass-dark`}>
                                            <Icon className="w-6 h-6 text-slate-600 dark:text-slate-200" />
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-xs font-semibold text-slate-500 dark:text-slate-400 border border-slate-300/50 dark:border-slate-700">
                                            {project.role}
                                        </span>
                                    </div>

                                    <h3 className={`font-bold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                                        {project.title}
                                    </h3>
                                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-widest">
                                        {project.company}
                                    </h4>

                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags.slice(0, isFeatured ? 5 : 3).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs font-medium px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="ml-4 flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
                                            View <ArrowUpRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectGallery;
