import { Clock } from "lucide-react";
import { Service } from "./types";

interface ServiceSelectorProps {
    services: Service[];
    selectedService: Service | null;
    onSelectService: (service: Service) => void;
}

/**
 * Componente para seleção de serviço no modal de agendamento
 */
export const ServiceSelector = ({ services, selectedService, onSelectService }: ServiceSelectorProps) => {
    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">Escolha seu Serviço</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                {services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => onSelectService(service)}
                        className={`relative text-left p-4 sm:p-5 border-2 rounded-2xl transition-all duration-300 active:scale-95 ${
                            selectedService?.id === service.id
                                ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                                : 'border-slate-700 hover:border-amber-400 hover:bg-slate-800'
                        }`}
                    >
                        <div className="text-3xl sm:text-4xl mb-2">✂️</div>
                        <h4 className="text-base sm:text-lg font-bold text-white mb-1">{service.name}</h4>
                        <p className="text-xs text-slate-400 mb-3">{service.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xl sm:text-2xl font-bold text-amber-400">R$ {service.price}</span>
                            <span className="text-xs sm:text-sm text-slate-400 flex items-center bg-slate-800 px-2 py-1 rounded-full">
                                <Clock className="h-3 w-3 mr-1" />
                                {service.duration_minutes} min
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
