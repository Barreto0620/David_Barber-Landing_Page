import { useState } from "react";
import { Menu, X, Calendar, Phone, User, LogOut, ChevronRight, Check, Clock, Star } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Simular autenticação - substituir com useAuth real
  const user = null;
  const profile = null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const smoothScrollTo = (id: string) => {
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
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Clicável */}
            <div 
              className="flex-shrink-0 cursor-pointer group" 
              onClick={scrollToTop}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                David Barber
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => smoothScrollTo('home')}
                  className="text-white hover:text-amber-400 transition-colors duration-300 font-medium"
                >
                  Início
                </button>
                <button
                  onClick={() => smoothScrollTo('services')}
                  className="text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium"
                >
                  Serviços
                </button>
                <button
                  onClick={() => smoothScrollTo('team')}
                  className="text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium"
                >
                  Equipe
                </button>
                <button
                  onClick={() => smoothScrollTo('contact')}
                  className="text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium"
                >
                  Contato
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 border-2 border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center text-sm font-medium">
                <Phone className="h-4 w-4 mr-2" />
                (11) 9999-9999
              </button>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border-2 border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center text-sm">
                    <User className="h-4 w-4 mr-2" />
                    Minha Conta
                  </button>
                  <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={openBooking}
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex items-center font-medium"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Reservar Agora
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 text-white hover:text-amber-400 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800 rounded-lg mt-2 border border-slate-700">
                <button
                  onClick={() => smoothScrollTo('home')}
                  className="block w-full text-left px-3 py-2 text-white hover:text-amber-400 transition-colors duration-300 font-medium"
                >
                  Início
                </button>
                <button
                  onClick={() => smoothScrollTo('services')}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium"
                >
                  Serviços
                </button>
                <button
                  onClick={() => smoothScrollTo('team')}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium"
                >
                  Equipe
                </button>
                <button
                  onClick={() => smoothScrollTo('contact')}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium"
                >
                  Contato
                </button>
                <div className="flex flex-col space-y-2 pt-2">
                  <button className="px-4 py-2 border-2 border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center text-sm">
                    <Phone className="h-4 w-4 mr-2" />
                    (11) 9999-9999
                  </button>
                  <button 
                    onClick={() => {
                      openBooking();
                      toggleMenu();
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center font-medium"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Reservar Agora
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Modal de Reserva */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </>
  );
};

// Modal de Reserva Profissional - 3 Etapas
const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const steps = [
    { number: 1, title: "Serviço", completed: step > 1 },
    { number: 2, title: "Data & Hora", completed: step > 2 },
    { number: 3, title: "Confirmação", completed: step > 3 }
  ];

  // Dados simulados - substituir com dados do Supabase
  const services = [
    { id: 1, name: "Corte Clássico", price: 45, duration: "30 min", icon: "✂️", popular: false },
    { id: 2, name: "Corte + Barba", price: 85, duration: "50 min", icon: "👨", popular: true },
    { id: 3, name: "Barba Completa", price: 55, duration: "35 min", icon: "🪒", popular: false },
    { id: 4, name: "Corte Premium", price: 75, duration: "60 min", icon: "⭐", popular: false },
  ];

  const professionals = [
    { id: 1, name: "Carlos Silva", role: "Barbeiro Master", rating: 4.9, available: true, nextSlot: "Hoje, 15:30" }
  ];

  const availableTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

  const handleSubmit = async () => {
    if (!customerName || !customerPhone) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setIsSubmitting(true);
    
    // Simular envio ao Supabase
    setTimeout(() => {
      console.log({
        service: selectedService,
        professional: selectedProfessional,
        date: selectedDate,
        time: selectedTime,
        customer: { name: customerName, phone: customerPhone }
      });
      
      setIsSubmitting(false);
      alert("✅ Reserva confirmada com sucesso! Você receberá uma confirmação por SMS.");
      resetAndClose();
    }, 2000);
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700">
        {/* Header com Gradient */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Agende seu Horário</h2>
            <button 
              onClick={resetAndClose} 
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    step >= s.number 
                      ? 'bg-white text-orange-600 shadow-lg' 
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {s.completed ? <Check className="h-6 w-6" /> : s.number}
                  </div>
                  <span className="text-xs mt-2 font-medium hidden sm:block">{s.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                    step > s.number ? 'bg-white' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          {/* Step 1: Escolher Serviço */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Escolha o Serviço</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      setStep(2);
                    }}
                    className={`text-left p-6 border-2 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                      selectedService?.id === service.id
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-slate-700 hover:border-amber-500 hover:bg-slate-800'
                    }`}
                  >
                    {service.popular && (
                      <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                        Popular
                      </span>
                    )}
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {service.name}
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-amber-400">
                        R$ {service.price}
                      </span>
                      <span className="text-sm text-slate-400 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.duration}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Escolher Data, Hora e Profissional */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Profissional</h3>
                <div className="grid grid-cols-1 gap-4">
                  {professionals.map((pro) => (
                    <button
                      key={pro.id}
                      onClick={() => setSelectedProfessional(pro)}
                      className={`text-left p-4 border-2 rounded-xl transition-all duration-300 ${
                        selectedProfessional?.id === pro.id
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-slate-700 hover:border-amber-500 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-white text-lg">{pro.name}</h4>
                          <p className="text-sm text-slate-400">{pro.role}</p>
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                            <span className="text-sm font-medium text-amber-400">{pro.rating}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          pro.available 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          {pro.available ? '✓ Disponível' : 'Ocupado'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Escolha a Data</h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-white focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Horários Disponíveis</h3>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 border-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedTime === time
                          ? 'border-amber-500 bg-amber-500 text-white'
                          : 'border-slate-700 text-slate-300 hover:border-amber-500 hover:bg-slate-800'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmação e Dados do Cliente */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Confirme sua Reserva</h3>
              
              {/* Resumo da Reserva */}
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-slate-400">Serviço</span>
                    <p className="font-bold text-white text-lg">{selectedService?.name}</p>
                  </div>
                  <span className="text-2xl font-bold text-amber-400">
                    R$ {selectedService?.price}
                  </span>
                </div>
                
                <div className="border-t border-slate-700 pt-4">
                  <span className="text-sm text-slate-400">Profissional</span>
                  <p className="font-bold text-white">{selectedProfessional?.name}</p>
                  <p className="text-sm text-slate-400">{selectedProfessional?.role}</p>
                </div>
                
                <div className="border-t border-slate-700 pt-4">
                  <span className="text-sm text-slate-400">Data e Horário</span>
                  <p className="font-bold text-white">
                    {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : ''} às {selectedTime}
                  </p>
                </div>
              </div>

              {/* Dados do Cliente */}
              <div className="space-y-4">
                <h4 className="font-bold text-white">Seus Dados</h4>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Telefone (WhatsApp)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Avisos Importantes */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-amber-200 space-y-1">
                  <span className="block">✓ Você receberá confirmação por SMS e email</span>
                  <span className="block">✓ Chegue 5 minutos antes do horário</span>
                  <span className="block">✓ Cancelamento gratuito até 2h antes</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer com Botões */}
        <div className="border-t border-slate-700 p-6 flex justify-between bg-slate-800/50">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : resetAndClose()}
            className="px-6 py-2 border-2 border-slate-600 text-slate-300 rounded-lg hover:border-amber-500 hover:text-amber-400 transition-all duration-300 font-medium"
          >
            {step === 1 ? 'Cancelar' : 'Voltar'}
          </button>
          
          {step === 3 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !customerName || !customerPhone}
              className="px-8 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Confirmando...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
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
              className="px-8 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              Próximo
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};