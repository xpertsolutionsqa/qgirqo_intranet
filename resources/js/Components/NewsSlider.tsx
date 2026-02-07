import { Link } from '@inertiajs/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function NewsSlider({ news }: any) {
    // const news = [
    //     {
    //         id: 1,
    //         title: 'QGIRCO Reports Strong Turnaround',
    //         description:
    //             'QGIRCO announced a net profit of QAR 28.963 million for the year 2024, compared with a net loss of QAR 1.47 billion in 2023.',
    //         image: '/assets/img/Rectangle-1382.jpg',
    //         link: '#',
    //     },
    //     {
    //         id: 2,
    //         title: 'Second News Title',
    //         description: 'Another short summary…',
    //         image: '/assets/img/Rectangle-1382.jpg',
    //         link: '#',
    //     },
    //     {
    //         id: 3,
    //         title: 'Third News Title',
    //         description: 'Another short summary…',
    //         image: '/assets/img/Rectangle-1382.jpg',
    //         link: '#',
    //     },
    // ];

    return (
        <div className="news_slider rounded-qa group relative overflow-hidden">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                    el: '.custom-swiper-pagination',
                }}
                autoplay={{ delay: 5000 }}
                className="h-full"
            >
                {news.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className="qa-media group relative h-[390px] bg-slate-900">
                            <img
                                src={`/storage/${item.featured_image}`}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-700 "
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="qa-media-caption absolute top-[18px] left-[22px] z-10 max-w-[500px] text-black">
                                <h1 className="mb-4 text-[22px] font-bold">
                                    News
                                </h1>
                                <div className="news_title mb-1 text-[18px] leading-tight font-medium">
                                    {item.title}
                                </div>
                                <div className="news_desc mb-4 text-[14px] leading-relaxed">
                                    {item.summary || item.description || ''}
                                </div>
                                {/* <div className="news_action">
                                    <Link
                                        href={item.link || `/news/${item.slug}`}
                                        className="btn bg-primary inline-block rounded-full px-6 py-2 text-[14px] text-white transition-colors hover:bg-black"
                                    >
                                        Read more
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="custom-swiper-pagination absolute bottom-4 mb-2 ml-6 z-20 flex gap-1.5" />

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .custom-swiper-pagination .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: white;
                    opacity: 1;
                    margin: 0 !important;
                    border: 1px solid white;
                    transition: all 0.4s;
                }
                .custom-swiper-pagination .swiper-pagination-bullet-active {
                    width: 30px;
                    background: white;
                    border-color: black;
                    border-radius: 10px;
                }
            `,
                }}
            />
        </div>
    );
}
