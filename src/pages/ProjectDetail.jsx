import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { projectData } from '../data';
import SEO from '../components/SEO';

const renderContentBlock = (block, idx) => {
    switch (block.type) {
        case 'section_title':
            return (
                <div key={idx} className="mt-16 mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                        {block.text}
                    </h3>
                    <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                </div>
            );
        case 'subtitle':
            return <h4 key={idx} className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-10 mb-4">{block.text}</h4>;
        case 'paragraph':
            if (block.text.includes('**')) {
                const parts = block.text.split('**');
                return (
                    <p key={idx} className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                        {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold text-slate-900 dark:text-white">{part}</strong> : part)}
                    </p>
                );
            }
            return <p key={idx} className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">{block.text}</p>;
        case 'list':
            return (
                <ul key={idx} className="space-y-3 mb-8 ml-2">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex flex-row items-start text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 mr-4 object-center"></span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case 'callout':
            return (
                <div key={idx} className="my-8 p-6 bg-slate-50 dark:bg-slate-800/50 border-l-4 border-blue-600 rounded-r-2xl shadow-sm">
                    <p className="text-slate-800 dark:text-slate-200 font-medium text-lg mb-0">{block.text}</p>
                </div>
            );
        case 'formula':
            return (
                <div key={idx} className="my-10 p-6 md:p-8 bg-slate-900 rounded-2xl shadow-xl overflow-x-auto border border-slate-700 relative group">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-slate-800 text-slate-400 text-xs font-semibold rounded-bl-lg rounded-tr-xl">FORMULA</div>
                    <code className="block text-center text-blue-300 font-mono text-base md:text-lg whitespace-nowrap tracking-wide leading-relaxed">
                        {block.equation}
                    </code>
                </div>
            );
        case 'table':
            return (
                <div key={idx} className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
                    <div className="overflow-x-auto border-b border-slate-200 dark:border-slate-700">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-100 dark:bg-slate-800/80">
                                    {block.headers.map((h, i) => (
                                        <th key={i} className="py-4 px-6 font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {block.rows.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        {row.map((cell, j) => (
                                            <td key={j} className="py-4 px-6 text-slate-700 dark:text-slate-300 text-base">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        case 'image':
            return (
                <figure key={idx} className="my-12">
                    <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg bg-slate-50 dark:bg-slate-900 relative">
                        <img
                            src={`${import.meta.env.BASE_URL}${block.src.replace(/^\//, '')}`}
                            alt={block.alt}
                            className="w-full h-auto object-contain max-h-[600px] block"
                            onError={(e) => {
                                const currentSrc = e.target.src;
                                const baseName = currentSrc.substring(0, currentSrc.lastIndexOf('.'));

                                if (currentSrc.endsWith('.png')) {
                                    e.target.src = baseName + '.jpg';
                                } else if (currentSrc.endsWith('.jpg')) {
                                    e.target.src = baseName + '.jpeg';
                                } else {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%230f172a'/%3E%3Ctext x='50%25' y='50%25' fill='%2364748b' font-family='sans-serif' font-size='20' text-anchor='middle' dominant-baseline='middle'%3EImage Placeholder: " + encodeURIComponent(block.src.split('/').pop()) + "%3C/text%3E%3C/svg%3E";
                                }
                            }}
                        />
                    </div>
                    {block.caption && (
                        <figcaption className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mt-4 tracking-wide">{block.caption}</figcaption>
                    )}
                </figure>
            );
        case 'tags':
            return (
                <div key={idx} className="flex flex-wrap gap-2 mb-8">
                    {block.items.map((tag, i) => (
                        <span key={i} className="text-sm font-medium px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-transform hover:scale-105">
                            {tag}
                        </span>
                    ))}
                </div>
            );
        default:
            return null;
    }
};

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const foundProject = projectData.find((p) => p.id === id);
        if (foundProject) {
            setProject(foundProject);
        } else {
            // Redirect to home if project not found
            navigate('/');
        }
    }, [id, navigate]);

    if (!project) return null;

    const Icon = project.icon;

    return (
        <main className="pt-24 pb-20 px-6 min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <SEO
                title={`${project.title} | Case Study`}
                description={project.description}
                type="article"
            />

            {/* Background elements */}
            <div className={`absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-br ${project.color} blur-[150px] rounded-full opacity-50 -z-10`} />

            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${project.border} glass-dark`}>
                            <Icon className="w-8 h-8 text-slate-800 dark:text-slate-200" />
                        </div>
                        <div>
                            <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-slate-700">
                                {project.role}
                            </span>
                            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wider">
                                {project.company}
                            </h4>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-12">
                        {project.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-sm font-medium px-3 py-1.5 rounded-md bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 shadow-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 mb-10 pb-10 border-b border-slate-200 dark:border-slate-800">
                            {project.description}
                        </p>

                        {project.content ? (
                            <div className="mt-8">
                                {project.content.map((block, idx) => renderContentBlock(block, idx))}
                            </div>
                        ) : (
                            <div className="glass rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">The Challenge & Approach</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                    This section provides a deep dive into the specific problems addressed during the {project.title} engagement. It outlines the strategic framework applied, the technical architecture designed to solve the issues at scale, and the cross-functional collaboration required to deliver excellence.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8 mt-10">
                                    <div className="p-6 bg-slate-100 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Key Objectives</h4>
                                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                                            <li>Streamline enterprise workflows</li>
                                            <li>Ensure system reliability & compliance</li>
                                            <li>Optimize resource utilization</li>
                                        </ul>
                                    </div>
                                    <div className="p-6 bg-slate-100 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Measured Impact</h4>
                                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                                            <li>40% reduction in manual processing</li>
                                            <li>99.99% system uptime achieved</li>
                                            <li>Accelerated time-to-market</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default ProjectDetail;
