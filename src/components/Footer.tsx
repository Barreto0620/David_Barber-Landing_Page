import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Heart, ExternalLink } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <button 
              onClick={scrollToTop}
              className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform cursor-pointer"
            >
              David Barber
            </button>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              Transformando o cuidado masculino com estilo premium e atendimento 
              personalizado desde 2016. Sua confiança é nossa especialidade.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-lg hover:bg-amber-500/20 hover:border-amber-500 border-2 border-transparent transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-lg hover:bg-amber-500/20 hover:border-amber-500 border-2 border-transparent transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-lg hover:bg-amber-500/20 hover:border-amber-500 border-2 border-transparent transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">📬 Receba nossas novidades</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Seu melhor email"
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-r-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-medium">
                  Assinar
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">📍 Contato</h4>
            <div className="space-y-3">
              <a 
                href="https://maps.google.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 group hover:text-amber-400 transition-colors"
              >
                <MapPin className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-400 group-hover:text-amber-400 transition-colors">
                  <div>Rua dos Barbeiros, 123</div>
                  <div>Vila Premium - SP</div>
                  <div>01234-567</div>
                </div>
              </a>
              
              <a 
                href="tel:+5511999999999" 
                className="flex items-center space-x-3 text-slate-400 hover:text-amber-400 transition-colors group"
              >
                <Phone className="h-5 w-5 text-amber-400" />
                <span>(11) 99999-9999</span>
              </a>
              
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-slate-400 hover:text-amber-400 transition-colors group"
              >
                <Phone className="h-5 w-5 text-green-400" />
                <span>WhatsApp</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              
              <a 
                href="mailto:contato@davidbarber.com" 
                className="flex items-center space-x-3 text-slate-400 hover:text-amber-400 transition-colors group"
              >
                <Mail className="h-5 w-5 text-amber-400" />
                <span>contato@davidbarber.com</span>
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white flex items-center">
              <Clock className="h-5 w-5 text-amber-400 mr-2" />
              Funcionamento
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Segunda - Sexta</span>
                <span className="text-white font-bold">09:00 - 19:00</span>
              </div>
              <div className="h-px bg-slate-800"></div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Sábado</span>
                <span className="text-white font-bold">08:00 - 17:00</span>
              </div>
              <div className="h-px bg-slate-800"></div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Domingo</span>
                <span className="text-white font-bold">09:00 - 15:00</span>
              </div>

              {/* Status Indicator */}
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-400 font-medium text-sm">Aberto agora!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-slate-800">
          <div className="text-center">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-sm text-slate-400">Prêmio</div>
            <div className="font-bold text-white text-sm">Melhor de 2023</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-sm text-slate-400">Avaliação</div>
            <div className="font-bold text-white text-sm">4.9/5 Estrelas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">👥</div>
            <div className="text-sm text-slate-400">Clientes</div>
            <div className="font-bold text-white text-sm">500+ Satisfeitos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">📅</div>
            <div className="text-sm text-slate-400">Experiência</div>
            <div className="font-bold text-white text-sm">8 Anos</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-500 text-sm flex items-center">
              © {currentYear} David Barber
            </div>
            
            <div className="flex space-x-6 text-sm">
              <button className="text-slate-400 hover:text-amber-400 transition-colors">
                Termos de Uso
              </button>
              <button className="text-slate-400 hover:text-amber-400 transition-colors">
                Cancelamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};