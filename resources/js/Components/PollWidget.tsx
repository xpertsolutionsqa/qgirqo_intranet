import { Poll } from '@/interfaces/Polls';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import LoginModal from './LoginModal';

export default function PollWidget({ polls }: { polls: Poll }) {
    const { auth } = usePage<any>().props;
    const [showLogin, setShowLogin] = useState(false);
    const [loadingOpt, setLoadingOpt] = useState<number | null>(null);

    const hasVoted = polls?.votes?.some((v: any) => v.user_id === auth.user?.id) || false;

    const handleVote = (optionId: number) => {
        if (!auth.user) {
            setShowLogin(true);
            return;
        }

        if (hasVoted) return;

        setLoadingOpt(optionId);
        router.post(route('polls.vote', polls.id), { option_id: optionId }, {
            preserveScroll: true,
            onFinish: () => setLoadingOpt(null)
        });
    };

    return (
        <div className="qg_card qg_poll rounded-qa shadow-qa flex h-full flex-col bg-[#e5e5f9] p-[18px_22px_16px]">
            <h3 className="m-0 text-[22px] font-bold text-black text-center">
                Polls
            </h3>

            {!polls ? (
                <div className="flex h-full items-center justify-center">
                    <p className="text-primary text-[14px]">No Polls Found</p>
                </div>
            ) : (
                <>
                    <div className="qg_poll_q mb-[14px] mt-[10px] text-start font-medium text-black">
                        {polls.question}
                    </div>

                    <div className="grow space-y-[16px]">
                        {polls.options.map((option, index) => {
                            const totalVotes = polls.votes.length;
                            const voteCount = option.votes.length;
                            const percentage =
                                totalVotes > 0
                                    ? Math.round((voteCount / totalVotes) * 100)
                                    : 0;

                            if (hasVoted) {
                                return (
                                    <div
                                        key={index}
                                        className="qg_poll_row grid grid-cols-[70px_1fr] items-center gap-[18px]"
                                    >
                                        <div className="qg_poll_label text-[14px] font-medium text-black">
                                            {option.option_text}
                                        </div>
                                        <div className="qg_poll_barwrap rounded-qa relative h-[35px] w-full overflow-hidden bg-white">
                                            <div
                                                className={`qg_poll_fill rounded-qa bg-primary h-full transition-all duration-1000`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                            <div
                                                className={`qg_poll_pct text-primary absolute top-1/2 -translate-y-1/2 text-[15px] font-bold transition-all duration-1000 [text-shadow:0px_0px_5px_#ffffff] ${percentage > 80 ? 'right-[10px]' : 'left-[70px]'}`}
                                            >
                                                {percentage}%
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleVote(option.id)}
                                    disabled={loadingOpt !== null}
                                    className="w-full text-left rounded-qa bg-white hover:bg-black/5 hover:border-black/20 border-transparent border transition-all p-[12px_16px] text-[14px] font-medium text-black flex items-center justify-between"
                                >
                                    <span>{option.option_text}</span>
                                    {loadingOpt === option.id && (
                                        <i className="fa-solid fa-spinner fa-spin text-primary"></i>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="qg_poll_note text-primary mt-[34px] text-center text-[14px]">
                        {hasVoted ? "You've already participated in this poll." : "Click on an option to vote."}
                    </div>
                </>
            )}

            <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
        </div>
    );
}