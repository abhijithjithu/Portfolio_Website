import React, { useState, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

// ── Context ────────────────────────────────────────────────────
const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

// ── Provider ───────────────────────────────────────────────────
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, duration = 2800) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={showToast}>
            {children}

            {/* Toast stack — bottom-left */}
            <div className="fixed bottom-8 left-8 z-[60] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: -40, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -40, scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
                            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 border border-slate-700 shadow-xl text-white text-sm font-medium min-w-[220px] max-w-xs"
                        >
                            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="flex-1">{toast.message}</span>
                            <button
                                onClick={() => dismiss(toast.id)}
                                className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
                                aria-label="Dismiss notification"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
