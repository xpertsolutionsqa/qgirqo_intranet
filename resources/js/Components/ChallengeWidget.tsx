import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import LoginModal from './LoginModal';


interface ChallengeOption {
    id: number;
    challenge_id: number;
    option_text: string;
}

interface Challenge {
    id: number;
    question: string;
}

interface ChallengeData {
    data: Challenge & { options: ChallengeOption[] };
    has_responded: boolean;
}

export default function ChallengeWidget({ challenge }: { challenge: ChallengeData | null }) {
    const { auth } = usePage<any>().props;
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLogin, setShowLogin] = useState(false);


    if (!challenge) return null;

    const handleSubmit = () => {
        if (!auth.user) {
            setShowLogin(true);
            return;
        }


        if (!selectedOption) return;

        setIsSubmitting(true);
        // Using common route parameter syntax
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
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-900/20">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Daily Challenge
                </h3>
                <span className="rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600 dark:bg-orange-900/30">
                    Active
                </span>
            </div>

            <div className="p-6">
                <div className="mb-6 text-[16px] font-semibold text-gray-800 dark:text-gray-200">
                    {challenge.data.question}
                </div>

                {challenge.has_responded ? (
                    <div className="rounded-xl bg-green-50 p-4 text-center dark:bg-green-900/20">
                        <i className="fa-solid fa-circle-check mb-2 text-2xl text-green-500"></i>
                        <p className="text-sm font-medium text-green-700 dark:text-green-400">
                            Thank you for your response!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {challenge.data.options.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => setSelectedOption(Number(option.id))}
                                className={`w-full rounded-xl border p-4 text-left text-sm transition-all duration-200 ${Number(selectedOption) === Number(option.id)
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-600/20 dark:bg-indigo-900/30 dark:text-indigo-400'
                                    : 'border-gray-100 bg-gray-50/50 text-gray-700 hover:border-indigo-300 hover:bg-white dark:border-gray-700 dark:bg-gray-900/20 dark:text-gray-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option.option_text}</span>
                                    {Number(selectedOption) === Number(option.id) && (
                                        <i className="fa-solid fa-circle-check text-indigo-600"></i>
                                    )}
                                </div>
                            </button>
                        ))}

                        <button
                            type="button"
                            disabled={!selectedOption || isSubmitting}
                            onClick={handleSubmit}
                            className="mt-4 w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 disabled:opacity-50 disabled:shadow-none dark:shadow-none"
                        >
                            {isSubmitting ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                                auth.user ? 'Submit Answer' : 'Login to Participate'
                            )}
                        </button>
                    </div>
                )}
            </div>
            <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
        </div>

    );
}
