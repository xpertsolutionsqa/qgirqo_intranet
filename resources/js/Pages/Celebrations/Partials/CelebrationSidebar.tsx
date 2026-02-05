import React from 'react';
import { useForm } from '@inertiajs/react';

interface Month {
    id: number;
    name: string;
}

interface Props {
    months: Month[];
    filters: {
        month: number;
    };
}

export default function CelebrationSidebar({ months = [], filters }: Props) {
    const { data, setData, get } = useForm({
        month: filters.month.toString(),
    });

    const handleFilter = (monthId: string) => {
        setData('month', monthId);
        get(route('celebrations.index'), {
            preserveState: true,
            replace: true,
            // @ts-ignore
            data: { month: monthId }
        });
    };

    return (
        <aside className="w-full max-w-[380px] overflow-hidden rounded-qa bg-white shadow-qa" data-aos="fade-up">
            <div className="bg-primary rounded-qa p-[9px_14px] text-center text-[16px] font-bold text-white uppercase tracking-wider">
                Select Month
            </div>
            <div className="mt-2 p-[18px]">
                <div className="space-y-1">
                    {months.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => handleFilter(m.id.toString())}
                            className={`flex w-full items-center justify-between rounded-md px-4 py-2.5 text-[15px] transition-all ${data.month == m.id.toString()
                                ? 'bg-primary font-bold text-white shadow-sm'
                                : 'text-black hover:bg-gray-100 font-light'
                                }`}
                        >
                            <span>{m.name}</span>
                            {data.month == m.id.toString() && (
                                <i className="fa-solid fa-check text-[12px]"></i>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
