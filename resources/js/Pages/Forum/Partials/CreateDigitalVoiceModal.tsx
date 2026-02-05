import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CreateDigitalVoiceModal({
    show,
    onClose,
}: {
    show: boolean;
    onClose: () => void;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        type: 'voice',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('forum.discussion.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Add Digital Voice / Feedback
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Share your thoughts, suggestions, or feedback with the company.
                </p>

                <div className="mt-6">
                    <InputLabel htmlFor="title" value="Subject / Title" />
                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                    />
                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="content" value="Detailed Feedback" />
                    <textarea
                        id="content"
                        name="content"
                        value={data.content}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                        rows={6}
                        onChange={(e) => setData('content', e.target.value)}
                        required
                    />
                    <InputError message={errors.content} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                    <PrimaryButton className="ms-3" disabled={processing}>
                        Post Voice
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
