import { Link } from '@inertiajs/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function EmployeeOffers({ offers = [] }: { offers?: any[] }) {

    return (
        <div className="qg_card rounded-qa shadow-qa relative flex h-full flex-col overflow-hidden bg-[#e5e5f9]">
            {/* Header with Blue Fill */}
            <div className="bg-primary p-[16px_24px] text-center">
                <h3 className="m-0 text-2xl font-bold text-white">
                    Employee Promotions & Offers
                </h3>
            </div>

            {/* Filter Icon like in original */}
            <button className="text-primary absolute top-[35%] right-3 z-20 mt-[-50px] -translate-y-[50%]">
                <i className="fa-light fa-filter text-[22px]"></i>
            </button>

            <div className="flex-grow p-0">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        prevEl: '.offer-prev',
                        nextEl: '.offer-next',
                    }}
                    pagination={{
                        el: '.offer-pagination',
                        clickable: true,
                    }}
                    className="h-full"
                >
                    {offers.map((offer) => (
                        <SwiperSlide key={offer.id}>
                            <div className="flex h-full flex-col px-10 py-5 ">
                                <div className="rounded-qa border-qa-border flex h-full flex-col border bg-white p-3 text-center shadow-sm">
                                    <div className="rounded-qa border-qa-border mb-3 h-[140px] w-full overflow-hidden border">
                                        <img
                                            src={offer.featured_image ? `/storage/${offer.featured_image}` : '/assets/img/Rectangle-1384-1.jpg'}
                                            alt={offer.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <h4 className="mb-1 text-lg text-start font-bold text-black">
                                        {offer.title}
                                    </h4>
                                    <div className="text-qa-muted mb-4 text-[11px] underline text-start">
                                        {offer.summary || 'Click to view details'}
                                    </div>
                                    <div className="mt-auto">
                                        <a
                                            href={
                                                offer.link_type === 'pdf'
                                                    ? `/storage/${offer.document_path}`
                                                    : offer.link_type === 'external'
                                                        ? offer.external_link
                                                        : '#'
                                            }
                                            target={offer.link_type === 'none' ? '_self' : '_blank'}
                                            rel="noopener noreferrer"
                                            className="bg-primary rounded-full px-6 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-black"
                                        >
                                            {offer.link_type === 'pdf' ? 'Open PDF' : 'View Details'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="relative flex h-[52px] items-center justify-center gap-[10px] p-[10px_26px]">
                <div className="mx-auto flex items-center gap-[2px]">
                    <button className="offer-prev flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                        <i className="fa-light fa-chevron-left text-[14px]"></i>
                    </button>
                    <div className="offer-pagination flex !w-auto items-center" />
                    <button className="offer-next flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                        <i className="fa-light fa-chevron-right text-[14px]"></i>
                    </button>
                </div>
                <Link
                    href={route('offers.index')}
                    className="text-primary absolute right-[26px] text-[12px] font-normal underline hover:text-black"
                >
                    View All
                </Link>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .offer-pagination .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: transparent;
                    opacity: 1;
                    border: 1px solid black;
                    transition: all 0.4s;
                    margin: 0 3px !important;
                }
                .offer-pagination .swiper-pagination-bullet-active {
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
