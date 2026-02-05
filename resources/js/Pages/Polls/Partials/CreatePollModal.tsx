import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

interface Props {
    show: boolean;
    onClose: () => void;
}

export default function CreatePollModal({ show, onClose }: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            question: '',
            options: ['', ''], // Initial 2 empty options
            ends_at: '',
            is_active: true,
        });

    const addOption = () => {
        setData('options', [...data.options, '']);
    };

    const removeOption = (index: number) => {
        if (data.options.length > 2) {
            const newOptions = [...data.options];
            newOptions.splice(index, 1);
            setData('options', newOptions);
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData('options', newOptions);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('polls.store'), {
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
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Create New Poll
                </h2>

                <form className="mt-6 space-y-4" onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="question" value="Poll Question" />
                        <TextInput
                            id="question"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.question}
                            onChange={(e) =>
                                setData('question', e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.question}
                            className="mt-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <InputLabel value="Options (Min 2)" />
                        {data.options.map((option, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <TextInput
                                    type="text"
                                    className="flex-1"
                                    value={option}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            index,
                                            e.target.value,
                                        )
                                    }
                                    placeholder={`Option ${index + 1}`}
                                    required
                                />
                                {data.options.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addOption}
                            className="mt-2 text-sm font-bold text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                            + Add Option
                        </button>
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="ends_at"
                            value="Expiry Date (Optional)"
                        />
                        <TextInput
                            id="ends_at"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.ends_at}
                            onChange={(e) => setData('ends_at', e.target.value)}
                        />
                        <InputError message={errors.ends_at} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end">
                        <SecondaryButton
                            onClick={handleClose}
                            disabled={processing}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>
                            Create Poll
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
