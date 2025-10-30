import { useEffect } from "react";
import { Check, X } from "lucide-react";

interface SuccessToastProps {
    message: string | null;
    setMessage: (msg: string | null) => void;
}

/**
 * Componente de toast de sucesso com animação
 */
export const SuccessToast = ({ message, setMessage }: SuccessToastProps) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    if (!message) return null;

    return (
        <div className="fixed top-0 inset-x-0 z-[60] flex justify-center p-4 transition-all duration-500 ease-out">
            <div className="flex items-center space-x-3 bg-green-600 shadow-xl shadow-green-500/50 text-white p-4 rounded-lg sm:max-w-md w-full animate-toast-in">
                <Check className="h-6 w-6 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">{message}</span>
                <button onClick={() => setMessage(null)} className="ml-auto p-1 hover:bg-white/20 rounded-full transition-colors">
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};
