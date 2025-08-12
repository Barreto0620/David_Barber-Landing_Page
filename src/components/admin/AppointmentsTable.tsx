import { useState } from "react";
import { Calendar, Clock, User, Phone, MoreHorizontal, Check, X, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
}

interface AppointmentsTableProps {
  limit?: number;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    clientName: "João Silva",
    clientPhone: "(11) 99999-9999",
    clientEmail: "joao@email.com",
    service: "Corte + Barba",
    professional: "Carlos Silva",
    date: "2024-08-15",
    time: "14:30",
    status: "confirmed",
    price: 85,
    notes: "Cliente prefere barba mais baixa"
  },
  {
    id: "2",
    clientName: "Maria Santos",
    clientPhone: "(11) 88888-8888",
    clientEmail: "maria@email.com",
    service: "Corte Feminino",
    professional: "Ana Costa",
    date: "2024-08-15",
    time: "15:00",
    status: "pending",
    price: 65
  },
  {
    id: "3",
    clientName: "Pedro Oliveira",
    clientPhone: "(11) 77777-7777",
    clientEmail: "pedro@email.com",
    service: "Corte Premium",
    professional: "Carlos Silva",
    date: "2024-08-15",
    time: "16:00",
    status: "confirmed",
    price: 75
  },
  {
    id: "4",
    clientName: "Ana Rodrigues",
    clientPhone: "(11) 66666-6666",
    clientEmail: "ana@email.com",
    service: "Corte Clássico",
    professional: "Ana Costa",
    date: "2024-08-16",
    time: "10:00",
    status: "completed",
    price: 45
  }
];

export const AppointmentsTable = ({ limit }: AppointmentsTableProps) => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filter, setFilter] = useState({
    status: "",
    professional: "",
    date: "",
    search: ""
  });

  const getStatusBadge = (status: Appointment['status']) => {
    const variants = {
      pending: 'destructive' as const,
      confirmed: 'default' as const,
      completed: 'secondary' as const,
      cancelled: 'outline' as const
    };

    const labels = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      completed: 'Concluído',
      cancelled: 'Cancelado'
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const updateAppointmentStatus = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  const filteredAppointments = appointments
    .filter(appointment => {
      if (filter.status && appointment.status !== filter.status) return false;
      if (filter.professional && appointment.professional !== filter.professional) return false;
      if (filter.date && appointment.date !== filter.date) return false;
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        return (
          appointment.clientName.toLowerCase().includes(searchLower) ||
          appointment.clientPhone.includes(filter.search) ||
          appointment.service.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .slice(0, limit);

  const professionals = [...new Set(appointments.map(a => a.professional))];

  return (
    <div className="space-y-4">
      {/* Filters */}
      {!limit && (
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Filtre os agendamentos para encontrar o que procura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <Input
                  placeholder="Nome, telefone ou serviço..."
                  value={filter.search}
                  onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select 
                  value={filter.status} 
                  onValueChange={(value) => setFilter(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os status</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Profissional</label>
                <Select 
                  value={filter.professional} 
                  onValueChange={(value) => setFilter(prev => ({ ...prev, professional: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os profissionais" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os profissionais</SelectItem>
                    {professionals.map(professional => (
                      <SelectItem key={professional} value={professional}>
                        {professional}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Data</label>
                <Input
                  type="date"
                  value={filter.date}
                  onChange={(e) => setFilter(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Profissional</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{appointment.clientName}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {appointment.clientPhone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{appointment.service}</div>
                  {appointment.notes && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {appointment.notes}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {appointment.professional}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {new Date(appointment.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {appointment.time}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(appointment.status)}
                </TableCell>
                <TableCell className="font-medium">
                  R$ {appointment.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {appointment.status === 'pending' && (
                        <DropdownMenuItem 
                          onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Confirmar
                        </DropdownMenuItem>
                      )}
                      {appointment.status === 'confirmed' && (
                        <DropdownMenuItem 
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Marcar como Concluído
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                        className="text-destructive"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancelar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
        </div>
      )}
    </div>
  );
};