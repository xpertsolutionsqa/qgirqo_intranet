import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Report {
    id: number;
    title: string;
    description: string;
    url: string;
    created_at: string;
    user: {
        name: string;
    };
}

export default function Index({ reports }: { reports: Report[] }) {
    const { auth } = usePage().props as any;
    const [isUploading, setIsUploading] = useState(false);

    const { data, setData, post, processing, reset, errors, delete: destroy } = useForm({
        title: '',
        description: '',
        url: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('risk.store'), {
            onSuccess: () => {
                reset();
                setIsUploading(false);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this report?')) {
            destroy(route('risk.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Risk Management Reports
                    </h2>
                    <button
                        onClick={() => setIsUploading(!isUploading)}
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none"
                    >
                        {isUploading ? 'Cancel' : 'Upload New Report'}
                    </button>
                </div>
            }
        >
            <Head title="Risk Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {isUploading && (
                        <div className="mb-8 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6">
                                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Upload Risk Document</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                            required
                                        />
                                        {errors.title && <div className="mt-1 text-sm text-red-600">{errors.title}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                        <textarea
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                            rows={3}
                                        />
                                        {errors.description && <div className="mt-1 text-sm text-red-600">{errors.description}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">External Link (URL)</label>
                                        <input
                                            type="url"
                                            value={data.url}
                                            placeholder="https://example.com"
                                            onChange={e => setData('url', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                            required
                                        />
                                        {errors.url && <div className="mt-1 text-sm text-red-600">{errors.url}</div>}
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-white transition hover:bg-primary/90 disabled:opacity-50"
                                        >
                                            {processing ? 'Uploading...' : 'Save Report'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3">Title</th>
                                            <th className="px-6 py-3">Description</th>
                                            <th className="px-6 py-3">Uploaded By</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map((report) => (
                                            <tr key={report.id} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    {report.title}
                                                </td>
                                                <td className="px-6 py-4 truncate max-w-xs">
                                                    {report.description || '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {report.user.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {new Date(report.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 space-x-3">
                                                    <a
                                                        href={report.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                                    >
                                                        Visit Link
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(report.id)}
                                                        className="font-medium text-red-600 hover:underline dark:text-red-500"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {reports.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-4 text-center">
                                                    No risk reports found.
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
