import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { GlobalStyles } from "@/components/shared/GlobalStyles";
import { SuccessToast } from "@/components/shared/SuccessToast";
import { BookingModal } from "@/components/booking/BookingModal";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { HeaderActions } from "./HeaderActions";

/**
 * Componente Header simplificado e modular
 * Gerencia navegação, menu mobile e modal de agendamento
 */
export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const user = null;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const openBooking = () => setIsBookingOpen(true);
    const closeBooking = () => setIsBookingOpen(false);

    useEffect(() => {
        (window as any).openBookingModal = () => setIsBookingOpen(true);
        const handleOpenBooking = () => setIsBookingOpen(true);
        window.addEventListener('openBooking', handleOpenBooking);

        return () => {
            window.removeEventListener('openBooking', handleOpenBooking);
            delete (window as any).openBookingModal;
        };
    }, []);

    const smoothScrollTo = (id: string) => {
        // Se for 'home', rola para o topo
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMenuOpen(false);
            return;
        }

        // Para outros IDs, busca o elemento
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMenuOpen(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <GlobalStyles />
            <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
                <nav className="container mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14 sm:h-16">
                        {/* Logo */}
                        <div
                            className="flex-shrink-0 cursor-pointer group"
                            onClick={scrollToTop}
                        >
                            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                                David Barber
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <DesktopNav onNavigate={smoothScrollTo} />

                        {/* Desktop Actions */}
                        <HeaderActions user={user} onBookingOpen={openBooking} />

                        {/* Mobile Actions */}
                        <HeaderActions user={user} onBookingOpen={openBooking} isMobile />

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 text-white hover:text-amber-400 transition-colors"
                        >
                            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <MobileNav isOpen={isMenuOpen} onNavigate={smoothScrollTo} />
                </nav>
            </header>

            <BookingModal isOpen={isBookingOpen} onClose={closeBooking} setSuccessMessage={setSuccessMessage} />
            <SuccessToast message={successMessage} setMessage={setSuccessMessage} />
        </>
    );
};
