import React from 'react';
import { useForm } from '@inertiajs/react';

interface Category {
    id: number;
    title: string;
}

interface Props {
    categories: Category[];
    filters: {
        search?: string;
        category?: string;
    };
}

export default function PromotionSidebar({ categories = [], filters }: Props) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        category: filters.category || '',
    });

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('offers.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const handleReset = () => {
        setData({ search: '', category: '' });
        get(route('offers.index'), {
            preserveState: true,
            replace: true,
            // @ts-ignore - Some versions of Inertia types are finicky
            data: { search: '', category: '' }
        });
    };

    return (
        <aside className="w-full max-w-[380px] overflow-hidden rounded-qa bg-white shadow-qa" data-aos="fade-up">
            <div className="bg-primary rounded-qa p-[9px_14px] text-center text-[16px] font-bold text-white">
                Filter
            </div>
            <div className="mt-2 p-[18px]">
                <form onSubmit={handleFilter}>
                    {/* Search */}
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <i className="fa-regular fa-magnifying-glass text-[13px]"></i>
                        </div>
                        <input
                            type="text"
                            value={data.search}
                            onChange={e => setData('search', e.target.value)}
                            className="h-10 w-full rounded-qa border-[#999] pl-8 text-sm placeholder:text-[#c4c4c4] focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="Search"
                        />
                    </div>

                    {/* Radios */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <input
                                className="border-gray-600 text-primary h-4 w-4 focus:ring-primary"
                                type="radio"
                                name="promoCategory"
                                value=""
                                checked={data.category === ''}
                                onChange={() => setData('category', '')}
                                id="promocat-all"
                            />
                            <label className="text-[15px] font-light text-black cursor-pointer" htmlFor="promocat-all">
                                All Categories
                            </label>
                        </div>

                        {categories.map((cat) => (
                            <div className="flex items-center gap-2" key={cat.id}>
                                <input
                                    className="border-gray-600 text-primary h-4 w-4 focus:ring-primary"
                                    type="radio"
                                    name="promoCategory"
                                    value={cat.id}
                                    checked={data.category == cat.id.toString()}
                                    onChange={() => setData('category', cat.id.toString())}
                                    id={`promocat-${cat.id}`}
                                />
                                <label className="text-[15px] font-light text-black cursor-pointer" htmlFor={`promocat-${cat.id}`}>
                                    {cat.title}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-[30px] flex items-center gap-4">
                        <button
                            type="submit"
                            className="bg-primary h-9 min-w-[100px] rounded-full text-sm font-semibold text-white transition-colors hover:bg-black"
                        >
                            Filter
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="text-primary text-sm transition-colors hover:text-black hover:underline"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </aside>
    );
}
