import React from 'react';
import EventCard from './EventCard';

interface Props {
    events: any[];
}

export default function EventListView({ events = [] }: Props) {
    return (
        <div className="flex flex-wrap -mx-3">
            {events.length > 0 ? (
                events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))
            ) : (
                <div className="w-full py-20 text-center">
                    <div className="mb-4 text-5xl text-gray-200">
                        <i className="fa-light fa-calendar-circle-exclamation"></i>
                    </div>
                    <p className="text-gray-400 text-lg">No events found for the selected filters.</p>
                </div>
            )}
        </div>
    );
}
