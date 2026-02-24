import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pitchData } from '../data';
import { User } from 'lucide-react';

const ProfilePhoto = () => {
    const [imgError, setImgError] = useState(false);

    if (imgError) {
        // Fallback avatar if no image uploaded yet
        return (
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center border-4 border-white/10 shadow-2xl flex-shrink-0">
                <User className="w-16 h-16 md:w-20 md:h-20 text-white/70" />
            </div>
        );
    }

    return (
        <img
            src="/assets/profile.jpg"
            alt="Profile photo"
            onError={() => setImgError(true)}
            className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white/10 shadow-2xl flex-shrink-0"
        />
    );
};

const DynamicPitch = () => {
    const [activeTab, setActiveTab] = useState(Object.keys(pitchData)[0]);

    const activeData = pitchData[activeTab];
    const Icon = activeData.icon;

    return (
        <section className="min-h-[90vh] flex flex-col justify-center items-center py-24 px-6 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-blue-300/40 dark:bg-blue-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] bg-emerald-300/40 dark:bg-emerald-600/20 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-5xl mx-auto z-10">

                {/* Profile + Name intro */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center mb-12 gap-5"
                >
                    <ProfilePhoto />
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-slate-100 dark:to-slate-400">
                            Build Your Ideal Candidate
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-4"
                        >
                            Select a priority below to see how my diverse experience aligns with your strategic goals.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Toggles */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {Object.keys(pitchData).map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${isActive
                                    ? "text-white shadow-lg shadow-blue-500/20 dark:shadow-blue-500/25"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 glass"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-blue-600 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Dynamic Content Area */}
                <div className="glass-dark rounded-3xl p-8 md:p-12 min-h-[360px] flex flex-col justify-center relative overflow-hidden group">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col md:flex-row items-center md:items-start gap-8"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                                    <Icon className="w-10 h-10 text-blue-400" />
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                                    {activeData.title}
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                                    {activeData.description}
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    {activeData.highlights.map((highlight, idx) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-2 rounded-full bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700 text-sm font-medium text-blue-700 dark:text-blue-300 shadow-sm"
                                        >
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default DynamicPitch;
