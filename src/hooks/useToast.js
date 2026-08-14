import { createContext, useContext } from 'react';

/**
 * Lives outside Toast.jsx so that file exports only a component — a module
 * mixing component and non-component exports breaks Fast Refresh.
 */
export const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);
