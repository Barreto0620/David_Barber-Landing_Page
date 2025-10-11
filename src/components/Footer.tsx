import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Heart, ExternalLink, X } from "lucide-react";
import { useState } from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showTerms, setShowTerms] = useState(false);
  const [showCancellation, setShowCancellation] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
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
                <button 
                  onClick={() => setShowTerms(true)}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Termos de Uso
                </button>
                <button 
                  onClick={() => setShowCancellation(true)}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Cancelamento
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center">
                📜 Termos de Uso
              </h3>
              <button 
                onClick={() => setShowTerms(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label="Fechar"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6 text-slate-300">
              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-amber-400 mr-2">1.</span> Aceitação dos Termos
                </h4>
                <p className="leading-relaxed">
                  Ao agendar um serviço na David Barber, você concorda com os termos aqui estabelecidos. 
                  Reservamo-nos o direito de modificar estes termos a qualquer momento, com notificação 
                  prévia aos clientes cadastrados.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-amber-400 mr-2">2.</span> Agendamento de Serviços
                </h4>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>Os agendamentos devem ser realizados com antecedência mínima de 2 horas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>Confirmação será enviada via WhatsApp ou SMS</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>Tolerância de atraso de até 15 minutos. Após esse período, o horário poderá ser remarcado</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>Ausências sem aviso prévio (no-show) podem resultar em solicitação de pagamento antecipado em agendamentos futuros</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-amber-400 mr-2">3.</span> Pagamento
                </h4>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>Aceitamos dinheiro, cartão de débito, crédito e PIX</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>O pagamento deve ser realizado imediatamente após o término do serviço</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>Pacotes e planos têm condições especiais consultadas no estabelecimento</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-amber-400 mr-2">4.</span> Responsabilidades do Cliente
                </h4>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>Informar alergias, condições de pele ou sensibilidades antes do serviço</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>Manter comportamento respeitoso com profissionais e demais clientes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>Seguir orientações dos profissionais durante o atendimento</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-amber-400 mr-2">5.</span> Privacidade e Dados
                </h4>
                <p className="leading-relaxed">
                  Seus dados pessoais são coletados apenas para fins de agendamento e comunicação. 
                  Não compartilhamos suas informações com terceiros. Para mais detalhes, consulte 
                  nossa Política de Privacidade completa disponível no estabelecimento.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-amber-400 mr-2">6.</span> Garantia e Satisfação
                </h4>
                <p className="leading-relaxed">
                  Garantimos a qualidade de nossos serviços. Caso não esteja satisfeito, entre em 
                  contato em até 48 horas para que possamos resolver a situação da melhor forma possível.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-800/50 p-4 border-t border-slate-700">
              <button 
                onClick={() => setShowTerms(false)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300"
              >
                Entendi e Concordo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      {showCancellation && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center">
                ⚠️ Política de Cancelamento
              </h3>
              <button 
                onClick={() => setShowCancellation(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label="Fechar"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6 text-slate-300">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold">
                  💡 Entendemos que imprevistos acontecem! Por isso, criamos uma política justa 
                  que respeita tanto nossos clientes quanto nossos profissionais.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-green-400 mr-2">✓</span> Cancelamento Gratuito
                </h4>
                <p className="leading-relaxed mb-3">
                  Você pode cancelar ou remarcar seu agendamento sem nenhuma cobrança nas seguintes condições:
                </p>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span><strong className="text-white">Com mais de 24 horas de antecedência:</strong> Cancelamento 100% gratuito</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span><strong className="text-white">Entre 12 e 24 horas:</strong> Remarcação gratuita (1x por cliente/mês)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-orange-400 mr-2">⚠️</span> Cancelamento com Restrições
                </h4>
                <ul className="space-y-3 list-none">
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <div>
                      <strong className="text-white">Entre 6 e 12 horas antes:</strong>
                      <p className="text-sm mt-1">Cobrança de 30% do valor do serviço ou crédito para uso em até 30 dias</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <div>
                      <strong className="text-white">Menos de 6 horas antes:</strong>
                      <p className="text-sm mt-1">Cobrança de 50% do valor do serviço</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-red-400 mr-2">✗</span> No-Show (Ausência sem Aviso)
                </h4>
                <p className="leading-relaxed mb-3">
                  Quando um cliente não comparece e não avisa, prejudicamos outros clientes que 
                  gostariam daquele horário. Por isso:
                </p>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Cobrança de 100% do valor do serviço</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Próximos agendamentos podem requerer pagamento antecipado de 50%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Após 2 no-shows, agendamentos futuros requerem pagamento integral antecipado</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-blue-400 mr-2">📱</span> Como Cancelar
                </h4>
                <p className="leading-relaxed mb-3">
                  Você pode cancelar ou remarcar seu agendamento através de:
                </p>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>WhatsApp: (11) 99999-9999</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Telefone: (11) 99999-9999</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>E-mail: contato@davidbarber.com</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Pessoalmente no estabelecimento</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-purple-400 mr-2">🎁</span> Exceções
                </h4>
                <p className="leading-relaxed">
                  Entendemos que emergências médicas e situações excepcionais podem acontecer. 
                  Entre em contato conosco e avaliaremos cada caso individualmente com empatia 
                  e bom senso.
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <p className="text-sm text-slate-400 italic">
                  Última atualização: {currentYear}. Esta política está sujeita a alterações, 
                  com notificação prévia aos clientes cadastrados.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-800/50 p-4 border-t border-slate-700">
              <button 
                onClick={() => setShowCancellation(false)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300"
              >
                Entendi a Política
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};