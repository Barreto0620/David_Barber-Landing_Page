import { Phone } from "lucide-react";

interface MobileNavProps {
    isOpen: boolean;
    onNavigate: (id: string) => void;
}

/**
 * Menu de navegação mobile (dropdown)
 */
export const MobileNav = ({ isOpen, onNavigate }: MobileNavProps) => {
    if (!isOpen) return null;

    return (
        <div className="lg:hidden pb-3">
            <div className="space-y-1 bg-slate-800 rounded-lg p-3 border border-slate-700">
                <button
                    onClick={() => onNavigate('home')}
                    className="block w-full text-left px-3 py-2.5 text-white hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all duration-300 font-medium text-sm"
                >
                    Início
                </button>
                <button
                    onClick={() => onNavigate('services')}
                    className="block w-full text-left px-3 py-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all duration-300 font-medium text-sm"
                >
                    Serviços
                </button>
                <button
                    onClick={() => onNavigate('team')}
                    className="block w-full text-left px-3 py-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all duration-300 font-medium text-sm"
                >
                    Equipe
                </button>
                <button
                    onClick={() => onNavigate('contact')}
                    className="block w-full text-left px-3 py-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all duration-300 font-medium text-sm"
                >
                    Contato
                </button>
                <div className="pt-2 border-t border-slate-700 mt-2">
                    <button className="w-full px-4 py-2.5 border-2 border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center text-sm font-medium">
                        <Phone className="h-4 w-4 mr-2" />
                        (11) 95843-1653
                    </button>
                </div>
            </div>
        </div>
    );
};
