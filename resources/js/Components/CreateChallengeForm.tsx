import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CreateChallengeForm() {
    const { data, setData, post, processing, reset, errors } = useForm({
        question: '',
        options: ['', '', ''],
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('challenges.store'), {
            onSuccess: () => reset(),
        });
    };

    const updateOption = (index: number, value: string) => {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData('options', newOptions);
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-100 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-900/20">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Create New Daily Challenge
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Question
                    </label>
                    <input
                        type="text"
                        value={data.question}
                        onChange={(e) => setData('question', e.target.value)}
                        className="w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        placeholder="Enter the challenge question..."
                        required
                    />
                    {errors.question && <p className="mt-1 text-xs text-red-500">{errors.question}</p>}
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Options (Exactly 3)
                    </label>
                    {data.options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => updateOption(index, e.target.value)}
                                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                placeholder={`Option ${index + 1}`}
                                required
                            />
                        </div>
                    ))}
                    {errors.options && <p className="mt-1 text-xs text-red-500">{errors.options}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 disabled:opacity-50 disabled:shadow-none dark:shadow-none"
                >
                    {processing ? 'Creating...' : 'Launch Challenge'}
                </button>
            </form>
        </div>
    );
}
