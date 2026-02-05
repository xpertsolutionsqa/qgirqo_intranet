declare global {
    function route(name: string, params?: any): string;
}

import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function PublicHeader() {
    const { auth } = usePage().props;

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <header className="bg-primary shadow-qa relative z-999 text-white">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-[84px] items-center justify-between">
                    {/* Left: Brand + Greeting */}
                    <div className="flex items-center gap-6">
                        <div className="flex shrink-0 items-center justify-center">
                            <Link href="/">
                                {/* <ApplicationLogo className="h-[50px] w-[50px]" /> */}
                                <img
                                    src="assets/img/qgirco-logo-white.svg"
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="flex items-center gap-[30px]">
                            <div className="relative text-[28px] font-bold after:absolute after:top-1/2 after:right-[-15px] after:inline-block after:h-8 after:w-px after:translate-y-[-50%] after:bg-white after:content-['']">
                                Hello{' '}
                                <span className="font-bold">
                                    {auth.user != null
                                        ? auth.user.name
                                        : 'Guest'}
                                </span>
                            </div>
                            <div className="hidden text-[90%] opacity-90 md:block">
                                {formatDate(currentTime)}
                            </div>
                        </div>
                    </div>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-2">
                        {/* Weather Dropdown - Static for now */}
                        <div className="relative">
                            <button className="rounded-qa flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10">
                                <img
                                    src="/assets/img/weather.svg"
                                    alt="Weather"
                                    className="max-h-7 max-w-7"
                                />
                            </button>
                        </div>

                        <button className="rounded-qa flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10">
                            <img
                                src="/assets/img/search.svg"
                                alt="Search"
                                className="max-h-7 max-w-7"
                            />
                        </button>

                        <button className="rounded-qa flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10">
                            <img
                                src="/assets/img/notification.svg"
                                alt="Notifications"
                                className="max-h-7 max-w-7"
                            />
                        </button>

                        <button className="rounded-qa flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10">
                            <img
                                src="/assets/img/lang-switch.svg"
                                alt="Language Switch"
                                className="max-h-7 max-w-7"
                            />
                        </button>

                        <Link
                            href={route('login')}
                            className="rounded-qa flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10"
                        >
                            <img
                                src="/assets/img/my-profile.svg"
                                alt="Profile"
                                className="max-h-7 max-w-7"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
