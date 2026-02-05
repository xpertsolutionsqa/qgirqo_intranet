import { Link } from '@inertiajs/react';

export default function HealthWellnessHub({ articles = [] }: { articles?: any[] }) {
    const featured = articles[0] || null;
    const upcoming = articles[1] || null;
    return (
        <section className="qg_card hwh_card rounded-qa shadow-qa flex h-full flex-col overflow-hidden bg-[#e5e5f9] p-6">
            <h3 className="mb-1 text-center text-[22px] font-bold text-black">
                Health & Wellness Hub
            </h3>
            <div className="text-primary mb-4 text-center text-[14px]">
                Nourish Your Body and Mind
            </div>

            <div className="hwh_hero rounded-qa relative mb-6 overflow-hidden">
                <img
                    src={featured?.featured_image ? `/storage/${featured.featured_image}` : "https://images.unsplash.com/photo-1529693662653-9d480530a697?q=80&w=1600&auto=format&fit=crop"}
                    alt={featured?.title || "Health & Wellness"}
                    className="h-[240px] w-full object-cover"
                />
                <a
                    href="#"
                    className="bg-primary absolute bottom-4 left-4 rounded-full px-4 py-2 text-[12px] font-bold text-white shadow-lg transition-colors hover:bg-black"
                >
                    {featured?.summary || "New! 10K Step Challenge - Join Now"}
                </a>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_2px_1fr]">
                {/* Featured Article */}
                <div>
                    <div className="text-primary mb-3 text-[13px] font-bold uppercase">
                        Featured Article
                    </div>
                    <div className="flex gap-4">
                        <div className="rounded-qa border-qa-border h-[100px] w-[100px] shrink-0 overflow-hidden border">
                            <img
                                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
                                alt="Article"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="text-qa-muted mb-1 text-[11px]">
                                {featured?.created_at ? new Date(featured.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '20 October 2025'}
                            </div>
                            <div className="mb-2 text-[14px] leading-tight font-bold text-black">
                                {featured?.title || '5-minute Desk Yoga for a Refreshed Soul'}
                            </div>
                            <Link
                                href={featured?.slug ? `/news/${featured.slug}` : '#'}
                                className="text-primary text-[12px] font-bold underline hover:text-black"
                            >
                                Read
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="hidden h-full w-px self-stretch bg-[rgba(47,47,143,0.35)] md:block" />

                {/* Upcoming Event */}
                <div>
                    <div className="text-primary mb-3 text-[13px] font-bold uppercase">
                        Upcoming Event
                    </div>
                    <div className="border-qa-border mb-4 rounded-[10px] border bg-white p-[10px_15px] shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="text-primary shrink-0 text-center leading-tight font-bold">
                                <span className="block text-[20px]">
                                    {upcoming?.created_at ? new Date(upcoming.created_at).getDate() : '28'}
                                </span>
                                <small className="block text-[8px] uppercase">
                                    {upcoming?.created_at ? new Date(upcoming.created_at).toLocaleDateString('en-GB', { month: 'long' }) : 'January'}
                                </small>
                            </div>
                            <div>
                                <div className="mb-0.5 text-[13px] font-bold text-black">
                                    {upcoming?.title || '5-minute Desk Yoga'}
                                </div>
                                <div className="text-qa-muted text-[10px]">
                                    <div className="flex items-center gap-1">
                                        <i className="fa-regular fa-clock me-1 text-[12px]"></i>
                                        {upcoming?.summary || '3:00PM - 5:00PM'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="bg-primary rounded-full px-6 py-1.5 text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-black">
                            Join a Challenge
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
