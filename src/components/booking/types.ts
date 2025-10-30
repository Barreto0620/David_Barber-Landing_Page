/**
 * Tipos para componentes de agendamento
 */

export interface Service {
    id: number;
    name: string;
    price: number;
    duration_minutes: number;
    description: string;
}

export interface Professional {
    id: string;
    full_name: string;
}

export interface Appointment {
    id: string;
    professional_id: string;
    scheduled_date: string;
    status: string;
    service_type: string;
    client_id: string;
}
