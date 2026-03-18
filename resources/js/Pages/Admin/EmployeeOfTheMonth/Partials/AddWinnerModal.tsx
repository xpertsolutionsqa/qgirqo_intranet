import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useState, FormEventHandler } from 'react';

interface Props {
    show: boolean;
    onClose: () => void;
    employees: any[];
}

export default function AddWinnerModal({ show, onClose, employees }: Props) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm<{
        user_id: string;
        month: number;
        year: number;
        title: string;
        reason: string;
        featured_image: File | null;
    }>({
        user_id: '',
        month: currentMonth,
        year: currentYear,
        title: 'Star Performer',
        reason: '',
        featured_image: null,
    });

    const [preview, setPreview] = useState<string | null>(null);

    const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
    const months = [
        { id: 1, name: 'January' },
        { id: 2, name: 'February' },
        { id: 3, name: 'March' },
        { id: 4, name: 'April' },
        { id: 5, name: 'May' },
        { id: 6, name: 'June' },
        { id: 7, name: 'July' },
        { id: 8, name: 'August' },
        { id: 9, name: 'September' },
        { id: 10, name: 'October' },
        { id: 11, name: 'November' },
        { id: 12, name: 'December' },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('employee-of-the-month.store'), {
            onSuccess: () => {
                reset();
                setPreview(null);
                onClose();
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('featured_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        reset();
        clearErrors();
        setPreview(null);
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose}>
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Select Employee of the Month
                </h2>

                <div className="mt-6">
                    <InputLabel htmlFor="user_id" value="Select Employee" />
                    <select
                        id="user_id"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        value={data.user_id}
                        onChange={(e) => setData('user_id', e.target.value)}
                        required
                    >
                        <option value="">Select an employee...</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name} ({emp.profile?.department?.name || 'No Dept'})
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.user_id} className="mt-2" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="month" value="Month" />
                        <select
                            id="month"
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                            value={data.month}
                            onChange={(e) => setData('month', parseInt(e.target.value))}
                            required
                        >
                            {months.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.month} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="year" value="Year" />
                        <select
                            id="year"
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                            value={data.year}
                            onChange={(e) => setData('year', parseInt(e.target.value))}
                            required
                        >
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.year} className="mt-2" />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="title" value="Award Title" />
                    <TextInput
                        id="title"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="e.g. Star Performer, Top Sales, etc."
                    />
                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="reason" value="Achievement Reason" />
                    <textarea
                        id="reason"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        value={data.reason}
                        onChange={(e) => setData('reason', e.target.value)}
                        rows={3}
                    />
                    <InputError message={errors.reason} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="featured_image" value="Featured Image (Optional)" />
                    <input
                        id="featured_image"
                        type="file"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {preview && (
                        <div className="mt-2">
                            <img src={preview} alt="Preview" className="h-32 w-48 object-cover rounded-lg border dark:border-gray-700" />
                            <button
                                type="button"
                                onClick={() => {
                                    setPreview(null);
                                    setData('featured_image', null);
                                }}
                                className="mt-1 text-xs text-red-600 hover:text-red-800"
                            >
                                Remove Image
                            </button>
                        </div>
                    )}
                    <InputError message={errors.featured_image} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                    <PrimaryButton className="ms-3" disabled={processing}>
                        Save Winner
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
