import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectData } from '../data';
import { ExternalLink } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 12 }
    }
};

const ProjectGallery = () => {
    return (
        <section className="py-24 px-6 relative bg-slate-100 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
            {/* Abstract background shapes */}
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[50%] bg-purple-300/30 dark:bg-purple-600/10 blur-[100px] rounded-full point-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[40%] bg-blue-300/30 dark:bg-blue-600/10 blur-[100px] rounded-full point-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 md:flex justify-between items-end">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-white mb-4"
                        >
                            Professional Blueprint
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-600 dark:text-slate-400"
                        >
                            A mapping of my enterprise-scale implementations, entrepreneurial ventures, and strategic digital transformations.
                        </motion.p>
                    </div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {projectData.map((project, index) => {
                        const Icon = project.icon;
                        const spanClass = index < 2 ? "md:col-span-1 xl:col-span-2" : "md:col-span-1 xl:col-span-2";

                        return (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                className={`group relative glass rounded-3xl p-8 hover:border-blue-400/50 dark:hover:border-slate-600 transition-all duration-500 overflow-hidden flex flex-col ${spanClass}`}
                            >
                                <Link to={`/project/${project.id}`} className="absolute inset-0 z-20" aria-label={`View details for ${project.title}`} />

                                {/* Subtle gradient hover effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`} />

                                <div className="relative z-10 h-full flex flex-col pointer-events-none">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${project.border} glass-dark`}>
                                            <Icon className="w-7 h-7 text-slate-600 dark:text-slate-200" />
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-300/50 dark:border-slate-700">
                                            {project.role}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">
                                        {project.company}
                                    </h4>

                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
                                            >
                                                {tag}
                                            </span>
                                        ))}
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
