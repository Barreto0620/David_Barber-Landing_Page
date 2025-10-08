import { useState, useEffect } from "react";
import { Menu, X, Calendar, Phone, User, LogOut, ChevronRight, Check, Clock, Star } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const user = null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  // Expor função globalmente para outros componentes
  useEffect(() => {
    // Função global para abrir o modal de qualquer lugar
    (window as any).openBookingModal = () => {
      console.log('Modal de reserva sendo aberto!');
      setIsBookingOpen(true);
    };

    // Também escutar evento customizado
    const handleOpenBooking = () => {
      console.log('Evento openBooking recebido!');
      setIsBookingOpen(true);
    };
    
    window.addEventListener('openBooking', handleOpenBooking);
    
    return () => {
      window.removeEventListener('openBooking', handleOpenBooking);
      delete (window as any).openBookingModal;
    };
  }, []);

  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <nav className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div 
              className="flex-shrink-0 cursor-pointer group" 
              onClick={scrollToTop}
            >
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                David Barber
              </h1>
            </div>

            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-6 xl:space-x-8">
                <button onClick={() => smoothScrollTo('home')} className="text-white hover:text-amber-400 transition-colors duration-300 font-medium text-sm xl:text-base">
                  Início
                </button>
                <button onClick={() => smoothScrollTo('services')} className="text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium text-sm xl:text-base">
                  Serviços
                </button>
                <button onClick={() => smoothScrollTo('team')} className="text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium text-sm xl:text-base">
                  Equipe
                </button>
                <button onClick={() => smoothScrollTo('contact')} className="text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium text-sm xl:text-base">
                  Contato
                </button>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              <button className="px-3 xl:px-4 py-2 border-2 border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center text-xs xl:text-sm font-medium whitespace-nowrap">
                <Phone className="h-3 w-3 xl:h-4 xl:w-4 mr-1 xl:mr-2" />
                <span className="hidden xl:inline">(11) 9999-9999</span>
                <span className="xl:hidden">Ligar</span>
              </button>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <button className="px-3 xl:px-4 py-2 border-2 border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center text-xs xl:text-sm">
                    <User className="h-3 w-3 xl:h-4 xl:w-4 mr-1 xl:mr-2" />
                    Conta
                  </button>
                  <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={openBooking}
                  className="px-4 xl:px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex items-center font-medium text-xs xl:text-sm whitespace-nowrap"
                >
                  <Calendar className="h-3 w-3 xl:h-4 xl:w-4 mr-1 xl:mr-2" />
                  Reservar
                </button>
              )}
            </div>

            <div className="lg:hidden flex items-center space-x-2">
              <button 
                onClick={openBooking}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg flex items-center font-medium text-xs"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Agendar
              </button>
              <button onClick={toggleMenu} className="p-2 text-white hover:text-amber-400 transition-colors">
                {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden pb-3">
              <div className="space-y-1 bg-slate-800 rounded-lg p-3 border border-slate-700">
                <button onClick={() => smoothScrollTo('home')} className="block w-full text-left px-3 py-2.5 text-white hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all duration-300 font-medium text-sm">
                  Início
                </button>
                <button onClick={() => smoothScrollTo('services')} className="block w-full text-left px-3 py-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all duration-300 font-medium text-sm">
                  Serviços
                </button>
                <button onClick={() => smoothScrollTo('team')} className="block w-full text-left px-3 py-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all duration-300 font-medium text-sm">
                  Equipe
                </button>
                <button onClick={() => smoothScrollTo('contact')} className="block w-full text-left px-3 py-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all duration-300 font-medium text-sm">
                  Contato
                </button>
                <div className="pt-2 border-t border-slate-700 mt-2">
                  <button className="w-full px-4 py-2.5 border-2 border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center text-sm font-medium">
                    <Phone className="h-4 w-4 mr-2" />
                    (11) 9999-9999
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </>
  );
};

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const steps = [
    { number: 1, title: "Serviço", completed: step > 1 },
    { number: 2, title: "Agendamento", completed: step > 2 },
    { number: 3, title: "Dados", completed: step > 3 }
  ];

  const services = [
    { id: 1, name: "Corte Clássico", price: 45, duration: "30 min", icon: "✂️", popular: false, desc: "Corte tradicional com acabamento" },
    { id: 2, name: "Corte + Barba", price: 85, duration: "50 min", icon: "👨", popular: true, desc: "Combo completo" },
    { id: 3, name: "Barba Completa", price: 55, duration: "35 min", icon: "🪒", popular: false, desc: "Aparar e modelar barba" },
    { id: 4, name: "Corte Premium", price: 75, duration: "60 min", icon: "⭐", popular: false, desc: "Corte + tratamento capilar" },
  ];

  const professionals = [
    { id: 1, name: "Carlos Silva", role: "Barbeiro Master", rating: 4.9, available: true }
  ];

  const availableTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

  const handleSubmit = () => {
    if (!customerName || !customerPhone) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("✅ Reserva confirmada!");
      resetAndClose();
    }, 1500);
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTime("");
    setCustomerName("");
    setCustomerPhone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[95vh] sm:max-h-[92vh] overflow-hidden border-t-4 sm:border-t-0 sm:border border-amber-500 sm:border-slate-700 flex flex-col">
        
        {/* Header Fixo */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 sm:p-5 md:p-6 text-white flex-shrink-0">
          <div className="flex justify-between items-center mb-4 sm:mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Agendar Horário</h2>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">Passo {step} de 3</p>
            </div>
            <button onClick={resetAndClose} className="hover:bg-white/20 p-2 rounded-full transition-colors active:scale-95">
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
          
          {/* Progress Bar Moderno */}
          <div className="flex items-center gap-2">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center w-full">
                  <div className={`w-full h-1.5 sm:h-2 rounded-full transition-all duration-500 ${step >= s.number ? 'bg-white' : 'bg-white/30'}`} />
                  <span className="text-[10px] sm:text-xs mt-1.5 font-medium text-center">{s.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content com Scroll */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-4 sm:p-5 md:p-6">
            
            {/* STEP 1: Serviços com Cards Otimizados */}
            {step === 1 && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-white">Escolha seu Serviço</h3>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setTimeout(() => setStep(2), 300);
                      }}
                      className={`relative text-left p-4 sm:p-5 border-2 rounded-2xl transition-all duration-300 active:scale-95 ${
                        selectedService?.id === service.id
                          ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                          : 'border-slate-700 hover:border-amber-400 hover:bg-slate-800 active:border-amber-500'
                      }`}
                    >
                      {service.popular && (
                        <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                          🔥 Popular
                        </div>
                      )}
                      <div className="text-3xl sm:text-4xl mb-2">{service.icon}</div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-1">{service.name}</h4>
                      <p className="text-xs text-slate-400 mb-3">{service.desc}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl sm:text-2xl font-bold text-amber-400">R$ {service.price}</span>
                        <span className="text-xs sm:text-sm text-slate-400 flex items-center bg-slate-800 px-2 py-1 rounded-full">
                          <Clock className="h-3 w-3 mr-1" />
                          {service.duration}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Data e Hora Otimizados */}
            {step === 2 && (
              <div className="space-y-4 sm:space-y-5">
                
                {/* Profissional Card Compacto */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Profissional</h3>
                  {professionals.map((pro) => (
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
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl sm:text-2xl">
                            👨‍💼
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm sm:text-base">{pro.name}</h4>
                            <p className="text-xs text-slate-400">{pro.role}</p>
                            <div className="flex items-center mt-1">
                              <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-1" />
                              <span className="text-xs font-medium text-amber-400">{pro.rating}</span>
                            </div>
                          </div>
                        </div>
                        <span className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                          Disponível
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Data com estilo melhorado */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Data</h3>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 sm:p-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white text-sm sm:text-base focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>

                {/* Horários em Grid Responsivo */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Horário</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2.5 sm:p-3 border-2 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 ${
                          selectedTime === time
                            ? 'border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                            : 'border-slate-700 text-slate-300 hover:border-amber-400 hover:bg-slate-800'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Confirmação Otimizada */}
            {step === 3 && (
              <div className="space-y-4 sm:space-y-5">
                
                {/* Resumo Visual */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-700 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-xs text-slate-400 uppercase tracking-wide">Serviço Selecionado</span>
                      <p className="font-bold text-white text-lg sm:text-xl mt-1">{selectedService?.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{selectedService?.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-bold text-amber-400">R$ {selectedService?.price}</span>
                      <p className="text-xs text-slate-400 mt-1">{selectedService?.duration}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700">
                    <div>
                      <span className="text-xs text-slate-400">Profissional</span>
                      <p className="font-semibold text-white text-sm">{selectedProfessional?.name}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Data</span>
                      <p className="font-semibold text-white text-sm">
                        {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : ''} - {selectedTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Formulário Otimizado */}
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-base sm:text-lg">Complete seus dados</h4>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3 sm:p-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm sm:text-base"
                  />
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-3 sm:p-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm sm:text-base"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-amber-500/10 border border-amber-500/30 p-3 sm:p-4 rounded-xl">
                  <div className="flex items-start space-x-2">
                    <div className="text-amber-400 text-lg">ℹ️</div>
                    <div className="text-xs sm:text-sm text-amber-200 space-y-1">
                      <p>✓ Confirmação por SMS/WhatsApp</p>
                      <p>✓ Cancele até 2h antes</p>
                      <p>✓ Chegue 5min antes</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Fixo */}
        <div className="border-t border-slate-700 p-4 sm:p-5 bg-slate-900/95 backdrop-blur flex-shrink-0">
          <div className="flex gap-3">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : resetAndClose()}
              className="flex-1 sm:flex-none sm:px-6 py-3 border-2 border-slate-600 text-slate-300 rounded-xl hover:border-amber-500 hover:text-amber-400 transition-all duration-300 font-semibold text-sm sm:text-base active:scale-95"
            >
              {step === 1 ? 'Cancelar' : 'Voltar'}
            </button>
            
            {step === 3 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !customerName || !customerPhone}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-bold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Confirmando...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Confirmar Reserva
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  if (step === 1 && selectedService) setStep(2);
                  if (step === 2 && selectedProfessional && selectedDate && selectedTime) setStep(3);
                }}
                disabled={
                  (step === 1 && !selectedService) ||
                  (step === 2 && (!selectedProfessional || !selectedDate || !selectedTime))
                }
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-bold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-95"
              >
                Continuar
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};