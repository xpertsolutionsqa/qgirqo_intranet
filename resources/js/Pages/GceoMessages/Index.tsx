import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import CreateGceoMessageModal from './Partials/CreateGceoMessageModal';
import EditGceoMessageModal from './Partials/EditGceoMessageModal';

interface GceoMessage {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    video_url: string;
    is_active: boolean;
    published_at: string;
    created_at: string;
    content: string;
}

export default function Index({
    messages,
}: {
    messages: { data: GceoMessage[] };
}) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<GceoMessage | null>(
        null,
    );

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openEditModal = (message: GceoMessage) => {
        setSelectedMessage(message);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedMessage(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(route('gceo-messages.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        GCEO Messages
                    </h2>
                    <PrimaryButton onClick={openCreateModal}>
                        Add Message
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="GCEO Messages" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto text-sm">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Image
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Published At
                                            </th>
                                            <th className="px-6 py-3 text-right font-medium tracking-wider text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {messages.data &&
                                        messages.data.length > 0 ? (
                                            messages.data.map((message) => (
                                                <tr
                                                    key={message.id}
                                                    className="transition hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {message.cover_image && (
                                                            <img
                                                                src={
                                                                    message.cover_image
                                                                }
                                                                alt={
                                                                    message.title
                                                                }
                                                                className="h-10 w-16 rounded object-cover"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                                        {message.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {message.is_active ? (
                                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                                                                Active
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                                Inactive
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                        {dayjs(
                                                            message.published_at,
                                                        ).format('DD/MM/YYYY')}
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                        <button
                                                            onClick={() =>
                                                                openEditModal(
                                                                    message,
                                                                )
                                                            }
                                                            className="mr-4 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    message.id,
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            Delete
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
                                                    No messages found.
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

            <CreateGceoMessageModal
                show={isCreateModalOpen}
                onClose={closeCreateModal}
            />

            <EditGceoMessageModal
                show={isEditModalOpen}
                message={selectedMessage}
                onClose={closeEditModal}
            />
        </AuthenticatedLayout>
    );
}
