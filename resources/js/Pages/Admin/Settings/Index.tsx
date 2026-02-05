import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

interface Setting {
    id: number;
    key: string;
    value: string;
    type: string;
    label: string;
    group: string;
}

interface Props {
    settings: { [key: string]: Setting[] };
}

export default function Index({ settings }: Props) {
    const allSettings = Object.values(settings).flat();
    const { data, setData, post, processing, errors } = useForm({
        settings: allSettings.map(s => ({ key: s.key, value: s.value || '' }))
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.update'));
    };

    const updateValue = (key: string, value: string) => {
        setData('settings', data.settings.map(s =>
            s.key === key ? { ...s, value } : s
        ));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Site Settings
                </h2>
            }
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {Object.entries(settings).map(([group, groupSettings]) => (
                            <div key={group} className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 capitalize">
                                        {group.replace('_', ' ')}
                                    </h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    {groupSettings.map((setting) => (
                                        <div key={setting.key}>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {setting.label}
                                            </label>
                                            {setting.type === 'text' || setting.type === 'file' ? (
                                                <input
                                                    type="text"
                                                    value={data.settings.find(s => s.key === setting.key)?.value || ''}
                                                    onChange={(e) => updateValue(setting.key, e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                                    placeholder={setting.type === 'file' ? 'Enter file path or URL' : ''}
                                                />
                                            ) : (
                                                <textarea
                                                    value={data.settings.find(s => s.key === setting.key)?.value || ''}
                                                    onChange={(e) => updateValue(setting.key, e.target.value)}
                                                    rows={3}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                                />
                                            )}
                                            {setting.key === 'welcome_slogan' && (
                                                <p className="mt-2 text-xs text-gray-500">
                                                    This slogan will appear at the top of the welcome page.
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-primary-dark focus:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-primary-dark disabled:opacity-25"
                            >
                                {processing ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
