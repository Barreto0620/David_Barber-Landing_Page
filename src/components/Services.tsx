import { Clock, Star, Scissors, Brush, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import serviceImage from "@/assets/service-beard.jpg";

const services = [
  {
    id: 1,
    name: "Corte Clássico",
    description: "Corte tradicional com acabamento impecável",
    price: "R$ 45,00",
    duration: "30 min",
    rating: 4.9,
    icon: Scissors,
    popular: false,
  },
  {
    id: 2,
    name: "Corte + Barba",
    description: "Combo completo com design personalizado",
    price: "R$ 85,00",
    duration: "50 min",
    rating: 5.0,
    icon: Crown,
    popular: true,
  },
  {
    id: 3,
    name: "Barba Completa",
    description: "Aparação, design e hidratação profissional",
    price: "R$ 55,00",
    duration: "35 min",
    rating: 4.8,
    icon: Brush,
    popular: false,
  },
  {
    id: 4,
    name: "Corte Premium",
    description: "Técnicas avançadas + lavagem + styling",
    price: "R$ 75,00",
    duration: "60 min",
    rating: 4.9,
    icon: Zap,
    popular: false,
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Nossos <span className="gradient-text">Serviços</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o serviço ideal para transformar seu visual com qualidade premium
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="card-service group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    Mais Popular
                  </div>
                </div>
              )}

              {/* Service Icon */}
              <div className="bg-primary/20 p-4 rounded-lg w-fit mb-4 group-hover:bg-primary/30 transition-colors duration-300">
                <service.icon className="h-8 w-8 text-primary" />
              </div>

              {/* Service Details */}
              <h3 className="text-xl font-display font-semibold mb-2">
                {service.name}
              </h3>
              
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Price and Duration */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-bold text-primary">
                  {service.price}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.duration}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(service.rating)
                          ? "text-primary fill-current"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {service.rating}
                </span>
              </div>

              {/* CTA Button */}
              <Button 
                className="w-full btn-hero group-hover:scale-105 transition-transform duration-300"
                size="sm"
              >
                Agendar Serviço
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Services Banner */}
        <div className="bg-gradient-copper rounded-xl p-8 text-center text-primary-foreground">
          <h3 className="text-2xl font-display font-bold mb-2">
            Serviços Especiais
          </h3>
          <p className="mb-6 opacity-90">
            Tratamentos capilares, design de sobrancelhas e muito mais
          </p>
          <Button 
            variant="outline" 
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            Ver Todos os Serviços
          </Button>
        </div>
      </div>
    </section>
  );
};