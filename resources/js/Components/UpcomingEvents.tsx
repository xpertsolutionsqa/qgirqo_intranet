import { EventPost } from '@/interfaces/EventPost';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function UpcomingEvents({
    events = [],
}: {
    events?: EventPost[];
}) {
    const chunks = [];
    for (let i = 0; i < events.length; i += 3) {
        chunks.push(events.slice(i, i + 3));
    }

    const downloadIcsFile = (event: EventPost) => {
        const title = event.title;
        const venue = event.event_venue || 'N/A';
        const date = dayjs(event.event_date).format('YYYYMMDD');

        // Use default times if not provided
        const startTime = event.event_time ? dayjs(event.event_time).format('HHmmss') : '090000';
        const endTime = event.event_end_time ? dayjs(event.event_end_time).format('HHmmss') : '170000';

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'CALSCALE:GREGORIAN',
            'BEGIN:VEVENT',
            `SUMMARY:${title}`,
            `DTSTART:${date}T${startTime}`,
            `DTEND:${date}T${endTime}`,
            `LOCATION:${venue}`,
            `DESCRIPTION:Event: ${title}\\nVenue: ${venue}`,
            'STATUS:CONFIRMED',
            'BEGIN:VALARM',
            'TRIGGER:-PT15M',
            'ACTION:DISPLAY',
            'DESCRIPTION:Reminder: ' + title,
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="qg_card rounded-qa shadow-qa flex h-full flex-col overflow-hidden bg-primary/1">
            <div className="p-[16px_24px] text-center">
                <h3 className="m-0 text-[22px] font-bold text-black">
                    Upcoming Events
                </h3>
            </div>

            <div className="grow px-[0px]">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        prevEl: '.ev-prev',
                        nextEl: '.ev-next',
                    }}
                    pagination={{
                        el: '.ev-pagination',
                        clickable: true,
                    }}
                    className="h-full"
                >
                    {chunks.map((chunk, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="space-y-4 py-2">
                                {chunk.map((event) => (
                                    <div
                                        key={event.id}
                                        className="border-qa-border group relative rounded-[2px] border bg-white "
                                    >
                                        <div className="flex items-stretch gap-4">
                                            <div className="text-primary flex shrink-0 flex-col justify-center rounded-l-[2px] bg-primary/10 px-4 py-4 text-center font-bold leading-[1.1] transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                                <span className="block text-3xl">
                                                    {dayjs(event.event_date).format('DD')}
                                                </span>
                                                <small className="block text-[10px] uppercase opacity-70">
                                                    {dayjs(event.event_date).format('MMMM')}
                                                </small>
                                            </div>
                                            <div className="grow py-4">
                                                <div className="hover:text-primary mb-1 cursor-pointer text-[14px] font-bold text-black transition-colors line-clamp-1 group-hover:font-extrabold">
                                                    {event.title}
                                                </div>
                                                <div className="text-qa-muted flex flex-col gap-0.5 text-[11px]">
                                                    <div className="flex items-center gap-1.5">
                                                        <i className="fa-regular fa-clock me-1 text-[12px]"></i>
                                                        {event.event_time ? dayjs(event.event_time).format('h:mm A') : '09:00 AM'}
                                                        -{' '}
                                                        {event.event_end_time ? dayjs(event.event_end_time).format('h:mm A') : '05:00 PM'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <i className="fa-regular fa-location-dot me-1 text-[12px]"></i>
                                                        <span className="line-clamp-1">{event.event_venue}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="text-primary/40 hover:text-primary transition-colors pr-4"
                                                title="Add to calendar"
                                                onClick={() => downloadIcsFile(event)}
                                            >
                                                <i className="fa-duotone fa-solid fa-calendar-plus text-[20px]"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="relative flex h-[52px] items-center justify-center gap-[10px] p-[10px_26px]">
                <div className="mx-auto flex items-center gap-[2px]">
                    <button className="ev-prev flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                        <i className="fa-light fa-chevron-left text-[14px]"></i>
                    </button>
                    <div className="ev-pagination flex !w-auto items-center" />
                    <button className="ev-next flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                        <i className="fa-light fa-chevron-right text-[14px]"></i>
                    </button>
                </div>
                <Link
                    href={route('events.public')}
                    className="text-primary absolute right-[26px] text-[12px] font-normal underline hover:text-black"
                >
                    View All
                </Link>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .ev-pagination .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: transparent;
                    opacity: 1;
                    border: 1px solid black;
                    transition: all 0.4s;
                    margin: 0 3px !important;
                }
                .ev-pagination .swiper-pagination-bullet-active {
                    width: 30px;
                    background: var(--color-primary);
                    border-color: var(--color-primary);
                    border-radius: 10px;
                }
            `,
                }}
            />
        </div>
    );
}
