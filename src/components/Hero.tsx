import { Calendar, Star, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-barber.jpg";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium barber shop interior with professional barber"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-primary fill-current"
                  />
                ))}
              </div>
              <span className="text-muted-foreground font-medium">
                4.9/5 • 500+ clientes satisfeitos
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Estilo{" "}
              <span className="gradient-text">Premium</span>
              <br />
              para Homens
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Transforme seu visual com nossos barbeiros especializados. 
              Agende em <strong className="text-primary">3 cliques</strong> e 
              experimente o melhor da barbearia moderna.
            </p>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: Calendar, text: "Agendamento online 24/7" },
                { icon: Clock, text: "Atendimento pontual" },
                { icon: CheckCircle, text: "Garantia de satisfação" },
                { icon: Star, text: "Profissionais certificados" },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="btn-hero animate-glow hover:scale-105 transition-transform duration-300"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Reservar Agora - 3 Passos
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-outline-copper"
              >
                Ver Nossos Serviços
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-8 mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Anos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfação</div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Preview */}
          <div className="lg:flex justify-center hidden">
            <div className="card-premium max-w-md w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-display font-semibold mb-4 text-center">
                Reserva Rápida
              </h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-card-secondary rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground">Serviço</div>
                  <div className="font-semibold">Corte + Barba Completa</div>
                  <div className="text-primary font-bold">R$ 85,00</div>
                </div>
                
                <div className="p-3 bg-card-secondary rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground">Profissional</div>
                  <div className="font-semibold">Carlos Silva</div>
                  <div className="badge-available inline-block mt-1">Disponível</div>
                </div>
                
                <div className="p-3 bg-card-secondary rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground">Horário</div>
                  <div className="font-semibold">Hoje, 15:30</div>
                </div>
                
                <Button className="w-full btn-hero">
                  <Calendar className="h-4 w-4 mr-2" />
                  Confirmar Reserva
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};