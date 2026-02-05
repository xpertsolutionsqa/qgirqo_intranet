import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';

interface Props {
    show: boolean;
    onClose: () => void;
}

export default function CreateGceoMessageModal({ show, onClose }: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            title: '',
            content: '',
            video_url: null as File | null | string,
            is_active: true,
            cover_image: null as File | null,
            published_at: new Date().toISOString().slice(0, 10), // Default to today
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('gceo-messages.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
            forceFormData: true,
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
                    Add New GCEO Message
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create a new message from the GCEO.
                </p>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                    <div>
                        <InputLabel
                            htmlFor="video_url"
                            value="Video File (Upload MP4/MOV)"
                            className="text-start"
                        />
                        <input
                            id="video_url"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                            accept="video/*"
                            onChange={(e) =>
                                setData(
                                    'video_url',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                        />
                        <InputError
                            message={errors.video_url}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <SecondaryButton
                            type="button"
                            onClick={handleClose}
                            disabled={processing}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            type="submit"
                            className="ml-3"
                            disabled={processing}
                        >
                            {processing ? 'Uploading...' : 'Upload Video'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
