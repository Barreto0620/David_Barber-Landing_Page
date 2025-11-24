import { Phone, Calendar, User, LogOut } from "lucide-react";

interface HeaderActionsProps {
    user: any;
    onBookingOpen: () => void;
    isMobile?: boolean;
}

/**
 * Botões de ação do header (Ligar, Reservar, Login, etc)
 */
export const HeaderActions = ({ user, onBookingOpen, isMobile = false }: HeaderActionsProps) => {
    if (isMobile) {
        return (
            <div className="lg:hidden flex items-center space-x-2">
                <button
                    onClick={onBookingOpen}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg flex items-center font-medium text-xs"
                >
                    <Calendar className="h-3 w-3 mr-1" />
                    Agendar
                </button>
            </div>
        );
    }

    return (
        <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {user ? (
                <div className="flex items-center space-x-2">
                    <button className="px-3 xl:px-4 py-2 border-2 border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center text-xs xl:text-sm">
                        <User className="h-3 w-3 xl:h-4 xl:w-4 mr-1 xl:mr-2" />
                        Conta
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={onBookingOpen}
                    className="px-4 xl:px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex items-center font-medium text-xs xl:text-sm whitespace-nowrap"
                >
                    <Calendar className="h-3 w-3 xl:h-4 xl:w-4 mr-1 xl:mr-2" />
                    Reservar
                </button>
            )}
        </div>
    );
};
