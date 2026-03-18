import LoginModal from '@/Components/LoginModal';
import Modal from '@/Components/Modal';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState, useEffect, useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Initialize dayjs plugin
dayjs.extend(relativeTime);

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

declare var route: any;

export default function DigitalVoicesForum({ topics = [] }: { topics?: any[] }) {
    const { auth } = usePage<any>().props;
    const [selectedTopic, setSelectedTopic] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [commentPage, setCommentPage] = useState(1);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [mediaPreview, setMediaPreview] = useState<{ url: string; type: string } | null>(null);

    const { data: createData, setData: setCreateData, post: postCreate, processing: createProcessing, reset: resetCreate, errors: createErrors, clearErrors: clearCreateErrors } = useForm({
        title: '',
        content: '',
        type: 'voice',
    });

    useEffect(() => {
        if (selectedTopic && topics) {
            const updatedTopic = topics.find(t => t.id === selectedTopic.id);
            if (updatedTopic) {
                setSelectedTopic(updatedTopic);
            }
        }
    }, [topics, selectedTopic?.id]);

    const ideas = topics.slice(0, 2); // Show first 2 in carousel
    const recent = topics.slice(2, 5); // Show next 3 in list

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm<{
        content: string;
        media: File | null;
    }>({
        content: '',
        media: null,
    });

    const openModal = (topic: any) => {
        setSelectedTopic(topic);
        setShowModal(true);
        router.post(route('forum.increment-view', { topic: topic.slug }), {}, { preserveScroll: true, preserveState: true });
    };

    const closeModal = () => {
        setShowModal(false);
        setMediaPreview(null);
        reset('content', 'media');
        clearErrors();
        setTimeout(() => setSelectedTopic(null), 300);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('media', file);
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
        setData('media', null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('forum.replies.store', { topic: selectedTopic.slug }), {
            preserveScroll: true,
            onSuccess: () => {
                reset('content', 'media');
                setMediaPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    };

    const toggleLike = (topic: any) => {
        if (!auth.user) {
            setShowLoginModal(true);
            return;
        }
        router.post(route('forum.toggle-like', { topic: topic.slug }), {}, { preserveScroll: true });
    };

    const submitIdea = (e: React.FormEvent) => {
        e.preventDefault();
        postCreate(route('forum.topic.store'), {
            onSuccess: () => {
                resetCreate();
                setShowCreateModal(false);
            },
        });
    };

    const openCreateModal = () => {
        if (!auth.user) {
            setShowLoginModal(true);
            return;
        }
        setShowCreateModal(true);
    };

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
                                <div className="rounded-qa border-qa-border border bg-primary p-5 shadow-sm">
                                    <div className="mb-3 flex items-start gap-4">
                                        <div className="text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f4f4ff]">
                                            <i className="fa-light fa-lightbulb text-[24px]"></i>
                                        </div>
                                        <div>
                                            <div className="text-[16px] leading-tight font-bold text-white line-clamp-1">
                                                {idea.title}
                                            </div>
                                            <div className="text-qa-muted text-[11px]">
                                                Suggested by {idea.author?.name || 'User'}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-4 text-[13px] leading-relaxed text-white line-clamp-2">
                                        {idea.content.replace(/<[^>]*>?/gm, '')}
                                    </p>
                                    <div className="mb-3 h-px bg-gray-100" />
                                    <div className="text-white flex items-center justify-between text-[11px]">
                                        <span className="flex items-center gap-1">
                                            <i className={`fa-solid fa-thumbs-up ${idea.is_liked ? 'text-white' : 'text-white/70'}`}></i>
                                            {idea.likes_count || 0} Votes
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <i className="fa-light fa-comment-dots text-white text-[12px]"></i>
                                            {idea.replies_count || 0} Comments
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <i className="fa-light fa-eye text-white text-[12px]"></i>
                                            {idea.view_count || 0} Views
                                        </span>
                                    </div>
                                    <div className="my-3 h-px bg-gray-100" />
                                    <div className="text-center mt-2">
                                        <button
                                            onClick={() => openModal(idea)}
                                            className="text-white border border-white rounded-full px-4 py-1 text-[12px] font-bold hover:bg-white hover:text-primary transition-all"
                                        >
                                            View Details
                                        </button>
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
                                <li
                                    key={r.id}
                                    onClick={() => openModal(r)}
                                    className="group flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-white/40"
                                >
                                    <span className="text-[13px] font-medium text-black line-clamp-1">
                                        {r.title}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <i className="fa-light fa-chevron-right text-qa-muted group-hover:text-primary h-4 w-4"></i>
                                    </div>
                                </li>
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
                    <button
                        onClick={openCreateModal}
                        className="bg-primary inline-block rounded-full px-10 py-2.5 text-[13px] font-bold text-white shadow-lg transition-colors hover:bg-black no-underline"
                    >
                        Submit Your Idea
                    </button>
                </div>
            </div>

            {/* Detail Modal */}
            <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
                {selectedTopic && (
                    <div className="flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-[#f8f8ff]">
                            <div className="flex items-center gap-4">
                                <div className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-qa-border">
                                    <i className="fa-light fa-lightbulb text-[28px]"></i>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-black leading-tight">
                                        {selectedTopic.title}
                                    </h2>
                                    <p className="text-[12px] text-qa-muted font-medium mt-1">
                                        Suggested by <span className="text-primary">{selectedTopic.author?.name}</span> • {dayjs(selectedTopic.created_at).fromNow()}
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
                                        {selectedTopic.replies_count || 0} Comments
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
                                        Comments ({selectedTopic.replies?.length || 0})
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
                                                    <div className="flex items-start justify-between mb-1">
                                                        <span className="text-[12px] font-bold text-black">{reply.author?.name}</span>
                                                        <span className="text-[11px] text-qa-muted text-start">{dayjs(reply.created_at).fromNow()}</span>
                                                    </div>
                                                    <p className="text-[13px] text-gray-700 leading-relaxed text-start">
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
                                            No comments yet. Be the first to join the discussion!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Input */}
                        <div className="p-6 border-t border-gray-100 bg-white">
                            {auth.user ? (
                                <form onSubmit={submitComment} className="relative">
                                    <textarea
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        placeholder="Write a comment..."
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
                                            disabled={processing || !data.content.trim()}
                                            className="bg-primary hover:bg-black text-white px-6 py-2 rounded-lg text-[13px] font-bold transition-all shadow-md disabled:opacity-50"
                                        >
                                            {processing ? '...' : 'Post'}
                                        </button>
                                    </div>
                                    {errors.content && (
                                        <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.content}</p>
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

            <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)} maxWidth="lg">
                <form onSubmit={submitIdea} className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-black flex items-center gap-2">
                            <i className="fa-light fa-lightbulb text-primary text-[24px]"></i>
                            Submit Your Idea
                        </h2>
                        <button
                            type="button"
                            onClick={() => setShowCreateModal(false)}
                            className="h-8 w-8 flex items-center justify-center text-qa-muted hover:text-black hover:bg-gray-100 rounded-full transition-all"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[13px] font-bold text-black mb-1.5 ml-1">Title of your idea</label>
                            <input
                                type="text"
                                value={createData.title}
                                onChange={e => setCreateData('title', e.target.value)}
                                className="w-full rounded-xl border-gray-200 p-4 text-[14px] focus:ring-primary focus:border-primary placeholder:text-gray-400"
                                placeholder="What is your suggestion?"
                                required
                            />
                            {createErrors.title && <p className="text-red-500 text-[11px] mt-1 ml-1">{createErrors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-black mb-1.5 ml-1">Detail / Reason</label>
                            <textarea
                                value={createData.content}
                                onChange={e => setCreateData('content', e.target.value)}
                                className="w-full rounded-xl border-gray-200 p-4 text-[14px] focus:ring-primary focus:border-primary placeholder:text-gray-400 min-h-[120px]"
                                placeholder="Explain your idea in more detail..."
                                required
                            />
                            {createErrors.content && <p className="text-red-500 text-[11px] mt-1 ml-1">{createErrors.content}</p>}
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setShowCreateModal(false)}
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-[14px] font-bold text-qa-muted hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={createProcessing}
                            className="flex-1 bg-primary hover:bg-black text-white px-4 py-3 rounded-xl text-[14px] font-bold transition-all shadow-md disabled:opacity-50"
                        >
                            {createProcessing ? 'Submitting...' : 'Submit Idea'}
                        </button>
                    </div>
                </form>
            </Modal>

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
