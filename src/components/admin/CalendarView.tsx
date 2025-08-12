import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

interface CalendarAppointment {
  id: string;
  clientName: string;
  service: string;
  professional: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  date: string;
}

const mockAppointments: CalendarAppointment[] = [
  {
    id: "1",
    clientName: "João Silva",
    service: "Corte + Barba",
    professional: "Carlos Silva",
    startTime: "14:30",
    endTime: "15:20",
    status: "confirmed",
    date: "2024-08-15"
  },
  {
    id: "2",
    clientName: "Maria Santos",
    service: "Corte Feminino",
    professional: "Ana Costa",
    startTime: "15:00",
    endTime: "16:00",
    status: "pending",
    date: "2024-08-15"
  },
  {
    id: "3",
    clientName: "Pedro Oliveira",
    service: "Corte Premium",
    professional: "Carlos Silva",
    startTime: "16:00",
    endTime: "17:00",
    status: "confirmed",
    date: "2024-08-15"
  },
  {
    id: "4",
    clientName: "Ana Rodrigues",
    service: "Corte Clássico",
    professional: "Ana Costa",
    startTime: "10:00",
    endTime: "10:30",
    status: "completed",
    date: "2024-08-16"
  }
];

export const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [selectedProfessional, setSelectedProfessional] = useState<string>('all');

  const formatSelectedDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getAppointmentsForDate = (date: string) => {
    return mockAppointments.filter(appointment => {
      if (appointment.date !== date) return false;
      if (selectedProfessional !== 'all' && appointment.professional !== selectedProfessional) return false;
      return true;
    });
  };

  const getStatusColor = (status: CalendarAppointment['status']) => {
    const colors = {
      pending: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      confirmed: 'bg-blue-100 border-blue-300 text-blue-800',
      completed: 'bg-green-100 border-green-300 text-green-800',
      cancelled: 'bg-gray-100 border-gray-300 text-gray-800'
    };
    return colors[status];
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 19; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const selectedDateString = formatSelectedDate(selectedDate);
  const appointmentsForSelectedDate = getAppointmentsForDate(selectedDateString);
  const timeSlots = getTimeSlots();
  const professionals = ['all', ...new Set(mockAppointments.map(a => a.professional))];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h3 className="text-lg font-semibold">
            {selectedDate.toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h3>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os profissionais</SelectItem>
              {professionals.slice(1).map(professional => (
                <SelectItem key={professional} value={professional}>
                  {professional}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            onClick={() => setSelectedDate(new Date())}
          >
            Hoje
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mini Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Navegação</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border p-3 pointer-events-auto"
            />
          </CardContent>
        </Card>

        {/* Day View */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Agendamentos do Dia</CardTitle>
            <CardDescription>
              {appointmentsForSelectedDate.length} agendamento(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timeSlots.map((timeSlot) => {
                const appointment = appointmentsForSelectedDate.find(
                  app => app.startTime === timeSlot
                );
                
                return (
                  <div key={timeSlot} className="flex items-center gap-4 py-2 border-b last:border-b-0">
                    <div className="w-16 text-sm text-muted-foreground font-mono">
                      {timeSlot}
                    </div>
                    
                    <div className="flex-1">
                      {appointment ? (
                        <div className={`p-3 rounded-lg border-l-4 ${getStatusColor(appointment.status)}`}>
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="font-medium">{appointment.clientName}</div>
                              <div className="text-sm">{appointment.service}</div>
                              <div className="flex items-center gap-2 text-xs">
                                <User className="h-3 w-3" />
                                {appointment.professional}
                                <Clock className="h-3 w-3 ml-2" />
                                {appointment.startTime} - {appointment.endTime}
                              </div>
                            </div>
                            
                            <Badge variant="outline" className="text-xs">
                              {appointment.status === 'pending' && 'Pendente'}
                              {appointment.status === 'confirmed' && 'Confirmado'}
                              {appointment.status === 'completed' && 'Concluído'}
                              {appointment.status === 'cancelled' && 'Cancelado'}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="text-muted-foreground text-sm italic">
                          Horário disponível
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {appointmentsForSelectedDate.filter(a => a.status === 'confirmed').length}
              </div>
              <div className="text-sm text-muted-foreground">Confirmados</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {appointmentsForSelectedDate.filter(a => a.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {appointmentsForSelectedDate.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">Concluídos</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">
                {timeSlots.length - appointmentsForSelectedDate.length}
              </div>
              <div className="text-sm text-muted-foreground">Disponíveis</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};