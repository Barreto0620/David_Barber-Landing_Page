import { useState, useEffect } from "react";
import { Clock, Star, Scissors, Brush, Zap, Crown, Calendar, TrendingUp } from "lucide-react";

// Interface para tipagem dos serviços
interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  icon: string;
  popular: boolean;
  bookings_count?: number;
}

export const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Simular fetch do Supabase
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      
      // Aqui você fará:
      // const { data } = await supabase
      //   .from('services')
      //   .select('*')
      //   .order('popular', { ascending: false })
      
      // Dados simulados com estrutura real
      const mockData: Service[] = [
        {
          id: 1,
          name: "Corte Clássico",
          description: "Corte tradicional com acabamento impecável e finalização premium",
          price: 45,
          duration: "30 min",
          rating: 4.9,
          icon: "scissors",
          popular: false,
          bookings_count: 156
        },
        {
          id: 2,
          name: "Corte + Barba",
          description: "Combo completo com design personalizado e tratamento facial",
          price: 85,
          duration: "50 min",
          rating: 5.0,
          icon: "crown",
          popular: true,
          bookings_count: 289
        },
        {
          id: 3,
          name: "Barba Completa",
          description: "Aparação, design e hidratação profissional com produtos premium",
          price: 55,
          duration: "35 min",
          rating: 4.8,
          icon: "brush",
          popular: false,
          bookings_count: 198
        },
        {
          id: 4,
          name: "Corte Premium",
          description: "Técnicas avançadas + lavagem + styling + massagem relaxante",
          price: 75,
          duration: "60 min",
          rating: 4.9,
          icon: "zap",
          popular: false,
          bookings_count: 134
        },
      ];

      setTimeout(() => {
        setServices(mockData);
        setLoading(false);
      }, 500);
    };

    fetchServices();
  }, [selectedCategory]);

  const getIcon = (iconName: string) => {
    const icons: any = {
      scissors: Scissors,
      crown: Crown,
      brush: Brush,
      zap: Zap
    };
    return icons[iconName] || Scissors;
  };

  const openBookingModal = (service: Service) => {
    // Dispara evento com o serviço pré-selecionado
    window.dispatchEvent(new CustomEvent('openBooking', { detail: { service } }));
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mx-auto"></div>
            <p className="mt-4">Carregando serviços...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Serviços</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Escolha o serviço ideal para transformar seu visual com qualidade premium
          </p>

          {/* Stats Bar */}
          <div className="flex justify-center items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2 text-slate-400">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <span className="font-medium">Avaliação média: 4.9</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <span className="font-medium">777+ agendamentos este mês</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            
            return (
              <div
                key={service.id}
                className="bg-slate-900 border-2 border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500 transition-all duration-300 group relative animate-fade-in-up hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      🔥 Mais Popular
                    </div>
                  </div>
                )}

                {/* Service Icon */}
                <div className="p-6">
                  <div className="bg-amber-500/20 p-4 rounded-xl w-fit mb-4 group-hover:bg-amber-500/30 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-amber-400" />
                  </div>

                  {/* Service Details */}
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Price and Duration */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold text-amber-400">
                      R$ {service.price}
                    </div>
                    <div className="flex items-center text-sm text-slate-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.duration}
                    </div>
                  </div>

                  {/* Rating and Bookings */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(service.rating)
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-slate-400 font-medium">
                        {service.rating}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {service.bookings_count}+ agendamentos
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => openBookingModal(service)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-amber-500/50 group-hover:scale-105 transition-all duration-300 font-bold flex items-center justify-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Serviço
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Services Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-2">
            🌟 Serviços Especiais
          </h3>
          <p className="mb-6 text-white/90">
            Tratamentos capilares, design de sobrancelhas, coloração e muito mais
          </p>
          <button 
            onClick={() => openBookingModal(services[0])}
            className="px-8 py-3 bg-white text-orange-600 rounded-lg hover:bg-slate-100 transition-all duration-300 font-bold"
          >
            Ver Todos os Serviços
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="font-bold text-white mb-1">Qualidade Garantida</h4>
            <p className="text-sm text-slate-400">Produtos premium e técnicas modernas</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-bold text-white mb-1">Atendimento Rápido</h4>
            <p className="text-sm text-slate-400">Pontualidade e eficiência</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">💯</div>
            <h4 className="font-bold text-white mb-1">Satisfação Total</h4>
            <p className="text-sm text-slate-400">98% de clientes recomendam</p>
          </div>
        </div>
      </div>
    </section>
  );
};