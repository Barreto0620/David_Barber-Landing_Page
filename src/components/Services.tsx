import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import { Clock, Scissors, Zap, Star, DollarSign, AlertCircle, Sparkles, LucideIcon } from "lucide-react";

// 1. Interface para garantir a tipagem dos dados do serviço
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

// 2. Função de Utilidade: Determina o ícone
const getServiceIcon = (serviceName: string): LucideIcon => {
    const name = serviceName.toLowerCase();

    if (name.includes('combo') || (name.includes('barba') && name.includes('corte'))) return Zap;
    if (name.includes('barba')) return DollarSign;
    if (name.includes('tratamento') || name.includes('hidrata')) return Sparkles;
    if (name.includes('corte')) return Scissors;
    return Star;
};

// 3. Função de Utilidade: Verifica se é um serviço popular
const isPopular = (service: Service): boolean => {
    // Lógica: Serviços com "combo" ou entre R$70-R$100 são populares
    const isCombo = service.name.toLowerCase().includes('corte') &&
                    service.name.toLowerCase().includes('barba');
    const isPriceRange = service.price >= 70 && service.price <= 100;

    return isCombo || isPriceRange;
};

// 4. Hook Customizado: Gerencia o estado e a busca dos serviços
const useServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchServices = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Busca serviços ativos, ordenados por preço
            const { data, error: fetchError } = await supabase
                .from('services')
                .select('*')
                .eq('active', true)
                .order('price', { ascending: true });

            if (fetchError) {
                // Lança um erro para ser capturado no catch
                throw new Error(`Erro ao buscar serviços: ${fetchError.message}`);
            }

            setServices(data || []);
        } catch (err) {
            // Garante que o erro é um Error object para tipagem profissional
            const errorMessage = (err instanceof Error) ? err.message : "Falha desconhecida ao carregar serviços.";
            setError(errorMessage);
            console.error("Erro ao buscar serviços:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    return { services, loading, error, fetchServices };
};

// 5. Componente: Cartão de Serviço Individual (Acessível)
interface ServiceCardProps {
    service: Service;
    onSelect: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
    const ServiceIcon = useMemo(() => getServiceIcon(service.name), [service.name]);
    const popular = useMemo(() => isPopular(service), [service]);

    return (
        <div
            key={service.id}
            // Removemos o onClick do div pai para centralizar a interação no botão (Melhoria de Acessibilidade)
            className="group bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1 relative overflow-hidden"
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

                {/* Call to Action: Agora sempre visível e o principal elemento interativo */}
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Impede a propagação do clique para o div pai
                        onSelect(service);
                    }}
                    aria-label={`Agendar serviço ${service.name}`}
                    className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold text-sm shadow-md transition-all duration-300 hover:from-amber-400 hover:to-orange-500 hover:shadow-lg hover:shadow-amber-500/50 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                >
                    Agendar Agora
                </button>
            </div>
        </div>
    );
};


// 6. Componente Principal
export const Services = () => {
    const { services, loading, error, fetchServices } = useServices();

    // Função para lidar com a seleção do serviço (agora mais robusta)
    const handleSelectService = useCallback((service: Service) => {
        // Dispara um evento global customizado para abrir o modal de agendamento
        window.dispatchEvent(new CustomEvent('openBooking', {
            detail: { service }
        }));
    }, []);

    // Estrutura de UI comum para títulos
    const TitleSection = (
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Nossos <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Serviços</span>
            </h2>
            {!loading && !error && services.length > 0 && (
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Qualidade e atenção aos detalhes em cada procedimento.
                </p>
            )}
        </div>
    );

    // Estado de Loading
    if (loading) {
        return (
            <section id="services" className="py-20 bg-slate-900 min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {TitleSection}
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
            <section id="services" className="py-20 bg-slate-900 min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {TitleSection}
                    <div className="flex flex-col justify-center items-center py-12 text-center">
                        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 max-w-md">
                            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4"/>
                            <h3 className="text-xl font-bold text-red-400 mb-2">Erro ao Carregar Serviços</h3>
                            <p className="text-slate-400 text-sm">{error}. Tente recarregar a página.</p>
                            <button
                                onClick={fetchServices}
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
            <section id="services" className="py-20 bg-slate-900 min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {TitleSection}
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
                {TitleSection}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onSelect={handleSelectService}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};