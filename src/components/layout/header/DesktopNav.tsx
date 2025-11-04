interface DesktopNavProps {
    onNavigate: (id: string) => void;
    onScrollToTop: () => void;
}

/**
 * Menu de navegação para desktop
 */
export const DesktopNav = ({ onNavigate, onScrollToTop }: DesktopNavProps) => {
    return (
        <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6 xl:space-x-8">
                <button
                    onClick={onScrollToTop}
                    className="text-white hover:text-amber-400 transition-colors duration-300 font-medium text-sm xl:text-base"
                >
                    Início
                </button>
                <button
                    onClick={() => onNavigate('services')}
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium text-sm xl:text-base"
                >
                    Serviços
                </button>
                <button
                    onClick={() => onNavigate('team')}
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium text-sm xl:text-base"
                >
                    Equipe
                </button>
                <button
                    onClick={() => onNavigate('contact')}
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium text-sm xl:text-base"
                >
                    Contato
                </button>
            </div>
        </div>
    );
};