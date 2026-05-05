import { Link } from '@inertiajs/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { User } from '@/interfaces/EmployeeProfile';
import dayjs from 'dayjs';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import EmployeeAvatar from '@/Components/EmployeeAvatar';
import WishModal from '@/Components/WishModal';
import LoginModal from '@/Components/LoginModal';
import { usePage } from '@inertiajs/react';


export default function WorkAnniversaries({
    anniversaries,
}: {
    anniversaries: User[];
}) {
    const { auth } = usePage<any>().props;
    const [wishUser, setWishUser] = useState<User | null>(null);
    const [showWishModal, setShowWishModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);


    // Split data into chunks of 6 (as per the PHP slide structure)
    const chunks = [];
    for (let i = 0; i < anniversaries.length; i += 4) {
        chunks.push(anniversaries.slice(i, i + 4));
    }

    return (
        <>
            {/* Latest Modernized Design (2026-04-28) */}
            <div className="qg_card group rounded-qa border border-qa-border shadow-qa transition-all duration-500 hover:shadow-2xl flex h-full flex-col overflow-hidden bg-gradient-to-br from-[#f8faff] to-[#eef2ff]">
                <div className="p-[16px_24px] text-center bg-primary">
                    <h3 className="m-0 text-xl font-bold text-white capatilize tracking-wider">
                        Work Anniversaries
                    </h3>
                </div>

                <div className="grow px-6">
                    {anniversaries.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            autoplay={{ delay: 4500, disableOnInteraction: false }}
                            loop={anniversaries.length > 4}
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
                                    <ul className="m-0 list-none py-4">
                                        {chunk.map((item) => (
                                            <li
                                                key={item.id}
                                                className="relative flex items-center justify-between py-4 border-b border-black/5 last:border-0 transition-all duration-300 hover:bg-white/40 px-2 rounded-lg group/item"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="text-primary text-center leading-[1.05] font-bold bg-white p-2 rounded-lg shadow-sm border border-qa-border w-12 shrink-0">
                                                        <span className="block text-[16px]">
                                                            {dayjs(item.profile.joining_date).format('DD')}
                                                        </span>
                                                        <span className="text-[11px] uppercase opacity-70">
                                                            {dayjs(item.profile.joining_date).format('MMM')}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        {/* <EmployeeAvatar
                                                            src={item.profile.avatar}
                                                            alt={item.name}
                                                            className="h-[40px] w-[40px] shadow-sm border border-qa-border"
                                                        /> */}
                                                        <div className="text-[16px] font-bold text-black group-hover/item:text-primary transition-colors">
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        if (!auth.user) {
                                                            setShowLoginModal(true);
                                                            return;
                                                        }
                                                        setWishUser(item);
                                                        setShowWishModal(true);
                                                    }}
                                                    className="text-primary bg-white p-2 rounded-lg shadow-sm border border-qa-border transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary transform hover:scale-110 active:scale-95 flex items-center justify-center w-11 h-11 shrink-0"
                                                    aria-label="Send message"
                                                >
                                                    <i className="fa-light fa-paper-plane text-[18px]"></i>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-black/50">
                            <i className="fa-light fa-calendar-circle-exclamation text-[32px]"></i>
                            <p className="text-[15px] font-medium">No upcoming anniversaries</p>
                        </div>
                    )}
                </div>

                <div className="relative flex h-[52px] items-center justify-center gap-[10px] p-[10px_26px] border-t border-black/5 bg-black/2">
                    {anniversaries.length > 0 && (
                        <div className="mx-auto flex items-center gap-[2px]">
                            <button className="work-prev flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-black/5 disabled:cursor-auto disabled:opacity-30">
                                <i className="fa-light fa-chevron-left text-[14px]"></i>
                            </button>
                            <div className="work-pagination flex !w-auto items-center pb-1" />
                            <button className="work-next flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-black/5 disabled:cursor-auto disabled:opacity-30">
                                <i className="fa-light fa-chevron-right text-[14px]"></i>
                            </button>
                        </div>
                    )}
                    <Link
                        href={route('celebrations.index')}
                        className="text-primary absolute right-[26px] text-[12px] font-bold underline hover:text-black uppercase tracking-tight"
                    >
                        View All
                    </Link>
                </div>
            </div>

            {/* Previous Design (Commented out as requested) */}
            {/* <div className="qg_card rounded-qa shadow-qa flex h-full flex-col overflow-hidden bg-[#e5e5f9]">
                <div className="p-[16px_24px] text-center">
                    <h3 className="m-0 text-[22px] font-bold text-black">
                        Upcoming Work Anniversaries
                    </h3>
                </div>

                <div className="grow px-[22px]">
                    {anniversaries.length > 0 ? (
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
                                                <EmployeeAvatar
                                                    src={item.profile.avatar}
                                                    alt={item.name}
                                                    className="h-[42px] w-[42px]"
                                                />
                                                <div className="text-[14px] font-medium text-black">
                                                    {item.name}
                                                </div>
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => {
                                                            if (!auth.user) {
                                                                setShowLoginModal(true);
                                                                return;
                                                            }
                                                            setWishUser(item);
                                                            setShowWishModal(true);
                                                        }}
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
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-black/50">
                            <i className="fa-light fa-calendar-circle-exclamation text-[32px]"></i>
                            <p className="text-[15px] font-medium">No upcoming anniversaries</p>
                        </div>
                    )}
                </div>

                <div className="relative flex h-[52px] items-center justify-center gap-[10px] p-[10px_26px]">
                    {anniversaries.length > 0 && (
                        <div className="mx-auto flex items-center gap-[2px]">
                            <button className="work-prev flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                                <i className="fa-light fa-chevron-left text-[14px]"></i>
                            </button>
                            <div className="work-pagination flex w-auto! items-center" />
                            <button className="work-next flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                                <i className="fa-light fa-chevron-right text-[14px]"></i>
                            </button>
                        </div>
                    )}
                    <Link
                        href={route('celebrations.index')}
                        className="text-primary absolute right-[26px] text-[12px] font-normal underline hover:text-black"
                    >
                        View All
                    </Link>
                </div>
            </div> */}

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

            <WishModal
                show={showWishModal}
                onClose={() => setShowWishModal(false)}
                user={wishUser}
                type="anniversary"
            />

            <LoginModal
                show={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </>
    );
}
