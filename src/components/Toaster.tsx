import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

interface ToasterProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800',
    borderColor: 'border-blue-400 dark:border-blue-500',
    iconColor: 'text-white',
    titleColor: 'text-white',
    messageColor: 'text-blue-50',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-gradient-to-br from-red-600 to-red-700 dark:from-red-700 dark:to-red-800',
    borderColor: 'border-red-400 dark:border-red-500',
    iconColor: 'text-white',
    titleColor: 'text-white',
    messageColor: 'text-red-50',
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-gradient-to-br from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700',
    borderColor: 'border-amber-400 dark:border-amber-500',
    iconColor: 'text-white',
    titleColor: 'text-white',
    messageColor: 'text-amber-50',
  },
  info: {
    icon: Info,
    bgColor: 'bg-gradient-to-br from-indigo-600 to-blue-600 dark:from-indigo-700 dark:to-blue-700',
    borderColor: 'border-indigo-400 dark:border-indigo-500',
    iconColor: 'text-white',
    titleColor: 'text-white',
    messageColor: 'text-indigo-50',
  },
};

export function Toaster({ toasts, onRemove }: ToasterProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const config = toastConfig[toast.type];
        const Icon = config.icon;

        return (
          <ToastItem
            key={toast.id}
            toast={toast}
            config={config}
            Icon={Icon}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  config: typeof toastConfig.success;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.ComponentType<any>;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, config, Icon, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleRemove = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  }, [onRemove, toast.id]);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        handleRemove();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, handleRemove]);

  return (
    <div
      className={`
        transform transition-all duration-500 ease-out pointer-events-auto
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
        ${isLeaving ? 'translate-x-full opacity-0 scale-95' : ''}
        ${config.bgColor} ${config.borderColor}
        border-l-4 rounded-xl shadow-2xl backdrop-blur-md
        p-5 relative overflow-hidden
        hover:shadow-3xl hover:scale-105 transition-all duration-300
        border border-white/10
      `}
    >
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-transparent opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
      
      {/* Content */}
      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0 mt-0.5">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
            <Icon size={18} className={config.iconColor} />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={`text-base font-bold ${config.titleColor} mb-2 leading-tight`}>
            {toast.title}
          </h4>
          <p className={`text-sm ${config.messageColor} leading-relaxed opacity-90`}>
            {toast.message}
          </p>
        </div>
        
        <button
          onClick={handleRemove}
          className="flex-shrink-0 p-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
          aria-label="Close notification"
        >
          <X size={16} className={`${config.iconColor} group-hover:rotate-90 transition-transform duration-200`} />
        </button>
      </div>
      
      {/* Enhanced progress bar for auto-dismiss */}
      {toast.duration && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 rounded-b-xl overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-white/40 to-white/60 animate-progress rounded-full"
            style={{ 
              animation: `progress ${toast.duration}ms linear forwards` 
            }}
          />
        </div>
      )}
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
    </div>
  );
}

// CSS for progress animation (add to your global CSS)
const progressAnimation = `
@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}
`;

// Add the animation to your global CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = progressAnimation;
  document.head.appendChild(style);
}
