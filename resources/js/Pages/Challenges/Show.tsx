import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface OptionStat {
    id: number;
    option_text: string;
    count: number;
    percentage: number;
}

interface ResponseUser {
    id: number;
    name: string;
    avatar: string | null;
    employee_id: string | null;
    department: string | null;
    designation: string | null;
}

interface ChallengeResponse {
    id: number;
    submitted_at: string;
    user: ResponseUser;
    chosen_option: string;
}

interface Challenge {
    id: number;
    question: string;
    image_path: string | null;
    scheduled_at: string | null;
    is_active: boolean;
}

interface PageProps {
    challenge: Challenge;
    totalResponses: number;
    optionStats: OptionStat[];
    responses: ChallengeResponse[];
}

const OPTION_COLORS = [
    { bar: 'bg-indigo-500', light: 'bg-indigo-50 border-indigo-200 text-indigo-700', badge: 'bg-indigo-100 text-indigo-700' },
    { bar: 'bg-emerald-500', light: 'bg-emerald-50 border-emerald-200 text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
    { bar: 'bg-amber-500', light: 'bg-amber-50 border-amber-200 text-amber-700', badge: 'bg-amber-100 text-amber-700' },
    { bar: 'bg-rose-500', light: 'bg-rose-50 border-rose-200 text-rose-700', badge: 'bg-rose-100 text-rose-700' },
];

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

export default function ChallengeShow({ challenge, totalResponses, optionStats, responses }: PageProps) {
    // Map option id → color index for badge coloring in the table
    const optionColorMap: Record<number, number> = {};
    optionStats.forEach((opt, i) => {
        optionColorMap[opt.id] = i;
    });

    // Find color index by option text for table badges
    const getOptionColor = (text: string) => {
        const idx = optionStats.findIndex(o => o.option_text === text);
        return idx >= 0 ? OPTION_COLORS[idx % OPTION_COLORS.length] : OPTION_COLORS[0];
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('challenges.index')}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                        Back to Challenges
                    </Link>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 truncate max-w-xl">
                        Challenge Details
                    </h2>
                </div>
            }
        >
            <Head title="Challenge Details" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">

                    {/* ── Top Card: Challenge Info ── */}
                    <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="md:w-56 shrink-0">
                            <img
                                src={
                                    challenge.image_path
                                        ? `/storage/${challenge.image_path}`
                                        : 'https://images.unsplash.com/photo-1563603410-ecb8599426f8?q=80&w=800&auto=format&fit=crop'
                                }
                                alt="Challenge"
                                className="h-44 md:h-full w-full object-cover"
                            />
                        </div>

                        {/* Meta */}
                        <div className="flex flex-col justify-between p-6 flex-1 gap-4">
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${challenge.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${challenge.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                        {challenge.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                    {challenge.scheduled_at && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                                            <i className="fa-regular fa-calendar-days"></i>
                                            {challenge.scheduled_at}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-snug">
                                    {challenge.question}
                                </h1>
                            </div>

                            {/* Stats Row */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 px-4 py-3 border border-indigo-100 dark:border-indigo-800">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                                        <i className="fa-solid fa-users text-indigo-600 dark:text-indigo-300"></i>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">{totalResponses}</p>
                                        <p className="text-xs font-medium text-indigo-500">Total Responses</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border border-gray-100 dark:border-gray-700">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-600">
                                        <i className="fa-solid fa-list-check text-gray-500 dark:text-gray-300"></i>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-extrabold text-gray-700 dark:text-gray-200">{optionStats.length}</p>
                                        <p className="text-xs font-medium text-gray-500">Options</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Option Breakdown ── */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-5">
                            <i className="fa-solid fa-chart-bar mr-2"></i>
                            Response Breakdown
                        </h3>
                        <div className="space-y-4">
                            {optionStats.map((opt, i) => {
                                const color = OPTION_COLORS[i % OPTION_COLORS.length];
                                return (
                                    <div key={opt.id}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className={`inline-block rounded-lg border px-3 py-1 text-xs font-bold ${color.light}`}>
                                                {opt.option_text}
                                            </span>
                                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                                {opt.count} vote{opt.count !== 1 ? 's' : ''} &middot; {opt.percentage}%
                                            </span>
                                        </div>
                                        <div className="h-2.5 w-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-700 ${color.bar}`}
                                                style={{ width: `${opt.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            {optionStats.length === 0 && (
                                <p className="text-sm text-gray-400 italic">No options found.</p>
                            )}
                        </div>
                    </div>

                    {/* ── Employee Responses Table ── */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                                <i className="fa-solid fa-table-list mr-2"></i>
                                Employee Responses
                            </h3>
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
                                {totalResponses} total
                            </span>
                        </div>

                        {responses.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                                        <tr>
                                            <th className="px-6 py-3">#</th>
                                            <th className="px-6 py-3">Employee</th>
                                            <th className="px-6 py-3">Emp. ID</th>
                                            <th className="px-6 py-3">Department</th>
                                            <th className="px-6 py-3">Designation</th>
                                            <th className="px-6 py-3">Chosen Option</th>
                                            <th className="px-6 py-3">Submitted At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {responses.map((resp, idx) => {
                                            const color = getOptionColor(resp.chosen_option);
                                            return (
                                                <tr key={resp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                    {/* Row number */}
                                                    <td className="px-6 py-4 text-xs font-bold text-gray-400">
                                                        {idx + 1}
                                                    </td>

                                                    {/* Employee */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            {resp.user.avatar ? (
                                                                <img
                                                                    src={resp.user.avatar}
                                                                    alt={resp.user.name}
                                                                    className="h-9 w-9 rounded-full object-cover border-2 border-gray-100 dark:border-gray-600 shrink-0"
                                                                />
                                                            ) : (
                                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold shrink-0">
                                                                    {getInitials(resp.user.name ?? '?')}
                                                                </div>
                                                            )}
                                                            <span className="font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                                                {resp.user.name}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Emp ID */}
                                                    <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400 font-mono whitespace-nowrap">
                                                        {resp.user.employee_id ?? '—'}
                                                    </td>

                                                    {/* Department */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {resp.user.department ? (
                                                            <span className="inline-block rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
                                                                {resp.user.department}
                                                            </span>
                                                        ) : <span className="text-gray-400">—</span>}
                                                    </td>

                                                    {/* Designation */}
                                                    <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        {resp.user.designation ?? '—'}
                                                    </td>

                                                    {/* Chosen Option */}
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-bold ${color.badge} border-transparent`}>
                                                            {resp.chosen_option}
                                                        </span>
                                                    </td>

                                                    {/* Submitted At */}
                                                    <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                                                        <i className="fa-regular fa-clock mr-1"></i>
                                                        {resp.submitted_at}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                                    <i className="fa-solid fa-inbox text-2xl text-gray-400"></i>
                                </div>
                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">No responses yet</p>
                                <p className="text-xs text-gray-400">Employees haven't responded to this challenge.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
