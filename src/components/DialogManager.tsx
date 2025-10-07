// src/components/DialogManager.tsx

import { useState, useEffect } from 'react';
import { BookingFlow } from './BookingFlow'; // Assumindo o import

export const DialogManager = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        // Função para abrir o modal
        const openBookingHandler = () => {
            setIsBookingOpen(true);
        };

        // Adiciona o listener para o evento global 'openBooking'
        window.addEventListener('openBooking', openBookingHandler);

        // Limpeza do listener
        return () => {
            window.removeEventListener('openBooking', openBookingHandler);
        };
    }, []);

    // Função para fechar o modal
    const handleCloseBooking = () => {
        setIsBookingOpen(false);
    };

    return (
        <>
            {/* Outros componentes da página principal iriam aqui, como Header, Footer, etc. */}
            
            {/* O componente BookingFlow é renderizado, mas sua visibilidade é controlada pelo estado */}
            <BookingFlow 
                isOpen={isBookingOpen} 
                onClose={handleCloseBooking} 
            />
        </>
    );
};