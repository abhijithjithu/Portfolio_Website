import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight, Tag, ExternalLink } from 'lucide-react';
import { projectData } from '../data';
import SEO from '../components/SEO';

// ─── Reading Progress Bar ─────────────────────────────────────
const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const total = scrollHeight - clientHeight;
            setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
        };
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);
    return (
        <div className="fixed top-[70px] left-0 w-full h-0.5 z-40 bg-slate-200/50 dark:bg-slate-800/50">
            <div
                className="h-full bg-blue-600 transition-[width] duration-75"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

// ─── Content Block Renderer ───────────────────────────────────
const renderContentBlock = (block, idx) => {
    switch (block.type) {
        case 'section_title': {
            // Strip leading emoji characters from legacy data
            const cleanText = block.text.replace(/^[\p{Emoji}\s]+/u, '').trim();
            return (
                <div key={idx} className="mt-14 mb-6 first:mt-0">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="h-5 w-1 rounded-full bg-blue-600 flex-shrink-0" />
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {cleanText}
                        </h3>
                    </div>
                </div>
            );
        }
        case 'subtitle':
            return (
                <h4 key={idx} className="text-base font-bold text-slate-700 dark:text-slate-300 mt-8 mb-3 uppercase tracking-wider">
                    {block.text}
                </h4>
            );
        case 'paragraph': {
            if (block.text.includes('**')) {
                const parts = block.text.split('**');
                return (
                    <p key={idx} className="text-base text-slate-600 dark:text-slate-300 mb-5 leading-[1.8]">
                        {parts.map((part, i) =>
                            i % 2 === 1
                                ? <strong key={i} className="font-semibold text-slate-800 dark:text-slate-100">{part}</strong>
                                : part
                        )}
                    </p>
                );
            }
            return (
                <p key={idx} className="text-base text-slate-600 dark:text-slate-300 mb-5 leading-[1.8]">
                    {block.text}
                </p>
            );
        }
        case 'list':
            return (
                <ul key={idx} className="space-y-2.5 mb-6 ml-1">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case 'callout':
            return (
                <div key={idx} className="my-6 p-5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl flex gap-4 items-start">
                    <div className="w-1 self-stretch rounded-full bg-blue-500 flex-shrink-0" />
                    <p className="text-blue-800 dark:text-blue-300 font-medium text-sm leading-relaxed">{block.text}</p>
                </div>
            );
        case 'formula':
            return (
                <div key={idx} className="my-8 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                    <div className="px-4 py-2 bg-slate-800 flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs text-slate-400 font-mono ml-2">formula</span>
                    </div>
                    <div className="bg-slate-900 px-6 py-6 overflow-x-auto">
                        <code className="block text-center text-blue-300 font-mono text-sm md:text-base whitespace-nowrap tracking-wide leading-relaxed">
                            {block.equation}
                        </code>
                    </div>
                </div>
            );
        case 'table':
            return (
                <div key={idx} className="my-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-100 dark:bg-slate-800">
                                    {block.headers.map((h, i) => (
                                        <th key={i} className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-200 text-xs uppercase tracking-widest whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {block.rows.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                        {row.map((cell, j) => (
                                            <td key={j} className="py-3 px-5 text-slate-700 dark:text-slate-300 text-sm">
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
                <figure key={idx} className="my-10">
                    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-lg bg-slate-50 dark:bg-slate-900">
                        <img
                            src={`${import.meta.env.BASE_URL}${block.src.replace(/^\//, '')}`}
                            alt={block.alt}
                            className="w-full h-auto object-contain max-h-[560px] block"
                            onError={(e) => {
                                const currentSrc = e.target.src;
                                const baseName = currentSrc.substring(0, currentSrc.lastIndexOf('.'));
                                if (currentSrc.endsWith('.png')) {
                                    e.target.src = baseName + '.jpg';
                                } else if (currentSrc.endsWith('.jpg')) {
                                    e.target.src = baseName + '.jpeg';
                                } else {
                                    e.target.onerror = null;
                                    e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='350' viewBox='0 0 800 350'%3E%3Crect width='800' height='350' fill='%230f172a'/%3E%3Ctext x='50%25' y='50%25' fill='%2364748b' font-family='sans-serif' font-size='16' text-anchor='middle' dominant-baseline='middle'%3EImage: ${encodeURIComponent(block.src.split('/').pop())}%3C/text%3E%3C/svg%3E`;
                                }
                            }}
                        />
                    </div>
                    {block.caption && (
                        <figcaption className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-1">
                            <span className="font-semibold text-slate-600 dark:text-slate-300">Figure: </span>
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );
        case 'tags':
            return (
                <div key={idx} className="flex flex-wrap gap-2 mb-6">
                    {block.items.map((tag, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            <Tag className="w-3 h-3 opacity-60" />
                            {tag}
                        </span>
                    ))}
                </div>
            );
        default:
            return null;
    }
};

// ─── Main Component ────────────────────────────────────────────
const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [projectIndex, setProjectIndex] = useState(0);

    useEffect(() => {
        const idx = projectData.findIndex((p) => p.id === id);
        if (idx !== -1) {
            setProject(projectData[idx]);
            setProjectIndex(idx);
        } else {
            navigate('/');
        }
    }, [id, navigate]);

    if (!project) return null;

    const Icon = project.icon;
    const prevProject = projectIndex > 0 ? projectData[projectIndex - 1] : null;
    const nextProject = projectIndex < projectData.length - 1 ? projectData[projectIndex + 1] : null;

    return (
        <>
            <ReadingProgress />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                <SEO
                    title={`${project.title} | Case Study`}
                    description={project.description}
                    type="article"
                />

                {/* ── Hero Banner ── */}
                <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    {/* Gradient blobs */}
                    <div className={`absolute -top-20 -right-20 w-[50%] h-[200%] bg-gradient-to-br ${project.color} blur-[100px] opacity-60 -z-0`} />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] -z-0" />

                    <div className="section-container relative z-10 pt-28 pb-14">
                        {/* Back button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mb-10 transition-colors group uppercase tracking-wider"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                            Back to Portfolio
                        </button>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl"
                        >
                            {/* Company badge + role */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${project.border} bg-white/80 dark:bg-slate-900/80 shadow-sm flex-shrink-0`}>
                                    <Icon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                                        {project.company}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 uppercase tracking-wider">
                                        {project.role}
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 leading-tight">
                                {project.title}
                            </h1>

                            {/* Description */}
                            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                                {project.description}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="section-container py-14">
                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">

                        {/* ── Main Content ── */}
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="flex-1 min-w-0"
                        >
                            {project.content ? (
                                <div>
                                    {project.content.map((block, idx) => renderContentBlock(block, idx))}
                                </div>
                            ) : (
                                // Fallback for projects without detailed content
                                <div className="space-y-6">
                                    <div className="p-8 rounded-2xl glass-dark border border-slate-200 dark:border-slate-700">
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                            <div className="h-5 w-1 rounded-full bg-blue-600" />
                                            The Challenge & Approach
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-8">
                                            This section provides a deep dive into the specific problems addressed during the {project.title} engagement. It outlines the strategic framework applied, the technical architecture designed to solve issues at scale, and the cross-functional collaboration required to deliver excellence.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/50">
                                                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3 uppercase tracking-wider">Key Objectives</h4>
                                                <ul className="space-y-2">
                                                    {['Streamline enterprise workflows', 'Ensure system reliability & compliance', 'Optimize resource utilization'].map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                            <ChevronRight className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/50">
                                                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3 uppercase tracking-wider">Measured Impact</h4>
                                                <ul className="space-y-2">
                                                    {['40% reduction in manual processing', '99.99% system uptime achieved', 'Accelerated time-to-market'].map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                            <ChevronRight className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── Prev / Next Navigation ── */}
                            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {prevProject ? (
                                    <button
                                        onClick={() => navigate(`/project/${prevProject.id}`)}
                                        className="group flex items-center gap-4 p-5 rounded-xl glass border border-slate-200 dark:border-slate-800 hover:border-blue-400/40 dark:hover:border-slate-600 transition-all text-left hover:-translate-y-0.5 hover:shadow-lg"
                                    >
                                        <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Previous</p>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{prevProject.title}</p>
                                        </div>
                                    </button>
                                ) : <div />}

                                {nextProject ? (
                                    <button
                                        onClick={() => navigate(`/project/${nextProject.id}`)}
                                        className="group flex items-center justify-end gap-4 p-5 rounded-xl glass border border-slate-200 dark:border-slate-800 hover:border-blue-400/40 dark:hover:border-slate-600 transition-all text-right hover:-translate-y-0.5 hover:shadow-lg"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Next</p>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{nextProject.title}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                    </button>
                                ) : <div />}
                            </div>
                        </motion.article>

                        {/* ── Sticky Sidebar ── */}
                        <motion.aside
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="w-full lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-24"
                        >
                            {/* Project metadata card */}
                            <div className="glass-dark rounded-2xl p-6 border border-slate-200 dark:border-slate-700/80 mb-5">
                                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-5">Project Overview</h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Company</p>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{project.company}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Role</p>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{project.role}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Tech Stack</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* All projects list */}
                            <div className="glass-dark rounded-2xl p-6 border border-slate-200 dark:border-slate-700/80">
                                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">All Projects</h3>
                                <nav className="space-y-1">
                                    {projectData.map((p) => {
                                        const PIcon = p.icon;
                                        const isActive = p.id === project.id;
                                        return (
                                            <button
                                                key={p.id}
                                                onClick={() => navigate(`/project/${p.id}`)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${isActive
                                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50'
                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-800 dark:hover:text-slate-200'
                                                    }`}
                                            >
                                                <PIcon className="w-3.5 h-3.5 flex-shrink-0" />
                                                <span className="text-xs font-medium leading-tight line-clamp-1">{p.title}</span>
                                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProjectDetail;
