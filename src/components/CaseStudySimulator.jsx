import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Cloud, Zap, Clock } from 'lucide-react';

const CaseStudySimulator = () => {
    // Slider ranges from 0 (optimized) to 100 (inefficient)
    const [inefficiency, setInefficiency] = useState(50);

    // Derived metrics based on inefficiency
    // Lower inefficiency = better metrics
    const cloudCost = Math.round(5000 + (inefficiency * 150)); // $5,000 to $20,000
    const serverUptime = (99.999 - (inefficiency * 0.05)).toFixed(3); // 99.999% to ~94.999%
    const deliverySpeed = Math.round(15 + (inefficiency * 0.45)); // 15 mins to 60 mins

    return (
        <section className="py-24 px-6 relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-800 dark:text-white mb-4"
                    >
                        The "Quick Commerce" Engine
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        A technical simulation demonstrating how Python-based MLOps workflows optimize rapid-delivery models. Adjust the routing inefficiencies below to see the real-time impact on scaling infrastructure.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Interactive Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-dark rounded-3xl p-8 border border-slate-200 dark:border-slate-800"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Settings className="text-blue-500 w-6 h-6" />
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Ops Control Center</h3>
                        </div>

                        {/* Slider Control */}
                        <div className="mb-10 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50">
                            <div className="flex justify-between mb-4">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Delivery Routing Inefficiencies</span>
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{inefficiency}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={inefficiency}
                                onChange={(e) => setInefficiency(Number(e.target.value))}
                                className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500 hover:accent-blue-500 dark:hover:accent-blue-400 transition-all"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>Optimized (MLOps Active)</span>
                                <span>Legacy System</span>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center text-center group hover:border-emerald-500/30 transition-colors">
                                <Cloud className="w-6 h-6 text-emerald-500 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">${cloudCost.toLocaleString()}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Est. Cloud Costs / mo</span>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center text-center group hover:border-blue-500/30 transition-colors">
                                <Zap className={`w-6 h-6 mb-2 group-hover:scale-110 transition-transform ${serverUptime > 98 ? 'text-blue-500 dark:text-blue-400' : 'text-orange-500 dark:text-orange-400'}`} />
                                <span className={`text-2xl font-bold ${serverUptime > 98 ? 'text-slate-800 dark:text-slate-100' : 'text-orange-600 dark:text-orange-300'}`}>
                                    {serverUptime}%
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Server Uptime</span>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center text-center group hover:border-purple-500/30 transition-colors">
                                <Clock className="w-6 h-6 text-purple-500 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{deliverySpeed}m</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Avg. Delivery Speed</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Explanation Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        <div className="p-6 rounded-2xl glass border-blue-500/20 dark:border-blue-500/10">
                            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">The Impact of MLOps</h4>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                                In quick-commerce supply chains, legacy routing algorithms often buckle under dynamic constraints, leading to high <strong>{inefficiency}% routing inefficiency</strong>. This inflates cloud expenditures because unoptimized queries demand higher compute.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl glass border-emerald-500/20 dark:border-emerald-500/10">
                            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Engineering the Solution</h4>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                                By implementing a Python-based MLOps pipeline, we automate the deployment of predictive geospatial models. As you drag the slider to <strong>0% Inefficiency</strong>, notice how optimizing the system dramatically reduces estimated monthly cloud costs to <strong>${cloudCost.toLocaleString()}</strong> while ensuring multi-node <strong>{serverUptime}% uptime</strong>. The result? Sub-20 minute delivery speeds at scale.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudySimulator;
