import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

interface Employee {
    id: number;
    name: string;
}

export default function CreateHumanModal({
    show,
    onClose,
    employees,
}: {
    show: boolean;
    onClose: () => void;
    employees: Employee[];
}) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            user_id: '',
            quote: '',
            story: '',
            image: null as File | null,
            is_active: true,
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('humans-of-qgirco.store'), {
            onSuccess: () => {
                reset();
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
                    Feature Someone on Humans of QGIRCO Wall
                </h2>

                <div className="mt-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="user_id" value="Select Employee" />
                        <select
                            id="user_id"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            required
                        >
                            <option value="">Select an employee...</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.user_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="quote" value="Short Quote (Catchy)" />
                        <TextInput
                            id="quote"
                            type="text"
                            className="mt-1 block w-full"
                            placeholder="I love my work because..."
                            value={data.quote}
                            onChange={(e) => setData('quote', e.target.value)}
                            required
                        />
                        <InputError message={errors.quote} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="story" value="Their Story / Achievement" />
                        <textarea
                            id="story"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            rows={4}
                            placeholder="Tell their story for the month..."
                            value={data.story}
                            onChange={(e) => setData('story', e.target.value)}
                            required
                        />
                        <InputError message={errors.story} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="image" value="Wall Specific Photo (Optional - defaults to avatar)" />
                        <input
                            id="image"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20"
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
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Set as Current Featured Person</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                    <PrimaryButton className="ml-3" disabled={processing}>
                        Keep on Wall
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
