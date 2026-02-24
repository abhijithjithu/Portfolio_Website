import React from 'react';
import { Mail, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 py-20 px-6 border-t border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden transition-colors duration-300">
            {/* Background glow */}
            <div className="absolute bottom-[-20%] right-[10%] w-[30%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-dark rounded-3xl p-12 mb-12 shadow-2xl"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6">
                        Ready to Build the Future?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
                        I'm currently open to new opportunities where digital strategy meets technical execution. Let's connect and discuss how my expertise can drive your next enterprise initiative.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <a
                            href="mailto:hello@example.com"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-500/25 group"
                        >
                            <Mail className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                            <span>Get in Touch</span>
                            <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="/assets/resume.pdf"
                            download
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full glass hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-semibold transition-all border border-slate-300/50 dark:border-slate-700/50 group"
                        >
                            <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            <span>Download Resume</span>
                        </a>
                    </div>
                </motion.div>

                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© {new Date().getFullYear()} Jithu. Built with React & Tailwind CSS.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
