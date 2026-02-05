import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CreateDigitalVoiceModal from './Partials/CreateDigitalVoiceModal';

interface Topic {
    id: number;
    title: string;
    content: string;
    slug: string;
    view_count: number;
    is_locked: boolean;
    created_at: string;
    author?: { name: string };
    replies_count?: number;
}

export default function DigitalVoicesIndex({ topics }: { topics: { data: Topic[] } }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const handleDelete = (topic: Topic) => {
        if (confirm(`Are you sure you want to delete this voice "${topic.title}"?`)) {
            router.delete(route('forum.discussion.destroy', { topic: topic.slug }));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Digital Voices Forum
                    </h2>
                    <PrimaryButton onClick={openCreateModal}>
                        New Voice
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Digital Voices" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto text-sm">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Voice / Topic
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                By
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Engagement
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-right font-medium tracking-wider text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {topics.data.length > 0 ? (
                                            topics.data.map((topic) => (
                                                <tr
                                                    key={topic.id}
                                                    className="transition hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                >
                                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                                        {topic.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {topic.author?.name || 'Anonymous'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {topic.replies_count || 0} Replies
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                        {new Date(topic.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                        <button
                                                            onClick={() => handleDelete(topic)}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-6 py-12 text-center text-gray-500 italic dark:text-gray-400"
                                                >
                                                    No voices found. Start the conversation!
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

            <CreateDigitalVoiceModal
                show={isCreateModalOpen}
                onClose={closeCreateModal}
            />
        </AuthenticatedLayout>
    );
}
