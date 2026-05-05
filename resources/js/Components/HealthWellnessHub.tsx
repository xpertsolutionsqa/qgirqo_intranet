import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import LoginModal from '@/Components/LoginModal';

interface ChallengeOption {
    id: number;
    challenge_id: number;
    option_text: string;
}

interface Challenge {
    id: number;
    question: string;
    scheduled_at: string | null;
    image_path: string | null;
    is_active: boolean;
    options: ChallengeOption[];
}

interface ChallengeData {
    data: Challenge;
    has_responded: boolean;
}

export default function HealthWellnessHub({
    articles = [],
    challenge = null
}: {
    articles?: any[],
    challenge?: ChallengeData | null
}) {
    const { auth } = usePage<any>().props;
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleSubmit = () => {
        if (!auth.user) {
            setShowLoginModal(true);
            return;
        }

        if (!selectedOption || !challenge) return;

        setIsSubmitting(true);
        router.post(route('challenges.respond', challenge.data.id), {
            challenge_option_id: selectedOption,
        }, {
            onFinish: () => setIsSubmitting(false),
            onError: (errors) => {
                console.error('Submission failed:', errors);
            }
        });
    };

    return (
        <section className="qg_card hwh_card rounded-qa shadow-qa relative flex  h-full flex-col overflow-hidden bg-[#e5e5f9] md:flex-row">
            {challenge ? (
                <>
                    {/* Left Side: Vertical Image Section */}
                    <div className="relative w-full h-[250px] md:h-auto md:w-[32%] lg:w-[35%] shrink-0 overflow-hidden transform-gpu">
                        {challenge.data.image_path?.match(/\.(mp4|mov|avi|webm)$/i) ? (
                            <video
                                src={`/storage/${challenge.data.image_path}`}
                                className="absolute inset-0 h-full w-full object-cover transform-gpu will-change-transform"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                            />
                        ) : (
                            <img
                                src={challenge.data.image_path ? `/storage/${challenge.data.image_path}` : "https://images.unsplash.com/photo-1563603410-ecb8599426f8?q=80&w=1600&auto=format&fit=crop"}
                                alt="Challenge Image"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        )}

                        {/* Badge/Overlay */}
                        <div className="absolute top-4 left-4 right-4 text-center transform-gpu">
                            <span className="bg-primary rounded-full px-4 py-2 text-[11px] font-bold text-white shadow-xl inline-block">
                                Intranet Competition
                            </span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 transform-gpu">
                            <div className="bg-black/40 border border-white/20 block text-center rounded-xl p-3 text-[12px] font-bold text-white shadow-lg">
                                Daily Knowledge Booster
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Challenge Area */}
                    <div className="flex flex-grow flex-col p-6 md:p-8">
                        <div className="mb-6">
                            <h3 className="text-primary/60 text-[11px] font-bold capatilize tracking-wider mb-1">
                                Today's Question
                            </h3>
                            <h2 className="text-[22px] font-extrabold text-black leading-tight">
                                {challenge.data.question}
                            </h2>
                        </div>

                        <div className="flex flex-col flex-grow">
                            {challenge.has_responded ? (
                                <div className="flex flex-col items-center justify-center flex-grow py-8 bg-green-50/50 rounded-2xl border border-green-100 dark:bg-green-900/10 dark:border-green-800">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                                        <i className="fa-solid fa-check text-2xl"></i>
                                    </div>
                                    <h4 className="text-lg font-bold text-green-800 dark:text-green-400">Response Submitted!</h4>
                                    <p className="text-sm text-green-600 dark:text-green-500 mt-2">Thank you for participating today.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-3">
                                        {challenge.data.options.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => setSelectedOption(option.id)}
                                                className={`group relative flex items-center justify-between gap-4 rounded-xl border-2 p-4 transition-all duration-200 ${selectedOption === option.id
                                                    ? 'border-primary bg-primary/5 shadow-sm'
                                                    : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className={`text-sm text-start font-extrabold text-black leading-tight ${selectedOption === option.id ? 'text-primary' : 'text-gray-700 group-hover:text-black'
                                                    }`}>
                                                    {option.option_text}
                                                </span>
                                                <div className={`h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${selectedOption === option.id
                                                    ? 'border-primary bg-primary'
                                                    : 'border-gray-200 bg-white'
                                                    }`}>
                                                    {selectedOption === option.id && (
                                                        <i className="fa-solid fa-check text-[10px] text-white"></i>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div className="text-[10px] font-bold text-gray-400 capatilize tracking-widest">
                                            Answer carefully
                                        </div>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!selectedOption || isSubmitting}
                                            className="bg-primary hover:bg-black disabled:bg-gray-200 disabled:shadow-none min-w-[140px] px-6 py-3 rounded-xl text-[13px] font-bold text-white shadow-lg transition-all active:scale-95"
                                        >
                                            {isSubmitting ? (
                                                <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                                            ) : (
                                                <i className="fa-solid fa-paper-plane mr-2"></i>
                                            )}
                                            {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex w-full flex-col items-center justify-center p-12 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
                        <i className="fa-solid fa-calendar-day text-primary text-3xl"></i>
                    </div>
                    <h2 className="text-[20px] font-extrabold text-black mb-2">No active challenge for today.</h2>
                    <p className="text-gray-500 max-w-xs mx-auto">Please check back later for the next Ramadan Competition question!</p>
                </div>
            )}

            <LoginModal
                show={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </section>
    );
}
