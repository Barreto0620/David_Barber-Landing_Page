import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-background-secondary border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-display font-bold gradient-text mb-4">
              David Barber
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Transformando o cuidado masculino com estilo premium e atendimento 
              personalizado. Sua confiança é nossa especialidade.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-card p-3 rounded-lg hover:bg-primary/20 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a 
                href="#" 
                className="bg-card p-3 rounded-lg hover:bg-primary/20 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a 
                href="#" 
                className="bg-card p-3 rounded-lg hover:bg-primary/20 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-muted-foreground">
                  <div>Rua dos Barbeiros, 123</div>
                  <div>Vila Premium - SP</div>
                  <div>01234-567</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <a 
                  href="tel:+5511999999999" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  (11) 99999-9999
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <a 
                  href="mailto:contato@barbershoppro.com" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  contato@barbershoppro.com
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Funcionamento</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div className="text-muted-foreground">
                  <div className="font-medium">Segunda - Sexta</div>
                  <div>09:00 - 19:00</div>
                </div>
              </div>
              
              <div className="text-muted-foreground ml-8">
                <div className="font-medium">Sábado</div>
                <div>08:00 - 17:00</div>
              </div>
              
              <div className="text-muted-foreground ml-8">
                <div className="font-medium">Domingo</div>
                <div>09:00 - 15:00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © 2024 David Barber. Todos os direitos reservados.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Política de Privacidade
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Termos de Uso
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Cancelamento
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};