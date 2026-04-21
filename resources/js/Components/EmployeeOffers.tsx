import { Link } from '@inertiajs/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function EmployeeOffers({ offers = [] }: { offers?: any[] }) {

    return (
        <>
            {/* New Design (Commented) */}
            {/* <div className="qg_card group rounded-qa border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-white to-gray-50">
                <div className="bg-primary p-[16px_24px] text-center">
                    <h3 className="m-0 text-xl font-bold text-white uppercase tracking-wider">
                        Employee Promotions & Offers
                    </h3>
                </div>
                <div className="flex-grow p-0">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={offers.length > 1}
                        navigation={{ prevEl: '.offer-prev', nextEl: '.offer-next' }}
                        pagination={{ el: '.offer-pagination', clickable: true }}
                        className="h-full"
                    >
                        {offers.map((offer) => (
                            <SwiperSlide key={offer.id}>
                                <div className="flex h-full flex-col bg-transparent">
                                    <div className="relative h-[240px] overflow-hidden">
                                        <img src={offer.featured_image ? `/storage/${offer.featured_image}` : '/assets/img/Rectangle-1384-1.jpg'} alt={offer.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                                    </div>
                                    <div className="flex grow flex-col p-5 space-y-2">
                                        <h4 className="text-[17px] font-bold text-black line-clamp-1 uppercase tracking-tight">{offer.title}</h4>
                                        <div className="text-qa-muted text-[13px] line-clamp-2 min-h-[40px] font-medium italic">{offer.summary || 'Exclusive rewards for QGIRCO employees.'}</div>
                                        <div className="pt-4 text-center">
                                            <a href={offer.link_type === 'pdf' ? `/storage/${offer.document_path}` : offer.link_type === 'external' ? offer.external_link : '#'} target={offer.link_type === 'none' ? '_self' : '_blank'} rel="noopener noreferrer" className="bg-primary hover:bg-black text-white px-8 py-2 rounded-full text-[12px] font-bold transition-all duration-300 transform group-hover:scale-105 shadow-sm inline-block">
                                                {offer.link_type === 'pdf' ? 'Open PDF' : 'View Details'}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="relative flex h-[52px] items-center justify-center gap-[10px] border-t border-gray-100 bg-gray-50/50 p-[10px_26px]">
                    <div className="mx-auto flex items-center gap-[2px]">
                        <button className="offer-prev flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-black/5 disabled:cursor-auto disabled:opacity-30"><i className="fa-light fa-chevron-left text-[14px]"></i></button>
                        <div className="offer-pagination flex !w-auto items-center" />
                        <button className="offer-next flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-black/5 disabled:cursor-auto disabled:opacity-30"><i className="fa-light fa-chevron-right text-[14px]"></i></button>
                    </div>
                    <Link href={route('offers.index')} className="text-primary absolute right-[26px] text-[12px] font-bold underline hover:text-black uppercase tracking-tighter">View All</Link>
                </div>
            </div> */}

            <div className="qg_card rounded-qa shadow-qa relative flex h-full flex-col overflow-hidden bg-[#e5e5f9]">
                {/* Header with Blue Fill */}
                <div className="bg-primary p-[16px_24px] text-center">
                    <h3 className="m-0 text-2xl font-bold text-white">
                        Employee Promotions & Offers
                    </h3>
                </div>

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
                                <div className="flex h-full flex-col px-6 py-5 ">
                                    <div className="rounded-qa border-qa-border flex h-full flex-col border bg-white p-4 text-center shadow-sm">
                                        <div className="rounded-qa border-qa-border mb-4 h-[180px] w-full overflow-hidden border-2 shadow-sm">
                                            <img
                                                src={offer.featured_image ? `/storage/${offer.featured_image}` : '/assets/img/Rectangle-1384-1.jpg'}
                                                alt={offer.title}
                                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>
                                        <h4 className="mb-1 text-[16px] text-start font-bold text-black line-clamp-1">
                                            {offer.title}
                                        </h4>
                                        <div className="text-qa-muted mb-4 text-[13px] text-start line-clamp-2 min-h-[40px]">
                                            {offer.summary || 'Exclusive rewards for QGIRCO employees.'}
                                        </div>
                                        <div className="mt-auto pt-2">
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
                                                className="bg-primary hover:bg-black rounded-full px-8 py-2 text-[13px] font-bold text-white transition-all shadow-md active:scale-95 inline-block"
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
        </>
    );
}
