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
                            htmlFor="title"
                            value="Title (Optional)"
                            className="text-start"
                        />
                        <input
                            id="title"
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Auto-generated if left empty"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="cover_image"
                            value="Cover Image / Announcement Banner"
                            className="text-start"
                        />
                        <input
                            id="cover_image"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                            accept="image/*"
                            onChange={(e) =>
                                setData(
                                    'cover_image',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Recommended for announcements without video
                        </p>
                        <InputError
                            message={errors.cover_image}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="video_url"
                            value="Video File (Optional)"
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

                    <div>
                        <InputLabel
                            htmlFor="content"
                            value="Announcement Content (Optional)"
                            className="text-start"
                        />
                        <textarea
                            id="content"
                            className="mt-1 block h-24 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="Detailed message content..."
                        />
                        <InputError message={errors.content} className="mt-2" />
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
                            {processing ? 'Saving...' : 'Save Message'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
