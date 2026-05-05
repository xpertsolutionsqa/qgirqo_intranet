import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import WishModal from './WishModal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LoginModal from './LoginModal';

export default function EmployeesOfMonth({
    winners = [],
}: {
    winners?: any[];
}) {
    const { auth } = usePage().props;
    const [showWishModal, setShowWishModal] = useState(false);
    const [selectedWinner, setSelectedWinner] = useState<any>(null);
    const [winnerTitle, setWinnerTitle] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);

    const employees =
        winners.length > 0
            ? winners
            : [
                {
                    id: 'placeholder-1',
                    is_placeholder: true,
                    user: {
                        name: 'Selection Pending',
                        profile: {
                            designation: { name: 'Position' },
                            department: { name: 'Department' },
                        },
                    },
                    featured_image: null,
                    title: 'Star Performer',
                },
            ];

    const handleCongratulate = (winner: any) => {
        if (winner.is_placeholder) return;

        if (!auth.user) {
            setShowLoginModal(true);
            return;
        }

        setSelectedWinner(winner.user);
        setWinnerTitle(winner.title);
        setShowWishModal(true);
    };

    useEffect(() => {
        console.log(winners);
    }, [winners]);

    return (
        <>
            <div className="flex h-full flex-col overflow-hidden ">
                {/* New Design (Commented) */}
                {/* <div className="qg_card group rounded-qa border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md flex h-full flex-col overflow-hidden bg-gradient-to-br from-white to-gray-50">
                    <div className="bg-primary p-[16px_24px] text-center">
                        <h3 className="m-0 text-xl font-bold text-white uppercase tracking-wider">
                            Employees of the Quarter
                        </h3>
                    </div>
                    <div className="flex-grow p-0">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            loop={employees.length > 1}
                            navigation={{ prevEl: '.emp-prev', nextEl: '.emp-next' }}
                            pagination={{ el: '.emp-pagination', clickable: true }}
                            className="h-full"
                        >
                            {employees.map((winner) => (
                                <SwiperSlide key={winner.id} className="!h-full">
                                    <div className="flex h-full flex-col bg-transparent">
                                        <div className="relative h-[240px] overflow-hidden">
                                            <img
                                                src={winner.featured_image ? `/storage/${winner.featured_image}` : (winner.user.profile?.avatar ? `/storage/${winner.user.profile.avatar}` : (winner.user.profile?.image || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop'))}
                                                alt={winner.user.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                                        </div>
                                        <div className="flex grow flex-col items-center justify-center p-5 text-center space-y-2">
                                            <div>
                                                <div className="text-[18px] font-bold text-black line-clamp-1 uppercase tracking-tight">{winner.user.name}</div>
                                                <div className="text-qa-muted text-[13px] line-clamp-1 font-medium">{winner.user.profile?.designation?.name || 'Position'}</div>
                                            </div>
                                            {winner.title && <div className="bg-primary/10 text-primary rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-widest">{winner.title}</div>}
                                            <div className="pt-2">
                                                {!winner.is_placeholder && (
                                                    <button onClick={() => handleCongratulate(winner)} className="bg-primary hover:bg-black text-white px-8 py-2 rounded-full text-[12px] font-bold transition-all duration-300 transform group-hover:scale-105 shadow-sm">Congratulate</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="flex h-[52px] items-center justify-center gap-[10px] border-t border-gray-100 bg-gray-50/50">
                        {employees.length > 1 && (
                            <div className="flex items-center gap-[2px]">
                                <button className="emp-prev flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-black/5 disabled:cursor-auto disabled:opacity-30"><i className="fa-light fa-chevron-left text-[14px]"></i></button>
                                <div className="emp-pagination flex !w-auto items-center pb-1" />
                                <button className="emp-next flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-black/5 disabled:cursor-auto disabled:opacity-30"><i className="fa-light fa-chevron-right text-[14px]"></i></button>
                            </div>
                        )}
                    </div>
                </div> */}

                {/* Latest Modernized Design (2026-04-28) */}
                <div className="qg_card group rounded-qa border border-qa-border shadow-qa transition-all duration-500 hover:shadow-2xl flex h-full flex-col overflow-hidden bg-gradient-to-br from-[#f8faff] to-[#eef2ff]">
                    <div className="bg-primary p-[16px_24px] text-center">
                        <h3 className="m-0 text-xl font-bold text-white capatilize tracking-wider">
                            Employees of the Quarter
                        </h3>
                    </div>

                    <div className="flex-grow p-0">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            loop={employees.length > 1}
                            navigation={{
                                prevEl: '.emp-prev',
                                nextEl: '.emp-next',
                            }}
                            pagination={{
                                el: '.emp-pagination',
                                clickable: true,
                            }}
                            className="h-full"
                        >
                            {employees.map((winner) => (
                                <SwiperSlide key={winner.id} className="!h-full">
                                    <div className="flex h-full flex-col items-center bg-transparent">
                                        {/* Image Section with Blurred Backdrop */}
                                        <div className="relative h-[220px] w-full overflow-hidden bg-[#1a1a2e]">
                                            {/* Blurred Background Layer */}
                                            <div
                                                className="absolute inset-0 bg-cover bg-center blur-2xl scale-125 opacity-50 transition-transform duration-700 group-hover:scale-150"
                                                style={{
                                                    backgroundImage: `url(${winner.featured_image ? `/storage/${winner.featured_image}` : (winner.user.profile?.avatar ? `/storage/${winner.user.profile.avatar}` : (winner.user.profile?.image || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop'))})`
                                                }}
                                            />

                                            {/* Sharp Portrait Image on Top */}
                                            <img
                                                src={winner.featured_image ? `/storage/${winner.featured_image}` : (winner.user.profile?.avatar ? `/storage/${winner.user.profile.avatar}` : (winner.user.profile?.image || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop'))}
                                                alt={winner.user.name}
                                                className="relative z-10 h-full w-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                                            />

                                            {/* Subtle Darkening Overlay on Hover */}
                                            <div className="absolute inset-0 z-15 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                                            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-center">
                                                <div className="text-[18px] font-bold text-white drop-shadow-md">
                                                    {winner.user.name}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info at Bottom */}
                                        <div className="flex grow flex-col items-center justify-between p-5 w-full text-center space-y-3">
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="text-qa-muted text-[13px] line-clamp-1 font-medium">
                                                        {winner.user.profile?.designation?.title || winner.user.profile?.designation?.name}
                                                    </div>
                                                    <div className="text-qa-muted text-[12px] line-clamp-1 mt-0.5">
                                                        {winner.user.profile?.department?.name || winner.user.profile?.department?.title}
                                                    </div>
                                                </div>

                                                {winner.title && (
                                                    <div className="bg-primary/10 text-primary rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-wider">
                                                        {winner.title}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="w-full pt-2">
                                                {!winner.is_placeholder && (
                                                    <button
                                                        onClick={() => handleCongratulate(winner)}
                                                        className="bg-primary hover:bg-black w-full rounded-full py-2.5 text-[13px] font-bold text-white transition-all shadow-md active:scale-95 transform"
                                                    >
                                                        Congratulate
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="flex h-[52px] items-center justify-between px-4 border-t border-black/5 bg-black/2">
                        <Link
                            href={route('winners.archive')}
                            className="text-[11px] font-bold text-primary hover:underline hover:text-black transition-colors uppercase tracking-tight"
                        >
                            View Archive
                        </Link>
                        {employees.length > 1 && (
                            <div className="flex items-center gap-[2px]">
                                <button className="emp-prev flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-black/5 disabled:cursor-auto disabled:opacity-30">
                                    <i className="fa-light fa-chevron-left text-[14px]"></i>
                                </button>
                                <div className="emp-pagination flex !w-auto items-center pb-1" />
                                <button className="emp-next flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-black/5 disabled:cursor-auto disabled:opacity-30">
                                    <i className="fa-light fa-chevron-right text-[14px]"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Previous Design (Commented out as requested) */}
                {/* <div className="qg_card rounded-qa shadow-qa flex h-full flex-col overflow-hidden bg-[#e5e5f9]">
                    <div className="bg-primary p-[16px_24px] text-center">
                        <h3 className="m-0 text-2xl font-bold text-white">
                            Employees of the Quarter
                        </h3>
                    </div>

                    <div className="flex-grow p-0">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation={{
                                prevEl: '.emp-prev',
                                nextEl: '.emp-next',
                            }}
                            pagination={{
                                el: '.emp-pagination',
                                clickable: true,
                            }}
                            className="h-full"
                        >
                            {employees.map((winner) => (
                                <SwiperSlide key={winner.id} className="!h-full">
                                    <div className="flex h-full flex-col items-center bg-white">
                                        <div className="p-4 shrink-0 h-[260px] flex items-center justify-center w-full">
                                            <div className="rounded-qa border-qa-border h-[210px] w-full max-w-[210px] overflow-hidden border-2 shadow-sm">
                                                <img
                                                    src={winner.featured_image ? `/storage/${winner.featured_image}` : (winner.user.profile?.avatar ? `/storage/${winner.user.profile.avatar}` : (winner.user.profile?.image || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop'))}
                                                    alt={winner.user.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex grow flex-col items-center justify-center bg-qa-gray p-4 w-full text-center">
                                            <div className="mb-0.5 text-[18px] font-bold text-black line-clamp-1">
                                                {winner.user.name}
                                            </div>
                                            <div className="text-qa-muted mb-1 text-[13px] line-clamp-1">
                                                {winner.user.profile?.designation?.name || 'Position'}
                                            </div>
                                            {winner.title && <div className="bg-primary/5 text-primary mb-4 rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                                                {winner.title}
                                            </div>}
                                            <div className="">
                                                {!winner.is_placeholder && (
                                                    <button
                                                        onClick={() => handleCongratulate(winner)}
                                                        className="bg-primary hover:bg-black mx-auto w-max rounded-full px-8 py-2 text-[13px] font-bold text-white transition-all shadow-md active:scale-95"
                                                    >
                                                        Congratulate
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="flex h-[52px] items-center justify-between px-4 bg-qa-gray border-t border-black/5">
                        <Link
                            href={route('winners.archive')}
                            className="text-[11px] font-bold text-primary hover:underline hover:text-black transition-colors uppercase tracking-tight"
                        >
                            View Archive
                        </Link>
                        {employees.length > 1 && (
                            <div className="flex items-center gap-[2px]">
                                <button className="emp-prev flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                                    <i className="fa-light fa-chevron-left text-[14px]"></i>
                                </button>
                                <div className="emp-pagination flex !w-auto items-center pb-1" />
                                <button className="emp-next flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                                    <i className="fa-light fa-chevron-right text-[14px]"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div> */}
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .emp-pagination .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: transparent;
                    opacity: 1;
                    border: 1px solid black;
                    transition: all 0.4s;
                    margin: 0 3px !important;
                }
                .emp-pagination .swiper-pagination-bullet-active {
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
                user={selectedWinner}
                type="eom"
                customTitle={winnerTitle}
            />

            <LoginModal
                show={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </>
    );
}
