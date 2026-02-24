import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialsData } from '../data';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1));
    };

    return (
        <section className="py-24 px-6 relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
            {/* Background elements */}
            <div className="absolute bottom-0 left-[20%] w-[40%] h-[30%] bg-emerald-400/10 dark:bg-emerald-600/10 blur-[120px] rounded-full point-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-white mb-4"
                    >
                        Professional Endorsements
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        Voices from leaders and collaborators across digital transformation, high-frequency trading, and entrepreneurial ventures.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20">
                        <button
                            onClick={prevTestimonial}
                            className="p-3 rounded-full glass border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
                            aria-label="Previous Testimonial"
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>

                    <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20">
                        <button
                            onClick={nextTestimonial}
                            className="p-3 rounded-full glass border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
                            aria-label="Next Testimonial"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Slider Content */}
                    <div className="overflow-hidden px-4 md:px-12 py-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="glass bg-white/60 dark:bg-slate-900/60 p-8 md:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/20 dark:shadow-none relative"
                            >
                                <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-500/20 dark:text-blue-500/10" />

                                <blockquote className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-10 relative z-10 mx-auto max-w-3xl text-center">
                                    "{testimonialsData[currentIndex].content}"
                                </blockquote>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                                        {testimonialsData[currentIndex].initials}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-slate-800 dark:text-white">
                                            {testimonialsData[currentIndex].author}
                                        </div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                                            {testimonialsData[currentIndex].company}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonialsData.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx
                                        ? 'w-8 bg-blue-600 dark:bg-blue-500'
                                        : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                                    }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
