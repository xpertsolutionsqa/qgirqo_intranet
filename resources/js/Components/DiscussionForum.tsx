import { Link, usePage, useForm, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import EmployeeAvatar from '@/Components/EmployeeAvatar';
import Modal from '@/Components/Modal';
import LoginModal from '@/Components/LoginModal';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Initialize dayjs plugin
dayjs.extend(relativeTime);

declare var route: any;

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function DiscussionForum({ topics }: { topics: any[] }) {
    const { auth } = usePage<any>().props;
    const [progress, setProgress] = useState(0);
    const [selectedTopic, setSelectedTopic] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [commentPage, setCommentPage] = useState(1);
    const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [mediaPreview, setMediaPreview] = useState<{ url: string; type: string } | null>(null);

    useEffect(() => {
        if (selectedTopic && topics) {
            const updatedTopic = topics.find(t => t.id === selectedTopic.id);
            if (updatedTopic) {
                setSelectedTopic(updatedTopic);
            }
        }
    }, [topics, selectedTopic?.id]);

    const { data: modalData, setData: setModalData, post: postModal, processing: modalProcessing, reset: resetModal, errors: modalErrors, clearErrors: clearModalErrors } = useForm<{
        content: string;
        media: File | null;
    }>({
        content: '',
        media: null,
    });

    const { data: inlineData, setData: setInlineData, post: postInline, processing: inlineProcessing, reset: resetInline } = useForm({
        content: '',
    });

    const openModal = (topic: any) => {
        setSelectedTopic(topic);
        setShowModal(true);
        router.post(route('forum.increment-view', { topic: topic.slug }), {}, { preserveScroll: true, preserveState: true });
    };

    const closeModal = () => {
        setShowModal(false);
        setMediaPreview(null);
        resetModal('content', 'media');
        clearModalErrors();
        setTimeout(() => setSelectedTopic(null), 300);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setModalData('media', file);
            const url = URL.createObjectURL(file);
            const type = file.type.startsWith('video/') ? 'video' : 'image';
            setMediaPreview({ url, type });
        }
    };

    const triggerFileInput = (accept: string) => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = accept;
            fileInputRef.current.click();
        }
    };

    const clearMedia = () => {
        if (mediaPreview) URL.revokeObjectURL(mediaPreview.url);
        setMediaPreview(null);
        setModalData('media', null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const toggleLike = (topic: any) => {
        if (!auth.user) {
            setShowLoginModal(true);
            return;
        }
        router.post(route('forum.toggle-like', { topic: topic.slug }), {}, { preserveScroll: true });
    };

    const submitModalComment = (e: React.FormEvent) => {
        e.preventDefault();
        postModal(route('forum.replies.store', { topic: selectedTopic.slug }), {
            preserveScroll: true,
            onSuccess: () => {
                resetModal('content', 'media');
                setMediaPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    };

    const submitInlineComment = (topicSlug: string, topicId: number) => {
        if (!inlineData.content.trim()) return;
        setActiveCommentId(topicId);

        postInline(route('forum.replies.store', { topic: topicSlug }), {
            preserveScroll: true,
            onSuccess: () => {
                resetInline('content');
                setActiveCommentId(null);
            },
            onError: () => {
                setActiveCommentId(null);
            }
        });
    };

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
                                    <div className="df_card_top flex items-start gap-[15px]">
                                        <EmployeeAvatar
                                            src={df.author?.profile?.avatar}
                                            alt={df.author?.name}
                                            className="h-[50px] w-[50px] shrink-0"
                                        />
                                        <div className="flex flex-col flex-1 min-w-0">
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
                                                <button
                                                    onClick={() => openModal(df)}
                                                    className="df_view text-primary flex items-center gap-1 text-[12px] hover:text-black hover:no-underline"
                                                >
                                                    <span className="underline">
                                                        View Thread
                                                    </span>
                                                    <i className="fa-light fa-chevron-right text-[12px]"></i>
                                                </button>
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
                                        {auth.user ? (
                                            <div className="df_input_row flex items-center gap-[10px]">
                                                {/* <EmployeeAvatar
                                                    src={usePage<any>().props.auth.user?.profile?.avatar}
                                                    alt={usePage<any>().props.auth.user?.name}
                                                    className="h-[36px] w-[36px] shrink-0"
                                                /> */}
                                                <input
                                                    type="text"
                                                    value={activeCommentId === df.id ? inlineData.content : ''}
                                                    onChange={e => {
                                                        setActiveCommentId(df.id);
                                                        setInlineData('content', e.target.value);
                                                    }}
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            submitInlineComment(df.slug, df.id);
                                                        }
                                                    }}
                                                    className="df_input flex-1 min-w-0 border-qa-border rounded-qa h-9 bg-white px-3 text-[12px] text-black outline-none focus:ring-1 focus:ring-primary"
                                                    placeholder="Write a reply..."
                                                />
                                                <button
                                                    onClick={() => submitInlineComment(df.slug, df.id)}
                                                    disabled={inlineProcessing && activeCommentId === df.id}
                                                    className="df_send shrink-0 text-primary rounded-qa flex h-9 w-9 items-center justify-center border border-black/5 bg-white transition-colors hover:bg-black/5 disabled:opacity-50"
                                                >
                                                    {inlineProcessing && activeCommentId === df.id ? (
                                                        <i className="fa-light fa-spinner-third animate-spin text-[14px]"></i>
                                                    ) : (
                                                        <i className="fa-light fa-paper-plane-top text-[14px]"></i>
                                                    )}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="df_input_row flex items-center justify-center">
                                                <button
                                                    onClick={() => setShowLoginModal(true)}
                                                    className="text-[12px] text-primary hover:text-black font-medium transition-colors"
                                                >
                                                    Login to join the discussion
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="df_share flex items-center gap-[14px] pt-2 text-[12px]">
                                        <b className="font-bold">Share:</b>
                                        <button
                                            type="button"
                                            onClick={() => openModal(df)}
                                            className="text-primary flex items-center gap-1.5 font-medium hover:text-black hover:no-underline"
                                        >
                                            <i className="fa-light fa-image text-[13px]"></i>
                                            <span className="underline">
                                                Photo
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openModal(df)}
                                            className="text-primary flex items-center gap-1.5 font-medium hover:text-black hover:no-underline"
                                        >
                                            <i className="fa-light fa-video text-[13px]"></i>
                                            <span className="underline">
                                                Video
                                            </span>
                                        </button>
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

            {/* Detail Modal */}
            <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
                {selectedTopic && (
                    <div className="flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-[#f8f8ff]">
                            <div className="flex items-center gap-4">
                                <EmployeeAvatar
                                    src={selectedTopic.author?.profile?.avatar}
                                    alt={selectedTopic.author?.name}
                                    className="h-12 w-12 shrink-0 border border-qa-border"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-black leading-tight">
                                        {selectedTopic.title}
                                    </h2>
                                    <p className="text-[12px] text-qa-muted font-medium mt-1">
                                        Started by <span className="text-primary">{selectedTopic.author?.name}</span> • {dayjs(selectedTopic.created_at).fromNow()}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="h-8 w-8 flex items-center justify-center text-qa-muted hover:text-black hover:bg-gray-100 rounded-full transition-all"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
                            <div className="bg-qa-bg rounded-qa p-5 mb-8 border border-qa-border">
                                <div
                                    className="text-[15px] leading-relaxed text-black prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: selectedTopic.content }}
                                />

                                <div className="mt-6 pt-4 border-t border-white/60 flex items-center justify-between text-[13px] text-qa-muted font-bold">
                                    <button
                                        onClick={() => toggleLike(selectedTopic)}
                                        className={`flex items-center gap-2 transition-colors ${selectedTopic.is_liked ? 'text-primary' : 'hover:text-primary'}`}
                                    >
                                        <i className={`fa-solid fa-thumbs-up ${selectedTopic.is_liked ? 'text-primary' : ''}`}></i>
                                        {selectedTopic.likes_count || 0} Votes
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-comment-dots"></i>
                                        {selectedTopic.replies_count || 0} Replies
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-eye"></i>
                                        {selectedTopic.view_count || 0} Views
                                    </div>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-16 font-bold text-black flex items-center gap-2">
                                        Replies ({selectedTopic.replies?.length || 0})
                                    </h3>
                                    {selectedTopic.replies && selectedTopic.replies.length > 5 && (
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => setCommentPage(p => Math.max(1, p - 1))}
                                                disabled={commentPage === 1}
                                                className="h-6 w-6 flex items-center justify-center rounded border border-gray-200 text-qa-muted hover:border-primary hover:text-primary transition-all disabled:opacity-30"
                                            >
                                                <i className="fa-solid fa-chevron-left text-[10px]"></i>
                                            </button>
                                            <span className="text-[11px] font-bold text-black flex items-center px-2">
                                                Page {commentPage}
                                            </span>
                                            <button
                                                onClick={() => setCommentPage(p => Math.min(Math.ceil(selectedTopic.replies.length / 5), p + 1))}
                                                disabled={commentPage >= Math.ceil(selectedTopic.replies.length / 5)}
                                                className="h-6 w-6 flex items-center justify-center rounded border border-gray-200 text-qa-muted hover:border-primary hover:text-primary transition-all disabled:opacity-30"
                                            >
                                                <i className="fa-solid fa-chevron-right text-[10px]"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {selectedTopic.replies && selectedTopic.replies.length > 0 ? (
                                        selectedTopic.replies
                                            .slice((commentPage - 1) * 5, commentPage * 5)
                                            .map((reply: any) => (
                                                <div key={reply.id} className="flex flex-col gap-1 p-4 rounded-qa bg-white border border-gray-100">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-[12px] font-bold text-black">{reply.author?.name}</span>
                                                        <span className="text-[11px] text-qa-muted">{dayjs(reply.created_at).fromNow()}</span>
                                                    </div>
                                                    <p className="text-[12px] text-gray-700 leading-relaxed text-start">
                                                        {reply.content}
                                                    </p>
                                                    {reply.media_path && (
                                                        <div className="mt-2 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex justify-center items-center">
                                                            {reply.media_type === 'video' ? (
                                                                <video
                                                                    src={`/storage/${reply.media_path}`}
                                                                    className="max-h-[250px] w-full object-contain"
                                                                    controls
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={`/storage/${reply.media_path}`}
                                                                    alt="Attachment"
                                                                    className="max-h-[250px] w-auto origin-center object-scale-down"
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                    ) : (
                                        <div className="text-center py-8 text-qa-muted italic text-[13px]">
                                            No replies yet. Be the first to join the discussion!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Input */}
                        <div className="p-6 border-t border-gray-100 bg-white">
                            {auth.user ? (
                                <form onSubmit={submitModalComment} className="relative">
                                    <textarea
                                        value={modalData.content}
                                        onChange={e => setModalData('content', e.target.value)}
                                        placeholder="Write a reply..."
                                        rows={2}
                                        className="w-full rounded-xl border-gray-200 p-4 pr-24 text-[14px] focus:ring-primary focus:border-primary resize-none placeholder:text-gray-400"
                                        required
                                    />
                                    {mediaPreview && (
                                        <div className="relative mt-2 inline-block rounded-lg overflow-hidden border border-gray-200">
                                            {mediaPreview.type === 'video' ? (
                                                <video src={mediaPreview.url} className="h-24 w-auto object-cover" />
                                            ) : (
                                                <img src={mediaPreview.url} alt="Preview" className="h-24 w-auto object-cover" />
                                            )}
                                            <button
                                                type="button"
                                                onClick={clearMedia}
                                                className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
                                            >
                                                <i className="fa-solid fa-xmark text-[10px]"></i>
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                    <div className="flex w-full items-center justify-between mt-2">
                                        <div className="flex items-center gap-2 px-2">
                                            <button
                                                type="button"
                                                onClick={() => triggerFileInput('image/*')}
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-qa-muted transition-colors hover:bg-gray-100 hover:text-primary"
                                                title="Attach Photo"
                                            >
                                                <i className="fa-light fa-image text-[15px]"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => triggerFileInput('video/*')}
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-qa-muted transition-colors hover:bg-gray-100 hover:text-primary"
                                                title="Attach Video"
                                            >
                                                <i className="fa-light fa-video text-[15px]"></i>
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={modalProcessing || !modalData.content.trim()}
                                            className="bg-primary hover:bg-black text-white px-6 py-2 rounded-lg text-[13px] font-bold transition-all shadow-md disabled:opacity-50"
                                        >
                                            {modalProcessing ? '...' : 'Reply'}
                                        </button>
                                    </div>
                                    {modalErrors.content && (
                                        <p className="text-red-500 text-[11px] mt-1 ml-1">{modalErrors.content}</p>
                                    )}
                                </form>
                            ) : (
                                <div className="text-center py-4 bg-qa-bg rounded-xl border border-dashed border-qa-border">
                                    <p className="text-[13px] text-qa-muted mb-3 font-medium">
                                        Login to join the conversation and share your thoughts!
                                    </p>
                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="inline-block bg-primary hover:bg-black text-white px-8 py-2 rounded-lg text-[13px] font-bold transition-all shadow-sm"
                                    >
                                        Log In
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>

            <LoginModal
                show={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </section>
    );
}
