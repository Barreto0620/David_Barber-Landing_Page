// src/components/Services.tsx

import { Clock, Scissors, Zap, Star, DollarSign } from "lucide-react";

// Interface para garantir a tipagem dos dados do serviço
interface Service {
    id: number;
    name: string;
    description: string;
    price: number; // Preço como número para facilitar formatação, se necessário
    priceString: string; // Preço formatado para exibição
    duration: string;
    rating: number;
    icon: React.ElementType; // Tipo para ícones do lucide-react
    popular: boolean;
}

const servicesData: Service[] = [
    { 
        id: 1, 
        name: "Corte Clássico", 
        description: "Corte com máquina ou tesoura e acabamento impecável.", 
        price: 45.00,
        priceString: "R$ 45,00", 
        duration: "30 min", 
        rating: 4.8, 
        icon: Scissors,
        popular: true
    },
    { 
        id: 2, 
        name: "Corte + Barba", 
        description: "Pacote completo: corte de cabelo e design de barba com toalha quente.", 
        price: 85.00,
        priceString: "R$ 85,00", 
        duration: "50 min", 
        rating: 4.9, 
        icon: Zap,
        popular: true 
    },
    { 
        id: 3, 
        name: "Barba Completa", 
        description: "Modelagem de barba com navalha, toalha quente e finalização com balm.", 
        price: 55.00,
        priceString: "R$ 55,00", 
        duration: "35 min", 
        rating: 4.7, 
        icon: DollarSign,
        popular: false
    },
    { 
        id: 4, 
        name: "Tratamento Capilar", 
        description: "Hidratação profunda e massagem para revitalização dos fios.", 
        price: 60.00,
        priceString: "R$ 60,00", 
        duration: "40 min", 
        rating: 4.6, 
        icon: Star,
        popular: false
    },
];

export const Services = () => {

    const handleSelectService = (service: Service) => {
        // Dispara um evento customizado para abrir o modal de agendamento no passo 2,
        // já com o serviço selecionado.
        window.dispatchEvent(new CustomEvent('openBooking', {
            detail: { service }
        }));
    };

    return (
        <section id="services" className="py-20 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Nossos <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Serviços</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Qualidade e atenção aos detalhes em cada procedimento.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicesData.map((service) => (
                        <div 
                            key={service.id}
                            className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-amber-500 hover:shadow-amber-500/20 cursor-pointer"
                            onClick={() => handleSelectService(service)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <service.icon className="h-8 w-8 text-amber-400" />
                                {service.popular && (
                                    <span className="text-xs font-bold text-orange-600 bg-amber-400/20 px-3 py-1 rounded-full">
                                        POPULAR
                                    </span>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                            <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                                <span className="text-2xl font-bold text-amber-400">{service.priceString}</span>
                                <span className="text-sm text-slate-500 flex items-center">
                                    <Clock className="h-4 w-4 mr-1"/> {service.duration}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};