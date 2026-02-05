import PublicHeader from '@/Components/PublicHeader';
import PublicFooter from '@/Components/PublicFooter';
import QuickLinks from '@/Components/QuickLinks';
import { Head } from '@inertiajs/react';
import PromotionSidebar from './Partials/PromotionSidebar';
import PromotionGrid from './Partials/PromotionGrid';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Index({ promotions, categories, filters }: any) {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const page_title = 'Employee Benefits & Exclusive Offers';

    return (
        <div className="flex min-h-screen flex-col bg-white font-sans text-black">
            <Head title={page_title} />

            <PublicHeader />

            <main className="bg-qa-bg py-8">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    {/* Page heading */}
                    <div className="mb-8" data-aos="fade-up">
                        <h1 className="text-2xl font-bold text-black">{page_title}</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 pb-12">
                        {/* MAIN CONTENT AREA */}
                        <div className="flex-grow">
                            <div className="flex flex-col lg:flex-row gap-6 items-start">
                                {/* LEFT: SIDEBAR FILTER */}
                                <PromotionSidebar categories={categories} filters={filters} />

                                {/* RIGHT: PROMOTIONS CONTENT */}
                                <PromotionGrid promotions={promotions} />
                            </div>
                        </div>

                        {/* QUICK LINKS SIDEBAR */}
                        <div className="w-[100px] shrink-0 hidden lg:block">
                            <div className="sticky top-28 z-40 w-[100px]">
                                <QuickLinks />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
