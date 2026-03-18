import React, { useState, useEffect } from 'react';
import PublicHeader from '@/Components/PublicHeader';
import PublicFooter from '@/Components/PublicFooter';
import QuickLinks from '@/Components/QuickLinks';
import { Head } from '@inertiajs/react';
import CelebrationSidebar from './Partials/CelebrationSidebar';
import CelebrationList from './Partials/CelebrationList';
import WishModal from '@/Components/WishModal';
import LoginModal from '@/Components/LoginModal';
import { usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Index({ birthdays, anniversaries, filters, months }: any) {
    const { auth } = usePage().props as any;
    const [activeTab, setActiveTab] = useState<'birthdays' | 'anniversaries'>('birthdays');
    const [showWishModal, setShowWishModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [wishType, setWishType] = useState<'birthday' | 'anniversary'>('birthday');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const selectedMonthName = months.find((m: any) => m.id === filters.month)?.name || '';
    const page_title = `${selectedMonthName} Celebrations`;

    const handleWish = (user: any, type: 'birthday' | 'anniversary') => {
        if (!auth.user) {
            setShowLoginModal(true);
            return;
        }
        setSelectedUser(user);
        setWishType(type);
        setShowWishModal(true);
    };

    return (
        <div className="flex min-h-screen flex-col bg-white font-sans text-black">
            <Head title={page_title} />

            <PublicHeader />

            <main className="bg-qa-bg py-8">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    {/* Page heading */}
                    <div className="mb-8" data-aos="fade-up">
                        <h1 className="text-2xl font-bold text-black uppercase tracking-tight">
                            Team Celebrations <span className="text-primary/60">— {selectedMonthName} {filters.year}</span>
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 pb-12">
                        {/* MAIN CONTENT AREA */}
                        <div className="flex-grow order-2 lg:order-1">
                            {/* Tab Switcher */}
                            <div className="mb-8 flex border-b border-gray-200" data-aos="fade-up">
                                <button
                                    onClick={() => setActiveTab('birthdays')}
                                    className={`relative px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'birthdays'
                                        ? 'text-primary'
                                        : 'text-gray-400 hover:text-black'
                                        }`}
                                >
                                    Birthdays
                                    {activeTab === 'birthdays' && (
                                        <div className="absolute bottom-0 left-0 h-1 w-full bg-primary rounded-t-full"></div>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('anniversaries')}
                                    className={`relative px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'anniversaries'
                                        ? 'text-primary'
                                        : 'text-gray-400 hover:text-black'
                                        }`}
                                >
                                    Work Anniversaries
                                    {activeTab === 'anniversaries' && (
                                        <div className="absolute bottom-0 left-0 h-1 w-full bg-primary rounded-t-full"></div>
                                    )}
                                </button>
                            </div>

                            <div data-aos="fade-up" data-aos-delay="100">
                                {activeTab === 'birthdays' ? (
                                    <CelebrationList items={birthdays.data} type="birthday" onWish={handleWish} />
                                ) : (
                                    <CelebrationList items={anniversaries.data} type="anniversary" onWish={handleWish} />
                                )}
                            </div>
                        </div>

                        {/* SIDEBAR FILTER AREA */}
                        <div className="w-full lg:w-[320px] shrink-0 order-1 lg:order-2">
                            <CelebrationSidebar months={months} filters={filters} />


                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />

            <WishModal
                show={showWishModal}
                onClose={() => setShowWishModal(false)}
                user={selectedUser}
                type={wishType}
            />

            <LoginModal
                show={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </div>
    );
}
