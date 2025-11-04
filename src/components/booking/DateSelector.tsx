import { useState, useMemo, useCallback, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Service, Professional } from "./types";

interface DateSelectorProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedProfessional: Professional | null;
    selectedService: Service | null;
}

interface DayAvailability {
    date: string;
    availableSlots: number;
    totalSlots: number;
}

/**
 * Componente para seleção de data no modal de agendamento
 * Exibe calendário com navegação entre meses e indicadores de disponibilidade
 */
export const DateSelector = ({ 
    selectedDate, 
    setSelectedDate,
    selectedProfessional,
    selectedService 
}: DateSelectorProps) => {
    const today = useMemo(() => new Date(), []);
    const [viewDate, setViewDate] = useState(today);
    const [daysAvailability, setDaysAvailability] = useState<Map<string, DayAvailability>>(new Map());
    const [loading, setLoading] = useState(false);

    const allTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

    // Buscar disponibilidade do mês inteiro
    useEffect(() => {
        const fetchMonthAvailability = async () => {
            if (!selectedProfessional || !selectedService) {
                setDaysAvailability(new Map());
                return;
            }

            setLoading(true);
            try {
                const year = viewDate.getFullYear();
                const month = viewDate.getMonth();

                // Primeiro e último dia do mês
                const firstDay = new Date(year, month, 1, 0, 0, 0);
                const lastDay = new Date(year, month + 1, 0, 23, 59, 59);

                // Buscar todos os agendamentos do mês
                const { data, error } = await supabase
                    .from('appointments')
                    .select('scheduled_date, service_type, status')
                    .eq('professional_id', selectedProfessional.id)
                    .gte('scheduled_date', firstDay.toISOString())
                    .lte('scheduled_date', lastDay.toISOString())
                    .in('status', ['scheduled', 'in_progress']);

                if (error && error.code !== 'PGRST116') {
                    console.error('Erro ao buscar agendamentos:', error);
                    setDaysAvailability(new Map());
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

                // Organizar agendamentos por data
                const appointmentsByDate = new Map<string, Set<string>>();

                (data || []).forEach((appointment: any) => {
                    const utcDate = new Date(appointment.scheduled_date);
                    const dateKey = `${utcDate.getFullYear()}-${String(utcDate.getMonth() + 1).padStart(2, '0')}-${String(utcDate.getDate()).padStart(2, '0')}`;
                    
                    if (!appointmentsByDate.has(dateKey)) {
                        appointmentsByDate.set(dateKey, new Set());
                    }

                    const startHours = utcDate.getHours();
                    const startMinutes = utcDate.getMinutes();
                    const serviceDuration = servicesDurationMap.get(appointment.service_type) || 30;

                    // Marcar slot inicial
                    const startTime = `${startHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`;
                    appointmentsByDate.get(dateKey)!.add(startTime);

                    // Marcar slots seguintes necessários
                    for (let offset = 30; offset < serviceDuration; offset += 30) {
                        const totalMinutes = startHours * 60 + startMinutes + offset;
                        const hours = Math.floor(totalMinutes / 60);
                        const minutes = totalMinutes % 60;
                        const timeSlot = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                        appointmentsByDate.get(dateKey)!.add(timeSlot);
                    }
                });

                // Calcular disponibilidade para cada dia do mês
                const availability = new Map<string, DayAvailability>();
                const daysInMonth = new Date(year, month + 1, 0).getDate();

                for (let day = 1; day <= daysInMonth; day++) {
                    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const occupiedSlots = appointmentsByDate.get(dateKey) || new Set();
                    
                    // Verificar se a data já passou
                    const dateToCheck = new Date(year, month, day, 23, 59, 59);
                    const now = new Date();
                    
                    if (dateToCheck < now) {
                        availability.set(dateKey, {
                            date: dateKey,
                            availableSlots: 0,
                            totalSlots: allTimes.length
                        });
                        continue;
                    }

                    // Calcular slots disponíveis considerando duração do serviço
                    const serviceDuration = selectedService.duration_minutes;
                    let availableCount = 0;

                    for (const time of allTimes) {
                        // Verificar se horário já passou (apenas para hoje)
                        if (dateToCheck.toDateString() === now.toDateString()) {
                            const [hours, minutes] = time.split(':').map(Number);
                            const timeDate = new Date(year, month, day, hours, minutes, 0);
                            const nowPlus30 = new Date(now.getTime() + 30 * 60 * 1000);
                            
                            if (timeDate <= nowPlus30) {
                                continue;
                            }
                        }

                        // Verificar se o slot inicial está ocupado
                        if (occupiedSlots.has(time)) {
                            continue;
                        }

                        // Verificar se todos os slots necessários estão livres
                        const [hours, minutes] = time.split(':').map(Number);
                        const timeInMinutes = hours * 60 + minutes;
                        let isAvailable = true;

                        for (let offset = 30; offset < serviceDuration; offset += 30) {
                            const nextTimeInMinutes = timeInMinutes + offset;
                            const nextHours = Math.floor(nextTimeInMinutes / 60);
                            const nextMinutes = nextTimeInMinutes % 60;
                            const nextTime = `${nextHours.toString().padStart(2, '0')}:${nextMinutes.toString().padStart(2, '0')}`;

                            if (occupiedSlots.has(nextTime) || !allTimes.includes(nextTime)) {
                                isAvailable = false;
                                break;
                            }
                        }

                        if (isAvailable) {
                            availableCount++;
                        }
                    }

                    availability.set(dateKey, {
                        date: dateKey,
                        availableSlots: availableCount,
                        totalSlots: allTimes.length
                    });
                }

                setDaysAvailability(availability);
            } catch (err) {
                console.error('Erro ao calcular disponibilidade:', err);
                setDaysAvailability(new Map());
            } finally {
                setLoading(false);
            }
        };

        fetchMonthAvailability();
    }, [viewDate, selectedProfessional, selectedService]);

    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const lastDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    const startDayIndex = firstDayOfMonth.getDay();

    const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    const getCalendarDays = useCallback(() => {
        const days = [];
        const isCurrentMonth = viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear();

        for (let i = 0; i < startDayIndex; i++) {
            days.push({ day: null, isCurrentMonth: false, isSelectable: false });
        }

        for (let d = 1; d <= totalDays; d++) {
            const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
            const dateString = date.toISOString().split('T')[0];
            const availability = daysAvailability.get(dateString);

            const isSelectable = date.getTime() >= today.setHours(0, 0, 0, 0) && 
                                (!availability || availability.availableSlots > 0);

            days.push({
                day: d,
                dateString: dateString,
                isCurrentMonth: true,
                isSelectable: isSelectable,
                isSelected: selectedDate === dateString,
                isToday: isCurrentMonth && d === today.getDate(),
                isWeekend: date.getDay() === 0 || date.getDay() === 6,
                availability: availability
            });
        }

        return days;
    }, [viewDate, today, totalDays, startDayIndex, selectedDate, daysAvailability]);

    const calendarDays = getCalendarDays();

    const handleMonthChange = (direction: 'prev' | 'next') => {
        setViewDate(prevDate => {
            const newDate = new Date(prevDate.getTime());
            newDate.setMonth(prevDate.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    const getAvailabilityClass = (availability?: DayAvailability) => {
        if (!availability || availability.availableSlots === 0) {
            return 'bg-red-900/20 border-red-700/50 text-red-400';
        }

        const percentage = (availability.availableSlots / availability.totalSlots) * 100;

        if (percentage > 60) {
            return 'bg-green-900/20 border-green-600/50 text-green-300';
        } else if (percentage > 30) {
            return 'bg-yellow-900/20 border-yellow-600/50 text-yellow-300';
        } else {
            return 'bg-orange-900/20 border-orange-600/50 text-orange-300';
        }
    };

    const monthYearFormat = viewDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    return (
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => handleMonthChange('prev')}
                    disabled={viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear()}
                    className="p-2 text-slate-400 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight className="h-5 w-5 rotate-180" />
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg capitalize">
                        {monthYearFormat.replace(/ de /g, ' ')}
                    </span>
                    {loading && (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-amber-500 border-t-transparent"></div>
                    )}
                </div>
                <button
                    onClick={() => handleMonthChange('next')}
                    className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center font-semibold text-sm text-slate-400 mb-2">
                {dayNames.map((day, index) => (
                    <span key={index} className={day === 'D' ? 'text-red-400' : ''}>{day}</span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((dayData, index) => {
                    const availabilityClass = dayData.availability ? getAvailabilityClass(dayData.availability) : '';
                    const hasAvailability = dayData.availability && dayData.availability.availableSlots > 0;

                    return (
                        <button
                            key={index}
                            onClick={() => dayData.day && dayData.isSelectable && setSelectedDate(dayData.dateString)}
                            disabled={!dayData.isSelectable}
                            className={`
                                h-10 w-full flex items-center justify-center rounded-lg font-semibold text-sm transition-all duration-200 relative border-2
                                ${!dayData.day || !dayData.isSelectable ? 'opacity-40 cursor-not-allowed border-slate-700' : ''}
                                ${dayData.isSelectable && !dayData.isSelected ? 'hover:scale-105 cursor-pointer' : ''}
                                ${dayData.isSelected ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 border-amber-500 scale-105' : ''}
                                ${dayData.isToday && !dayData.isSelected ? 'ring-2 ring-amber-500 ring-inset' : ''}
                                ${!dayData.isSelected && dayData.isSelectable && hasAvailability ? availabilityClass : ''}
                                ${!dayData.isSelected && dayData.isSelectable && !hasAvailability ? 'border-slate-700 text-slate-500' : ''}
                                ${!dayData.day ? 'invisible' : ''}
                            `}
                        >
                            <span className="relative z-10">{dayData.day}</span>
                            {dayData.availability && dayData.availability.availableSlots > 0 && !dayData.isSelected && dayData.isSelectable && (
                                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] flex items-center justify-center text-[9px] font-bold bg-slate-900 rounded-full border border-current px-1">
                                    {dayData.availability.availableSlots}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Legenda */}
            {selectedProfessional && selectedService && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-xs font-semibold text-slate-400 mb-2">Disponibilidade:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-green-900/40 border border-green-600/50"></div>
                            <span className="text-slate-400">Muitos horários</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-yellow-900/40 border border-yellow-600/50"></div>
                            <span className="text-slate-400">Poucos horários</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-orange-900/40 border border-orange-600/50"></div>
                            <span className="text-slate-400">Últimos horários</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-red-900/40 border border-red-700/50"></div>
                            <span className="text-slate-400">Sem horários</span>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">
                        Os números indicam quantos horários estão disponíveis
                    </p>
                </div>
            )}
        </div>
    );
};