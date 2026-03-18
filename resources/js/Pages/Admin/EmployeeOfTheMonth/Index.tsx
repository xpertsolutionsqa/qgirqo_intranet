import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AddWinnerModal from './Partials/AddWinnerModal';

interface Winner {
    id: number;
    user: {
        id: number;
        name: string;
        profile?: {
            avatar?: string;
        };
    };
    month: number;
    year: number;
    title: string;
    reason: string;
    featured_image?: string;
}

interface Props {
    winners: {
        data: Winner[];
    };
    employees: any[];
}

export default function Index({ winners, employees }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to remove this winner?')) {
            router.delete(route('employee-of-the-month.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Employee of the Month Management
                    </h2>
                    <PrimaryButton onClick={() => setIsModalOpen(true)}>
                        Select New Winner
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Employee of the Month" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Employee
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Period
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Featured Image
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {winners.data.length > 0 ? (
                                            winners.data.map((winner) => (
                                                <tr key={winner.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    src={winner.user.profile?.avatar ? `/storage/${winner.user.profile.avatar}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(winner.user.name)}`}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                    {winner.user.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 dark:text-gray-100">
                                                            {monthNames[winner.month - 1]} {winner.year}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {winner.featured_image ? (
                                                            <img
                                                                src={`/storage/${winner.featured_image}`}
                                                                alt="Winner"
                                                                className="h-10 w-16 object-cover rounded shadow-sm"
                                                            />
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">No image</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {winner.title || 'Star Performer'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                        <button
                                                            onClick={() => handleDelete(winner.id)}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500 italic">
                                                    No winners selected yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddWinnerModal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                employees={employees}
            />
        </AuthenticatedLayout>
    );
}
