import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function DiscussionForum({ topics }: { topics: any[] }) {
    const [progress, setProgress] = useState(0);

    const discussions = topics || [];

    // Chunk discussions into pages of 2 cards each as per PHP (Slide 1 (2 cards))
    const pages = [];
    if (discussions.length > 0) {
        for (let i = 0; i < discussions.length; i += 2) {
            pages.push(discussions.slice(i, i + 2));
        }
    }

    const handleSlideChange = (swiper: any) => {
        const total = Math.max(swiper.snapGrid.length, 1);
        const index = Math.min(Math.max(swiper.snapIndex + 1, 1), total);
        const pct = total === 1 ? 100 : (index / total) * 100;
        setProgress(Math.max(12, pct));
    };

    return (
        <section className="df_section mx-auto w-full max-w-[1120px]">
            {/* Top Line */}
            <div className="mb-2 h-[2px] rounded-full bg-[#e5e5f9]" />

            <h3 className="qg_card_title df_title mb-[12px] text-center text-[22px] font-bold text-black">
                Discussion Forum
            </h3>

            <Swiper
                modules={[Navigation]}
                onInit={handleSlideChange}
                onSlideChange={handleSlideChange}
                onResize={handleSlideChange}
                navigation={{
                    prevEl: '.df_prev',
                    nextEl: '.df_next',
                }}
                spaceBetween={16}
                autoHeight={true}
                className="df_swiper pb-2!"
            >
                {pages.map((page, pageIndex) => (
                    <SwiperSlide key={pageIndex}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {page.map((df) => (
                                <div
                                    key={df.id}
                                    className="df_card rounded-qa border-qa-border flex h-full flex-col border bg-[#fafcfd] p-[16px_16px_14px]"
                                >
                                    <div className="df_card_top grid grid-cols-[52px_1fr] items-start gap-[15px]">
                                        <div className="df_avatar h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full border border-black/5 bg-[#ddd]">
                                            <img
                                                src={
                                                    df.author?.profile?.avatar
                                                        ? `/storage/${df.author.profile.avatar}`
                                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(df.author?.name || 'User')}`
                                                }
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="df_heading mb-1.5 line-clamp-1 text-[14px] font-bold text-[#374649]">
                                                {df.title}
                                            </div>
                                            <p className="df_snip line-clamp-2 text-[13px] leading-[1.35] text-[#374649]">
                                                {df.content.replace(
                                                    /<[^>]*>?/gm,
                                                    '',
                                                )}
                                            </p>

                                            <div className="df_mid flex items-center justify-between py-[10px]">
                                                <Link
                                                    href={route(
                                                        'forum.show',
                                                        { topic: df.slug },
                                                    )}
                                                    className="df_view text-primary flex items-center gap-1 text-[12px] hover:text-black hover:no-underline"
                                                >
                                                    <span className="underline">
                                                        View Thread
                                                    </span>
                                                    <i className="fa-light fa-chevron-right text-[12px]"></i>
                                                </Link>
                                                <div className="df_likes text-primary flex items-center gap-1.5 text-[12px] whitespace-nowrap">
                                                    <i className="fa-solid fa-heart text-[12px] text-red-500"></i>
                                                    <span>
                                                        {df.replies_count || 0}{' '}
                                                        Replies
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2.5 border-t border-black/5 pt-2.5">
                                        <div className="df_input_row grid grid-cols-[36px_1fr_36px] items-center gap-[10px]">
                                            <div className="df_small_avatar h-[36px] w-[36px] shrink-0 overflow-hidden rounded-full bg-[#ddd]">
                                                <img
                                                    src="https://i.pravatar.cc/120?img=33"
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                className="df_input border-qa-border rounded-qa h-9 bg-white px-3 text-[12px] text-black outline-none"
                                                placeholder="Start a new discussion..."
                                            />
                                            <button className="df_send text-primary rounded-qa flex h-9 w-9 items-center justify-center border border-black/5 bg-white transition-colors hover:bg-black/5">
                                                <i className="fa-light fa-paper-plane-top text-[14px]"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="df_share flex items-center gap-[14px] pt-2 pl-[42px] text-[12px]">
                                        <b className="font-bold">Share:</b>
                                        <Link
                                            href="#"
                                            className="text-primary flex items-center gap-1.5 font-medium hover:text-black hover:no-underline"
                                        >
                                            <i className="fa-light fa-image text-[13px]"></i>
                                            <span className="underline">
                                                Photo
                                            </span>
                                        </Link>
                                        <Link
                                            href="#"
                                            className="text-primary flex items-center gap-1.5 font-medium hover:text-black hover:no-underline"
                                        >
                                            <i className="fa-light fa-video text-[13px]"></i>
                                            <span className="underline">
                                                Video
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Bottom Progress Navigation strictly matching PHP lines 891-901 */}
            <div className="df_nav_wrap mt-[14px] flex items-center justify-center gap-[18px]">
                <button
                    className="df_prev df_nav_btn text-primary bg-primary/10 hover:bg-primary/20 flex h-[30px] w-[30px] items-center justify-center rounded-full transition-colors disabled:opacity-30"
                    type="button"
                    aria-label="Previous"
                >
                    <i className="fa-light fa-chevron-left text-[14px]"></i>
                </button>

                <div className="df_progress relative h-[2px] w-[200px] overflow-hidden rounded-full bg-[#111111]/10">
                    <div
                        className="bg-primary absolute top-0 left-0 h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <button
                    className="df_next df_nav_btn text-primary bg-primary/10 hover:bg-primary/20 flex h-[30px] w-[30px] items-center justify-center rounded-full transition-colors disabled:opacity-30"
                    type="button"
                    aria-label="Next"
                >
                    <i className="fa-light fa-chevron-right text-[14px]"></i>
                </button>
            </div>
        </section>
    );
}
