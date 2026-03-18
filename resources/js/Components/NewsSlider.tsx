import Modal from '@/Components/Modal';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function NewsSlider({ news }: any) {
    const [selectedNews, setSelectedNews] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = (item: any) => {
        setSelectedNews(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        // Delay clearing news to avoid layout shift during transition
        setTimeout(() => setSelectedNews(null), 300);
    };

    return (
        <div className="news_slider rounded-qa group relative overflow-hidden h-full">
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
                            <div className="qa-media-caption absolute bottom-[55px] left-[26px] z-10 max-w-[500px] text-white">
                                <div className="news_title mb-1 text-[20px] leading-tight font-bold">
                                    {item.title}
                                </div>
                                <div className="news_desc mb-4 text-[14px] leading-relaxed line-clamp-2 text-white/90">
                                    {item.summary || item.description || ''}
                                </div>
                                <div className="news_action">
                                    <button
                                        onClick={() => openModal(item)}
                                        className="btn bg-primary hover:bg-white hover:text-primary transition-all inline-block rounded-full px-8 py-2.5 text-[13px] text-white font-bold shadow-lg"
                                    >
                                        Read more
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="custom-swiper-pagination absolute bottom-4 mb-2 ml-6 z-20 flex gap-1.5" />

            {/* News Detail Modal */}
            <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
                {selectedNews && (
                    <div className="p-0 overflow-hidden">
                        {/* Header Image */}
                        <div className="relative h-[300px] w-full bg-slate-100">
                            <img
                                src={`/storage/${selectedNews.featured_image}`}
                                alt={selectedNews.title}
                                className="h-full w-full object-cover"
                            />
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black transition-colors z-20"
                            >
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>

                        <div className="p-8  mb-2">
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-black mb-2 leading-tight">
                                    {selectedNews.title}
                                </h2>
                                {selectedNews.created_at && (
                                    <div className="text-[13px] text-gray-500 font-medium">
                                        Published: {new Date(selectedNews.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                )}
                            </div>

                            <div className="h-px bg-gray-100 mb-6" />

                            <div className="max-h-[30vh] overflow-y-auto pr-4 custom-scrollbar">
                                <div
                                    className="text-[15px] leading-[1.8] text-gray-700 whitespace-pre-wrap prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: selectedNews.content || selectedNews.description || selectedNews.summary || '' }}
                                />
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="bg-primary hover:bg-black rounded-lg px-8 py-2.5 text-white transition-colors font-bold shadow-qa"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

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
        </div >
    );
}
