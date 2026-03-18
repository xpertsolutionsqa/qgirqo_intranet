import { Link } from '@inertiajs/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { User } from '@/interfaces/EmployeeProfile';
import dayjs from 'dayjs';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import WishModal from '@/Components/WishModal';
import LoginModal from '@/Components/LoginModal';
import { usePage } from '@inertiajs/react';



export default function UpcomingBirthdays({
    birthdays,
}: {
    birthdays: User[];
}) {
    const { auth } = usePage<any>().props;
    const [wishUser, setWishUser] = useState<User | null>(null);
    const [showWishModal, setShowWishModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);


    const chunks = [];
    for (let i = 0; i < birthdays.length; i += 4) {
        chunks.push(birthdays.slice(i, i + 4));
    }

    return (
        <div className="qg_card rounded-qa shadow-qa flex h-full flex-col overflow-hidden bg-[#e5e5f9]">
            <div className="p-[16px_24px] text-center">
                <h3 className="m-0 text-[22px] font-bold text-black">
                    Upcoming Birthdays
                </h3>
            </div>

            <div className="grow px-[22px]">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        prevEl: '.bod-prev',
                        nextEl: '.bod-next',
                    }}
                    pagination={{
                        el: '.bod-pagination',
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
                                                {dayjs(item.profile.dob).format(
                                                    'DD',
                                                )}
                                            </span>
                                            <span className="text-[14px] uppercase">
                                                {dayjs(item.profile.dob).format(
                                                    'MMM',
                                                )}
                                            </span>
                                        </div>
                                        <EmployeeAvatar item={item} />
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
            </div>

            <div className="relative flex h-[52px] items-center justify-center gap-[10px] p-[10px_26px]">
                <div className="mx-auto flex items-center gap-[2px]">
                    <button className="bod-prev flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                        <i className="fa-light fa-chevron-left text-[14px]"></i>
                    </button>
                    <div className="bod-pagination flex !w-auto items-center" />
                    <button className="bod-next flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
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
                .bod-pagination .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: transparent;
                    opacity: 1;
                    border: 1px solid black;
                    transition: all 0.4s;
                    margin: 0 3px !important;
                }
                .bod-pagination .swiper-pagination-bullet-active {
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
                type="birthday"
            />

            <LoginModal
                show={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </div>

    );
}

function EmployeeAvatar({ item }: { item: User }) {
    const [hasError, setHasError] = useState(false);

    if (hasError || !item.profile.avatar) {
        return <div className="h-[42px] w-[42px]" />; // Empty space to maintain alignment
    }

    return (
        <div className="border-qa-border h-[42px] w-[42px] overflow-hidden rounded-full border bg-gray-200">
            <img
                src={`/storage/${item.profile.avatar}`}
                alt={item.name}
                className="h-full w-full object-cover"
                onError={() => setHasError(true)}
            />
        </div>
    );
}
