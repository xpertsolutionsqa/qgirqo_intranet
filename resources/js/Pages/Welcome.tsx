import DigitalVoicesForum from '@/Components/DigitalVoicesForum';
import DiscussionForum from '@/Components/DiscussionForum';
import EmployeeOffers from '@/Components/EmployeeOffers';
import EmployeesOfMonth from '@/Components/EmployeesOfMonth';
import GCEOMessage from '@/Components/GCEOMessage';
import HealthWellnessHub from '@/Components/HealthWellnessHub';
import HumansOfQgirco from '@/Components/HumansOfQgirco';
import NewsSlider from '@/Components/NewsSlider';
import PollWidget from '@/Components/PollWidget';
import PublicFooter from '@/Components/PublicFooter';
import PublicHeader from '@/Components/PublicHeader';
import QuickLinks from '@/Components/QuickLinks';
import RecentPhotos from '@/Components/RecentPhotos';
import UpcomingBirthdays from '@/Components/UpcomingBirthdays';
import UpcomingEvents from '@/Components/UpcomingEvents';
import WorkAnniversaries from '@/Components/WorkAnniversaries';
import { Head } from '@inertiajs/react';

export default function Welcome({
    news,
    events,
    polls,
    birthdays,
    anniversaries,
    gceo_message,
    recent_photos,
    discussion_topics,
    digital_voices,
    emp_of_the_month,
    promotions,
    health_articles,
    humans_wall,
    welcome_slogan,
}: any) {
    return (
        <div className="flex min-h-screen flex-col bg-white font-sans text-black">
            <Head title="Welcome" />

            <PublicHeader />

            <main className="bg-qa-bg">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    {/* Welcome Slogan */}
                    <div className="py-[2.4rem]">
                        <h1 className="text-primary m-0 text-[28px] leading-tight font-normal">
                            {welcome_slogan || 'Welcome to QGIRCO Intranet'}
                        </h1>
                    </div>

                    <div className="flex gap-6 pb-12">
                        {/* MAIN CONTENT AREA */}
                        <div className="max-w-[calc(100%-124px)]">
                            {/* ... ROWs ... */}
                            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
                                <div className="lg:col-span-8">
                                    <NewsSlider news={news} />
                                </div>
                                <div className="lg:col-span-4">
                                    <GCEOMessage message={gceo_message} />
                                </div>
                            </div>

                            {/* ROW 2: Work Anniv, Events, Birthdays */}
                            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
                                <div>
                                    <WorkAnniversaries
                                        anniversaries={anniversaries.data}
                                    />
                                </div>
                                <div>
                                    <UpcomingEvents events={events} />
                                </div>
                                <div>
                                    <UpcomingBirthdays
                                        birthdays={birthdays.data}
                                    />
                                </div>
                            </div>

                            {/* ROW 3: Humans of QGIRCO, Employee of Month, Offers */}
                            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
                                <div>
                                    <HumansOfQgirco featured={humans_wall} />
                                </div>
                                <div>
                                    <EmployeesOfMonth winners={emp_of_the_month} />
                                </div>
                                <div>
                                    <EmployeeOffers offers={promotions} />
                                </div>
                            </div>

                            {/* ROW 4: Health & Wellness, Digital Voices */}
                            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
                                <div className="lg:col-span-8">
                                    <HealthWellnessHub articles={health_articles} />
                                </div>
                                <div className="lg:col-span-4">
                                    <DigitalVoicesForum topics={digital_voices} />
                                </div>
                            </div>

                            {/* ROW 5: Recently Uploaded Photos */}
                            <RecentPhotos photos={recent_photos} />

                            {/* ROW 6: Discussion Forum & Poll */}
                            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
                                <div className="lg:col-span-8">
                                    <DiscussionForum topics={discussion_topics} />
                                </div>
                                <div className="lg:col-span-4">
                                    <PollWidget polls={polls} />
                                </div>
                            </div>
                        </div>

                        {/* QUICK LINKS SIDEBAR - Fixed positioning as requested */}
                        <div className="quick_link_col w-[100px] shrink-0">
                            <div
                                className="fixed top-[114px] z-40 w-[100px]"
                                style={
                                    {
                                        // right: 'max(0rem, calc((100vw - 1650px) / 2 + 0.2rem))',
                                    }
                                }
                            >
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
