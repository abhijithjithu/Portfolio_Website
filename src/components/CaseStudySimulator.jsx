import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Cloud, Zap, Clock, ArrowRight } from 'lucide-react';

const CaseStudySimulator = () => {
    const [inefficiency, setInefficiency] = useState(50);

    const cloudCost = Math.round(5000 + (inefficiency * 150));
    const serverUptime = (99.999 - (inefficiency * 0.05)).toFixed(3);
    const deliverySpeed = Math.round(15 + (inefficiency * 0.45));

    return (
        <section className="section-pad relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="section-container">
                <div className="mb-14 text-center">
                    <p className="section-label justify-center">03 / Interactive Demo</p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-white"
                    >
                        The "Quick Commerce" Engine
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto"
                    >
                        A technical simulation demonstrating how Python-based MLOps workflows optimize rapid-delivery models. Adjust routing inefficiencies to see real-time infrastructure impact.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* Interactive Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-dark rounded-2xl p-8 border border-slate-200 dark:border-slate-800"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                <Settings className="text-blue-500 w-4 h-4" />
                            </div>
                            <h3 className="text-base font-bold text-slate-800 dark:text-white">Ops Control Center</h3>
                        </div>

                        {/* Slider */}
                        <div className="mb-8 p-5 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50">
                            <div className="flex justify-between mb-3">
                                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Delivery Routing Inefficiencies</span>
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 tabular-nums">{inefficiency}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={inefficiency}
                                onChange={(e) => setInefficiency(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                                <span>Optimized (MLOps)</span>
                                <span>Legacy System</span>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center text-center group hover:border-emerald-500/30 transition-colors">
                                <Cloud className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tabular-nums">${cloudCost.toLocaleString()}</span>
                                <span className="text-xs text-slate-400 mt-1 leading-tight">Cloud Cost / mo</span>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center text-center group hover:border-blue-500/30 transition-colors">
                                <Zap className={`w-5 h-5 mb-2 group-hover:scale-110 transition-transform ${serverUptime > 98 ? 'text-blue-500' : 'text-orange-500'}`} />
                                <span className={`text-xl font-bold tabular-nums ${serverUptime > 98 ? 'text-slate-800 dark:text-slate-100' : 'text-orange-600 dark:text-orange-300'}`}>
                                    {serverUptime}%
                                </span>
                                <span className="text-xs text-slate-400 mt-1 leading-tight">Server Uptime</span>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center text-center group hover:border-purple-500/30 transition-colors">
                                <Clock className="w-5 h-5 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tabular-nums">{deliverySpeed}m</span>
                                <span className="text-xs text-slate-400 mt-1 leading-tight">Delivery Speed</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Explanation Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-5"
                    >
                        <div className="p-6 rounded-2xl glass border border-blue-500/15 dark:border-blue-500/10">
                            <h4 className="text-base font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                The Impact of MLOps
                            </h4>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                                In quick-commerce supply chains, legacy routing algorithms often buckle under dynamic constraints, leading to high <strong>{inefficiency}% routing inefficiency</strong>. This inflates cloud expenditures because unoptimized queries demand higher compute.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl glass border border-emerald-500/15 dark:border-emerald-500/10">
                            <h4 className="text-base font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                Engineering the Solution
                            </h4>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                                By implementing a Python-based MLOps pipeline, we automate the deployment of predictive geospatial models. Dragging to <strong>0% Inefficiency</strong> reduces cloud costs to <strong>${cloudCost.toLocaleString()}</strong> while ensuring <strong>{serverUptime}% uptime</strong> and sub-20 minute delivery.
                            </p>
                        </div>

                        <button
                            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all group"
                        >
                            View all projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudySimulator;
