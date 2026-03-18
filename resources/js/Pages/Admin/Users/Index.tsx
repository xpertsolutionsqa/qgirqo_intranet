import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, users }: { auth: any, users: any }) {
    const { delete: destroy } = useForm({});

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            destroy(route('admin.users.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Manage Users
                    </h2>
                    <Link
                        href={route('admin.users.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        Add New User
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Name</th>
                                            <th scope="col" className="px-6 py-3">Email</th>
                                            <th scope="col" className="px-6 py-3">Role</th>
                                            <th scope="col" className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map((user: any) => (
                                            <tr key={user.id} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    {user.name}
                                                </th>
                                                <td className="px-6 py-4">{user.email}</td>
                                                <td className="px-6 py-4">
                                                    {user.roles && user.roles.length > 0 ? (
                                                        <span className="rounded bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                                                            {user.roles[0].name.charAt(0).toUpperCase() + user.roles[0].name.slice(1)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-500">None</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.id !== auth.user.id && (
                                                        <button
                                                            onClick={() => handleDelete(user.id)}
                                                            className="font-medium text-red-600 hover:underline dark:text-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {users.data.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-4 text-center">
                                                    No users found.
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
        </AuthenticatedLayout>
    );
}
