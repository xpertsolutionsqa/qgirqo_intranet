import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function EmployeesOfMonth({ winners = [] }: { winners?: any[] }) {
    const employees = winners.length > 0 ? winners : [
        {
            id: 'placeholder-1',
            user: {
                name: 'Selection Pending',
                profile: { designation: { name: 'Position' }, department: { name: 'Department' } }
            },
            featured_image: null,
            title: 'Star Performer'
        }
    ];

    return (
        <div className="qg_card rounded-qa shadow-qa flex h-full flex-col overflow-hidden bg-[#e5e5f9]">
            <div className="bg-primary p-[16px_24px] text-center">
                <h3 className="m-0 text-[22px] font-bold text-white">
                    Employees of the Month
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
                        <SwiperSlide key={winner.id}>
                            <div className="flex h-full flex-col">
                                <div className="p-4">
                                    <div className="rounded-qa border-qa-border h-[180px] w-full overflow-hidden border">
                                        <img
                                            src={winner.user.profile?.avatar ? `/storage/${winner.user.profile.avatar}` : (winner.user.profile?.image || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop')}
                                            alt={winner.user.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-grow flex-col justify-center p-[0_22px_22px] text-center">
                                    <div className="mb-1 text-[18px] font-bold text-black line-clamp-1">
                                        {winner.user.name}
                                    </div>
                                    <div className="text-qa-muted mb-4 text-[13px] line-clamp-1">
                                        {winner.user.profile?.designation?.name || 'Position'} | {winner.user.profile?.department?.name || 'Department'}
                                    </div>
                                    <div className="mt-auto">
                                        <button className="bg-primary mx-auto w-max rounded-full px-8 py-2 text-[13px] font-bold text-white transition-colors hover:bg-black">
                                            Congratulate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="flex h-[52px] items-center justify-center gap-[10px] p-[10px_26px]">
                <div className="flex items-center gap-[2px]">
                    <button className="emp-prev flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                        <i className="fa-light fa-chevron-left text-[14px]"></i>
                    </button>
                    <div className="emp-pagination flex !w-auto items-center" />
                    <button className="emp-next flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-black hover:bg-white/40 disabled:cursor-auto disabled:opacity-30">
                        <i className="fa-light fa-chevron-right text-[14px]"></i>
                    </button>
                </div>
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
        </div>
    );
}
