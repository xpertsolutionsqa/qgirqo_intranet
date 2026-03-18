import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
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

    return (
        <div className="qg_card rounded-qa shadow-qa flex h-full flex-col overflow-hidden bg-[#e5e5f9]">
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
                                <div className="p-3 shrink-0 h-[250px] flex items-center justify-center">
                                    <div className="rounded-qa border-qa-border h-[140px] w-[140px] overflow-hidden border">
                                        <img
                                            src={winner.featured_image ? `/storage/${winner.featured_image}` : (winner.user.profile?.avatar ? `/storage/${winner.user.profile.avatar}` : (winner.user.profile?.image || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop'))}
                                            alt={winner.user.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="flex grow flex-col items-center justify-center bg-qa-gray p-4 w-full text-center">
                                    <div className="mb-0.5 text-[16px] font-bold text-black line-clamp-1">
                                        {winner.user.name}
                                    </div>
                                    <div className="text-qa-muted mb-3 text-[12px] line-clamp-1">
                                        {winner.user.profile?.designation?.name || 'Position'}
                                    </div>
                                    <div className="">
                                        {!winner.is_placeholder && (
                                            <button
                                                onClick={() => handleCongratulate(winner)}
                                                className="bg-primary mx-auto w-max rounded-full px-6 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-black"
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

            {employees.length > 1 ? (
                <div className="flex h-[40px] items-center justify-center gap-[10px] bg-qa-gray border-t border-black/5">
                    <div className="flex items-center gap-[2px]">
                        <button className="emp-prev flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                            <i className="fa-light fa-chevron-left text-[12px]"></i>
                        </button>
                        <div className="emp-pagination flex !w-auto items-center pb-1" />
                        <button className="emp-next flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                            <i className="fa-light fa-chevron-right text-[12px]"></i>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="h-[40px] bg-qa-gray border-t border-black/5" />
            )}

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
        </div>
    );
}
