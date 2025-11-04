import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Service, Professional } from "./types";

interface TimeSelectorProps {
    selectedDate: string;
    selectedTime: string;
    setSelectedTime: (time: string) => void;
    selectedProfessional: Professional | null;
    selectedService: Service | null;
}

/**
 * Componente para seleção de horário no modal de agendamento
 * Considera conflitos com agendamentos existentes e duração dos serviços
 */
export const TimeSelector = ({ 
    selectedDate, 
    selectedTime, 
    setSelectedTime, 
    selectedProfessional, 
    selectedService 
}: TimeSelectorProps) => {
    const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const allTimes = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", 
        "17:00", "17:30", "18:00"
    ];

    useEffect(() => {
        const fetchOccupiedTimes = async () => {
            if (!selectedDate || !selectedProfessional) {
                setOccupiedTimes([]);
                return;
            }

            setLoading(true);
            try {
                const [year, month, day] = selectedDate.split('-').map(Number);
                const startOfDay = new Date(year, month - 1, day, 0, 0, 0);
                const endOfDay = new Date(year, month - 1, day, 23, 59, 59);

                const { data, error } = await supabase
                    .from('appointments')
                    .select('scheduled_date, service_type, status')
                    .eq('professional_id', selectedProfessional.id)
                    .gte('scheduled_date', startOfDay.toISOString())
                    .lte('scheduled_date', endOfDay.toISOString())
                    .in('status', ['scheduled', 'in_progress']);

                if (error && error.code !== 'PGRST116') {
                    console.error('Erro ao buscar horários:', error);
                    setOccupiedTimes([]);
                    setLoading(false);
                    return;
                }

                // Buscar duração dos serviços
                const { data: servicesData } = await supabase
                    .from('services')
                    .select('name, duration_minutes');

                const servicesDurationMap = new Map(
                    (servicesData || []).map(s => [s.name, s.duration_minutes])
                );

                // Calcular TODOS os slots ocupados considerando a duração
                const allOccupiedSlots = new Set<string>();

                (data || []).forEach((appointment: any) => {
                    const utcDate = new Date(appointment.scheduled_date);
                    const startHours = utcDate.getHours();
                    const startMinutes = utcDate.getMinutes();
                    const serviceDuration = servicesDurationMap.get(appointment.service_type) || 30;

                    // Marcar slot inicial
                    const startTime = `${startHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`;
                    allOccupiedSlots.add(startTime);

                    // Marcar todos os slots seguintes necessários
                    for (let offset = 30; offset < serviceDuration; offset += 30) {
                        const totalMinutes = startHours * 60 + startMinutes + offset;
                        const hours = Math.floor(totalMinutes / 60);
                        const minutes = totalMinutes % 60;
                        const timeSlot = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                        allOccupiedSlots.add(timeSlot);
                    }
                });

                setOccupiedTimes(Array.from(allOccupiedSlots));
            } catch (err) {
                console.error('Erro:', err);
                setOccupiedTimes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOccupiedTimes();
    }, [selectedDate, selectedProfessional]);

    const isTimePassed = (time: string): boolean => {
        if (!selectedDate) return false;

        const now = new Date();
        const [year, month, day] = selectedDate.split('-').map(Number);
        const [hours, minutes] = time.split(':').map(Number);

        const selectedDateTime = new Date(year, month - 1, day, hours, minutes, 0);
        const nowPlus30Min = new Date(now.getTime() + 30 * 60 * 1000);

        return selectedDateTime <= nowPlus30Min;
    };

    const getAvailableTimes = () => {
        if (!selectedService) return allTimes;

        const serviceDuration = selectedService.duration_minutes;

        return allTimes.filter(time => {
            if (isTimePassed(time)) return false;
            if (occupiedTimes.includes(time)) return false;

            // Verificar se TODOS os slots necessários estão livres
            const [hours, minutes] = time.split(':').map(Number);
            const timeInMinutes = hours * 60 + minutes;

            for (let offset = 30; offset < serviceDuration; offset += 30) {
                const nextTimeInMinutes = timeInMinutes + offset;
                const nextHours = Math.floor(nextTimeInMinutes / 60);
                const nextMinutes = nextTimeInMinutes % 60;
                const nextTime = `${nextHours.toString().padStart(2, '0')}:${nextMinutes.toString().padStart(2, '0')}`;

                if (occupiedTimes.includes(nextTime) || !allTimes.includes(nextTime)) {
                    return false;
                }
            }

            return true;
        });
    };

    const availableTimes = getAvailableTimes();

    if (!selectedDate) {
        return (
            <div className="text-center py-8 bg-slate-800/50 rounded-lg border border-slate-700">
                <Clock className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Selecione uma data no calendário acima</p>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-400" />
                    Horário
                </span>
                {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-amber-500 border-t-transparent"></div>
                )}
            </h3>
            
            {availableTimes.length === 0 && !loading ? (
                <div className="text-center py-8 bg-amber-500/10 rounded-lg border border-amber-500/30">
                    <p className="text-amber-400 font-semibold">Não há horários disponíveis para esta data</p>
                    <p className="text-sm text-slate-400 mt-1">Escolha outro dia no calendário</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {allTimes.map((time) => {
                            const isPassed = isTimePassed(time);
                            const isAvailable = availableTimes.includes(time);
                            const isOccupied = occupiedTimes.includes(time);

                            return (
                                <button
                                    key={time}
                                    onClick={() => isAvailable && !isPassed && setSelectedTime(time)}
                                    disabled={!isAvailable || isPassed}
                                    className={`
                                        p-2.5 sm:p-3 border-2 rounded-xl font-bold text-sm transition-all duration-300 relative
                                        ${!isAvailable || isPassed 
                                            ? 'opacity-50 cursor-not-allowed bg-slate-800 border-slate-700 text-slate-500' 
                                            : 'cursor-pointer hover:scale-105 active:scale-95'
                                        }
                                        ${(isOccupied || isPassed) && selectedDate 
                                            ? 'bg-red-900/20 border-red-700 text-red-400' 
                                            : ''
                                        }
                                        ${selectedTime === time && isAvailable && !isPassed 
                                            ? 'border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105' 
                                            : isAvailable && !isPassed 
                                                ? 'border-slate-700 text-slate-300 hover:border-amber-400 hover:bg-slate-800' 
                                                : ''
                                        }
                                    `}
                                >
                                    {time}
                                    {(isOccupied || isPassed) && (
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between text-xs bg-slate-800/50 rounded-lg p-2">
                        <p className="text-slate-400">
                            <span className="font-semibold text-green-400">{availableTimes.length}</span> disponíveis
                        </p>
                        <p className="text-slate-500">
                            {allTimes.length - availableTimes.length} ocupados
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};