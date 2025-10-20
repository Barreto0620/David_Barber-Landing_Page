import { useState, useEffect } from "react";
import { Calendar, Star, Clock, CheckCircle, Activity, UserCheck } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

interface CurrentAppointment {
  service_type: string;
  price: number;
  scheduled_date: string;
  professional: {
    full_name: string;
  };
  status: string;
}

interface NextSlot {
  time: string;
  available: boolean;
}

export const Hero = () => {
  const [currentAppointment, setCurrentAppointment] = useState<CurrentAppointment | null>(null);
  const [nextAvailableSlot, setNextAvailableSlot] = useState<NextSlot | null>(null);
  const [professionalStatus, setProfessionalStatus] = useState<'available' | 'busy' | 'offline'>('available');
  const [loading, setLoading] = useState(true);

  const businessHours = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

  const fetchLiveData = async () => {
    try {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

      const { data: inProgressData, error: inProgressError } = await supabase
        .from('appointments')
        .select(`
          service_type,
          price,
          scheduled_date,
          status,
          user_profiles!appointments_professional_id_fkey (
            full_name
          )
        `)
        .eq('status', 'in_progress')
        .gte('scheduled_date', todayStart.toISOString())
        .lte('scheduled_date', todayEnd.toISOString())
        .order('scheduled_date', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (inProgressError && (inProgressError.code === 'PGRST116' || inProgressError.message.includes('406'))) {
        console.warn('⚠️ Sem permissão para consultar agendamentos. Hero funcionará sem dados ao vivo.');
        setCurrentAppointment(null);
        setProfessionalStatus('available');
        setNextAvailableSlot({ time: "09:00", available: true });
        setLoading(false);
        return;
      }

      if (inProgressData) {
        setCurrentAppointment({
          service_type: inProgressData.service_type,
          price: inProgressData.price,
          scheduled_date: inProgressData.scheduled_date,
          professional: inProgressData.user_profiles as any,
          status: inProgressData.status
        });
        setProfessionalStatus('busy');
      } else {
        const { data: scheduledData, error: scheduledError } = await supabase
          .from('appointments')
          .select(`
            service_type,
            price,
            scheduled_date,
            status,
            user_profiles!appointments_professional_id_fkey (
              full_name
            )
          `)
          .eq('status', 'scheduled')
          .gte('scheduled_date', now.toISOString())
          .lte('scheduled_date', todayEnd.toISOString())
          .order('scheduled_date', { ascending: true })
          .limit(1)
          .maybeSingle();

        if (scheduledError && (scheduledError.code === 'PGRST116' || scheduledError.message.includes('406'))) {
          console.warn('⚠️ Sem permissão para consultar agendamentos.');
          setCurrentAppointment(null);
          setProfessionalStatus('available');
          setNextAvailableSlot({ time: "09:00", available: true });
          setLoading(false);
          return;
        }

        if (scheduledData) {
          setCurrentAppointment({
            service_type: scheduledData.service_type,
            price: scheduledData.price,
            scheduled_date: scheduledData.scheduled_date,
            professional: scheduledData.user_profiles as any,
            status: scheduledData.status
          });
          setProfessionalStatus('available');
        } else {
          setCurrentAppointment(null);
          setProfessionalStatus('available');
        }
      }

      const { data: allAppointments, error: allError } = await supabase
        .from('appointments')
        .select('scheduled_date')
        .gte('scheduled_date', todayStart.toISOString())
        .lte('scheduled_date', todayEnd.toISOString())
        .in('status', ['scheduled', 'in_progress']);

      if (allError && (allError.code === 'PGRST116' || allError.message.includes('406'))) {
        setNextAvailableSlot({ time: "09:00", available: true });
        setLoading(false);
        return;
      }

      if (allAppointments) {
        const occupiedTimes = allAppointments.map(apt => {
          const date = new Date(apt.scheduled_date);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return `${hours}:${minutes}`;
        });

        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        const nextSlot = businessHours.find(time => {
          const [hours, minutes] = time.split(':').map(Number);
          const slotTimeInMinutes = hours * 60 + minutes;
          
          return slotTimeInMinutes > currentTimeInMinutes && !occupiedTimes.includes(time);
        });

        if (nextSlot) {
          setNextAvailableSlot({ time: nextSlot, available: true });
        } else {
          setNextAvailableSlot({ time: "Amanhã, 09:00", available: true });
        }
      }

      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar dados ao vivo:", err);
      setCurrentAppointment(null);
      setProfessionalStatus('available');
      setNextAvailableSlot({ time: "09:00", available: true });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();

    const interval = setInterval(() => {
      fetchLiveData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const openBookingModal = () => {
    if (typeof (window as any).openBookingModal === 'function') {
      (window as any).openBookingModal();
    } else {
      window.dispatchEvent(new CustomEvent('openBooking'));
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeRemaining = (dateString: string) => {
    const scheduledDate = new Date(dateString);
    const now = new Date();
    const diff = scheduledDate.getTime() - now.getTime();
    
    if (diff < 0) {
      const elapsed = Math.abs(diff);
      const minutesElapsed = Math.floor(elapsed / 60000);
      return `Em andamento • ${minutesElapsed} min`;
    } else {
      const minutesUntil = Math.floor(diff / 60000);
      if (minutesUntil < 60) {
        return `Começa em ${minutesUntil} min`;
      } else {
        const hours = Math.floor(minutesUntil / 60);
        return `Começa em ${hours}h ${minutesUntil % 60}min`;
      }
    }
  };

  return (
    // [CORREÇÃO 2.4.1] Adicionado id="main-content" para o link "Pular para o conteúdo"
    <section id="main-content" className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10" aria-hidden="true">
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
              <div className="flex" aria-label="Avaliação 5 estrelas">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 fill-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-slate-200 font-semibold text-sm sm:text-base">
                4.9/5 • 500+ clientes satisfeitos
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Estilo{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Premium
              </span>
              <br />
              <span className="text-white">para Homens</span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-lg">
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
                  <span className="text-slate-100 font-semibold text-sm sm:text-base">
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
                {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                <div className="text-xs sm:text-sm text-slate-200">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-400">8</div>
                {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                <div className="text-xs sm:text-sm text-slate-200">Anos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-400">98%</div>
                {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                <div className="text-xs sm:text-sm text-slate-200">Satisfação</div>
              </div>
            </div>
          </div>

          {/* Right Column - Live Booking Preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-slate-800 border-2 border-amber-500/30 rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl shadow-amber-500/10 hover:border-amber-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {currentAppointment?.status === 'in_progress' ? '🔥 Ao Vivo' : '⏳ Acompanhar Corte'}
                </h3>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${professionalStatus === 'busy' ? 'bg-orange-400 animate-pulse' : 'bg-green-400 animate-pulse'}`}></div>
                  <span className={`text-xs font-medium ${professionalStatus === 'busy' ? 'text-orange-400' : 'text-green-400'}`}>
                    {professionalStatus === 'busy' ? 'Em atendimento' : 'Disponível'}
                  </span>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {currentAppointment ? (
                    <>
                      {currentAppointment.status === 'in_progress' && (
                        <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-xl">
                          <div className="flex items-center space-x-2">
                            <Activity className="h-5 w-5 text-orange-400 animate-pulse" />
                            <span className="text-orange-400 font-bold text-sm">
                              {getTimeRemaining(currentAppointment.scheduled_date)}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-3 sm:p-4 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-amber-500/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                          <div className="text-xs sm:text-sm text-slate-200">
                            {currentAppointment.status === 'in_progress' ? 'Serviço em Andamento' : 'Próximo Serviço'}
                          </div>
                          {currentAppointment.status === 'scheduled' && (
                            <div className="text-xs text-amber-400 font-bold">
                              {formatTime(currentAppointment.scheduled_date)}
                            </div>
                          )}
                        </div>
                        <div className="font-bold text-white text-sm sm:text-base mb-1">{currentAppointment.service_type}</div>
                        <div className="text-amber-400 font-bold text-lg sm:text-xl">R$ {currentAppointment.price.toFixed(2)}</div>
                      </div>
                      
                      <div className="p-3 sm:p-4 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-amber-500/50 transition-colors">
                        {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                        <div className="text-xs sm:text-sm text-slate-200 mb-1">Profissional</div>
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-white text-sm sm:text-base">{currentAppointment.professional.full_name}</div>
                          {professionalStatus === 'busy' ? (
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-xs font-bold">
                              <Activity className="h-3 w-3 mr-1" />
                              Ocupado
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Disponível
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600 text-center">
                      <UserCheck className="h-12 w-12 mx-auto mb-3 text-green-400" />
                      <p className="text-white font-bold mb-1">Profissional Disponível</p>
                      {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                      <p className="text-sm text-slate-200">Nenhum atendimento agendado no momento</p>
                    </div>
                  )}
                  
                  {nextAvailableSlot && (
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
                      <div className="text-xs sm:text-sm text-green-400 mb-1 font-bold">Próximo Horário Livre</div>
                      <div className="font-bold text-white flex items-center text-base sm:text-lg">
                        <Clock className="h-5 w-5 mr-2 text-green-400" />
                        Hoje, {nextAvailableSlot.time}
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={openBookingModal}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center font-bold text-sm sm:text-base active:scale-95"
                  >
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Reservar Horário
                  </button>

                  {/* [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-300 */}
                  <p className="text-xs text-slate-300 text-center">
                    🔒 Agendamento seguro e rápido • Atualizado em tempo real
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {nextAvailableSlot && (
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 hidden lg:block animate-bounce">
          <div className="bg-amber-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
            ⚡ Próximo horário: {nextAvailableSlot.time}
          </div>
        </div>
      )}
    </section>
  );
};