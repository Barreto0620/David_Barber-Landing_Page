import { useState, useEffect } from "react";
import { X, ChevronRight, Check, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Service, Professional } from "./types";
import { ServiceSelector } from "./ServiceSelector";
import { ProfessionalSelector } from "./ProfessionalSelector";
import { DateSelector } from "./DateSelector";
import { TimeSelector } from "./TimeSelector";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    setSuccessMessage: (msg: string | null) => void;
}

/**
 * Modal principal de agendamento
 * Gerencia o fluxo de 3 etapas: Serviço -> Agendamento -> Dados do Cliente
 */
export const BookingModal = ({ isOpen, onClose, setSuccessMessage }: BookingModalProps) => {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [services, setServices] = useState<Service[]>([]);
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateName = (name: string): boolean => {
        setNameError("");

        if (!name.trim()) {
            setNameError("Nome é obrigatório");
            return false;
        }

        if (name.trim().length < 3) {
            setNameError("Nome deve ter pelo menos 3 caracteres");
            return false;
        }

        if (/\d/.test(name)) {
            setNameError("Nome não pode conter números");
            return false;
        }

        if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(name)) {
            setNameError("Nome contém caracteres inválidos");
            return false;
        }

        return true;
    };

    const formatPhone = (value: string): string => {
        const numbers = value.replace(/\D/g, '');
        const limited = numbers.slice(0, 11);

        if (limited.length <= 2) {
            return limited;
        } else if (limited.length <= 6) {
            return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
        } else if (limited.length <= 10) {
            return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
        } else {
            return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7, 11)}`;
        }
    };

    const validatePhone = (phone: string): boolean => {
        setPhoneError("");

        const numbers = phone.replace(/\D/g, '');

        if (!numbers) {
            setPhoneError("Telefone é obrigatório");
            return false;
        }

        if (numbers.length < 10) {
            setPhoneError("Telefone incompleto");
            return false;
        }

        if (numbers.length === 10) {
            const ddd = parseInt(numbers.slice(0, 2));
            if (ddd < 11 || ddd > 99) {
                setPhoneError("DDD inválido");
                return false;
            }
        }

        if (numbers.length === 11) {
            const ddd = parseInt(numbers.slice(0, 2));
            const firstDigit = numbers[2];

            if (ddd < 11 || ddd > 99) {
                setPhoneError("DDD inválido");
                return false;
            }

            if (firstDigit !== '9') {
                setPhoneError("Celular deve começar com 9");
                return false;
            }
        }

        return true;
    };

    const handleNameChange = (value: string) => {
        const filtered = value.replace(/[^A-Za-zÀ-ÿ\s'-]/g, '');
        setCustomerName(filtered);
        if (filtered) validateName(filtered);
    };

    const handlePhoneChange = (value: string) => {
        const formatted = formatPhone(value);
        setCustomerPhone(formatted);
        if (formatted) validatePhone(formatted);
    };

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const { data: servicesData, error: servicesError } = await supabase
                        .from('services')
                        .select('*')
                        .eq('active', true);
                    if (servicesError) throw servicesError;
                    setServices(servicesData || []);

                    const { data: professionalsData, error: professionalsError } = await supabase
                        .from('user_profiles')
                        .select('id, full_name')
                        .in('role', ['barber', 'admin']);

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

    const handleSubmit = async () => {
        const isNameValid = validateName(customerName);
        const isPhoneValid = validatePhone(customerPhone);

        if (!isNameValid || !isPhoneValid) {
            setError("Por favor, corrija os erros nos campos");
            return;
        }

        if (!selectedService || !selectedProfessional || !selectedDate || !selectedTime) {
            setError("Por favor, preencha todas as informações.");
            return;
        }

        const [year, month, day] = selectedDate.split('-').map(Number);
        const [hours, minutes] = selectedTime.split(':').map(Number);
        const selectedDateTime = new Date(year, month - 1, day, hours, minutes, 0);
        const now = new Date();
        const nowPlus30Min = new Date(now.getTime() + 30 * 60 * 1000);

        if (selectedDateTime <= nowPlus30Min) {
            setError("Não é possível agendar para horários já passados ou com menos de 30 minutos de antecedência.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const cleanPhone = customerPhone.replace(/\D/g, '');

            let client_id;
            const { data: existingClient, error: selectError } = await supabase
                .from('clients')
                .select('id')
                .eq('phone', cleanPhone)
                .single();

            if (selectError && selectError.code !== 'PGRST116') {
                if (selectError.message.includes('406')) {
                    throw new Error("Falha ao verificar cliente. Permissão de SELECT na tabela 'clients' negada (RLS).");
                }
            }

            if (existingClient) {
                client_id = existingClient.id;
            } else {
                const { data: newClient, error: clientError } = await supabase
                    .from('clients')
                    .insert({ name: customerName.trim(), phone: cleanPhone })
                    .select('id')
                    .single();
                if (clientError) {
                    if (clientError.message.includes('401') || clientError.message.includes('violates row-level security policy')) {
                        throw new Error("Falha ao cadastrar cliente. Permissão de INSERT na tabela 'clients' negada (RLS).");
                    }
                    throw clientError;
                }
                client_id = newClient.id;
            }

            const localDateTime = new Date(year, month - 1, day, hours, minutes, 0);

            const appointmentData = {
                client_id: client_id,
                professional_id: selectedProfessional.id,
                scheduled_date: localDateTime.toISOString(),
                service_type: selectedService.name,
                price: selectedService.price,
                status: 'scheduled',
                created_via: 'manual',
                notes: `Agendado com ${selectedProfessional.full_name}.`,
            };

            const { error: appointmentError } = await supabase
                .from('appointments')
                .insert(appointmentData);

            if (appointmentError) {
                console.error('Erro ao inserir agendamento:', appointmentError);

                if (appointmentError.message.includes('unique_professional_schedule') ||
                    appointmentError.code === '23505') {
                    throw new Error(`Este horário já está ocupado! Por favor, escolha outro horário ou atualize a página.`);
                }

                if (appointmentError.message.includes('violates check constraint')) {
                    throw new Error(`Erro de dados: O valor 'manual' pode estar incorreto para 'created_via'. Verifique os valores permitidos no Supabase.`);
                }

                throw new Error(`Erro ao criar agendamento: ${appointmentError.message}`);
            }

            setSuccessMessage(`${selectedService.name} agendado para ${localDateTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} às ${selectedTime}!`);

            setTimeout(() => {
                resetAndClose();
                setSuccessMessage(null);
            }, 3000);

        } catch (err: any) {
            setError(err.message);
            console.error("Erro no Agendamento:", err.message);
            setIsSubmitting(false);
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
        setNameError("");
        setPhoneError("");
        setError(null);
        setIsSubmitting(false);
        onClose();
    };

    const handleServiceSelect = (service: Service) => {
        setSelectedService(service);
        setTimeout(() => setStep(2), 250);
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[95vh] sm:max-h-[92vh] overflow-hidden border-t-4 sm:border-t-0 sm:border border-amber-500 sm:border-slate-700 flex flex-col">

                {/* Header do Modal */}
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

                {/* Conteúdo do Modal */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    <div className="p-4 sm:p-5 md:p-6">
                        {loading && renderLoading()}
                        {error && !loading && renderError()}
                        {!loading && !error && (
                            <>
                                {step === 1 && (
                                    <ServiceSelector
                                        services={services}
                                        selectedService={selectedService}
                                        onSelectService={handleServiceSelect}
                                    />
                                )}

                                {step === 2 && (
                                    <div className="space-y-4 sm:space-y-5">
                                        <ProfessionalSelector
                                            professionals={professionals}
                                            selectedProfessional={selectedProfessional}
                                            setSelectedProfessional={setSelectedProfessional}
                                        />

                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Data</h3>
                                        <DateSelector
                                            selectedDate={selectedDate}
                                            setSelectedDate={setSelectedDate}
                                        />

                                        <TimeSelector
                                            selectedDate={selectedDate}
                                            selectedTime={selectedTime}
                                            setSelectedTime={setSelectedTime}
                                            selectedProfessional={selectedProfessional}
                                            selectedService={selectedService}
                                        />
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-4 sm:space-y-5">
                                        {/* Resumo do Agendamento */}
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

                                        {/* Formulário de Dados */}
                                        <div className="space-y-3">
                                            <h4 className="font-bold text-white text-base sm:text-lg">Complete seus dados</h4>

                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Nome completo"
                                                    value={customerName}
                                                    onChange={(e) => handleNameChange(e.target.value)}
                                                    onBlur={() => validateName(customerName)}
                                                    className={`w-full p-3 sm:p-4 bg-slate-800 border-2 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                                                        nameError
                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                                            : 'border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                                                    }`}
                                                />
                                                {nameError && (
                                                    <p className="text-red-400 text-xs mt-1.5 flex items-center">
                                                        <AlertCircle className="h-3 w-3 mr-1" />
                                                        {nameError}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <input
                                                    type="tel"
                                                    placeholder="(11) 99999-9999"
                                                    value={customerPhone}
                                                    onChange={(e) => handlePhoneChange(e.target.value)}
                                                    onBlur={() => validatePhone(customerPhone)}
                                                    maxLength={15}
                                                    className={`w-full p-3 sm:p-4 bg-slate-800 border-2 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                                                        phoneError
                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                                            : 'border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                                                    }`}
                                                />
                                                {phoneError && (
                                                    <p className="text-red-400 text-xs mt-1.5 flex items-center">
                                                        <AlertCircle className="h-3 w-3 mr-1" />
                                                        {phoneError}
                                                    </p>
                                                )}
                                                {customerPhone && !phoneError && customerPhone.replace(/\D/g, '').length >= 10 && (
                                                    <p className="text-green-400 text-xs mt-1.5 flex items-center">
                                                        <Check className="h-3 w-3 mr-1" />
                                                        Telefone válido
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Footer do Modal */}
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
                                disabled={isSubmitting || !customerName || !customerPhone || !!nameError || !!phoneError}
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
                                disabled={(step === 1 && !selectedService) || (step === 2 && (!selectedProfessional || !selectedDate || !selectedTime))}
                                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-bold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-95"
                            >
                                Continuar <ChevronRight className="h-5 w-5 ml-1" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
