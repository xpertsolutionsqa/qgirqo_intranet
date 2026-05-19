import PublicHeader from '@/Components/PublicHeader';
import PublicFooter from '@/Components/PublicFooter';
import { Head } from '@inertiajs/react';

interface Report {
    id: number;
    title: string;
    description: string;
    url: string;
    created_at: string;
}

export default function PublicIndex({ reports }: { reports: Report[] }) {
    return (
        <div className="flex min-h-screen flex-col bg-transparent font-sans text-black">
            <Head title="Policy & Procedures" />

            <PublicHeader />

            <main className="flex-1 bg-transparent py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-10 px-4 sm:px-0">
                        <h2 className="text-3xl font-extrabold text-primary">
                            Policy & Procedures
                        </h2>
                        <p className="mt-2 text-gray-600">Access official company documents and guidelines.</p>
                    </div>
                    <div className="mb-8 overflow-hidden bg-white shadow-soft rounded-2xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                    <i className="fa-duotone fa-shield-check text-3xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Official Documents</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Access the latest company policies, procedures, and risk management guidelines.</p>
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {reports.map((report) => (
                                    <a
                                        key={report.id}
                                        href={report.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex flex-col justify-between p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                                    <i className="fa-light fa-file-pdf text-red-500 text-xl"></i>
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    {new Date(report.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
                                                {report.title}
                                            </h4>
                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                                                {report.description || 'View official company documentation and guidelines regarding this policy.'}
                                            </p>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-xs font-bold text-primary flex items-center gap-1">
                                                Read Document
                                                <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                                            </span>
                                            <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                                <i className="fa-light fa-chevron-right"></i>
                                            </div>
                                        </div>
                                    </a>
                                ))}

                                {reports.length === 0 && (
                                    <div className="col-span-full py-20 text-center">
                                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 mx-auto">
                                            <i className="fa-light fa-folder-open text-3xl text-gray-400"></i>
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">No Documents Found</h4>
                                        <p className="text-gray-500 dark:text-gray-400">There are currently no policy documents available.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
