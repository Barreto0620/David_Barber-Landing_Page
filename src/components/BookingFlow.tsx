// src/components/BookingFlow.tsx

import { useState, useEffect } from "react";
import { Clock, User, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
// Assumindo que estes são componentes Shadcn UI
import { Button } from "@/components/ui/button"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Interface para tipagem de dados de serviço (para receber do evento 'openBooking')
interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    priceString: string; // Adicionando a string formatada para o resumo
    duration: string;
    rating: number;
    icon: React.ElementType;
    popular: boolean;
}

interface BookingFlowProps {
    isOpen: boolean;
    onClose: () => void;
}

interface BookingData {
    service: string;
    servicePrice: string;
    professional: string;
    date: string;
    time: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
}

// Dados simulados para o fluxo (devem corresponder aos dados reais)
const servicesMock: { id: number; name: string; price: string; duration: string }[] = [
    { id: 1, name: "Corte Clássico", price: "R$ 45,00", duration: "30 min" },
    { id: 2, name: "Corte + Barba", price: "R$ 85,00", duration: "50 min" },
    { id: 3, name: "Barba Completa", price: "R$ 55,00", duration: "35 min" },
    { id: 4, name: "Corte Premium", price: "R$ 75,00", duration: "60 min" },
];

const professionals = [
    { id: 1, name: "Carlos Silva", specialties: ["Cortes clássicos", "Barbas"], image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop" },
    { id: 2, name: "Ana Costa", specialties: ["Cortes femininos", "Coloração"], image: "https://images.unsplash.com/photo-1624467332219-c6e949931308?w=400&h=400&fit=crop" },
];

const availableDates = ["2 Out (Hoje)", "3 Out (Amanhã)", "4 Out (Sex)"];
const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

export const BookingFlow = ({ isOpen, onClose }: BookingFlowProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>({
        service: "",
        servicePrice: "",
        professional: "",
        date: "",
        time: "",
        customerName: "",
        customerPhone: "",
        customerEmail: "",
    });

    const totalSteps = 4;

    // Listener para preencher dados do serviço se vier de fora (ex: Services.tsx ou Team.tsx)
    useEffect(() => {
        const handler = (event: Event) => {
            const customEvent = event as CustomEvent<{ service?: Service }>;
            if (customEvent.detail && customEvent.detail.service) {
                const service = customEvent.detail.service;
                setBookingData(prev => ({
                    ...prev,
                    service: service.name,
                    servicePrice: service.priceString,
                }));
                setCurrentStep(2); // Vai direto para a seleção do profissional
            } else if (isOpen) {
                setCurrentStep(1); // Garante que comece no passo 1 se for aberto sem um serviço predefinido
            }
        };

        window.addEventListener('openBooking', handler as EventListener);

        return () => {
            window.removeEventListener('openBooking', handler as EventListener);
        };
    }, [isOpen]);

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const resetFlow = () => {
        setCurrentStep(1);
        setBookingData({
            service: "",
            servicePrice: "",
            professional: "",
            date: "",
            time: "",
            customerName: "",
            customerPhone: "",
            customerEmail: "",
        });
    };

    const handleClose = () => {
        resetFlow();
        onClose();
    };

    const selectService = (service: { name: string; price: string }) => {
        setBookingData(prev => ({
            ...prev,
            service: service.name,
            servicePrice: service.price
        }));
        nextStep();
    };

    const selectProfessional = (professional: string) => {
        setBookingData(prev => ({ ...prev, professional }));
        nextStep();
    };
    
    const confirmBooking = () => {
        // Lógica de submissão (API call, etc.)
        console.log("Booking confirmed:", bookingData);
        alert(`Reserva de ${bookingData.service} com ${bookingData.professional} em ${bookingData.date} às ${bookingData.time} confirmada!`);
        handleClose();
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return "1. Escolha o Serviço";
            case 2: return "2. Selecione o Profissional";
            case 3: return "3. Data e Horário";
            case 4: return "4. Confirme e Finalize";
            default: return "";
        }
    };

    // Estilos de suporte
    const baseCardClass = "bg-card p-4 border border-border rounded-xl transition-all duration-200";
    const selectedCardClass = "border-primary shadow-lg shadow-primary/20 bg-primary/10";
    const unselectedCardClass = "hover:border-primary/50";
    const inputClass = "w-full p-3 bg-input border border-border rounded-lg focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-white";

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center text-foreground">
                        {getStepTitle()}
                    </DialogTitle>
                </DialogHeader>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2 mb-6">
                    <div
                        className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    ></div>
                </div>

                {/* Step Content */}
                <div className="space-y-6">
                    
                    {/* Step 1: Service Selection */}
                    {currentStep === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {servicesMock.map((service) => (
                                <div
                                    key={service.id}
                                    className={`${baseCardClass} cursor-pointer ${bookingData.service === service.name ? selectedCardClass : unselectedCardClass}`}
                                    onClick={() => selectService(service)}
                                >
                                    <h3 className="font-semibold text-lg mb-2 text-foreground">{service.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-primary font-bold text-xl">{service.price}</span>
                                        <span className="text-muted-foreground text-sm flex items-center"><Clock className="h-4 w-4 mr-1"/>{service.duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Step 2: Professional Selection */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            {professionals.map((professional) => (
                                <div
                                    key={professional.id}
                                    className={`${baseCardClass} cursor-pointer flex items-center space-x-4 ${bookingData.professional === professional.name ? selectedCardClass : unselectedCardClass}`}
                                    onClick={() => selectProfessional(professional.name)}
                                >
                                    <img src={professional.image} alt={professional.name} className="h-12 w-12 rounded-full object-cover" />
                                    <div>
                                        <h3 className="font-semibold text-lg">{professional.name}</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Especialidades: {professional.specialties.join(", ")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Step 3: Date & Time Selection */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            {/* Date Picker (simplified) */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-foreground">Data</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {availableDates.map((date) => (
                                        <Button
                                            key={date}
                                            variant={bookingData.date === date ? "default" : "outline"}
                                            onClick={() => setBookingData(prev => ({ ...prev, date }))}
                                            className={`w-full ${bookingData.date === date ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'border-border text-foreground hover:bg-muted/50'}`}
                                        >
                                            {date}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Picker */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-foreground">Horário</label>
                                <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-2">
                                    {availableTimes.map((time) => (
                                        <Button
                                            key={time}
                                            variant={bookingData.time === time ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setBookingData(prev => ({ ...prev, time }))}
                                            className={`w-full ${bookingData.time === time ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'border-border text-foreground hover:bg-muted/50'}`}
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Continuation Button for Step 3 */}
                            {bookingData.date && bookingData.time && (
                                <Button 
                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold"
                                    onClick={nextStep}
                                >
                                    Continuar para Confirmação <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Step 4: Confirmation */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            {/* Booking Summary */}
                            <div className="p-6 border border-border rounded-xl bg-muted/20 space-y-4">
                                <h3 className="font-semibold text-lg mb-4 text-foreground">Resumo da Reserva</h3>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Serviço:</span>
                                        <span className="font-medium text-white">{bookingData.service}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Profissional:</span>
                                        <span className="font-medium text-white">{bookingData.professional}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Data e Hora:</span>
                                        <span className="font-medium text-white">{bookingData.date}, {bookingData.time}</span>
                                    </div>
                                    <div className="border-t border-border pt-3">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total:</span>
                                            <span className="text-primary">{bookingData.servicePrice}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-foreground">Seus Dados</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Nome</label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            placeholder="Seu nome completo"
                                            value={bookingData.customerName}
                                            onChange={(e) => setBookingData(prev => ({ ...prev, customerName: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Telefone</label>
                                        <input
                                            type="tel"
                                            className={inputClass}
                                            placeholder="(11) 99999-9999"
                                            value={bookingData.customerPhone}
                                            onChange={(e) => setBookingData(prev => ({ ...prev, customerPhone: e.target.value }))}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Email (Opcional)</label>
                                        <input
                                            type="email"
                                            className={inputClass}
                                            placeholder="seu@email.com"
                                            value={bookingData.customerEmail}
                                            onChange={(e) => setBookingData(prev => ({ ...prev, customerEmail: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button 
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
                                onClick={confirmBooking}
                                disabled={!bookingData.customerName || !bookingData.customerPhone}
                            >
                                <CheckCircle className="h-5 w-5 mr-2" />
                                Finalizar Agendamento
                            </Button>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-border mt-4">
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>
                    
                    <span className="text-muted-foreground text-sm flex items-center">
                        Passo {currentStep} de {totalSteps}
                    </span>
                    
                    {currentStep < 3 && (
                        <Button
                            variant="outline"
                            onClick={nextStep}
                            disabled={
                                (currentStep === 1 && !bookingData.service) ||
                                (currentStep === 2 && !bookingData.professional)
                            }
                        >
                            Próximo
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    )}
                    
                    {/* Placeholder para manter o alinhamento no passo 3 e 4 */}
                    {currentStep >= 3 && (
                        <div className="w-[84px] h-10"></div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};