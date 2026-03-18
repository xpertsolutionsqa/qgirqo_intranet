import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateChallengeForm from '@/Components/CreateChallengeForm';
import { Head } from '@inertiajs/react';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

interface User {
    id: number;
    name: string;
    email: string;
    profile: {
        dob: string;
        joining_date: string;
    };
}

interface PageProps {
    today: {
        birthdays: { data: User[] };
        anniversaries: { data: User[] };
    };
    upcoming: {
        birthdays: { data: User[] };
        anniversaries: { data: User[] };
    };
    stats: {
        total_events: number;
        active_polls: number;
        total_news: number;
    };
    charts: {
        departments: { name: string; count: number }[];
        activity: {
            labels: string[];
            news: number[];
            events: number[];
            polls: number[];
        };
    };
}

export default function Dashboard({
    today,
    upcoming,
    stats,
    charts,
}: PageProps) {
    const statCards = [
        {
            label: 'Total Events',
            value: stats.total_events,
            color: 'bg-indigo-600',
        },
        {
            label: 'Active Polls',
            value: stats.active_polls,
            color: 'bg-purple-600',
        },
        {
            label: 'News Updates',
            value: stats.total_news,
            color: 'bg-orange-500',
        },
    ];

    const doughnutData = {
        labels: charts.departments.map((d) => d.name),
        datasets: [
            {
                data: charts.departments.map((d) => d.count),
                backgroundColor: [
                    'rgba(79, 70, 229, 0.8)',
                    'rgba(147, 51, 234, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                ],
                hoverOffset: 4,
                borderWidth: 0,
            },
        ],
    };

    const barData = {
        labels: charts.activity.labels,
        datasets: [
            {
                label: 'News',
                data: charts.activity.news,
                backgroundColor: 'rgba(79, 70, 229, 0.8)',
                borderRadius: 6,
            },
            {
                label: 'Events',
                data: charts.activity.events,
                backgroundColor: 'rgba(147, 51, 234, 0.8)',
                borderRadius: 6,
            },
            {
                label: 'Polls',
                data: charts.activity.polls,
                backgroundColor: 'rgba(249, 115, 22, 0.8)',
                borderRadius: 6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { size: 12, family: "'Inter', sans-serif" },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                padding: 12,
                borderRadius: 8,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    drawBorder: false,
                    color: 'rgba(0,0,0,0.05)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                    Dashboard Overview
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {statCards.map((stat, idx) => (
                        <div
                            key={idx}
                            className="flex items-center space-x-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                        >
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {stat.label}
                                </p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stat.value}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Activity Chart */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-8 dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                            Activity Trends (6 Months)
                        </h3>
                        <div className="h-80">
                            <Bar data={barData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Department Chart */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-4 dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                            Department Split
                        </h3>
                        <div className="h-80">
                            <Doughnut
                                data={doughnutData}
                                options={{ ...chartOptions, scales: undefined }}
                            />
                        </div>
                    </div>
                </div>

                {/* Challenge Section */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* You can add something else here later or leave it for now */}
                        <div className="rounded-2xl border border-dashed border-gray-200 p-6 flex items-center justify-center text-gray-400 dark:border-gray-700">
                            Keep pushing your limits!
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-bold">Quick Actions</h3>
                            <a
                                href={route('challenges.index')}
                                className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-700 shadow-md"
                            >
                                <i className="fa-solid fa-list-check mr-2"></i>
                                Manage Challenges
                            </a>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Birthdays Section */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-900/20">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Upcoming Birthdays
                            </h3>
                            <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-900/30">
                                Next 30 Days
                            </span>
                        </div>
                        <div className="p-6">
                            {upcoming.birthdays.data.length > 0 ? (
                                <div className="space-y-4">
                                    {upcoming.birthdays.data.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between rounded-xl p-3 transition duration-150 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(
                                                            user.profile.dob,
                                                        ).toLocaleDateString(
                                                            undefined,
                                                            {
                                                                month: 'long',
                                                                day: 'numeric',
                                                            },
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            {new Date(
                                                user.profile.dob,
                                            ).getDate() ===
                                                new Date().getDate() &&
                                                new Date(
                                                    user.profile.dob,
                                                ).getMonth() ===
                                                new Date().getMonth() && (
                                                    <span className="animate-pulse rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold tracking-wider text-green-600 uppercase">
                                                        Today!
                                                    </span>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="py-4 text-center text-sm text-gray-500">
                                    No birthdays this month.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Anniversaries Section */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-900/20">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Work Anniversaries
                            </h3>
                            <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-900/30">
                                Next 30 Days
                            </span>
                        </div>
                        <div className="p-6">
                            {upcoming.anniversaries.data.length > 0 ? (
                                <div className="space-y-4">
                                    {upcoming.anniversaries.data.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between rounded-xl p-3 transition duration-150 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-600 dark:bg-purple-900/30">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Joined in{' '}
                                                        {new Date(
                                                            user.profile
                                                                .joining_date,
                                                        ).getFullYear()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-gray-900 dark:text-white">
                                                    {new Date().getFullYear() -
                                                        new Date(
                                                            user.profile
                                                                .joining_date,
                                                        ).getFullYear()}{' '}
                                                    {new Date().getFullYear() -
                                                        new Date(
                                                            user.profile
                                                                .joining_date,
                                                        ).getFullYear() ===
                                                        1
                                                        ? 'Year'
                                                        : 'Years'}
                                                </p>
                                                <p className="text-[10px] text-gray-500 uppercase">
                                                    {new Date(
                                                        user.profile
                                                            .joining_date,
                                                    ).toLocaleDateString(
                                                        undefined,
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="py-4 text-center text-sm text-gray-500">
                                    No anniversaries this month.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
