import React from 'react';
import { Mail, Download, Github, Linkedin, ArrowRight, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTACT_EMAIL, LINKEDIN_URL, GITHUB_URL } from '../App';

const Footer = () => {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden transition-colors duration-300">
            {/* Background glow */}
            <div className="absolute bottom-[-20%] right-[10%] w-[30%] h-[50%] bg-blue-500/8 blur-[120px] rounded-full" />

            {/* CTA Block */}
            <div className="section-container py-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-dark rounded-2xl p-10 md:p-14 mb-14 shadow-2xl text-center"
                >
                    <p className="section-label justify-center mb-4">Get in Touch</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                        Ready to Build the Future?
                    </h2>
                    <p className="text-base text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
                        I'm open to new opportunities where digital strategy meets technical execution. Let's connect and discuss how my expertise can drive your next enterprise initiative.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Mail className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
                            Get in Touch
                            <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href={`${import.meta.env.BASE_URL}assets/resume.pdf`}
                            download
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full glass hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all border border-slate-300/50 dark:border-slate-700/50 hover:-translate-y-0.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                            Download Resume
                        </a>
                    </div>
                </motion.div>

                {/* Footer bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-5 text-sm text-slate-500 dark:text-slate-500">
                    <p>© {new Date().getFullYear()} Jithu Abhijith. Built with React & Tailwind CSS.</p>

                    <div className="flex items-center gap-1">
                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            aria-label="Send Email"
                            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Mail className="w-4 h-4" />
                        </a>

                        <span className="mx-1 text-slate-300 dark:text-slate-700">|</span>

                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:block px-3 py-1.5 text-xs font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            LinkedIn
                        </a>
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:block px-3 py-1.5 text-xs font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            GitHub
                        </a>
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="hidden sm:block px-3 py-1.5 text-xs font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            Email
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
