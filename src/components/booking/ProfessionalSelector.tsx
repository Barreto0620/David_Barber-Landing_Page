import { useEffect } from "react";
import { Check, Star } from "lucide-react";
import { Professional } from "./types";

interface ProfessionalSelectorProps {
    professionals: Professional[];
    selectedProfessional: Professional | null;
    setSelectedProfessional: (pro: Professional) => void;
}

/**
 * Componente para seleção de profissional no modal de agendamento
 * Exibe apenas David Sousa como profissional fixo
 */
export const ProfessionalSelector = ({ 
    professionals, 
    selectedProfessional, 
    setSelectedProfessional 
}: ProfessionalSelectorProps) => {

    // Profissional fixo - David Sousa
    const davidSousa: Professional = professionals.find(
        p => p.full_name.toLowerCase().includes('david')
    ) || professionals[0] || {
        id: 'default-barber',
        full_name: 'David Sousa'
    };

    // Selecionar automaticamente o David Sousa
    useEffect(() => {
        if (!selectedProfessional && davidSousa) {
            setSelectedProfessional(davidSousa);
        }
    }, [davidSousa, selectedProfessional, setSelectedProfessional]);

    return (
        <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Profissional</h3>
            
            {/* Card fixo do David Sousa */}
            <div className="w-full p-4 sm:p-5 border-2 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        {/* Avatar */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-lg">
                            DS
                        </div>
                        
                        {/* Info */}
                        <div>
                            <h4 className="font-bold text-white text-base sm:text-lg">
                                {davidSousa.full_name}
                            </h4>
                            <p className="text-xs sm:text-sm text-amber-400 flex items-center mt-1">
                                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 fill-amber-400" />
                                Barbeiro Principal
                            </p>
                        </div>
                    </div>
                    
                    {/* Check Icon */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                        <Check className="h-5 w-5 text-white" strokeWidth={3} />
                    </div>
                </div>
            </div>

            {/* Mensagem de confiança */}
            <div className="mt-3 text-center">
                <p className="text-xs text-slate-400">
                    ✂️ Especialista em cortes modernos e clássicos
                </p>
            </div>
        </div>
    );
};