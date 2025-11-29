import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColor = type === 'success' 
    ? 'bg-emerald-500' 
    : type === 'error' 
    ? 'bg-red-500' 
    : 'bg-blue-500';

  const Icon = type === 'success' ? CheckCircle2 : XCircle;

  return (
    <div 
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-[500px] animate-slide-in`}
      style={{ 
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 99999,
      }}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const useToast = () => {
  const [toast, setToast] = React.useState(null);

  const showToast = (message, type = 'success', duration = 3000) => {
    setToast({ message, type, duration });
  };

  const hideToast = () => {
    setToast(null);
  };

  return { toast, showToast, hideToast };
};

