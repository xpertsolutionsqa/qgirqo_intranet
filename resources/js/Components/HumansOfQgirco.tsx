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
            <div className="qg_card rounded-qa shadow-qa flex h-full flex-col overflow-hidden bg-[#e5e5f9]">
                {/* Header with Blue Fill */}
                <div className="bg-primary p-[16px_24px] text-center">
                    <h3 className="m-0 text-2xl font-bold text-white">
                        Humans of QGIRCO Wall
                    </h3>
                </div>

                <div className="qg_card_body flex flex-grow flex-col p-0">
                    {/* Top Section: Photo + Quote */}
                    <div className="flex h-[250px] items-center gap-4 p-3 bg-white">
                        <div className="rounded-qa border-qa-border h-[120px] w-[110px] shrink-0 overflow-hidden border">
                            <img
                                src={avatar}
                                alt={employeeName}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center overflow-hidden">
                            <div className="mb-1 text-[16px] font-bold uppercase truncate">
                                Meet {employeeName}
                            </div>
                            <p className="text-[14px] text-primary leading-[1.2] font-medium text-black italic line-clamp-2">
                                “ {featured?.quote || ''} ”
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section: Description */}
                    <div className="flex flex-grow flex-col justify-center bg-qa-gray p-4 w-full">
                        <div className="">
                            <p className="text-[13px] leading-[1.4] text-black line-clamp-2">
                                {featured ? (
                                    <>{featured?.story}</>
                                ) : (
                                    `This month we celebrate ${employeeName} from our ${deptName}.`
                                )}
                            </p>
                            {featured && featured.story && (
                                <button
                                    onClick={() => setShowFullStory(true)}
                                    className="text-primary hover:text-black mt-1 text-[12px] font-bold inline-block"
                                >
                                    Read More
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Placeholder */}
                <div className="flex h-[40px] items-center justify-center bg-qa-gray border-t border-black/5" />
            </div>

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
                            <h2 className="text-2xl font-bold text-black uppercase">
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
