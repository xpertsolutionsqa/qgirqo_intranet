import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function DigitalVoices() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                    Digital Voices Forum
                </h2>
            }
        >
            <Head title="Digital Voices" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <p className="text-center py-12 text-gray-500 italic">
                                Digital Voices Forum functionality is coming soon.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
