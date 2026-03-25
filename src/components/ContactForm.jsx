import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, Briefcase, CheckCircle, Copy } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, LINKEDIN_URL } from '../App';
import { useToast } from './Toast';

const ContactForm = () => {
    const showToast = useToast();
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [focused, setFocused] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, subject, message } = form;
        const mailtoBody = `Hi Abhijith,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ABest regards,%0D%0A${encodeURIComponent(name)}%0D%0A${encodeURIComponent(email)}`;
        const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
        window.location.href = mailtoLink;
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
            showToast('Email copied to clipboard!');
        }).catch(() => {
            window.location.href = `mailto:${CONTACT_EMAIL}`;
        });
    };

    const isValid = form.name && form.email && form.subject && form.message;

    const inputClasses = (field) =>
        `w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 outline-none
         bg-slate-100 dark:bg-slate-800/60 border
         ${focused === field
            ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/15'
            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
        }
         text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500`;

    return (
        <section className="section-pad relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-[20%] left-[-5%] w-[30%] h-[50%] bg-blue-300/15 dark:bg-blue-600/8 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-5%] w-[25%] h-[40%] bg-indigo-300/15 dark:bg-indigo-600/8 blur-[130px] rounded-full pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="mb-14 text-center">
                    <p className="section-label justify-center">07 / Connect</p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-white"
                    >
                        Let's Work Together
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base text-slate-600 dark:text-slate-400 mt-3 max-w-xl mx-auto"
                    >
                        Have a role or project in mind? Drop me a message — I'd love to hear about it.
                    </motion.p>
                </div>

                <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
                    {/* Left — Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 flex flex-col gap-4"
                    >
                        <div className="glass-dark rounded-2xl p-7 flex flex-col gap-5">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Quick Contact</h3>

                            <button
                                onClick={copyEmail}
                                className="group flex items-center gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all text-left"
                            >
                                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email</p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{CONTACT_EMAIL}</p>
                                </div>
                                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                            </button>

                            <a
                                href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
                                className="group flex items-center gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all"
                            >
                                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                    <Briefcase className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Phone</p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{CONTACT_PHONE}</p>
                                </div>
                            </a>

                            <a
                                href={LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all"
                            >
                                <div className="w-9 h-9 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                                    <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">LinkedIn</p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Abhijith P</p>
                                </div>
                            </a>
                        </div>

                        {/* Availability badge */}
                        <div className="glass rounded-xl p-4 flex items-center gap-3 border border-emerald-200 dark:border-emerald-800/50">
                            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                            </span>
                            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                                Currently open to opportunities
                            </span>
                        </div>
                    </motion.div>

                    {/* Right — Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="glass-dark rounded-2xl p-7 md:p-9 space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused('')}
                                        placeholder="John Doe"
                                        required
                                        className={inputClasses('name')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused('')}
                                        placeholder="john@company.com"
                                        required
                                        className={inputClasses('email')}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Subject
                                </label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('subject')}
                                    onBlur={() => setFocused('')}
                                    placeholder="Job Opportunity — Senior Engineer"
                                    required
                                    className={inputClasses('subject')}
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('message')}
                                    onBlur={() => setFocused('')}
                                    placeholder="Tell me about your team and what you're looking for…"
                                    rows={4}
                                    required
                                    className={`${inputClasses('message')} resize-none`}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={!isValid}
                                whileHover={isValid ? { scale: 1.02, y: -2 } : {}}
                                whileTap={isValid ? { scale: 0.98 } : {}}
                                className={`w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300
                                    ${isValid
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 cursor-pointer'
                                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                    }`}
                            >
                                {submitted ? (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        Opening Email Client…
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </>
                                )}
                            </motion.button>

                            <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                                This form opens your default email client with a pre-filled message.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
