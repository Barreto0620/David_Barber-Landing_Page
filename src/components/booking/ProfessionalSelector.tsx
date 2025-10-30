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
 */
export const ProfessionalSelector = ({ professionals, selectedProfessional, setSelectedProfessional }: ProfessionalSelectorProps) => {

    useEffect(() => {
        if (!selectedProfessional && professionals.length === 1) {
            setSelectedProfessional(professionals[0]);
        }
    }, [professionals, selectedProfessional, setSelectedProfessional]);

    const davidSousa = professionals.find(p => p.full_name.toLowerCase().includes('david sousa')) || professionals[0];
    const isSingleProfessional = professionals.length === 1 && !!davidSousa;

    return (
        <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Profissional</h3>
            {professionals.length > 0 ? (
                isSingleProfessional && davidSousa ? (
                    <div
                        className="w-full text-left p-4 border-2 rounded-xl bg-amber-500/10 border-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/20"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl sm:text-2xl font-bold text-white">DS</div>
                                <div>
                                    <h4 className="font-bold text-white text-base sm:text-lg">{davidSousa.full_name}</h4>
                                    <p className="text-xs text-amber-400 flex items-center">
                                        <Star className="h-3 w-3 mr-1 fill-amber-400"/>
                                        Barbeiro Principal
                                    </p>
                                </div>
                            </div>
                            <Check className="h-6 w-6 text-amber-500" />
                        </div>
                    </div>
                ) : (
                    professionals.map((pro) => (
                        <button
                            key={pro.id}
                            onClick={() => setSelectedProfessional(pro)}
                            className={`w-full text-left p-4 border-2 rounded-xl transition-all duration-300 ${
                                selectedProfessional?.id === pro.id
                                    ? 'border-amber-500 bg-amber-500/10'
                                    : 'border-slate-700 hover:border-amber-500 hover:bg-slate-800'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-700 flex items-center justify-center text-xl sm:text-2xl">👨‍💼</div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm sm:text-base">{pro.full_name}</h4>
                                        <p className="text-xs text-slate-400">Barbeiro</p>
                                    </div>
                                </div>
                                {selectedProfessional?.id === pro.id && <Check className="h-5 w-5 text-amber-500" />}
                            </div>
                        </button>
                    ))
                )
            ) : (
                <div className="text-center p-4 bg-slate-800 rounded-xl text-slate-400">
                    Nenhum profissional encontrado. Verifique o RLS e o campo 'role' no Supabase.
                </div>
            )}
        </div>
    );
};
