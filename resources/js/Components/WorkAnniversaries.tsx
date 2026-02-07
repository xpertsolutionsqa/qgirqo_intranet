import { Link } from '@inertiajs/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { User } from '@/interfaces/EmployeeProfile';
import dayjs from 'dayjs';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function WorkAnniversaries({
    anniversaries,
}: {
    anniversaries: User[];
}) {
    // Split data into chunks of 6 (as per the PHP slide structure)
    const chunks = [];
    for (let i = 0; i < anniversaries.length; i += 4) {
        chunks.push(anniversaries.slice(i, i + 4));
    }

    return (
        <div className="qg_card rounded-qa shadow-qa flex h-full flex-col overflow-hidden bg-[#e5e5f9]">
            <div className="p-[16px_24px] text-center">
                <h3 className="m-0 text-[22px] font-bold text-black">
                    Upcoming Work Anniversaries
                </h3>
            </div>

            <div className="grow px-[22px]">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        prevEl: '.work-prev',
                        nextEl: '.work-next',
                    }}
                    pagination={{
                        el: '.work-pagination',
                        clickable: true,
                    }}
                    className="h-full"
                >
                    {chunks.map((chunk, idx) => (
                        <SwiperSlide key={idx}>
                            <ul className="m-0 list-none py-2 px-2 ">
                                {chunk.map((item) => (
                                    <li
                                        key={item.id}
                                        className="relative grid grid-cols-[46px_42px_1fr_44px] items-center gap-[10px] py-[20px] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:rounded-[2px] after:bg-[rgba(47,47,143,0.35)] after:content-[''] last:after:hidden"
                                    >
                                        <div className="text-primary text-center leading-[1.05] font-bold">
                                            <span className="block text-[18px]">
                                                {dayjs(item.profile.joining_date).format(
                                                    'DD',
                                                )}
                                            </span>
                                            <span className="text-[14px] uppercase">
                                                {dayjs(item.profile.joining_date).format(
                                                    'MMM',
                                                )}
                                            </span>
                                        </div>
                                        <div className="border-qa-border h-[42px] w-[42px] overflow-hidden rounded-full border bg-gray-200">
                                            <img
                                                src={`/storage/${item.profile.avatar}`}
                                                alt={item.name.charAt(0)}
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://placehold.co/42x42?text=${item.name.charAt(0)}`;
                                                }}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="text-[14px] font-medium text-black">
                                            {item.name}
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                className="text-primary transition-colors hover:text-black"
                                                aria-label="Send message"
                                            >
                                                <i className="fa-light fa-paper-plane text-[18px]"></i>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="relative flex h-[52px] items-center justify-center gap-[10px] p-[10px_26px]">
                <div className="mx-auto flex items-center gap-[2px]">
                    <button className="work-prev flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                        <i className="fa-light fa-chevron-left text-[14px]"></i>
                    </button>
                    <div className="work-pagination flex w-auto! items-center" />
                    <button className="work-next flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                        <i className="fa-light fa-chevron-right text-[14px]"></i>
                    </button>
                </div>
                <Link
                    href={route('celebrations.index')}
                    className="text-primary absolute right-[26px] text-[12px] font-normal underline hover:text-black"
                >
                    View All
                </Link>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .work-pagination .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: transparent;
                    opacity: 1;
                    border: 1px solid black;
                    transition: all 0.4s;
                    margin: 0 3px !important;
                }
                .work-pagination .swiper-pagination-bullet-active {
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
