import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import QuickLinks from '@/Components/QuickLinks';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import PublicHeader from '@/Components/PublicHeader';
import PublicFooter from '@/Components/PublicFooter';
import dayjs from 'dayjs';

// Simple debounce function
function debounce(func: Function, wait: number) {
    let timeout: any;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

declare var route: any;

export default function PhotoGallery({ photos, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedYear, setSelectedYear] = useState(filters.year || '');
    const [selectedMedia, setSelectedMedia] = useState<any>(null);

    const years = ['2026', '2025', '2024', '2023', '2022', '2021'];

    const getFilePath = (path: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/storage/')) return path;
        return `/storage/${path}`;
    };

    const handleSearch = useCallback(
        debounce((value: string) => {
            router.get(
                route('photo-gallery'),
                { search: value, year: selectedYear },
                { preserveState: true, replace: true }
            );
        }, 300),
        [selectedYear]
    );

    const handleYearFilter = (year: string) => {
        const newYear = selectedYear === year ? '' : year;
        setSelectedYear(newYear);
        router.get(
            route('photo-gallery'),
            { search, year: newYear },
            { preserveState: true }
        );
    };

    return (
        <div className="flex min-h-screen flex-col bg-white font-sans text-black">
            <Head title="Photo Gallery" />

            <PublicHeader />

            <main className="bg-qa-bg py-8">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-6">
                        {/* MAIN CONTENT Area */}
                        <div className="flex-grow">
                            <div className="mb-8" data-aos="fade-up">
                                <h1 className="text-3xl font-bold text-black uppercase">
                                    Photo Gallery
                                </h1>
                            </div>

                            <div className="bg-white rounded-qa shadow-qa p-8" data-aos="fade-up">
                                {/* Filter Bar */}
                                <div className="mb-8 flex flex-wrap gap-6 items-end">
                                    <div className="flex flex-col gap-2 w-full md:w-64">
                                        <label className="text-[14px] font-bold text-gray-700">Filter by album or caption</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={search}
                                                onChange={(e) => {
                                                    setSearch(e.target.value);
                                                    handleSearch(e.target.value);
                                                }}
                                                placeholder="Search..."
                                                className="w-full h-[46px] border border-gray-200 rounded-lg px-4 pr-10 focus:outline-none focus:border-primary"
                                            />
                                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Date filter could be improved with a real picker later */}
                                </div>

                                {/* Year Navigation */}
                                <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    <button
                                        onClick={() => handleYearFilter('')}
                                        className={`px-6 py-2 rounded-full font-bold text-[14px] transition-all whitespace-nowrap ${selectedYear === ''
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'bg-qa-bg text-black hover:bg-gray-200'
                                            }`}
                                    >
                                        All
                                    </button>
                                    {years.map(year => (
                                        <button
                                            key={year}
                                            onClick={() => handleYearFilter(year)}
                                            className={`px-6 py-2 rounded-full font-bold text-[14px] transition-all whitespace-nowrap ${selectedYear === year
                                                ? 'bg-primary text-white shadow-lg'
                                                : 'bg-qa-bg text-black hover:bg-gray-200'
                                                }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>

                                {/* Photos Grid */}
                                {photos.data.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {photos.data.map((photo: any) => (
                                            <div key={photo.id} className="qg_card overflow-hidden group hover:shadow-xl transition-all duration-300">
                                                <div
                                                    className="aspect-square overflow-hidden cursor-zoom-in relative"
                                                    onClick={() => setSelectedMedia(photo)}
                                                >
                                                    {photo.type === 'video' ? (
                                                        <div className="h-full w-full">
                                                            <video
                                                                src={getFilePath(photo.file_path)}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm group-hover:bg-white/50 transition-all">
                                                                    <i className="fa-solid fa-play text-xl text-white"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={getFilePath(photo.file_path)}
                                                            alt={photo.caption || photo.album?.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    )}
                                                </div>
                                                <div className="p-4 flex gap-4">
                                                    <div className="flex-grow">
                                                        <h3 className="text-[15px] font-bold text-black mb-1 line-clamp-1">
                                                            {photo.caption || photo.album?.title || 'Untitled'}
                                                        </h3>
                                                        <div className="text-[12px] text-gray-500">
                                                            {photo.album?.title}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center bg-qa-bg rounded min-w-[50px] py-1 border border-gray-100">
                                                        <span className="text-[16px] font-bold leading-none">
                                                            {dayjs(photo.album?.event_date || photo.created_at).format('DD')}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-primary uppercase leading-none">
                                                            {dayjs(photo.album?.event_date || photo.created_at).format('MMM')}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 font-bold leading-none">
                                                            {dayjs(photo.album?.event_date || photo.created_at).format('YYYY')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-qa-bg rounded-qa">
                                        <p className="text-gray-500 font-medium">No photos found for the selected criteria.</p>
                                    </div>
                                )}

                                {/* Pagination */}
                                {photos.links && photos.links.length > 3 && (
                                    <div className="mt-12 flex justify-center">
                                        <nav className="flex items-center gap-2">
                                            {photos.links.map((link: any, iNum: number) => {
                                                if (link.label.includes('Previous')) {
                                                    return (
                                                        <Link
                                                            key={iNum}
                                                            href={link.url || '#'}
                                                            className={`h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 transition-all ${!link.url ? 'text-gray-300 pointer-events-none' : 'text-gray-400 hover:border-primary hover:text-primary'}`}
                                                        >
                                                            <i className="fa-regular fa-chevron-left"></i>
                                                        </Link>
                                                    );
                                                }
                                                if (link.label.includes('Next')) {
                                                    return (
                                                        <Link
                                                            key={iNum}
                                                            href={link.url || '#'}
                                                            className={`h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 transition-all ${!link.url ? 'text-gray-300 pointer-events-none' : 'text-gray-400 hover:border-primary hover:text-primary'}`}
                                                        >
                                                            <i className="fa-regular fa-chevron-right"></i>
                                                        </Link>
                                                    );
                                                }
                                                return (
                                                    <Link
                                                        key={iNum}
                                                        href={link.url || '#'}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                        className={`h-10 w-10 flex items-center justify-center rounded-lg font-bold transition-all ${link.active
                                                            ? 'bg-primary text-white shadow-md'
                                                            : 'border border-gray-200 text-black hover:border-primary hover:text-primary'
                                                            }`}
                                                    />
                                                );
                                            })}
                                        </nav>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="w-[100px] shrink-0">
                            <div className="sticky top-24">
                                <QuickLinks />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />

            {/* Lightbox */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 p-4"
                    onClick={() => setSelectedMedia(null)}
                >
                    <div className="relative max-h-screen max-w-7xl w-full flex flex-col items-center">
                        <button
                            className="absolute -top-12 right-0 text-white text-3xl hover:text-primary transition-colors"
                            onClick={() => setSelectedMedia(null)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <div className="bg-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                            {selectedMedia.type === 'video' ? (
                                <video
                                    src={getFilePath(selectedMedia.file_path)}
                                    controls
                                    autoPlay
                                    className="max-h-[80vh] max-w-full"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <img
                                    src={getFilePath(selectedMedia.file_path)}
                                    alt={selectedMedia.caption}
                                    className="max-h-[80vh] max-w-full object-contain"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                        </div>

                        {selectedMedia.caption && (
                            <div className="mt-4 text-center">
                                <h3 className="text-xl font-bold text-white">{selectedMedia.caption}</h3>
                                {selectedMedia.album?.title && (
                                    <p className="text-gray-400 text-sm">{selectedMedia.album.title}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
