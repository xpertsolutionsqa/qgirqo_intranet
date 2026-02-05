import React, { useState, useEffect } from 'react';
import PublicHeader from '@/Components/PublicHeader';
import PublicFooter from '@/Components/PublicFooter';
import QuickLinks from '@/Components/QuickLinks';
import { Head } from '@inertiajs/react';
import EventSidebar from './Partials/EventSidebar';
import EventListView from './Partials/EventListView';
import EventCalendarView from './Partials/EventCalendarView';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Index({ events, categories, filters }: any) {
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const page_title = 'Company Events & Schedule';

    return (
        <div className="flex min-h-screen flex-col bg-white font-sans text-black">
            <Head title={page_title} />

            <PublicHeader />

            <main className="bg-qa-bg py-8">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    {/* Page heading */}
                    <div className="mb-8" data-aos="fade-up">
                        <h1 className="text-2xl font-bold text-black uppercase tracking-tight">
                            {page_title}
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 pb-12">
                        {/* MAIN CONTENT AREA */}
                        <div className="flex-grow order-2 lg:order-1">
                            {/* Toolbar: List / Calendar toggle */}
                            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4" data-aos="fade-up">
                                <div className="inline-flex rounded-full bg-white p-1 shadow-sm border border-black/5">
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'list'
                                            ? 'bg-primary text-white shadow-md'
                                            : 'text-gray-400 hover:text-black'
                                            }`}
                                    >
                                        <i className="fa-regular fa-list"></i>
                                        List View
                                    </button>
                                    <button
                                        onClick={() => setViewMode('calendar')}
                                        className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'calendar'
                                            ? 'bg-primary text-white shadow-md'
                                            : 'text-gray-400 hover:text-black'
                                            }`}
                                    >
                                        <i className="fa-regular fa-calendar-range"></i>
                                        Calendar View
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 text-[13px] text-black/40 font-medium">
                                    <i className="fa-light fa-circle-info"></i>
                                    Showing {events.length} results
                                </div>
                            </div>

                            <div data-aos="fade-up" data-aos-delay="100">
                                {viewMode === 'list' ? (
                                    <EventListView events={events} />
                                ) : (
                                    <EventCalendarView events={events} />
                                )}
                            </div>
                        </div>

                        {/* SIDEBAR FILTER AREA */}
                        <div className="w-full lg:w-[320px] shrink-0 order-1 lg:order-2">
                            <EventSidebar categories={categories} filters={filters} />

                            {/* Quick Links for Desktop */}
                            {/* <div className="mt-8 hidden lg:block">
                                <div className="sticky top-28 z-40">
                                    <QuickLinks />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
