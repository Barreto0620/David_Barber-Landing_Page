import { useState, useMemo, useCallback } from "react";
import { ChevronRight } from "lucide-react";

interface DateSelectorProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
}

/**
 * Componente para seleção de data no modal de agendamento
 * Exibe calendário com navegação entre meses
 */
export const DateSelector = ({ selectedDate, setSelectedDate }: DateSelectorProps) => {
    const today = useMemo(() => new Date(), []);
    const [viewDate, setViewDate] = useState(today);

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

            const isSelectable = date.getTime() >= today.setHours(0, 0, 0, 0);

            days.push({
                day: d,
                dateString: dateString,
                isCurrentMonth: true,
                isSelectable: isSelectable,
                isSelected: selectedDate === dateString,
                isToday: isCurrentMonth && d === today.getDate(),
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            });
        }

        return days;
    }, [viewDate, today, totalDays, startDayIndex, selectedDate]);

    const calendarDays = getCalendarDays();

    const handleMonthChange = (direction: 'prev' | 'next') => {
        setViewDate(prevDate => {
            const newDate = new Date(prevDate.getTime());
            newDate.setMonth(prevDate.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
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
                <span className="text-white font-bold text-lg capitalize">
                    {monthYearFormat.replace(/ de /g, ' ')}
                </span>
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
                {calendarDays.map((dayData, index) => (
                    <button
                        key={index}
                        onClick={() => dayData.day && setSelectedDate(dayData.dateString)}
                        disabled={!dayData.isSelectable}
                        className={`
                            h-10 w-full flex items-center justify-center rounded-full font-semibold text-sm transition-all duration-200
                            ${!dayData.day || !dayData.isSelectable ? 'text-slate-600 cursor-default' : ''}
                            ${dayData.isSelectable ? 'hover:bg-amber-500/10 hover:text-amber-400' : ''}
                            ${dayData.isSelected ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' : ''}
                            ${dayData.isToday && !dayData.isSelected ? 'border-2 border-amber-500 text-amber-400' : ''}
                            ${dayData.isWeekend && !dayData.isSelected ? 'text-red-300' : 'text-white'}
                            ${!dayData.day ? 'invisible' : ''}
                        `}
                    >
                        {dayData.day}
                    </button>
                ))}
            </div>
        </div>
    );
};
