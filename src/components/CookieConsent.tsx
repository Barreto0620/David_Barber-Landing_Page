import { useState, useEffect } from 'react';
import { Cookie, Check } from 'lucide-react';

export const CookieConsent = () => {
  const CONSENT_KEY = 'davidbarber_cookie_consent_v1';
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem(CONSENT_KEY);
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setShowBanner(false);
  };

  const handleOpenPrivacy = () => {
    window.dispatchEvent(new CustomEvent('OPEN_PRIVACY_MODAL'));
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t-2 border-amber-500 shadow-2xl z-50 p-6 animate-in slide-in-from-bottom duration-500"
      role="dialog"
      aria-modal="true" // CORREÇÃO ARIA: Adicionado aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Texto e Informação */}
        <div className="flex items-start gap-4">
          <Cookie className="h-8 w-8 text-amber-400 flex-shrink-0 mt-1" aria-hidden="true" />
          <div className="text-slate-200">
            {/* [CORREÇÃO 1.2.3.4] H3 - Título do Banner (Alterado de h2) */}
            <h3 id="cookie-consent-title" className="text-lg font-semibold text-white">
              Nós valorizamos sua privacidade
            </h3>
            <p id="cookie-consent-description" className="text-sm leading-relaxed max-w-lg">
              Este site utiliza cookies essenciais para garantir o seu correto funcionamento e cookies de 
              análise para entender como você interage com ele. Para mais detalhes, consulte nossa 
              <button 
                onClick={handleOpenPrivacy}
                className="text-amber-400 underline hover:text-orange-500 transition-colors mx-1 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-1 -mx-1" // CORREÇÃO FOCO
                aria-label="Abrir Política de Privacidade"
              >
                Política de Privacidade
              </button>.
            </p>
          </div>
        </div>
        
        {/* Botão de Aceite */}
        <button 
          onClick={handleAccept}
          // CORREÇÃO FOCO DE TECLADO
          className="w-full md:w-auto py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex-shrink-0 flex items-center justify-center gap-2 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
          aria-label="Aceitar cookies e fechar aviso"
        >
          <Check className="h-5 w-5" />
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
};