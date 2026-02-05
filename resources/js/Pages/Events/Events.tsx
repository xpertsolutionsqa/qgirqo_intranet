import PrimaryButton from '@/Components/PrimaryButton';
import { EventPost } from '@/interfaces/EventPost';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';
import CreateEventModal from './Partials/CreateEventModal';
import EditEventModal from './Partials/EditEventModal';

dayjs.extend(utc);

export default function Events({ events = [] }: { events?: EventPost[] }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventPost | null>(null);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openEditModal = (event: EventPost) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedEvent(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(route('events.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Events Management
                    </h2>
                    <PrimaryButton onClick={openCreateModal}>
                        Add Event
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Events" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto text-sm">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Date & Time
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Venue
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right font-medium tracking-wider text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {events.length > 0 ? (
                                            events.map((event) => (
                                                <tr
                                                    key={event.id}
                                                    className="transition hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                >
                                                    <td className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                                                        {event.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                        {dayjs(
                                                            event.event_date,
                                                        ).format(
                                                            'MMM DD, YYYY',
                                                        )}{' '}
                                                        at{' '}
                                                        {dayjs(event.event_time)
                                                            .utc()
                                                            .format(
                                                                'h:mm A',
                                                            )}{' '}
                                                        -{' '}
                                                        {dayjs(
                                                            event.event_end_time,
                                                        )
                                                            .utc()
                                                            .format('h:mm A')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                        {event.event_venue}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {event.is_published ? (
                                                            <span className="flex items-center text-green-600 dark:text-green-400">
                                                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                                                                Published
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                                                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
                                                                Draft
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                        <button
                                                            onClick={() =>
                                                                openEditModal(
                                                                    event,
                                                                )
                                                            }
                                                            className="mr-4 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    event.id,
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
                                                    No events scheduled.
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

            <CreateEventModal
                show={isCreateModalOpen}
                onClose={closeCreateModal}
            />

            <EditEventModal
                show={isEditModalOpen}
                event={selectedEvent}
                onClose={closeEditModal}
            />
        </AuthenticatedLayout>
    );
}
