import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import Switch from '@/Components/Switch';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface ChallengeOption {
    id: number;
    challenge_id: number;
    option_text: string;
}

interface Challenge {
    id: number;
    question: string;
    scheduled_at: string | null;
    image_path: string | null;
    is_active: boolean;
    options: ChallengeOption[];
}

interface PageProps {
    challenges: Challenge[];
}

export default function ChallengesIndex({ challenges }: PageProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        question: '',
        scheduled_at: '',
        image: null as File | null,
        options: ['', '', '', ''],
    });

    const openCreateModal = () => {
        clearErrors();
        reset();
        setData({
            question: '',
            scheduled_at: '',
            image: null,
            options: ['', '', '', ''],
        });
        setIsCreateModalOpen(true);
    };

    const openEditModal = (challenge: Challenge) => {
        clearErrors();
        setEditingChallenge(challenge);
        setData({
            question: challenge.question,
            scheduled_at: challenge.scheduled_at || '',
            image: null,
            options: challenge.options.map(o => o.option_text),
        });
        setIsEditModalOpen(true);
    };

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('challenges.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
            },
        });
    };

    const submitUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingChallenge) return;

        // For files in Inertia with PUT, we use POST + _method: 'PUT' inside data
        router.post(route('challenges.update', editingChallenge.id), {
            _method: 'PUT',
            ...data,
            // @ts-ignore
            image: data.image,
        }, {
            forceFormData: true,
            onSuccess: () => {
                setIsEditModalOpen(false);
                reset();
            },
        });
    };

    const toggleStatus = (id: number) => {
        router.patch(route('challenges.toggle', id));
    };

    const deleteChallenge = (id: number) => {
        if (confirm('Are you sure you want to delete this challenge?')) {
            router.delete(route('challenges.destroy', id));
        }
    };

    const updateOption = (index: number, value: string) => {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData('options', newOptions);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Challenges Management
                    </h2>
                    <PrimaryButton onClick={openCreateModal}>
                        <i className="fa-solid fa-plus mr-2"></i>
                        Add New Question
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Challenges Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-gray-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4">Image</th>
                                        <th className="px-6 py-4">Question</th>
                                        <th className="px-6 py-4">Scheduled Date</th>
                                        <th className="px-6 py-4">Options</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {challenges.map((challenge) => (
                                        <tr key={challenge.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30">
                                            <td className="px-6 py-4">
                                                {challenge.image_path ? (
                                                    <img
                                                        src={`/storage/${challenge.image_path}`}
                                                        className="h-12 w-16 rounded-lg object-cover shadow-sm border border-gray-100"
                                                        alt="Challenge"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-gray-100 text-gray-400 border border-dashed border-gray-200">
                                                        <i className="fa-solid fa-image text-xs"></i>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-medium">{challenge.question}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                                                {challenge.scheduled_at ? (
                                                    <span className="flex items-center">
                                                        <i className="fa-regular fa-calendar-days mr-2"></i>
                                                        {challenge.scheduled_at}
                                                    </span>
                                                ) : (
                                                    <span className="italic text-gray-400">Not Scheduled</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    {challenge.options.map((opt) => (
                                                        <span key={opt.id} className="text-xs text-gray-500">• {opt.option_text}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Switch
                                                    id={`status-${challenge.id}`}
                                                    checked={challenge.is_active}
                                                    onToggle={() => toggleStatus(challenge.id)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <Link
                                                    href={route('challenges.show', challenge.id)}
                                                    className="mr-3 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                                    title="View Details"
                                                >
                                                    <i className="fa-solid fa-eye"></i>
                                                </Link>
                                                <button
                                                    onClick={() => openEditModal(challenge)}
                                                    className="mr-3 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button
                                                    onClick={() => deleteChallenge(challenge.id)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {challenges.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
                                                No challenges found. Create one to get started!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <form onSubmit={submitCreate} className="p-6">
                    <h3 className="text-lg font-bold mb-6">Add New Challenge</h3>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="question" value="Question" />
                            <TextInput
                                id="question"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.question}
                                onChange={(e) => setData('question', e.target.value)}
                                required
                            />
                            <InputError message={errors.question} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="scheduled_at" value="Select Date" />
                                <TextInput
                                    id="scheduled_at"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.scheduled_at}
                                    onChange={(e) => setData('scheduled_at', e.target.value)}
                                />
                                <InputError message={errors.scheduled_at} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="image" value="Feature Image" />
                                <input
                                    id="image"
                                    type="file"
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                    accept="image/*"
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <InputLabel value="Options" />
                            {data.options.map((opt, i) => (
                                <div key={i}>
                                    <TextInput
                                        type="text"
                                        className="mt-1 block w-full text-sm"
                                        value={opt}
                                        onChange={(e) => updateOption(i, e.target.value)}
                                        placeholder={`Option ${i + 1}`}
                                        required={i < 3}
                                    />
                                    <InputError message={errors[`options.${i}` as keyof typeof errors]} className="mt-1" />
                                </div>
                            ))}
                            <InputError message={errors.options} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsCreateModalOpen(false)}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>Save Challenge</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <form onSubmit={submitUpdate} className="p-6">
                    <h3 className="text-lg font-bold mb-6">Edit Challenge</h3>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="edit_question" value="Question" />
                            <TextInput
                                id="edit_question"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.question}
                                onChange={(e) => setData('question', e.target.value)}
                                required
                            />
                            <InputError message={errors.question} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="edit_scheduled_at" value="Select Date" />
                                <TextInput
                                    id="edit_scheduled_at"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.scheduled_at}
                                    onChange={(e) => setData('scheduled_at', e.target.value)}
                                />
                                <InputError message={errors.scheduled_at} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="edit_image" value="Feature Image" />
                                <input
                                    id="edit_image"
                                    type="file"
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                    accept="image/*"
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <InputLabel value="Options" />
                            {data.options.map((opt, i) => (
                                <div key={i}>
                                    <TextInput
                                        type="text"
                                        className="mt-1 block w-full text-sm"
                                        value={opt}
                                        onChange={(e) => updateOption(i, e.target.value)}
                                        placeholder={`Option ${i + 1}`}
                                        required={i < 3}
                                    />
                                    <InputError message={errors[`options.${i}` as keyof typeof errors]} className="mt-1" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsEditModalOpen(false)}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>Update Challenge</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
