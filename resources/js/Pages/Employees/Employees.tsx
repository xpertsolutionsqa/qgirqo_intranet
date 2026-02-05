import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CreateEmployeeModal from './Partials/CreateEmployeeModal';
import EditEmployeeModal from './Partials/EditEmployeeModal';

interface Employee {
    id: number;
    name: string;
    email: string;
    role: string;
    department: string;
    designation: string;
    employee_id: string;
    joining_date: string;
    phone: string;
    dob: string;
    emergency_contact: string;
    department_id: number;
    designation_id: number;
    avatar: string | null;
}

interface Props {
    employees: {
        data: Employee[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    departments: { id: number; name: string }[];
    designations: { id: number; title: string }[];
    roles: { id: number; name: string }[];
}

export default function Employees({
    employees,
    departments,
    designations,
    roles,
}: Props) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null,
    );

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openEditModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedEmployee(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            router.delete(route('employees.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Employee Management
                    </h2>
                    <PrimaryButton onClick={openCreateModal}>
                        Add Employee
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Employees" />

            <div>
                <div className="mx-auto">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto text-sm">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Employee
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                ID & Role
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Department
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Designation
                                            </th>
                                            <th className="px-6 py-3 text-right font-medium tracking-wider text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {employees.data.length > 0 ? (
                                            employees.data.map((emp) => (
                                                <tr
                                                    key={emp.id}
                                                    className="transition hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    src={
                                                                        emp.avatar
                                                                            ? `/storage/${emp.avatar}`
                                                                            : `https://ui-avatars.com/api/?name=${emp.name}&color=7F9CF5&background=EBF4FF`
                                                                    }
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                                                    {emp.name}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {emp.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                                                                {
                                                                    emp.employee_id
                                                                }
                                                            </span>
                                                            <span className="text-[10px] font-bold text-gray-400 uppercase">
                                                                {emp.role}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                        {emp.department}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                        {emp.designation}
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                        <button
                                                            onClick={() =>
                                                                openEditModal(
                                                                    emp,
                                                                )
                                                            }
                                                            className="mr-4 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    emp.id,
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
                                                    No employees found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination links={employees.links} />
                        </div>
                    </div>
                </div>
            </div>

            <CreateEmployeeModal
                show={isCreateModalOpen}
                onClose={closeCreateModal}
                departments={departments}
                designations={designations}
                roles={roles}
            />

            <EditEmployeeModal
                show={isEditModalOpen}
                employee={selectedEmployee}
                onClose={closeEditModal}
                departments={departments}
                designations={designations}
                roles={roles}
            />
        </AuthenticatedLayout>
    );
}
