import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CreateHumanModal from './Partials/CreateHumanModal';
import EditHumanModal from './Partials/EditHumanModal';

interface Human {
    id: number;
    user_id: number;
    quote: string;
    story: string;
    image_path?: string;
    is_active: boolean;
    user: {
        name: string;
        profile?: {
            avatar?: string;
        }
    }
}

interface Employee {
    id: number;
    name: string;
}

export default function Index({ humans = [], employees = [] }: { humans: Human[], employees: Employee[] }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedHuman, setSelectedHuman] = useState<Human | null>(null);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openEditModal = (human: Human) => {
        setSelectedHuman(human);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedHuman(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to remove this person from the wall?')) {
            router.delete(route('humans-of-qgirco.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Humans of QGIRCO Wall Management
                    </h2>
                    <PrimaryButton onClick={openCreateModal}>
                        Add to Wall
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Humans Wall" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Employee</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Quote</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {humans.map((human) => (
                                            <tr key={human.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0">
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={human.image_path ? `/storage/${human.image_path}` : (human.user.profile?.avatar ? `/storage/${human.user.profile.avatar}` : 'https://ui-avatars.com/api/?name=' + human.user.name)}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {human.user.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="line-clamp-2 max-w-xs text-sm text-gray-500 italic">
                                                        "{human.quote}"
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {human.is_active ? (
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                            Feature on Wall
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                                                            History
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => openEditModal(human)}
                                                        className="mr-3 text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(human.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreateHumanModal
                show={isCreateModalOpen}
                onClose={closeCreateModal}
                employees={employees}
            />

            <EditHumanModal
                show={isEditModalOpen}
                human={selectedHuman}
                onClose={closeEditModal}
                employees={employees}
            />
        </AuthenticatedLayout>
    );
}
