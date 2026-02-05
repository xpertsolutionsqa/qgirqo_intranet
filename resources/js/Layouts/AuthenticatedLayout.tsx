import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import SidebarLink from '@/Components/SidebarLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-gray-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 dark:border-gray-700 dark:bg-gray-800 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Sidebar Logo */}
                    <div className="flex h-20 items-center justify-center border-b border-gray-100 dark:border-gray-700">
                        <Link href="/">
                            <ApplicationLogo className="h-10 w-auto" />
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
                        <SidebarLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                <span>Dashboard</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink
                            href={route('news.index')}
                            active={route().current('news.index')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 4v4h4"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 8h3m-3 4h10m-3 4h3"
                                    />
                                </svg>
                                <span>News</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink
                            href={route('gceo-messages.index')}
                            active={route().current('gceo-messages.index')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    />
                                </svg>
                                <span>GCEO Messages</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink
                            href={route('events.index')}
                            active={route().current('events.index')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>Events</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink
                            href={route('promotions.index')}
                            active={route().current('promotions.index')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                                <span>Promotions</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink
                            href={route('humans-of-qgirco.index')}
                            active={route().current('humans-of-qgirco.*')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span>Humans Wall</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink
                            href={route('employees.index')}
                            active={route().current('employees.index')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                <span>Employees</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink
                            href={route('employee-of-the-month.index')}
                            active={route().current('employee-of-the-month.*')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    />
                                </svg>
                                <span>Employee of the Month</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink
                            href={route('polls.index')}
                            active={route().current('polls.index')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                                <span>Polls</span>
                            </div>
                        </SidebarLink>

                        <div className="px-2 pt-4 pb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                            Community
                        </div>

                        <SidebarLink
                            href={route('gallery.index')}
                            active={route().current('gallery.index')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>Gallery</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink
                            href={route('forum.discussion')}
                            active={route().current('forum.discussion')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                    />
                                </svg>
                                <span>Discussion Forum</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink
                            href={route('forum.digital_voices')}
                            active={route().current('forum.digital_voices')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                    />
                                </svg>
                                <span>Digital Voices Forum</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink
                            href={route('challenges.index')}
                            active={route().current('challenges.index')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                <span>Challenges</span>
                            </div>
                        </SidebarLink>
                        <SidebarLink
                            href={route('settings.index')}
                            active={route().current('settings.*')}
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>Site Settings</span>
                            </div>
                        </SidebarLink>
                    </nav>

                    {/* User Profile Footer */}
                    <div className="border-t border-gray-100 p-4 dark:border-gray-700">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex w-full items-center rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none dark:bg-gray-900/50 dark:text-gray-300 dark:hover:bg-gray-900">
                                    <div className="flex-1 truncate text-left">
                                        <p className="font-semibold">
                                            {user.name}
                                        </p>
                                        <p className="truncate text-xs text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                    <svg
                                        className="ml-2 h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="left">
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Top Header for Mobile & Title */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-900"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 px-4 lg:px-0">
                        {header || (
                            <div className="lg:hidden">
                                <ApplicationLogo className="h-8 w-auto" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* You can add notifications or more actions here */}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-10">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    );
}
