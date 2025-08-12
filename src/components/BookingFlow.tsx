import { useState } from "react";
import { Calendar, Clock, User, CreditCard, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

const services = [
  { id: 1, name: "Corte Clássico", price: "R$ 45,00", duration: "30 min" },
  { id: 2, name: "Corte + Barba", price: "R$ 85,00", duration: "50 min" },
  { id: 3, name: "Barba Completa", price: "R$ 55,00", duration: "35 min" },
  { id: 4, name: "Corte Premium", price: "R$ 75,00", duration: "60 min" },
];

const professionals = [
  { id: 1, name: "Carlos Silva", specialties: ["Cortes clássicos", "Barbas"] },
  { id: 2, name: "Ana Costa", specialties: ["Cortes femininos", "Coloração"] },
];

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

  const selectDateTime = (date: string, time: string) => {
    setBookingData(prev => ({ ...prev, date, time }));
    nextStep();
  };

  const confirmBooking = () => {
    // Here you would typically send the booking data to your API
    console.log("Booking confirmed:", bookingData);
    // Show success state or redirect
    alert("Reserva confirmada com sucesso!");
    handleClose();
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Escolha o Serviço";
      case 2: return "Selecione o Profissional";
      case 3: return "Data e Horário";
      case 4: return "Confirmar Reserva";
      default: return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-center">
            {getStepTitle()}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="card-service cursor-pointer hover:border-primary/50"
                  onClick={() => selectService(service)}
                >
                  <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold text-xl">{service.price}</span>
                    <span className="text-muted-foreground text-sm">{service.duration}</span>
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
                  className="card-premium cursor-pointer hover:border-primary/50 flex items-center space-x-4"
                  onClick={() => selectProfessional(professional.name)}
                >
                  <User className="h-12 w-12 text-primary" />
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
                <label className="block text-sm font-medium mb-2">Data</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Hoje", "Amanhã", "Quinta"].map((date) => (
                    <Button
                      key={date}
                      variant={bookingData.date === date ? "default" : "outline"}
                      onClick={() => setBookingData(prev => ({ ...prev, date }))}
                      className="w-full"
                    >
                      {date}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Time Picker */}
              <div>
                <label className="block text-sm font-medium mb-2">Horário</label>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant={bookingData.time === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBookingData(prev => ({ ...prev, time }))}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              {bookingData.date && bookingData.time && (
                <Button 
                  className="w-full btn-hero"
                  onClick={() => selectDateTime(bookingData.date, bookingData.time)}
                >
                  Continuar
                </Button>
              )}
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="card-secondary p-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4">Resumo da Reserva</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Serviço:</span>
                    <span className="font-medium">{bookingData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profissional:</span>
                    <span className="font-medium">{bookingData.professional}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data e Hora:</span>
                    <span className="font-medium">{bookingData.date}, {bookingData.time}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">{bookingData.servicePrice}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Seus Dados</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-input border border-border rounded-lg focus-copper"
                      placeholder="Seu nome completo"
                      value={bookingData.customerName}
                      onChange={(e) => setBookingData(prev => ({ ...prev, customerName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone</label>
                    <input
                      type="tel"
                      className="w-full p-3 bg-input border border-border rounded-lg focus-copper"
                      placeholder="(11) 99999-9999"
                      value={bookingData.customerPhone}
                      onChange={(e) => setBookingData(prev => ({ ...prev, customerPhone: e.target.value }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 bg-input border border-border rounded-lg focus-copper"
                      placeholder="seu@email.com"
                      value={bookingData.customerEmail}
                      onChange={(e) => setBookingData(prev => ({ ...prev, customerEmail: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <Button 
                className="w-full btn-hero"
                onClick={confirmBooking}
                disabled={!bookingData.customerName || !bookingData.customerPhone}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Confirmar Reserva
              </Button>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <span className="text-muted-foreground text-sm">
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
          
          {currentStep >= 3 && (
            <div className="w-20"></div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};