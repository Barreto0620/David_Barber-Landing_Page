import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Clock, Scissors, Zap, Star, DollarSign, AlertCircle, Sparkles } from "lucide-react";

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
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Função para determinar o ícone baseado no nome/categoria do serviço
    const getServiceIcon = (serviceName: string) => {
        const name = serviceName.toLowerCase();
        
        if (name.includes('barba') && name.includes('corte')) return Zap;
        if (name.includes('barba')) return DollarSign;
        if (name.includes('tratamento') || name.includes('hidrata')) return Sparkles;
        if (name.includes('corte')) return Scissors;
        return Star;
    };

    // Função para verificar se é um serviço popular (baseado no preço ou categoria)
    const isPopular = (service: Service) => {
        // Lógica: Serviços com "combo" ou entre R$70-R$100 são populares
        const isCombo = service.name.toLowerCase().includes('corte') && 
                       service.name.toLowerCase().includes('barba');
        const isPriceRange = service.price >= 70 && service.price <= 100;
        
        return isCombo || isPriceRange;
    };

    const handleSelectService = (service: Service) => {
        // Dispara evento para abrir modal de agendamento
        if (typeof window !== 'undefined' && (window as any).openBookingModal) {
            (window as any).openBookingModal();
        } else {
            window.dispatchEvent(new CustomEvent('openBooking', {
                detail: { service }
            }));
        }
    };

    // Estado de Loading
    if (loading) {
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
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent"></div>
                    </div>
                </div>
            </section>
        );
    }

    // Estado de Erro
    if (error) {
        return (
            <section id="services" className="py-20 bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Nossos <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Serviços</span>
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center items-center py-12 text-center">
                        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 max-w-md">
                            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4"/>
                            <h3 className="text-xl font-bold text-red-400 mb-2">Erro ao Carregar Serviços</h3>
                            <p className="text-slate-400 text-sm">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300"
                            >
                                Tentar Novamente
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Estado Vazio
    if (services.length === 0) {
        return (
            <section id="services" className="py-20 bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Nossos <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Serviços</span>
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center items-center py-12 text-center">
                        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 max-w-md">
                            <Scissors className="h-12 w-12 text-amber-400 mx-auto mb-4"/>
                            <h3 className="text-xl font-bold text-white mb-2">Nenhum Serviço Disponível</h3>
                            <p className="text-slate-400 text-sm">
                                Estamos atualizando nossa lista de serviços. Volte em breve!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Renderização Normal com Serviços
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {services.map((service) => {
                        const ServiceIcon = getServiceIcon(service.name);
                        const popular = isPopular(service);

                        return (
                            <div 
                                key={service.id}
                                className="group bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                                onClick={() => handleSelectService(service)}
                            >
                                {/* Efeito de Brilho no Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-600/0 group-hover:from-amber-500/5 group-hover:to-orange-600/5 transition-all duration-300 pointer-events-none" />
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-amber-500/10 p-3 rounded-xl group-hover:bg-amber-500/20 transition-colors duration-300">
                                            <ServiceIcon className="h-7 w-7 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        {popular && (
                                            <span className="text-xs font-bold text-orange-600 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-500/30 animate-pulse">
                                                POPULAR
                                            </span>
                                        )}
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                                        {service.name}
                                    </h3>
                                    
                                    <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
                                        {service.description}
                                    </p>
                                    
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-700 group-hover:border-amber-500/30 transition-colors duration-300">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 mb-1">A partir de</span>
                                            <span className="text-2xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300">
                                                R$ {service.price.toFixed(2).replace('.', ',')}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm text-slate-400 flex items-center bg-slate-900/50 px-3 py-1.5 rounded-lg group-hover:bg-slate-900 transition-colors duration-300">
                                                <Clock className="h-4 w-4 mr-1.5 text-amber-400"/> 
                                                {service.duration_minutes} min
                                            </span>
                                        </div>
                                    </div>

                                    {/* Call to Action */}
                                    <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30 text-amber-400 rounded-lg font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:from-amber-500/20 hover:to-orange-600/20">
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