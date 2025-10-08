import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { Menu, X, Calendar, Phone, User, LogOut, ChevronRight, Check, Clock, Star, AlertCircle } from "lucide-react";

// ====================================================================================
// TIPAGENS
// ====================================================================================

interface Service {
    id: number;
    name: string;
    price: number;
    duration_minutes: number;
    description: string;
}

interface Professional {
    id: string; // UUID
    full_name: string;
}

// ====================================================================================
// COMPONENTE: SUCCESS TOAST
// ====================================================================================

interface SuccessToastProps {
    message: string | null;
    setMessage: (msg: string | null) => void;
}

const SuccessToast = ({ message, setMessage }: SuccessToastProps) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000); // 3 segundos para visualização
            return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    if (!message) return null;

    return (
        // Animação CSS 'bounce-in-down' deve ser adicionada ao seu arquivo de estilos global
        <div 
            className="fixed top-0 inset-x-0 z-[60] flex justify-center p-4 transition-all duration-500 ease-out"
            // Se estiver usando Tailwind, adicione a classe de animação aqui
            // Ex: className="... animate-bounce-in-down"
        >
            <style jsx global>{`
                @keyframes bounce-in-down {
                  0% { transform: translateY(-100px); opacity: 0; }
                  100% { transform: translateY(0); opacity: 1; }
                }
                .animate-toast-in {
                  animation: bounce-in-down 0.5s ease-out forwards;
                }
            `}</style>
            <div className="flex items-center space-x-3 bg-green-600 shadow-xl shadow-green-500/50 text-white p-4 rounded-lg sm:max-w-md w-full animate-toast-in">
                <Check className="h-6 w-6 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">{message}</span>
                <button onClick={() => setMessage(null)} className="ml-auto p-1 hover:bg-white/20 rounded-full transition-colors">
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

// ====================================================================================
// COMPONENTE PRINCIPAL: HEADER
// ====================================================================================

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State para o Toast

    const user = null; 

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const openBooking = () => setIsBookingOpen(true);
    const closeBooking = () => setIsBookingOpen(false);

    useEffect(() => {
        (window as any).openBookingModal = () => setIsBookingOpen(true);
        const handleOpenBooking = () => setIsBookingOpen(true);
        window.addEventListener('openBooking', handleOpenBooking);
        
        return () => {
            window.removeEventListener('openBooking', handleOpenBooking);
            delete (window as any).openBookingModal;
        };
    }, []);

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

            <BookingModal isOpen={isBookingOpen} onClose={closeBooking} setSuccessMessage={setSuccessMessage} />
            <SuccessToast message={successMessage} setMessage={setSuccessMessage} /> {/* TOAST DE SUCESSO */}
        </>
    );
};

// ====================================================================================
// COMPONENTE: PROFESSIONAL SELECTOR
// ====================================================================================

interface ProfessionalSelectorProps {
    professionals: Professional[];
    selectedProfessional: Professional | null;
    setSelectedProfessional: (pro: Professional) => void;
}

const ProfessionalSelector = ({ professionals, selectedProfessional, setSelectedProfessional }: ProfessionalSelectorProps) => {
    
    // Define o profissional por padrão se for o único.
    useEffect(() => {
        if (!selectedProfessional && professionals.length === 1) {
            setSelectedProfessional(professionals[0]);
        }
    }, [professionals, selectedProfessional, setSelectedProfessional]);
    
    // Procura o profissional principal para destaque (ou o primeiro da lista)
    const davidSousa = professionals.find(p => p.full_name.toLowerCase().includes('david sousa')) || professionals[0];
    const isSingleProfessional = professionals.length === 1 && !!davidSousa;

    return (
        <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Profissional</h3>
            {professionals.length > 0 ? (
                isSingleProfessional && davidSousa ? (
                    <div 
                        className="w-full text-left p-4 border-2 rounded-xl bg-amber-500/10 border-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/20"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl sm:text-2xl font-bold text-white">DS</div>
                                <div>
                                    <h4 className="font-bold text-white text-base sm:text-lg">{davidSousa.full_name}</h4>
                                    <p className="text-xs text-amber-400 flex items-center">
                                        <Star className="h-3 w-3 mr-1 fill-amber-400"/>
                                        Barbeiro Principal
                                    </p>
                                </div>
                            </div>
                            <Check className="h-6 w-6 text-amber-500" />
                        </div>
                    </div>
                ) : (
                    professionals.map((pro) => (
                        <button key={pro.id} onClick={() => setSelectedProfessional(pro)} className={`w-full text-left p-4 border-2 rounded-xl transition-all duration-300 ${selectedProfessional?.id === pro.id ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 hover:border-amber-500 hover:bg-slate-800'}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-700 flex items-center justify-center text-xl sm:text-2xl">👨‍💼</div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm sm:text-base">{pro.full_name}</h4>
                                        <p className="text-xs text-slate-400">Barbeiro</p>
                                    </div>
                                </div>
                                {selectedProfessional?.id === pro.id && <Check className="h-5 w-5 text-amber-500" />}
                            </div>
                        </button>
                    ))
                )
            ) : (
                <div className="text-center p-4 bg-slate-800 rounded-xl text-slate-400">
                    Nenhum profissional encontrado. Verifique o RLS e o campo 'role' no Supabase.
                </div>
            )}
        </div>
    );
};


// ====================================================================================
// COMPONENTE: DATE SELECTOR (CALENDÁRIO ESTILIZADO)
// ====================================================================================

interface DateSelectorProps {
    selectedDate: string; // Formato YYYY-MM-DD
    setSelectedDate: (date: string) => void;
}

const DateSelector = ({ selectedDate, setSelectedDate }: DateSelectorProps) => {
    const today = useMemo(() => new Date(), []);
    const [viewDate, setViewDate] = useState(today); 

    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const lastDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    const startDayIndex = firstDayOfMonth.getDay(); 

    const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    const getCalendarDays = useCallback(() => {
        const days = [];
        const isCurrentMonth = viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear();

        // Dias vazios no início
        for (let i = 0; i < startDayIndex; i++) {
            days.push({ day: null, isCurrentMonth: false, isSelectable: false });
        }

        // Dias do mês
        for (let d = 1; d <= totalDays; d++) {
            const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
            const dateString = date.toISOString().split('T')[0];
            
            // O dia é selecionável se for hoje ou no futuro (sem hora)
            const isSelectable = date.getTime() >= today.setHours(0, 0, 0, 0);

            days.push({
                day: d,
                dateString: dateString,
                isCurrentMonth: true,
                isSelectable: isSelectable,
                isSelected: selectedDate === dateString,
                isToday: isCurrentMonth && d === today.getDate(),
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            });
        }

        return days;
    }, [viewDate, today, totalDays, startDayIndex, selectedDate]);

    const calendarDays = getCalendarDays();

    const handleMonthChange = (direction: 'prev' | 'next') => {
        setViewDate(prevDate => {
            const newDate = new Date(prevDate.getTime());
            newDate.setMonth(prevDate.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };
    
    const monthYearFormat = viewDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    return (
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl">
            {/* Header: Mês/Ano e Navegação */}
            <div className="flex items-center justify-between mb-4">
                <button 
                    onClick={() => handleMonthChange('prev')} 
                    // Desabilita a navegação para meses passados
                    disabled={viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear()}
                    className="p-2 text-slate-400 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight className="h-5 w-5 rotate-180" />
                </button>
                <span className="text-white font-bold text-lg capitalize">
                    {monthYearFormat.replace(/ de /g, ' ')}
                </span>
                <button 
                    onClick={() => handleMonthChange('next')} 
                    className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* Dias da Semana */}
            <div className="grid grid-cols-7 text-center font-semibold text-sm text-slate-400 mb-2">
                {dayNames.map((day, index) => (
                    <span key={index} className={day === 'D' ? 'text-red-400' : ''}>{day}</span>
                ))}
            </div>

            {/* Dias do Calendário */}
            <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((dayData, index) => (
                    <button
                        key={index}
                        onClick={() => dayData.day && setSelectedDate(dayData.dateString)}
                        disabled={!dayData.isSelectable}
                        className={`
                            h-10 w-full flex items-center justify-center rounded-full font-semibold text-sm transition-all duration-200
                            ${!dayData.day || !dayData.isSelectable ? 'text-slate-600 cursor-default' : ''}
                            ${dayData.isSelectable ? 'hover:bg-amber-500/10 hover:text-amber-400' : ''}
                            ${dayData.isSelected ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' : ''}
                            ${dayData.isToday && !dayData.isSelected ? 'border-2 border-amber-500 text-amber-400' : ''}
                            ${dayData.isWeekend && !dayData.isSelected ? 'text-red-300' : 'text-white'}
                            ${!dayData.day ? 'invisible' : ''}
                        `}
                    >
                        {dayData.day}
                    </button>
                ))}
            </div>
        </div>
    );
};


// ====================================================================================
// COMPONENTE: BOOKING MODAL
// ====================================================================================

export const BookingModal = ({ isOpen, onClose, setSuccessMessage }: { isOpen: boolean; onClose: () => void; setSuccessMessage: (msg: string | null) => void }) => {
    // Estados do formulário
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    
    // Estados de controle
    const [services, setServices] = useState<Service[]>([]);
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Busca os dados 
    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    // Busca de Serviços
                    const { data: servicesData, error: servicesError } = await supabase
                        .from('services')
                        .select('*')
                        .eq('active', true);
                    if (servicesError) throw servicesError;
                    setServices(servicesData || []);

                    // Busca de Profissionais (RLS Corrigido)
                    const { data: professionalsData, error: professionalsError } = await supabase
                        .from('user_profiles') 
                        .select('id, full_name') 
                        .in('role', ['barber', 'admin']); // Filtro para garantir que o David Sousa apareça

                    if (professionalsError) {
                        throw new Error(`Erro ao buscar profissionais: ${professionalsError.message}. Verifique o RLS da tabela 'user_profiles'.`);
                    }
                    
                    const proList: Professional[] = professionalsData || [];
                    setProfessionals(proList);
                    
                    if (proList.length === 1 && !selectedProfessional) {
                        setSelectedProfessional(proList[0]);
                    }

                } catch (err: any) {
                    setError(err.message.includes('RLS') ? err.message : "Falha ao carregar os dados. Verifique sua conexão com o Supabase e as permissões.");
                    console.error("Erro ao buscar dados do Supabase:", err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [isOpen, selectedProfessional]); 

    if (!isOpen) return null;

    // Horários de exemplo 
    const availableTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

    const handleSubmit = async () => {
        if (!customerName || !customerPhone || !selectedService || !selectedProfessional || !selectedDate || !selectedTime) {
            setError("Por favor, preencha todas as informações.");
            return;
        }
        
        setIsSubmitting(true);
        setError(null);

        try {
            // Passo 1: Upsert do Cliente (Verifica se existe e insere se não)
            let client_id;
            const { data: existingClient, error: selectError } = await supabase
              .from('clients')
              .select('id')
              .eq('phone', customerPhone)
              .single();

            if (selectError && selectError.code !== 'PGRST116') { // PGRST116 = No rows found
                if (selectError.message.includes('406')) {
                    throw new Error("Falha ao verificar cliente. Permissão de SELECT na tabela 'clients' negada (RLS).");
                }
            }
            
            if (existingClient) {
              client_id = existingClient.id; // Usa ID existente
            } else {
              const { data: newClient, error: clientError } = await supabase
                .from('clients')
                .insert({ name: customerName, phone: customerPhone })
                .select('id')
                .single();
              if (clientError) {
                if (clientError.message.includes('401') || clientError.message.includes('violates row-level security policy')) {
                    throw new Error("Falha ao cadastrar cliente. Permissão de INSERT na tabela 'clients' negada (RLS).");
                }
                throw clientError;
              }
              client_id = newClient.id; // Usa novo ID
            }

            // Passo 2: Inserir o agendamento
            const scheduled_date = new Date(`${selectedDate}T${selectedTime}:00`).toISOString();
            
            const appointmentData = {
                client_id: client_id,
                professional_id: selectedProfessional.id, 
                scheduled_date: scheduled_date,
                service_type: selectedService.name, 
                price: selectedService.price,
                status: 'scheduled', 
                created_via: 'manual', // CORREÇÃO FINAL para se adequar ao 'CHECK constraint'
                notes: `Agendado com ${selectedProfessional.full_name}.`,
            };

            const { error: appointmentError } = await supabase
              .from('appointments')
              .insert(appointmentData);

            if (appointmentError) {
                if (appointmentError.message.includes('violates check constraint')) {
                     throw new Error(`Erro de dados: O valor 'manual' pode estar incorreto para 'created_via'. Verifique os valores permitidos no Supabase.`);
                }
                throw appointmentError;
            }

            // Sucesso! Atualiza a mensagem e fecha o modal
            setSuccessMessage(`Agendamento de ${selectedService.name} confirmado para ${selectedDate} às ${selectedTime}!`);
            
            setTimeout(() => {
                resetAndClose();
                setSuccessMessage(null);
            }, 3000); // 3 segundos para o Toast

        } catch (err: any) {
            setError(err.message);
            console.error("Erro no Agendamento:", err.message);
            setIsSubmitting(false); // Garante que o botão de envio seja reativado em caso de erro
        }
    };

    const resetAndClose = () => {
        setStep(1);
        setSelectedService(null);
        setSelectedProfessional(null);
        setSelectedDate("");
        setSelectedTime("");
        setCustomerName("");
        setCustomerPhone("");
        setError(null);
        onClose();
    };


    const renderLoading = () => (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
        </div>
    );

    const renderError = () => (
        <div className="flex flex-col justify-center items-center h-64 text-center text-red-400 bg-red-500/10 p-4 rounded-lg">
            <AlertCircle className="h-10 w-10 mb-3"/>
            <p className="font-semibold">Erro: {error}</p>
        </div>
    );


    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[95vh] sm:max-h-[92vh] overflow-hidden border-t-4 sm:border-t-0 sm:border border-amber-500 sm:border-slate-700 flex flex-col">
                
                {/* Header Fixo do Modal */}
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
                    <div className="flex items-center gap-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center flex-1">
                        <div className="flex flex-col items-center w-full">
                            <div className={`w-full h-1.5 sm:h-2 rounded-full transition-all duration-500 ${step >= s ? 'bg-white' : 'bg-white/30'}`} />
                            <span className="text-[10px] sm:text-xs mt-1.5 font-medium text-center">{['Serviço', 'Agendamento', 'Dados'][s-1]}</span>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Content com Scroll */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    <div className="p-4 sm:p-5 md:p-6">
                        {loading && renderLoading()}
                        {error && !loading && renderError()}
                        {!loading && !error && (
                            <>
                                {/* STEP 1: Serviços */}
                                {step === 1 && (
                                    <div className="space-y-3 sm:space-y-4">
                                        <h3 className="text-lg sm:text-xl font-bold text-white">Escolha seu Serviço</h3>
                                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                                            {services.map((service) => (
                                                <button key={service.id} onClick={() => { setSelectedService(service); setTimeout(() => setStep(2), 250); }} className={`relative text-left p-4 sm:p-5 border-2 rounded-2xl transition-all duration-300 active:scale-95 ${selectedService?.id === service.id ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20' : 'border-slate-700 hover:border-amber-400 hover:bg-slate-800'}`}>
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
                                )}
                                
                                {/* STEP 2: Data e Hora */}
                                {step === 2 && (
                                    <div className="space-y-4 sm:space-y-5">
                                        {/* 1. Seleção do Profissional */}
                                        <ProfessionalSelector 
                                            professionals={professionals}
                                            selectedProfessional={selectedProfessional}
                                            setSelectedProfessional={setSelectedProfessional}
                                        />

                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Data</h3>
                                        {/* 2. Seleção de Data (Calendário Estilizado) */}
                                        <DateSelector 
                                            selectedDate={selectedDate}
                                            setSelectedDate={setSelectedDate}
                                        />

                                        {/* 3. Seleção de Horário */}
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 mt-5">Horário</h3>
                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                                                {availableTimes.map((time) => (
                                                    <button 
                                                        key={time} 
                                                        onClick={() => setSelectedTime(time)} 
                                                        disabled={!selectedDate}
                                                        className={`
                                                            p-2.5 sm:p-3 border-2 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95
                                                            ${!selectedDate ? 'opacity-50 cursor-not-allowed bg-slate-800 border-slate-700 text-slate-500' : ''}
                                                            ${selectedTime === time && selectedDate ? 'border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 
                                                            selectedDate ? 'border-slate-700 text-slate-300 hover:border-amber-400 hover:bg-slate-800' : ''}
                                                        `}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                            {!selectedDate && <p className="text-sm text-slate-500 mt-2">Selecione uma data para ver os horários disponíveis.</p>}
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: Confirmação */}
                                {step === 3 && (
                                    <div className="space-y-4 sm:space-y-5">
                                        <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-700 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <span className="text-xs text-slate-400 uppercase tracking-wide">Serviço Selecionado</span>
                                                    <p className="font-bold text-white text-lg sm:text-xl mt-1">{selectedService?.name}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{selectedService?.description}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-2xl sm:text-3xl font-bold text-amber-400">R$ {selectedService?.price}</span>
                                                    <p className="text-xs text-slate-400 mt-1">{selectedService?.duration_minutes} min</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700">
                                                <div>
                                                    <span className="text-xs text-slate-400">Profissional</span>
                                                    <p className="font-semibold text-white text-sm">{selectedProfessional?.full_name}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-slate-400">Data e Hora</span>
                                                    <p className="font-semibold text-white text-sm">
                                                        {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }) : ''} às {selectedTime}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-bold text-white text-base sm:text-lg">Complete seus dados</h4>
                                            <input type="text" placeholder="Nome completo" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full p-3 sm:p-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm sm:text-base"/>
                                            <input type="tel" placeholder="(11) 99999-9999" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full p-3 sm:p-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm sm:text-base"/>
                                        </div>
                                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Footer Fixo do Modal */}
                <div className="border-t border-slate-700 p-4 sm:p-5 bg-slate-900/95 backdrop-blur flex-shrink-0">
                    <div className="flex gap-3">
                        <button onClick={() => step > 1 ? setStep(step - 1) : resetAndClose()} className="flex-1 sm:flex-none sm:px-6 py-3 border-2 border-slate-600 text-slate-300 rounded-xl hover:border-amber-500 hover:text-amber-400 transition-all duration-300 font-semibold text-sm sm:text-base active:scale-95">
                            {step === 1 ? 'Cancelar' : 'Voltar'}
                        </button>
                        {step === 3 ? (
                            <button onClick={handleSubmit} disabled={isSubmitting || !customerName || !customerPhone} className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-bold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-95">
                                {isSubmitting ? (<><div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>Confirmando...</>) : (<><Check className="h-5 w-5 mr-2" />Confirmar Reserva</>)}
                            </button>
                        ) : (
                            <button onClick={() => { if (step === 1 && selectedService) setStep(2); if (step === 2 && selectedProfessional && selectedDate && selectedTime) setStep(3); }} disabled={(step === 1 && !selectedService) || (step === 2 && (!selectedProfessional || !selectedDate || !selectedTime))} className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-bold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-95">
                                Continuar <ChevronRight className="h-5 w-5 ml-1" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};