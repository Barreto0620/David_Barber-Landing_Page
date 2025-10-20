import { useState, useEffect } from 'react';
import { Cookie, Check } from 'lucide-react';

export const CookieConsent = () => {
  // Define uma chave única para o localStorage do seu site
  const CONSENT_KEY = 'davidbarber_cookie_consent_v1';
  const [showBanner, setShowBanner] = useState(false);

  // 1. Verifica o localStorage quando o componente carregar
  useEffect(() => {
    const hasConsented = localStorage.getItem(CONSENT_KEY);
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  // 2. Ação ao clicar em "Aceitar"
  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setShowBanner(false);
  };

  // 3. NOVO: Ação para abrir o popout de Política de Privacidade no Footer
  const handleOpenPrivacy = () => {
    // Dispara um evento customizado no nível da window
    // O Footer irá "escutar" este evento e abrir seu modal
    window.dispatchEvent(new CustomEvent('OPEN_PRIVACY_MODAL'));
  };

  // 4. Se já aceitou, não renderiza nada
  if (!showBanner) {
    return null;
  }

  // 5. Renderiza o banner
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t-2 border-amber-500 shadow-2xl z-50 p-6 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Texto e Informação */}
        <div className="flex items-start gap-4">
          <Cookie className="h-8 w-8 text-amber-400 flex-shrink-0 mt-1" />
          <div className="text-slate-300">
            <h4 className="text-lg font-semibold text-white">Nós valorizamos sua privacidade</h4>
            <p className="text-sm leading-relaxed max-w-lg">
              Este site utiliza cookies essenciais para garantir o seu correto funcionamento e cookies de 
              análise para entender como você interage com ele. Para mais detalhes, consulte nossa 
              <button 
                onClick={handleOpenPrivacy} // ATUALIZADO: Chama a nova função de evento
                className="text-amber-400 underline hover:text-orange-500 transition-colors mx-1 font-semibold"
              >
                Política de Privacidade
              </button>.
            </p>
          </div>
        </div>
        
        {/* Botão de Aceite */}
        <button 
          onClick={handleAccept}
          className="w-full md:w-auto py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex-shrink-0 flex items-center justify-center gap-2"
        >
          <Check className="h-5 w-5" />
          Aceitar e Fechar
        </button>
      </div>
    </div>
  );
};