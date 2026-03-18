import React, { useState } from 'react';
import dayjs from 'dayjs';

interface Props {
    events: any[];
    onAddCalendar: (event: any) => void;
}

export default function EventCalendarView({ events = [], onAddCalendar }: Props) {
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const daysInMonth = currentMonth.daysInMonth();

    // Calculate empty slots before the 1st of the month
    const emptyDaysBefore = startOfMonth.day();

    const days = [];
    for (let i = 0; i < emptyDaysBefore; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    // Function to get events for a specific day
    const getEventsForDay = (day: number) => {
        const dateStr = currentMonth.date(day).format('YYYY-MM-DD');
        return events.filter(e => dayjs(e.event_date).format('YYYY-MM-DD') === dateStr);
    };

    return (
        <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                <button
                    onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
                    className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h2 className="text-xl font-bold uppercase tracking-widest text-black">
                    {currentMonth.format('MMMM YYYY')}
                </h2>
                <button
                    onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
                    className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 border-b border-gray-100">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="py-3 text-center text-[11px] font-black uppercase tracking-tighter text-gray-400">
                        {d}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7">
                {days.map((day, idx) => {
                    const dayEvents = day ? getEventsForDay(day) : [];
                    const isToday = day && currentMonth.date(day).isSame(dayjs(), 'day');

                    return (
                        <div key={idx} className={`min-h-[120px] border-b border-r border-gray-100 p-2 transition-colors ${day ? 'hover:bg-gray-50/50' : 'bg-gray-50/20'}`}>
                            {day && (
                                <>
                                    <div className="flex justify-end mb-2">
                                        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${isToday ? 'bg-primary text-white shadow-md' : 'text-black/40'}`}>
                                            {day}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        {dayEvents.map(event => (
                                            <div key={event.id} className="group relative cursor-pointer">
                                                <div className="bg-primary/10 hover:bg-primary/20 p-1.5 rounded-md text-[10px] font-bold text-primary truncate transition-colors flex items-center justify-between gap-1">
                                                    <span className="truncate">{event.title}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onAddCalendar(event);
                                                        }}
                                                        className="shrink-0 text-primary/40 hover:text-primary transition-colors"
                                                    >
                                                        <i className="fa-solid fa-calendar-plus text-[10px]"></i>
                                                    </button>
                                                </div>
                                                {/* Tooltip or Popover logic could go here */}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
