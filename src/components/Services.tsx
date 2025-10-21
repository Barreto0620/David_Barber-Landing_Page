import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Clock, Scissors, Zap, Star, DollarSign, AlertCircle, Sparkles, Calendar } from "lucide-react";

// Interface para garantir a tipagem dos dados do serviço
interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    duration_minutes: number;
    active: boolean;
    category?: string;
    created_at?: string;
}

export const Services = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const { data, error: fetchError } = await supabase
                    .from('services')
                    .select('*')
                    .eq('active', true)
                    .order('price', { ascending: true });

                if (fetchError) {
                    throw new Error(`Erro ao buscar serviços: ${fetchError.message}`);
                }

                setServices(data || []);
            } catch (err: any) {
                setError(err.message || "Falha ao carregar serviços. Verifique sua conexão.");
                console.error("Erro ao buscar serviços:", err);
                
                // Dados mockados para fallback
                setServices([
                    { id: 1, name: "Corte Clássico", description: "Corte na tesoura ou máquina, finalização com pomada.", price: 50.00, duration_minutes: 45, active: true },
                    { id: 2, name: "Barba Completa", description: "Design e modelagem de barba, toalha quente e finalização.", price: 40.00, duration_minutes: 30, active: true, category: "popular" },
                    { id: 3, name: "Corte + Barba", description: "Combo completo de corte de cabelo e barba.", price: 80.00, duration_minutes: 75, active: true },
                    { id: 4, name: "Dia do Noivo", description: "Serviço exclusivo de preparação para o dia do casamento.", price: 250.00, duration_minutes: 120, active: true, category: "premium" },
                    { id: 5, name: "Alinhamento Capilar", description: "Tratamento para redução de volume e frizz.", price: 100.00, duration_minutes: 60, active: true, category: "destaque" }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
        
        // Simula recarregamento a cada 5 minutos para dados ao vivo (opcional, ajustável)
        const interval = setInterval(fetchServices, 300000); 
        return () => clearInterval(interval);
    }, []);

    const getServiceIcon = (service: Service) => {
        if (service.name.toLowerCase().includes('barba') && service.name.toLowerCase().includes('corte')) return Zap;
        if (service.name.toLowerCase().includes('barba')) return Star;
        if (service.category === 'premium') return Sparkles;
        return Scissors;
    };

    const handleSelectService = (service: Service) => {
        // Dispara um evento customizado para que o componente pai (ou um modal wrapper) possa capturá-lo
        window.dispatchEvent(new CustomEvent('openBooking', { detail: service }));
    };

    return (
        <section id="services" className="py-20 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Nossos <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Serviços</span>
                    </h2>
                    <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                        Escolha o tratamento ideal para o seu estilo
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center p-8 bg-red-500/20 border border-red-500/50 rounded-lg max-w-lg mx-auto">
                        <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-3" />
                        <p className="text-red-400 font-semibold">{error}</p>
                        <p className="text-red-300 text-sm mt-2">Exibindo serviços de demonstração.</p>
                    </div>
                )}

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const ServiceIcon = getServiceIcon(service);
                        
                        return (
                            <div 
                                key={service.id}
                                className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-amber-500 group"
                            >
                                <div className="relative">
                                    {/* Service Icon */}
                                    <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl w-fit mb-4">
                                        <ServiceIcon className="h-7 w-7 text-amber-400" />
                                    </div>

                                    {/* Badge (POPULAR) - CORREÇÃO DE CONTRASTE (6) */}
                                    {service.category === 'destaque' && (
                                        <span className="absolute top-0 right-0 px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold border border-green-500/30">DESTAQUE</span>
                                    )}
                                    {service.category === 'popular' && (
                                        <span 
                                            // Corrigido text-orange-600 para text-slate-900 para alto contraste no fundo claro
                                            className="absolute top-0 right-0 text-xs font-bold text-slate-900 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-500/30 animate-pulse"
                                        >
                                            POPULAR
                                        </span>
                                    )}

                                    {/* Service Info */}
                                    <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                                    <p className="text-slate-300 mb-6 min-h-[60px]">{service.description}</p>
                                    
                                    {/* Price and Duration */}
                                    <div className="flex justify-between items-center border-t border-slate-700 pt-4">
                                        <div className="text-left">
                                            {/* CORREÇÃO DE CONTRASTE (2, 3, 4, 5, 7): text-slate-500 -> text-slate-300 */}
                                            <span className="text-xs text-slate-300 mb-1 block">A partir de</span>
                                            <span className="text-2xl font-bold text-amber-400 group-hover:text-orange-500 transition-colors duration-300">
                                                R$ {service.price.toFixed(2).replace('.', ',')}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            {/* CORREÇÃO DE CONTRASTE (Duração): text-slate-400 -> text-slate-300 */}
                                            <span className="text-sm text-slate-300 flex items-center bg-slate-900/50 px-3 py-1.5 rounded-lg group-hover:bg-slate-900 transition-colors duration-300">
                                                <Clock className="h-4 w-4 mr-1.5 text-amber-400" aria-hidden="true" /> 
                                                {service.duration_minutes} min
                                            </span>
                                        </div>
                                    </div>

                                    {/* Call to Action - ACESSIBILIDADE: Foco e rótulo garantidos */}
                                    <button 
                                        onClick={() => handleSelectService(service)}
                                        className="mt-4 w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-bold flex items-center justify-center text-lg focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                                        aria-label={`Agendar o serviço ${service.name}`}
                                    >
                                        <Calendar className="h-5 w-5 mr-2" />
                                        Agendar Agora
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};