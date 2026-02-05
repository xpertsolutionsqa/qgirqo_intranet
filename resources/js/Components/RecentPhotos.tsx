import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface Photo {
    id: number;
    file_path: string;
    caption?: string;
}

export default function RecentPhotos({ photos = [] }: { photos?: Photo[] }) {
    const [progress, setProgress] = useState(35);

    const handleProgress = (swiper: any) => {
        const total = swiper.snapGrid.length;
        const current = swiper.snapIndex + 1;
        setProgress((current / total) * 100);
    };

    // Fallback to placeholder if no photos
    const displayPhotos =
        photos.length > 0
            ? photos
            : [
                  { id: 1, file_path: '/assets/img/Rectangle-1402.jpg' },
                  { id: 2, file_path: '/assets/img/Rectangle-1403.jpg' },
                  { id: 3, file_path: '/assets/img/Rectangle-1404.jpg' },
                  { id: 4, file_path: '/assets/img/Rectangle-1405.jpg' },
              ];

    return (
        <section
            className="rounded-qa shadow-qa border-qa-border mb-12 border bg-white p-8"
            data-aos="fade-up"
        >
            <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                <h3 className="m-0 text-[22px] leading-tight font-bold text-black">
                    Recently Uploaded Photos
                </h3>
                <div className="flex w-full items-center gap-4 md:w-auto">
                    <div className="relative flex-grow md:w-[240px]">
                        <input
                            type="text"
                            className="focus:ring-primary focus:border-primary h-10 w-full rounded-[6px] border-gray-300 px-4 pr-10 text-[14px]"
                            placeholder="Filter by"
                        />
                        <button className="text-primary absolute top-1/2 right-3 -translate-y-1/2">
                            <i className="fa-light fa-filter text-[18px]"></i>
                        </button>
                    </div>
                    <Link
                        href={route('gallery.index')}
                        className="text-primary text-[14px] font-bold whitespace-nowrap underline transition-colors hover:text-black"
                    >
                        Open Gallery
                    </Link>
                </div>
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                onSlideChange={handleProgress}
                navigation={{
                    prevEl: '.photos-prev',
                    nextEl: '.photos-next',
                }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                className="mb-8"
            >
                {displayPhotos.map((photo) => (
                    <SwiperSlide key={photo.id}>
                        <div className="border-qa-border h-[220px] overflow-hidden rounded-[12px] border">
                            <img
                                src={photo.file_path}
                                alt={photo.caption || 'Gallery'}
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination Controls with Progress Line */}
            <div className="flex items-center justify-center gap-6">
                <button className="photos-prev border-qa-border flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border text-black transition-colors hover:bg-gray-100">
                    <i className="fa-light fa-chevron-left text-[16px]"></i>
                </button>

                <div className="relative h-1 max-w-[220px] flex-grow overflow-hidden rounded-full bg-gray-100">
                    <div
                        className="bg-primary absolute h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <button className="photos-next border-qa-border flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border text-black transition-colors hover:bg-gray-100">
                    <i className="fa-light fa-chevron-right text-[16px]"></i>
                </button>
            </div>
        </section>
    );
}
