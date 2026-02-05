import { Link } from '@inertiajs/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function DigitalVoicesForum({ topics = [] }: { topics?: any[] }) {
    const ideas = topics.slice(0, 2); // Show first 2 in carousel
    const recent = topics.slice(2, 5); // Show next 3 in list

    return (
        <div className="qg_card dvf_card rounded-qa shadow-qa relative flex h-full flex-col overflow-hidden bg-[#e5e5f9] p-6">
            <h3 className="mb-6 text-center text-[22px] font-bold text-black">
                Digital Voices Forum
            </h3>

            <div className="flex-grow">
                {ideas.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation={{
                            prevEl: '.dvf-prev',
                            nextEl: '.dvf-next',
                        }}
                        pagination={{
                            el: '.dvf-pagination',
                            clickable: true,
                        }}
                        className="mb-6"
                    >
                        {ideas.map((idea) => (
                            <SwiperSlide key={idea.id}>
                                <div className="rounded-qa border-qa-border border bg-white p-5 shadow-sm">
                                    <div className="mb-3 flex items-start gap-4">
                                        <div className="text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f4f4ff]">
                                            <i className="fa-light fa-lightbulb text-[24px]"></i>
                                        </div>
                                        <div>
                                            <div className="text-[16px] leading-tight font-bold text-black line-clamp-1">
                                                {idea.title}
                                            </div>
                                            <div className="text-qa-muted text-[11px]">
                                                Suggested by {idea.author?.name || 'User'}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-4 text-[13px] leading-relaxed text-black line-clamp-2">
                                        {idea.content.replace(/<[^>]*>?/gm, '')}
                                    </p>
                                    <div className="mb-3 h-px bg-gray-100" />
                                    <div className="text-qa-muted flex items-center justify-between text-[11px]">
                                        <div className="flex gap-3">
                                            <span className="flex items-center gap-1">
                                                <i className="fa-light fa-thumbs-up text-[12px]"></i>
                                                0 Votes
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i className="fa-light fa-comment-dots text-[12px]"></i>
                                                {idea.replies_count || 0} Comments
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1">
                                            <i className="fa-light fa-eye text-[12px]"></i>
                                            {idea.view_count || 0} Views
                                        </span>
                                    </div>
                                    <div className="my-3 h-px bg-gray-100" />
                                    <div className="text-center">
                                        <Link
                                            href={route('forum.show', { topic: idea.slug })}
                                            className="text-primary text-[12px] font-bold hover:underline"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="bg-white rounded-qa p-8 text-center text-sm text-gray-500 italic mb-6">
                        No voices found.
                    </div>
                )}

                {/* Recent Ideas */}
                {recent.length > 0 && (
                    <>
                        <div className="text-primary mb-3 text-[14px] font-bold uppercase">
                            Recent Ideas
                        </div>
                        <ul className="mb-6 space-y-2 text-black">
                            {recent.map((r) => (
                                <Link
                                    key={r.id}
                                    href={route('forum.show', { topic: r.slug })}
                                    className="group flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-white/40 no-underline"
                                >
                                    <span className="text-[13px] font-medium text-black line-clamp-1">
                                        {r.title}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <i className="fa-light fa-chevron-right text-qa-muted group-hover:text-primary h-4 w-4"></i>
                                    </div>
                                </Link>
                            ))}
                        </ul>
                    </>
                )}

                <div className="mb-6 flex items-center justify-center gap-[10px]">
                    <button className="dvf-prev flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-black hover:bg-white/40 disabled:opacity-30">
                        <i className="fa-light fa-chevron-left text-[16px]"></i>
                    </button>
                    <div className="dvf-pagination !w-auto" />
                    <button className="dvf-next flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-black hover:bg-white/40 disabled:opacity-30">
                        <i className="fa-light fa-chevron-right text-[16px]"></i>
                    </button>
                </div>

                <div className="text-center">
                    <Link
                        href={route('forum.digital_voices')}
                        className="bg-primary inline-block rounded-full px-10 py-2.5 text-[13px] font-bold text-white shadow-lg transition-colors hover:bg-black no-underline"
                    >
                        Submit Your Idea
                    </Link>
                </div>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .dvf-pagination .swiper-pagination-bullet {
                    width: 6px;
                    height: 6px;
                    background: transparent;
                    opacity: 1;
                    border: 1px solid black;
                    transition: all 0.4s;
                    margin: 0 3px !important;
                }
                .dvf-pagination .swiper-pagination-bullet-active {
                    width: 20px;
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
