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

export default function PhotoGallery({ categories, albumsGrouped, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedYear, setSelectedYear] = useState(filters.year || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [activeAlbum, setActiveAlbum] = useState<any>(null);
    const [selectedMedia, setSelectedMedia] = useState<any>(null);

    const years = ['2026', '2025', '2024', '2023', '2022', '2021'];

    const handleSearch = useCallback(
        debounce((value: string) => {
            router.get(
                route('photo-gallery'),
                { search: value, year: selectedYear, category: selectedCategory },
                { preserveState: true, replace: true }
            );
        }, 300),
        [selectedYear, selectedCategory]
    );

    const handleFilter = (type: 'year' | 'category', value: string) => {
        const params: any = { search, year: selectedYear, category: selectedCategory };

        if (type === 'year') {
            const newYear = selectedYear === value ? '' : value;
            setSelectedYear(newYear);
            params.year = newYear;
        } else {
            const newCat = selectedCategory === value ? '' : value;
            setSelectedCategory(newCat);
            params.category = newCat;
        }

        router.get(route('photo-gallery'), params, { preserveState: true });
    };

    const getFilePath = (path: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/storage/')) return path;
        return `/storage/${path}`;
    };

    return (
        <div className="flex min-h-screen flex-col bg-white font-sans text-black">
            <Head title="Photo Gallery" />
            <PublicHeader />

            <main className="bg-qa-bg py-8">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-6">
                        <div className="flex-grow">
                            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h1 className="text-3xl font-bold text-black uppercase">Photo Gallery</h1>

                                <div className="relative w-full md:w-64">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            handleSearch(e.target.value);
                                        }}
                                        placeholder="Search albums..."
                                        className="w-full h-[40px] border border-gray-200 rounded-full px-4 pr-10 focus:outline-none focus:border-primary text-sm shadow-sm"
                                    />
                                    <i className="fa-solid fa-magnifying-glass absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6 flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleFilter('category', '')}
                                    className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all ${selectedCategory === '' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                                >
                                    All Categories
                                </button>
                                {categories.map((cat: any) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleFilter('category', cat.slug)}
                                        className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all ${selectedCategory === cat.slug ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            {/* Year Filter */}
                            <div className="mb-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-gray-100">
                                <button
                                    onClick={() => handleFilter('year', '')}
                                    className={`px-6 py-2 text-[14px] font-bold transition-all border-b-2 ${selectedYear === '' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                >
                                    Latest
                                </button>
                                {years.map(year => (
                                    <button
                                        key={year}
                                        onClick={() => handleFilter('year', year)}
                                        className={`px-6 py-2 text-[14px] font-bold transition-all border-b-2 ${selectedYear === year ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>

                            {/* Organized Content */}
                            {Object.keys(albumsGrouped).length > 0 ? (
                                Object.keys(albumsGrouped).sort((a, b) => b.localeCompare(a)).map(year => (
                                    <div key={year} className="mb-16">
                                        <div className="flex items-center gap-4 mb-8">
                                            <h2 className="text-4xl font-black text-gray-200 uppercase tracking-tighter">{year}</h2>
                                            <div className="h-[2px] flex-grow bg-gray-100"></div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                            {albumsGrouped[year].map((album: any) => (
                                                <div
                                                    key={album.id}
                                                    className="group cursor-pointer"
                                                    onClick={() => setActiveAlbum(album)}
                                                >
                                                    <div className="aspect-[4/3] rounded-qa overflow-hidden shadow-qa mb-4 relative bg-gray-100">
                                                        {album.cover_image ? (
                                                            <img
                                                                src={getFilePath(album.cover_image)}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                                alt={album.title}
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center bg-qa-bg">
                                                                <i className="fa-solid fa-images text-4xl text-gray-200"></i>
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                            <span className="text-white text-xs font-bold uppercase underline decoration-primary decoration-2">View Album</span>
                                                        </div>
                                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold shadow-sm">
                                                            {album.photos?.length || 0} ITEMS
                                                        </div>
                                                    </div>
                                                    <h3 className="text-[16px] font-bold text-black mb-1 group-hover:text-primary transition-colors line-clamp-1">{album.title}</h3>
                                                    <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">{album.category?.name || 'Uncategorized'}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-32 bg-white rounded-qa shadow-qa">
                                    <div className="text-5xl mb-4 text-gray-100">
                                        <i className="fa-solid fa-folder-open"></i>
                                    </div>
                                    <p className="text-gray-400 font-bold uppercase tracking-widest">No albums found matching your criteria</p>
                                </div>
                            )}
                        </div>

                        <div className="w-[100px] shrink-0">
                            <div className="sticky top-24">
                                <QuickLinks />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />

            {/* Album Viewer Lightbox */}
            {activeAlbum && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 lg:p-10">
                    <div className="relative h-full w-full max-w-7xl flex flex-col">
                        <button
                            className="absolute -top-12 right-0 lg:-right-12 text-white text-4xl hover:text-primary hover:rotate-90 transition-all duration-300 z-10"
                            onClick={() => setActiveAlbum(null)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <div className="mb-6 text-white">
                            <div className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-1">{activeAlbum.category?.name}</div>
                            <h2 className="text-4xl font-black uppercase tracking-tight">{activeAlbum.title}</h2>
                            {activeAlbum.event_date && (
                                <p className="text-gray-500 font-bold">{dayjs(activeAlbum.event_date).format('MMMM DD, YYYY')}</p>
                            )}
                        </div>

                        <div className="flex-grow overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-white/10">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
                                {activeAlbum.photos?.map((photo: any) => (
                                    <div
                                        key={photo.id}
                                        className="aspect-square rounded-lg overflow-hidden cursor-zoom-in group border border-white/5 bg-white/5"
                                        onClick={() => setSelectedMedia(photo)}
                                    >
                                        {photo.type === 'video' ? (
                                            <div className="relative h-full w-full">
                                                <video src={getFilePath(photo.file_path)} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                                                    <i className="fa-solid fa-play text-white text-2xl drop-shadow-lg"></i>
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={getFilePath(photo.file_path)}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                alt={photo.caption}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Full Screen Media Viewer */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 z-[1100] flex items-center justify-center bg-black p-4"
                    onClick={() => setSelectedMedia(null)}
                >
                    <button className="absolute top-8 right-8 text-white text-3xl z-[1200]"><i className="fa-solid fa-xmark"></i></button>
                    <div className="max-h-full max-w-full">
                        {selectedMedia.type === 'video' ? (
                            <video src={getFilePath(selectedMedia.file_path)} controls autoPlay className="max-h-[90vh] max-w-full rounded shadow-2xl" onClick={e => e.stopPropagation()} />
                        ) : (
                            <img src={getFilePath(selectedMedia.file_path)} className="max-h-[90vh] max-w-full rounded shadow-2xl object-contain" onClick={e => e.stopPropagation()} />
                        )}
                        {selectedMedia.caption && (
                            <div className="text-white text-center mt-4 font-bold text-lg">{selectedMedia.caption}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

