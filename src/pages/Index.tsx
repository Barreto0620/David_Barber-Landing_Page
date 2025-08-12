import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";
import { BookingFlow } from "@/components/BookingFlow";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Team />
      <Footer />
      
      {/* Global Components */}
      <WhatsAppButton />
      <BookingFlow 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
};

export default Index;
