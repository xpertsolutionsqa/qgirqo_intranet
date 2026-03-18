import React from 'react';
import dayjs from 'dayjs';

interface Event {
    id: number;
    title: string;
    event_date: string;
    event_time?: string;
    event_end_time?: string;
    event_venue?: string;
    featured_image?: string;
}

export default function EventCard({
    event,
    onAddCalendar
}: {
    event: Event,
    onAddCalendar: (event: any) => void
}) {
    const date = dayjs(event.event_date);

    // Format time if it exists
    const timeRange = event.event_time
        ? `${dayjs(event.event_time).format('h:mmA')}${event.event_end_time ? ' - ' + dayjs(event.event_end_time).format('h:mmA') : ''}`
        : 'Time TBD';

    return (
        <div className="w-full md:w-1/2 p-3">
            <article className="group flex h-full overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-all hover:shadow-md">
                {/* Date Box */}
                <div className="bg-primary flex w-20 flex-col items-center justify-center text-white shrink-0">
                    <span className="text-2xl font-black leading-none">{date.format('DD')}</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest opacity-80 mt-1">{date.format('MMM')}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-4">
                    <h3 className="mb-2 text-[15px] font-bold text-black group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                    </h3>

                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[12px] text-gray-500">
                            <i className="fa-regular fa-clock text-primary/60"></i>
                            <span>{timeRange}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-gray-500">
                            <i className="fa-regular fa-location-dot text-primary/60"></i>
                            <span className="line-clamp-1">{event.event_venue || 'TBA'}</span>
                        </div>
                    </div>
                </div>

                {/* Calendar Add Icon (Visual only for now) */}
                <div className="p-4 flex items-start">
                    <button
                        onClick={() => onAddCalendar(event)}
                        className="text-secondary opacity-40 hover:opacity-100 transition-opacity"
                        title="Add to Calendar"
                    >
                        <i className="fa-duotone fa-calendar-plus text-xl"></i>
                    </button>
                </div>
            </article>
        </div>
    );
}
