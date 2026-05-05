import Modal from '@/Components/Modal';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface HumansWall {
    id: number;
    quote: string;
    story: string;
    image_path?: string;
    user: {
        name: string;
        profile?: {
            avatar?: string;
            department?: {
                name: string;
            }
        }
    }
}

export default function HumansOfQgirco({ featured }: { featured?: HumansWall | null }) {
    const [showFullStory, setShowFullStory] = useState(false);
    const employeeName = featured?.user.name || '[Employee Name]';
    const deptName = featured?.user.profile?.department?.name || 'our Team';
    const avatar = featured?.image_path
        ? `/storage/${featured.image_path}`
        : (featured?.user.profile?.avatar
            ? `/storage/${featured.user.profile.avatar}`
            : 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop');

    return (
        <>
            {/* New Design (Commented) */}
            {/* <div className="qg_card group rounded-qa border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md flex h-full flex-col overflow-hidden bg-gradient-to-br from-white to-gray-50">
                <div className="bg-primary p-[16px_24px] text-center">
                    <h3 className="m-0 text-xl font-bold text-white uppercase tracking-wider">
                        Humans of QGIRCO Wall
                    </h3>
                </div>
                <div className="qg_card_body flex flex-grow flex-col p-0">
                    <div className="relative h-[240px] overflow-hidden">
                        <img
                            src={avatar}
                            alt={employeeName}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <div className="text-[18px] font-bold uppercase text-white drop-shadow-md">
                                Meet {employeeName}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-grow flex-col justify-between p-5 space-y-4">
                        <div className="space-y-3">
                            <p className="text-[15px] text-primary leading-[1.4] font-semibold italic">
                                “ {featured?.quote || 'Share your story with us.'} ”
                            </p>
                            <p className="text-[14px] leading-[1.6] text-gray-700 line-clamp-3">
                                {featured ? (
                                    <>{featured?.story}</>
                                ) : (
                                    `This month we celebrate ${employeeName} from our ${deptName}.`
                                )}
                            </p>
                        </div>
                        {featured && featured.story && (
                            <div>
                                <button
                                    onClick={() => setShowFullStory(true)}
                                    className="bg-primary hover:bg-black text-white px-5 py-2 rounded-full text-[12px] font-bold transition-all duration-300 transform group-hover:translate-x-1"
                                >
                                    Read Full Story
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex h-[52px] items-center justify-center border-t border-gray-100 bg-gray-50/50" />
            </div> */}

            {/* Latest Modernized Design (2026-04-28) */}
            <div className="qg_card group rounded-qa border border-qa-border shadow-qa transition-all duration-500 hover:shadow-2xl flex h-full flex-col overflow-hidden bg-gradient-to-br from-[#f8faff] to-[#eef2ff]">
                {/* Header with Blue Fill */}
                <div className="bg-primary p-[16px_24px] text-center">
                    <h3 className="m-0 text-xl font-bold text-white capatilize tracking-wider">
                        Humans of QGIRCO Wall
                    </h3>
                </div>

                <div className="qg_card_body flex flex-grow flex-col p-0">
                    {/* Image at Top */}
                    <div className="relative h-[220px] w-full overflow-hidden">
                        <img
                            src={avatar}
                            alt={employeeName}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Subtle Darkening Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <div className="text-[18px] font-bold capatilize text-white drop-shadow-md text-center">
                                Meet {employeeName}
                            </div>
                        </div>
                    </div>

                    {/* Info at Bottom */}
                    <div className="flex flex-grow flex-col justify-between p-5 space-y-4">
                        <div className="space-y-3">
                            <p className="text-[15px] text-primary leading-[1.4] font-semibold italic">
                                “ {featured?.quote || 'Share your story with us.'} ”
                            </p>
                            <p className="text-[14px] leading-[1.6] text-gray-700 line-clamp-3">
                                {featured ? (
                                    <>{featured?.story}</>
                                ) : (
                                    `This month we celebrate ${employeeName} from our ${deptName}.`
                                )}
                            </p>
                        </div>
                        {featured && featured.story && (
                            <div>
                                <button
                                    onClick={() => setShowFullStory(true)}
                                    className="bg-primary hover:bg-black text-white w-full py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 transform shadow-md active:scale-95"
                                >
                                    Read Full Story
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex h-[52px] items-center justify-center border-t border-black/5 bg-black/2" />
            </div>

            {/* Previous Design (Commented out as requested) */}
            {/* <div className="qg_card rounded-qa shadow-qa flex h-full flex-col overflow-hidden bg-[#e5e5f9]">
                <div className="bg-primary p-[16px_24px] text-center">
                    <h3 className="m-0 text-2xl font-bold text-white">
                        Humans of QGIRCO Wall
                    </h3>
                </div>

                <div className="qg_card_body flex flex-grow flex-col p-0">
                    <div className="flex h-[260px] items-center gap-5 p-4 bg-white">
                        <div className="rounded-qa border-qa-border h-[180px] w-[150px] shrink-0 overflow-hidden border-2 shadow-sm">
                            <img
                                src={avatar}
                                alt={employeeName}
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-center overflow-hidden">
                            <div className="mb-2 text-[18px] font-bold uppercase truncate text-black">
                                Meet {employeeName}
                            </div>
                            <p className="text-[15px] text-primary leading-[1.4] font-medium italic line-clamp-3">
                                “ {featured?.quote || 'Share your story with us.'} ”
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-grow flex-col justify-center bg-qa-gray p-4 w-full">
                        <div className="">
                            <p className="text-[14px] leading-[1.6] text-black line-clamp-2">
                                {featured ? (
                                    <>{featured?.story}</>
                                ) : (
                                    `This month we celebrate ${employeeName} from our ${deptName}.`
                                )}
                            </p>
                            {featured && featured.story && (
                                <button
                                    onClick={() => setShowFullStory(true)}
                                    className="text-primary hover:text-black mt-2 text-[13px] font-bold inline-block underline underline-offset-4"
                                >
                                    Read Full Story
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex h-[52px] items-center justify-center bg-qa-gray border-t border-black/5" />
            </div> */}

            {/* Full Story Modal */}
            <Modal show={showFullStory} onClose={() => setShowFullStory(false)}>
                <div className="p-8">
                    <div className="mb-6 flex items-center gap-6">
                        <div className="rounded-qa border-qa-border h-[100px] w-[90px] overflow-hidden border">
                            <img
                                src={avatar}
                                alt={employeeName}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-black capatilize">
                                Meet {employeeName}
                            </h2>
                            <p className="text-primary text-lg italic">
                                “ {featured?.quote || ''} ”
                            </p>
                        </div>
                    </div>

                    <div className="h-px bg-gray-200 mb-6" />

                    <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                        <p className="text-[15px] leading-[1.8] text-gray-700 whitespace-pre-wrap">
                            <strong>This month we celebrate {employeeName} from our {deptName}.</strong>
                            <br /><br />
                            {featured?.story}
                        </p>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={() => setShowFullStory(false)}
                            className="bg-primary hover:bg-black rounded-lg px-6 py-2 text-white transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
