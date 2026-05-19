import DigitalVoicesForum from '@/Components/DigitalVoicesForum';
import DiscussionForum from '@/Components/DiscussionForum';
import EmployeeOffers from '@/Components/EmployeeOffers';
import EmployeesOfMonth from '@/Components/EmployeesOfMonth';
import GCEOMessage from '@/Components/GCEOMessage';
import HealthWellnessHub from '@/Components/HealthWellnessHub';
import HumansOfQgirco from '@/Components/HumansOfQgirco';
import NewsSlider from '@/Components/NewsSlider';
import ChallengeWidget from '@/Components/ChallengeWidget';
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
    challenge,
    risk_reports,
}: any) {
    return (
        <div className="flex min-h-screen flex-col bg-transparent font-sans text-black">
            <Head title="Welcome" />

            <PublicHeader />

            <main className="bg-transparent">
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
                            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                <div>
                                    <WorkAnniversaries
                                        anniversaries={anniversaries.data}
                                    />
                                </div>
                                <div>
                                    <UpcomingEvents events={events} />
                                </div>
                                {/* <div>
                                    <UpcomingBirthdays
                                        birthdays={birthdays.data}
                                    />
                                </div> */}
                            </div>

                            {/* ROW 3: Humans of QGIRCO, Employee of Month, Offers */}
                            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr_1.2fr]">
                                <HumansOfQgirco featured={humans_wall} />
                                <EmployeesOfMonth winners={emp_of_the_month} />
                                <EmployeeOffers offers={promotions} />
                            </div>

                            {/* ROW 4: Health & Wellness, Digital Voices */}
                            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
                                <div className="lg:col-span-6">
                                    <HealthWellnessHub
                                        articles={health_articles}
                                        challenge={challenge}
                                    />
                                </div>
                                <div className="lg:col-span-6">
                                    <DigitalVoicesForum topics={digital_voices} />
                                </div>
                            </div>

                            {/* Risk Management Reports */}
                            {/* {risk_reports && risk_reports.length > 0 && (
                                <div className="mb-12">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-primary">Risk Management Documents</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {risk_reports.map((report: any) => (
                                            <div key={report.id} className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md border border-gray-100">
                                                <div className="mb-4 flex items-center gap-3">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                        <i className="fa-solid fa-file-pdf text-2xl"></i>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 line-clamp-1">{report.title}</h3>
                                                        <p className="text-xs text-gray-500">{new Date(report.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <p className="mb-4 text-sm text-gray-600 line-clamp-2">{report.description}</p>
                                                <a
                                                    href={`/storage/${report.file_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                                                >
                                                    View Document
                                                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )} */}

                            {/* ROW 5: Recently Uploaded Photos */}
                            <RecentPhotos photos={recent_photos} />

                            {/* ROW 6: Discussion Forum & Poll */}
                            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
                                <div className="lg:col-span-8 ">
                                    <DiscussionForum topics={discussion_topics} />
                                </div>
                                <div className="lg:col-span-4 space-y-6">
                                    <PollWidget polls={polls} />
                                </div>
                            </div>
                        </div>

                        {/* QUICK LINKS SIDEBAR - Fixed positioning as requested */}
                        <div className="quick_link_col w-[100px] shrink-0">
                            <div className="sticky top-24 z-40 w-[100px]">
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
