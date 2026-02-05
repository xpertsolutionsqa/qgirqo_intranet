import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface Human {
    id: number;
    user_id: number;
    quote: string;
    story: string;
    image_path?: string;
    is_active: boolean;
}

interface Employee {
    id: number;
    name: string;
}

export default function EditHumanModal({
    show,
    onClose,
    human,
    employees,
}: {
    show: boolean;
    onClose: () => void;
    human: Human | null;
    employees: Employee[];
}) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            user_id: '',
            quote: '',
            story: '',
            image: null as File | null,
            is_active: false,
            _method: 'PUT',
        });

    useEffect(() => {
        if (human) {
            setData({
                user_id: String(human.user_id),
                quote: human.quote,
                story: human.story,
                image: null,
                is_active: !!human.is_active,
                _method: 'PUT',
            });
        }
    }, [human]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('humans-of-qgirco.update', human?.id), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const handleClose = () => {
        clearErrors();
        reset();
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose}>
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Edit Humans Wall Entry
                </h2>

                <div className="mt-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="edit_user_id" value="Select Employee" />
                        <select
                            id="edit_user_id"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            required
                        >
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.user_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="edit_quote" value="Short Quote" />
                        <TextInput
                            id="edit_quote"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.quote}
                            onChange={(e) => setData('quote', e.target.value)}
                            required
                        />
                        <InputError message={errors.quote} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="edit_story" value="Their Story / Achievement" />
                        <textarea
                            id="edit_story"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            rows={4}
                            value={data.story}
                            onChange={(e) => setData('story', e.target.value)}
                            required
                        />
                        <InputError message={errors.story} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="edit_image" value="Change Wall Photo (Optional)" />
                        <input
                            id="edit_image"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                        />
                        <InputError message={errors.image} className="mt-2" />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary shadow-sm focus:ring-primary"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Featured Person</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                    <PrimaryButton className="ml-3" disabled={processing}>
                        Update Wall
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
