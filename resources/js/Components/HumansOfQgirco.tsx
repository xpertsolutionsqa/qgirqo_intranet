import { Link } from '@inertiajs/react';

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
    const employeeName = featured?.user.name || '[Employee Name]';
    const deptName = featured?.user.profile?.department?.name || 'our Team';
    const avatar = featured?.image_path
        ? `/storage/${featured.image_path}`
        : (featured?.user.profile?.avatar
            ? `/storage/${featured.user.profile.avatar}`
            : 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop');

    return (
        <div className="qg_card rounded-qa shadow-qa flex h-full flex-col overflow-hidden bg-[#e5e5f9]">
            {/* Header with Blue Fill */}
            <div className="bg-primary p-[16px_24px] text-center">
                <h3 className="m-0 text-[22px] font-bold text-white">
                    Humans of QGIRCO Wall
                </h3>
            </div>

            <div className="qg_card_body flex flex-grow flex-col p-0">
                {/* Top Section: Photo + Quote */}
                <div className="flex items-start gap-4 p-4">
                    <div className="rounded-qa border-qa-border h-[120px] w-[120px] shrink-0 overflow-hidden border">
                        <img
                            src={avatar}
                            alt={employeeName}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="text-primary mb-2 text-[14px] font-bold uppercase">
                            Meet {employeeName}
                        </div>
                        <p className="text-lg text-primary leading-[1.3] font-medium text-black italic">
                            “ {featured?.quote || ''} ”
                        </p>
                    </div>
                </div>

                {/* Bottom Section: Description */}
                <div className="flex h-full flex-col item-center justify-center bg-qa-gray p-8">
                    <p className="mb-4 text-[13px] leading-[1.5] text-black">
                        {featured ? (
                            <>This month we celebrate <strong>{employeeName}</strong> from our {deptName}. {featured.story}</>
                        ) : (
                            `This month we celebrate [Employee Name] from our Community Relations Team. She recently organised a beach clean-up event with over 50 volunteers.`
                        )}
                    </p>

                    <div className="mb-4 h-px bg-white" />

                    <div className="flex gap-3">
                        <Link
                            href="#"
                            className="text-primary group flex items-center gap-3 text-[14px] font-bold hover:underline"
                        >
                            <img
                                src="/assets/img/journal-bookmark-fill.png"
                                className="h-auto w-[18px] object-contain"
                                alt="Icon"
                            />
                            Employee Handbook
                        </Link>
                        <Link
                            href="#"
                            className="text-primary group flex items-center gap-3 text-[14px] font-bold hover:underline"
                        >
                            <img
                                src="/assets/img/hanger-off.png"
                                className="h-auto w-[18px] object-contain"
                                alt="Icon"
                            />
                            Dress Code Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
