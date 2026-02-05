import React from 'react';
import dayjs from 'dayjs';

interface Employee {
    id: number;
    name: string;
    profile: {
        avatar?: string;
        dob?: string;
        joining_date?: string;
        department?: { name: string };
        designation?: { name: string };
    };
}

interface Props {
    items: Employee[];
    type: 'birthday' | 'anniversary';
}

export default function CelebrationList({ items = [], type }: Props) {
    // Group by date
    const grouped = items.reduce((acc: any, item) => {
        const dateStr = type === 'birthday' ? item.profile.dob : item.profile.joining_date;
        const day = dayjs(dateStr).format('DD');
        if (!acc[day]) acc[day] = [];
        acc[acc[day].push(item)];
        return acc;
    }, {});

    // For better grouping logic, let's just use a simple list if grouping is complex for now,
    // but date-wise is better. Let's fix the reduce:
    const groups: { [key: string]: Employee[] } = {};
    items.forEach(item => {
        const dateStr = type === 'birthday' ? item.profile.dob : item.profile.joining_date;
        const day = dayjs(dateStr).format('DD');
        if (!groups[day]) groups[day] = [];
        groups[day].push(item);
    });

    const sortedDays = Object.keys(groups).sort();

    return (
        <div className="space-y-8">
            {sortedDays.length > 0 ? (
                sortedDays.map((day) => (
                    <div key={day} className="relative">
                        {/* Day Header */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-lg text-xl font-bold text-white shadow-sm">
                                {day}
                            </div>
                            <div className="h-[2px] grow rounded-full bg-gray-100"></div>
                        </div>

                        {/* Employees on this day */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {groups[day].map((item) => (
                                <div key={item.id} className="flex items-center gap-4 rounded-qa border border-black/5 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-primary/20 bg-gray-100 shadow-inner">
                                        <img
                                            src={item.profile.avatar ? `/storage/${item.profile.avatar}` : `https://placehold.co/100x100?text=${item.name.charAt(0)}`}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-[15px] font-bold text-black">{item.name}</div>
                                        <div className="text-[12px] text-gray-500 font-medium">
                                            {item.profile.designation?.name || 'Employee'}
                                        </div>
                                        <div className="text-[11px] text-primary/70 font-semibold uppercase tracking-tight">
                                            {item.profile.department?.name || 'QGIRCO'}
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <button className="text-primary hover:text-black transition-colors p-2">
                                            <i className="fa-light fa-paper-plane text-lg"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="py-20 text-center">
                    <div className="mb-4 text-5xl opacity-20">
                        <i className={`fa-light ${type === 'birthday' ? 'fa-cake-candles' : 'fa-gem'}`}></i>
                    </div>
                    <p className="text-gray-400 text-lg font-light">
                        No {type === 'birthday' ? 'birthdays' : 'anniversaries'} found for this month.
                    </p>
                </div>
            )}
        </div>
    );
}
