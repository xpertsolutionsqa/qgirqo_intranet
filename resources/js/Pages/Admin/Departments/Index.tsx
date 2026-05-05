import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CreateDepartmentModal from './Partials/CreateDepartmentModal';
import EditDepartmentModal from './Partials/EditDepartmentModal';

export default function Index({ auth, departments }: { auth: any, departments: any }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openEditModal = (department: any) => {
        setSelectedDepartment(department);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedDepartment(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this department?')) {
            router.delete(route('admin.departments.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Department Management
                    </h2>
                    <PrimaryButton onClick={openCreateModal}>
                        Add Department
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Departments" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto text-sm">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 capatilize">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 capatilize">
                                                Slug
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 capatilize">
                                                Created At
                                            </th>
                                            <th className="px-6 py-3 text-right font-medium tracking-wider text-gray-500 capatilize">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {departments.data.length > 0 ? (
                                            departments.data.map((dept: any) => (
                                                <tr
                                                    key={dept.id}
                                                    className="transition hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                >
                                                    <td className="px-6 py-4 font-medium tracking-tight whitespace-nowrap text-gray-900 uppercase dark:text-gray-100">
                                                        {dept.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                        {dept.slug}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                        {new Date(dept.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                        <button
                                                            onClick={() => openEditModal(dept)}
                                                            className="mr-4 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(dept.id)}
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
                                                    colSpan={4}
                                                    className="px-6 py-12 text-center text-gray-500 italic dark:text-gray-400"
                                                >
                                                    No departments available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Placeholder (Simple) */}
                            {departments.links && departments.links.length > 3 && (
                                <div className="mt-6 flex justify-center">
                                    {/* Pagination links logic could go here */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <CreateDepartmentModal
                show={isCreateModalOpen}
                onClose={closeCreateModal}
            />

            <EditDepartmentModal
                show={isEditModalOpen}
                department={selectedDepartment}
                onClose={closeEditModal}
            />
        </AuthenticatedLayout>
    );
}
