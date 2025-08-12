import { useState } from "react";
import { Calendar, Clock, User, CreditCard, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientHeader } from "@/components/client/ClientHeader";
import { AppointmentCard } from "@/components/client/AppointmentCard";
import { BookingFlow } from "@/components/BookingFlow";
import { ProfileSettings } from "@/components/client/ProfileSettings";
import { LoyaltyCard } from "@/components/client/LoyaltyCard";
import { RealtimeStatus } from "@/components/RealtimeStatus";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Mock user data
  const user = {
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    loyaltyPoints: 150,
    nextAppointment: {
      id: "1",
      date: "2024-08-15",
      time: "14:30",
      service: "Corte + Barba",
      professional: "Carlos Silva",
      status: "confirmed"
    }
  };

  const upcomingAppointments = [
    {
      id: "1",
      date: "2024-08-15",
      time: "14:30",
      service: "Corte + Barba",
      professional: "Carlos Silva",
      status: "confirmed" as const,
      price: "R$ 85,00"
    },
    {
      id: "2",
      date: "2024-08-22",
      time: "16:00",
      service: "Corte Clássico",
      professional: "Ana Costa",
      status: "confirmed" as const,
      price: "R$ 45,00"
    }
  ];

  const appointmentHistory = [
    {
      id: "3",
      date: "2024-07-18",
      time: "15:00",
      service: "Corte Premium",
      professional: "Carlos Silva",
      status: "completed" as const,
      price: "R$ 75,00"
    },
    {
      id: "4",
      date: "2024-06-20",
      time: "14:00",
      service: "Corte + Barba",
      professional: "Ana Costa",
      status: "completed" as const,
      price: "R$ 85,00"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ClientHeader user={user} />
      
      {/* Real-time Status Indicator */}
      <RealtimeStatus />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Olá, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie seus agendamentos e perfil
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button 
              className="btn-hero"
              onClick={() => setIsBookingOpen(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Agora
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximo Agendamento</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {user.nextAppointment ? (
                <>
                  <div className="text-2xl font-bold">Amanhã</div>
                  <p className="text-xs text-muted-foreground">
                    {user.nextAppointment.time} - {user.nextAppointment.service}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground">Nenhum agendamento</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pontos de Fidelidade</CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.loyaltyPoints}</div>
              <p className="text-xs text-muted-foreground">
                <Badge variant="secondary">50 pontos = desconto</Badge>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <User className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ativo</div>
              <p className="text-xs text-muted-foreground">
                <Badge variant="default">Cliente VIP</Badge>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="loyalty">Fidelidade</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Agendamentos</CardTitle>
                  <CardDescription>
                    Seus agendamentos confirmados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((appointment) => (
                      <AppointmentCard 
                        key={appointment.id} 
                        appointment={appointment}
                        showActions={true}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
                      <Button 
                        className="mt-4 btn-hero"
                        onClick={() => setIsBookingOpen(true)}
                      >
                        Agendar Agora
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Agendamentos</CardTitle>
                <CardDescription>
                  Seus agendamentos anteriores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointmentHistory.map((appointment) => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment}
                    showActions={false}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty">
            <LoyaltyCard points={user.loyaltyPoints} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSettings user={user} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Global Booking Flow */}
      <BookingFlow 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
};

export default ClientDashboard;