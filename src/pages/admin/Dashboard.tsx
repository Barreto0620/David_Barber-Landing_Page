import { useState } from "react";
import { Calendar, Users, Clock, TrendingUp, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";
import { StaffManagement } from "@/components/admin/StaffManagement";
import { ServicesManagement } from "@/components/admin/ServicesManagement";
import { CalendarView } from "@/components/admin/CalendarView";
import { RealtimeStatus } from "@/components/RealtimeStatus";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for dashboard stats
  const stats = {
    todayAppointments: 12,
    weekRevenue: 2850,
    activeStaff: 4,
    pendingBookings: 3
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      {/* Real-time Status Indicator */}
      <RealtimeStatus />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Dashboard Admin
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie agendamentos, funcionários e serviços
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="staff">Funcionários</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
                  <Calendar className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.todayAppointments}</div>
                  <p className="text-xs text-muted-foreground">+2 desde ontem</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Semanal</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {stats.weekRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% da semana passada</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Funcionários Ativos</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeStaff}</div>
                  <p className="text-xs text-muted-foreground">Todos disponíveis</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingBookings}</div>
                  <p className="text-xs text-muted-foreground">
                    <Badge variant="secondary">Requer atenção</Badge>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos Recentes</CardTitle>
                <CardDescription>
                  Últimos agendamentos realizados hoje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentsTable limit={5} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Agendamentos</CardTitle>
                <CardDescription>
                  Visualize, edite e gerencie todos os agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Calendário de Agendamentos</CardTitle>
                <CardDescription>
                  Visualização em calendário de todos os agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarView />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Funcionários</CardTitle>
                <CardDescription>
                  Adicione, edite e gerencie a equipe da barbearia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StaffManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Serviços</CardTitle>
                <CardDescription>
                  Configure serviços, preços e disponibilidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ServicesManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;