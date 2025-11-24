import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Heart, ExternalLink, X, Shield, Lock, FileText } from "lucide-react";
import { useState, useEffect } from "react"; // IMPORTANTE: Importar useEffect

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // NOVO: Adiciona um listener de evento para abrir o modal de privacidade
    useEffect(() => {
        const openModal = () => {
            setShowPrivacy(true);
        };

        // Adiciona o listener para o evento customizado
        window.addEventListener('OPEN_PRIVACY_MODAL', openModal);

        // Função de limpeza para remover o listener quando o componente for desmontado
        return () => {
            window.removeEventListener('OPEN_PRIVACY_MODAL', openModal);
        };
    }, []); // Array de dependências vazio garante que o listener só seja montado/desmontado uma vez

    return (
        <>
            <footer id="contact" className="bg-slate-900 border-t border-slate-800">
                {/* ... (Seu conteúdo do Footer permanece o mesmo) ... */}
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
                            {/* [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-300 */}
                            <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
                                Transformando o cuidado masculino com estilo premium e atendimento 
                                personalizado desde 2016. Sua confiança é nossa especialidade.
                            </p>
                            
                            {/* Social Media */}
                            <div className="flex space-x-4">
                                <a 
                                    href="https://www.instagram.com/davidbarber.__" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-slate-800 p-3 rounded-lg hover:bg-amber-500/20 hover:border-amber-500 border-2 border-transparent transition-all duration-300 group"
                                    aria-label="Instagram"
                                >
                                    {/* [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-200 */}
                                    <Instagram className="h-5 w-5 text-slate-200 group-hover:text-amber-400 transition-colors" />
                                </a>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            {/* [CORREÇÃO 1.3.1] h4 -> h3 (Mantido estilo) */}
                            <h3 className="text-lg font-semibold mb-4 text-white">📍 Contato</h3>
                            <div className="space-y-3">
                                <a 
                                    href="https://maps.google.com" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start space-x-3 group hover:text-amber-400 transition-colors"
                                >
                                    <MapPin className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                                    {/* [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-300 */}
                                    <div className="text-slate-300 group-hover:text-amber-400 transition-colors">
                                        <div>Rua Basil Cameron, 46</div>
                                        <div>Vila Guarani - SP</div>
                                    </div>
                                </a>
                                <a 
                                    href="https://wa.me/5511978726013" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-300
                                    className="flex items-center space-x-3 text-slate-300 hover:text-amber-400 transition-colors group"
                                >
                                    <Phone className="h-5 w-5 text-green-400" />
                                    <span>WhatsApp</span>
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                                
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div>
                            {/* [CORREÇÃO 1.3.1] h4 -> h3 (Mantido estilo) */}
                            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                                <Clock className="h-5 w-5 text-amber-400 mr-2" />
                                Funcionamento
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    {/* [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-300 */}
                                    <span className="text-slate-300 font-medium">Segunda - Sexta</span>
                                    <span className="text-white font-bold">09:00 - 18:00</span>
                                </div>
                                <div className="h-px bg-slate-800"></div>
                                
                                <div className="flex justify-between items-center text-sm">
                                    {/* [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-300 */}
                                    <span className="text-slate-300 font-medium">Sábado</span>
                                    <span className="text-white font-bold">09:00 - 18:00</span>
                                </div>
                                <div className="h-px bg-slate-800"></div>
                                
                                <div className="flex justify-between items-center text-sm">
                                    {/* [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-300 */}
                                    <span className="text-slate-300 font-medium">Domingo</span>
                                    <span className="text-white font-bold">Fechado</span>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                    {/* Bottom Section */}
                    <div className="pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            {/* [CORREÇÃO 1.4.3] text-slate-500 -> text-slate-300 */}
                            <div className="text-slate-300 text-sm flex items-center">
                                © {currentYear} Todos os direitos reservados.
                            </div>
                            
                            <div className="flex space-x-6 text-sm">
                                <button 
                                    onClick={() => setShowTerms(true)}
                                    // [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-200
                                    className="text-slate-200 hover:text-amber-400 transition-colors"
                                >
                                    Termos de Uso
                                </button>
                                {/* Botão de Política de Privacidade Adicionado */}
                                <button 
                                    onClick={() => setShowPrivacy(true)}
                                    // [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-200
                                    className="text-slate-200 hover:text-amber-400 transition-colors"
                                >
                                    Política de Privacidade
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Terms Modal (Seu código original) */}
            {showTerms && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 flex justify-between items-center">
                            <h3 className="text-2xl font-bold text-white flex items-center">
                                <FileText className="h-6 w-6 mr-2" /> Termos de Uso e Serviços
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
                        {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6 text-slate-200">
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
                                        <span>Os agendamentos devem ser realizados com antecedência.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Confirmação será enviada via WhatsApp ou SMS.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Tolerância de atraso de até 15 minutos. Após esse período, o horário poderá ser remarcado.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Ausências sem aviso prévio (no-show) estão sujeitas à nossa política de cancelamento (Seção 7).</span>
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
                                        <span>Aceitamos dinheiro, cartão de débito, crédito e PIX.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>O pagamento deve ser realizado imediatamente após o término do serviço.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Pacotes e planos têm condições especiais consultadas no estabelecimento.</span>
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
                                        <span>Informar alergias, condições de pele ou sensibilidades antes do serviço.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Manter comportamento respeitoso com profissionais e demais clientes.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Seguir orientações dos profissionais durante o atendimento.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Seção 5 Atualizada para lincar com o modal de Privacidade */}
                            <div>
                                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                                    <span className="text-amber-400 mr-2">5.</span> Privacidade e Dados
                                </h4>
                                <p className="leading-relaxed">
                                    Seus dados pessoais são coletados apenas para fins de agendamento e comunicação. 
                                    Para mais detalhes sobre como tratamos seus dados, consulte nossa 
                                    <button 
                                        onClick={() => { setShowTerms(false); setShowPrivacy(true); }}
                                        className="text-amber-400 underline hover:text-orange-500 transition-colors mx-1 font-semibold"
                                    >
                                        Política de Privacidade
                                    </button>
                                    completa.
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
                            
                            {/* Seção 7 - Política de Cancelamento (Seu código original) */}
                            <div>
                                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                                    <span className="text-amber-400 mr-2">7.</span> Política de Cancelamento e No-Show
                                </h4>
                                
                                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
                                    <p className="text-amber-400 font-semibold">
                                        💡 Entendemos que imprevistos acontecem! Por isso, criamos uma política justa 
                                        que respeita tanto nossos clientes quanto nossos profissionais.
                                    </p>
                                </div>

                                <strong className="text-lg text-white mb-2 flex items-center">
                                    <span className="text-green-400 mr-2">✓</span> Cancelamento Gratuito
                                </strong>
                                <ul className="space-y-2 list-none mb-4 pl-4">
                                    <li className="flex items-start">
                                        <span className="text-green-400 mr-2">•</span>
                                        <span><strong className="text-white">Com mais de 24 horas de antecedência:</strong> Cancelamento 100% gratuito.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-400 mr-2">•</span>
                                        <span><strong className="text-white">Entre 12 e 24 horas:</strong> Remarcação gratuita (1x por cliente/mês).</span>
                                    </li>
                                </ul>

                                <strong className="text-lg text-white mb-2 flex items-center">
                                    <span className="text-orange-400 mr-2">⚠️</span> Cancelamento com Restrições
                                </strong>
                                <ul className="space-y-3 list-none mb-4 pl-4">
                                    <li className="flex items-start">
                                        <span className="text-orange-400 mr-2">•</span>
                                        <div>
                                            <strong className="text-white">Entre 6 e 12 horas antes:</strong>
                                            <p className="text-sm mt-1">Cobrança de 30% do valor do serviço ou crédito para uso em até 30 dias.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-400 mr-2">•</span>
                                        <div>
                                            <strong className="text-white">Menos de 6 horas antes:</strong>
                                            <p className="text-sm mt-1">Cobrança de 50% do valor do serviço.</p>
                                        </div>
                                    </li>
                                </ul>

                                <strong className="text-lg text-white mb-2 flex items-center">
                                    <span className="text-red-400 mr-2">✗</span> No-Show (Ausência sem Aviso)
                                </strong>
                                <p className="leading-relaxed mb-3">
                                    Quando um cliente não comparece e não avisa, prejudicamos outros clientes que 
                                    gostariam daquele horário. Por isso:
                                </p>
                                <ul className="space-y-2 list-none mb-4 pl-4">
                                    <li className="flex items-start">
                                        <span className="text-red-400 mr-2">•</span>
                                        <span>Cobrança de 100% do valor do serviço.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-400 mr-2">•</span>
                                        <span>Próximos agendamentos podem requerer pagamento antecipado de 50%.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-400 mr-2">•</span>
                                        <span>Após 2 no-shows, agendamentos futuros requerem pagamento integral antecipado.</span>
                                    </li>
                                </ul>

                                <strong className="text-lg text-white mb-2 flex items-center">
                                    <span className="text-blue-400 mr-2">📱</span> Como Cancelar
                                </strong>
                                <p className="leading-relaxed mb-3">
                                    Você pode cancelar ou remarcar seu agendamento através dos nossos canais oficiais (WhatsApp, Telefone ou E-mail) listados neste site.
                                </p>

                                <strong className="text-lg text-white mb-2 flex items-center">
                                    <span className="text-purple-400 mr-2">🎁</span> Exceções
                                </strong>
                                <p className="leading-relaxed">
                                    Entendemos que emergências médicas e situações excepcionais podem acontecer. 
                                    Entre em contato conosco e avaliaremos cada caso individualmente com empatia 
                                    e bom senso.
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
            
            {/* NOVO Modal de Política de Privacidade (Seu código original) */}
            {showPrivacy && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 flex justify-between items-center">
                            <h3 className="text-2xl font-bold text-white flex items-center">
                                <Shield className="h-6 w-6 mr-2" /> Política de Privacidade
                            </h3>
                            <button 
                                onClick={() => setShowPrivacy(false)}
                                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                                aria-label="Fechar"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Content */}
                        {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6 text-slate-200">
                            
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                {/* [CORREÇÃO 1.4.3] text-blue-300 -> text-blue-200 */}
                                <p className="text-blue-200 font-semibold">
                                    <Lock className="h-4 w-4 inline mr-2" /> Sua privacidade é nossa prioridade. Esta política detalha como 
                                    coletamos, usamos e protegemos suas informações pessoais, em conformidade 
                                    com a Lei Geral de Proteção de Dados (LGPD).
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                                    <span className="text-amber-400 mr-2">1.</span> Quais Dados Coletamos
                                </h4>
                                <p className="leading-relaxed mb-2">
                                    Coletamos apenas os dados essenciais para a prestação de nossos serviços:
                                </p>
                                <ul className="space-y-2 list-none pl-4">
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span><strong className="text-white">Dados de Agendamento:</strong> Nome, número de telefone e endereço de e-mail.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span><strong className="text-white">Dados de Navegação:</strong> Cookies anônimos para análise de tráfego e melhoria do site (ex: Google Analytics).</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span><strong className="text-white">Dados de Pagamento:</strong> Processados de forma segura por nossos parceiros de pagamento. Não armazenamos números de cartão de crédito.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                                    <span className="text-amber-400 mr-2">2.</span> Como Usamos Seus Dados
                                </h4>
                                <p className="leading-relaxed mb-2">
                                    Utilizamos seus dados exclusivamente para:
                                </p>
                                <ul className="space-y-2 list-none pl-4">
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Confirmar e gerenciar seus agendamentos.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Enviar lembretes de horários e comunicações sobre nossos serviços.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Melhorar a experiência em nosso site e estabelecimento.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Cumprir obrigações legais e fiscais.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                                    <span className="text-amber-400 mr-2">3.</span> Compartilhamento de Dados
                                </h4>
                                <p className="leading-relaxed">
                                    <strong className="text-white">Nós não vendemos seus dados.</strong> O compartilhamento é limitado a 
                                    parceiros essenciais para a operação, como nosso sistema de 
                                    agendamento ou gateways de pagamento, que também estão obrigados 
                                    a cumprir a LGPD.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                                    <span className="text-amber-400 mr-2">4.</span> Seus Direitos (LGPD)
                                </h4>
                                <p className="leading-relaxed mb-2">
                                    Você tem o direito de:
                                </p>
                                <ul className="space-y-2 list-none pl-4">
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Solicitar acesso aos seus dados que possuímos.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Pedir a correção de dados incompletos ou incorretos.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 mr-2">•</span>
                                        <span>Solicitar a exclusão (anonimização) dos seus dados, exceto quando a lei exigir a manutenção.</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                                    <span className="text-amber-400 mr-2">5.</span> Segurança e Armazenamento
                                </h4>
                                <p className="leading-relaxed">
                                    Seus dados são armazenados em servidores seguros, com medidas técnicas 
                                    e administrativas para protegê-los de acessos não autorizados. 
                                    Manteremos seus dados apenas pelo tempo necessário para cumprir 
                                    as finalidades para as quais foram coletados.
                                </p>
                            </div>
                            
                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                {/* [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-300 */}
                                <p className="text-sm text-slate-300 italic">
                                    Última atualização: {new Date().toLocaleDateString('pt-BR')}. Esta política pode ser alterada, 
                                    e notificaremos sobre mudanças significativas.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-slate-800/50 p-4 border-t border-slate-700">
                            <button 
                                onClick={() => setShowPrivacy(false)}
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