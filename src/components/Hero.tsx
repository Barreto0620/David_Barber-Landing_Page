import { useState, useEffect } from "react";
import { Calendar, Star, Clock, CheckCircle } from "lucide-react";

export const Hero = () => {
  const [liveBooking, setLiveBooking] = useState({
    service: { name: "Corte + Barba Completa", price: 85 },
    professional: { name: "Carlos Silva", status: "available" },
    nextSlot: "Hoje, 15:30"
  });

  // Simular atualização de dados em tempo real do Supabase
  useEffect(() => {
    const updateLiveData = setInterval(() => {
      // Aqui você fará a consulta real ao Supabase
      // const { data } = await supabase.from('bookings').select()...
      setLiveBooking(prev => ({
        ...prev,
        nextSlot: `Hoje, ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`
      }));
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(updateLiveData);
  }, []);

  const openBookingModal = () => {
    console.log('Tentando abrir modal de reserva...');
    
    // Método 1: Usar função global (mais direto)
    if (typeof (window as any).openBookingModal === 'function') {
      console.log('Usando função global');
      (window as any).openBookingModal();
    } else {
      console.log('Função global não encontrada, usando evento');
      // Método 2: Disparar evento customizado (fallback)
      window.dispatchEvent(new CustomEvent('openBooking'));
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <span className="text-slate-300 font-medium text-sm sm:text-base">
                4.9/5 • 500+ clientes satisfeitos
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Estilo{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Premium
              </span>
              <br />
              <span className="text-white">para Homens</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-lg">
              Transforme seu visual com nosso barbeiro especializado. 
              Agende em <strong className="text-amber-400">3 cliques</strong> e 
              experimente o melhor da barbearia moderna.
            </p>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Calendar, text: "Agendamento online 24/7" },
                { icon: Clock, text: "Atendimento pontual" },
                { icon: CheckCircle, text: "Garantia de satisfação" },
                { icon: Star, text: "Profissional certificado" },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="bg-amber-500/20 p-2 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                    <benefit.icon className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={openBookingModal}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center font-bold text-base sm:text-lg active:scale-95"
              >
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Reservar Agora - 3 Passos
              </button>
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center font-bold text-base sm:text-lg active:scale-95"
              >
                Ver Nossos Serviços
              </button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-around sm:justify-start sm:space-x-8 pt-6 sm:pt-8 border-t border-slate-700">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-400">500+</div>
                <div className="text-xs sm:text-sm text-slate-400">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-400">8</div>
                <div className="text-xs sm:text-sm text-slate-400">Anos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-400">98%</div>
                <div className="text-xs sm:text-sm text-slate-400">Satisfação</div>
              </div>
            </div>
          </div>

          {/* Right Column - Live Booking Preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-slate-800 border-2 border-amber-500/30 rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl shadow-amber-500/10 hover:border-amber-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Acompanhar Corte
                </h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">Ao vivo</span>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-amber-500/50 transition-colors">
                  <div className="text-xs sm:text-sm text-slate-400 mb-1">Serviço</div>
                  <div className="font-bold text-white text-sm sm:text-base">{liveBooking.service.name}</div>
                  <div className="text-amber-400 font-bold text-lg sm:text-xl">R$ {liveBooking.service.price},00</div>
                </div>
                
                <div className="p-3 sm:p-4 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-amber-500/50 transition-colors">
                  <div className="text-xs sm:text-sm text-slate-400 mb-1">Profissional</div>
                  <div className="font-bold text-white text-sm sm:text-base">{liveBooking.professional.name}</div>
                  <span className="inline-block mt-2 px-2 sm:px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold">
                    ✓ Disponível
                  </span>
                </div>
                
                <div className="p-3 sm:p-4 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-amber-500/50 transition-colors">
                  <div className="text-xs sm:text-sm text-slate-400 mb-1">Próximo Horário</div>
                  <div className="font-bold text-white flex items-center text-sm sm:text-base">
                    <Clock className="h-4 w-4 mr-2 text-amber-400" />
                    {liveBooking.nextSlot}
                  </div>
                </div>
                
                <button 
                  onClick={openBookingModal}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center font-bold text-sm sm:text-base active:scale-95"
                >
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Confirmar Reserva
                </button>

                <p className="text-xs text-slate-500 text-center">
                  🔒 Agendamento seguro e rápido
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 hidden lg:block animate-bounce">
        <div className="bg-amber-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
          ⚡ Vagas limitadas hoje!
        </div>
      </div>
    </section>
  );
};