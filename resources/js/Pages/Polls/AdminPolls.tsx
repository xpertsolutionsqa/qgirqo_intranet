import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CreatePollModal from './Partials/CreatePollModal';

interface PollOption {
    id: number;
    text: string;
    votes: number;
}

interface Poll {
    id: number;
    question: string;
    is_active: boolean;
    total_votes: number;
    ends_at: string | null;
    options: PollOption[];
}

export default function AdminPolls({ polls = [] }: { polls: Poll[] }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const toggleStatus = (id: number) => {
        router.patch(route('polls.toggle', id));
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this poll?')) {
            router.delete(route('polls.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Polls Management
                    </h2>
                    <PrimaryButton onClick={() => setIsCreateModalOpen(true)}>
                        Create New Poll
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Polls" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {polls.length > 0 ? (
                            polls.map((poll) => (
                                <div
                                    key={poll.id}
                                    className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg dark:bg-gray-800"
                                >
                                    <div className="mb-4 flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                                {poll.question}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Total Votes: {poll.total_votes}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() =>
                                                    toggleStatus(poll.id)
                                                }
                                                className={`rounded-full px-3 py-1 text-xs font-bold ${poll.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                                            >
                                                {poll.is_active
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(poll.id)
                                                }
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {poll.options.map((option) => {
                                            const percentage =
                                                poll.total_votes > 0
                                                    ? Math.round(
                                                          (option.votes /
                                                              poll.total_votes) *
                                                              100,
                                                      )
                                                    : 0;
                                            return (
                                                <div key={option.id}>
                                                    <div className="mb-1 flex justify-between text-sm">
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            {option.text}
                                                        </span>
                                                        <span className="font-bold text-gray-900 dark:text-gray-100">
                                                            {percentage}% (
                                                            {option.votes})
                                                        </span>
                                                    </div>
                                                    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                                        <div
                                                            className="h-2.5 rounded-full bg-indigo-600 transition-all duration-500"
                                                            style={{
                                                                width: `${percentage}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {poll.ends_at && (
                                        <p className="mt-4 text-xs text-gray-500 italic">
                                            Ends at:{' '}
                                            {new Date(
                                                poll.ends_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 rounded-lg bg-white py-12 text-center dark:bg-gray-800">
                                <p className="text-gray-500 italic">
                                    No polls created yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <CreatePollModal
                show={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </AuthenticatedLayout>
    );
}
