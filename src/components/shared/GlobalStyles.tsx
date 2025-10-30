import { useEffect } from "react";

/**
 * Componente que injeta estilos globais customizados para scrollbar e animações
 */
export const GlobalStyles = () => {
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.id = 'global-scrollbar-styles';
        styleElement.textContent = `
            ::-webkit-scrollbar {
                width: 12px;
                height: 12px;
            }

            ::-webkit-scrollbar-track {
                background: #1e293b;
                border-radius: 10px;
            }

            ::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, #f59e0b 0%, #ea580c 100%);
                border-radius: 10px;
                border: 2px solid #1e293b;
                transition: all 0.3s ease;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(180deg, #fbbf24 0%, #f97316 100%);
                border: 2px solid #0f172a;
            }

            ::-webkit-scrollbar-thumb:active {
                background: linear-gradient(180deg, #fcd34d 0%, #fb923c 100%);
            }

            * {
                scrollbar-width: thin;
                scrollbar-color: #f59e0b #1e293b;
            }

            @keyframes bounce-in-down {
                0% { transform: translateY(-100px); opacity: 0; }
                60% { transform: translateY(10px); opacity: 1; }
                80% { transform: translateY(-5px); }
                100% { transform: translateY(0); }
            }

            .animate-toast-in {
                animation: bounce-in-down 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            }

            @keyframes pulse-glow {
                0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.4); }
                50% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.6); }
            }

            .animate-pulse-glow {
                animation: pulse-glow 2s ease-in-out infinite;
            }

            html {
                scroll-behavior: smooth;
            }
        `;

        document.head.appendChild(styleElement);

        return () => {
            const existingStyle = document.getElementById('global-scrollbar-styles');
            if (existingStyle) {
                existingStyle.remove();
            }
        };
    }, []);

    return null;
};
