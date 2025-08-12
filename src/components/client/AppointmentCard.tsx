import { Calendar, Clock, User, MapPin, Phone, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  professional: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  showActions?: boolean;
}

export const AppointmentCard = ({ appointment, showActions = true }: AppointmentCardProps) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCancelAppointment = () => {
    // Handle appointment cancellation
    console.log('Cancelling appointment:', appointment.id);
  };

  const handleRescheduleAppointment = () => {
    // Handle appointment rescheduling
    console.log('Rescheduling appointment:', appointment.id);
  };

  const isUpcoming = appointment.status === 'confirmed' || appointment.status === 'pending';
  const isPast = appointment.status === 'completed' || appointment.status === 'cancelled';

  return (
    <Card className="card-service hover:border-primary/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3 flex-1">
            {/* Service and Status */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{appointment.service}</h3>
              {getStatusBadge(appointment.status)}
            </div>

            {/* Date and Time */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="capitalize">{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{appointment.time}</span>
              </div>
            </div>

            {/* Professional */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>com {appointment.professional}</span>
            </div>

            {/* Price */}
            <div className="text-xl font-bold text-primary">
              {appointment.price}
            </div>
          </div>

          {/* Actions */}
          {showActions && isUpcoming && (
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRescheduleAppointment}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Reagendar
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2 text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar Agendamento</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
                      <br /><br />
                      <strong>Serviço:</strong> {appointment.service}<br />
                      <strong>Data:</strong> {formatDate(appointment.date)} às {appointment.time}<br />
                      <strong>Profissional:</strong> {appointment.professional}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Manter Agendamento</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleCancelAppointment}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Sim, Cancelar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          {/* Contact Actions for Upcoming */}
          {showActions && isUpcoming && (
            <div className="flex gap-2 pt-2 sm:pt-0">
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Contatar
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                Localização
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};