import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Toggle from '../../../Components/Switch';

interface GceoMessage {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    video_url: string;
    is_active: boolean;
    published_at: string;
    created_at: string;
    content: string;
}

interface Props {
    message: GceoMessage | null;
    show: boolean;
    onClose: () => void;
}

export default function EditGceoMessageModal({
    message,
    show,
    onClose,
}: Props) {
    const {
        data,
        setData,
        post: postRequest,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        id: message?.id || 0,
        title: message?.title || '',
        content: message?.content || '',
        video_url: null as File | null | string,
        is_active: message?.is_active ?? true,
        cover_image: null as File | null,
        published_at: message?.published_at
            ? new Date(message.published_at).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10),
        _method: 'PUT',
    });

    useEffect(() => {
        if (message) {
            setData({
                id: message.id,
                title: message.title,
                content: message.content,
                video_url: null,
                is_active: message.is_active,
                cover_image: null,
                published_at: message.published_at
                    ? new Date(message.published_at).toISOString().slice(0, 10)
                    : '',
                _method: 'PUT',
            });
        }
    }, [message]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        postRequest(route('gceo-messages.update', message?.id), {
            onSuccess: () => {
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
                    Edit GCEO Message
                </h2>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                    <div>
                        <InputLabel
                            htmlFor="edit_image"
                            value="Cover Image (Leave blank to keep current)"
                            className="text-start"
                        />
                        <input
                            id="edit_image"
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
                        <InputError
                            message={errors.cover_image}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="edit_title"
                            value="Title"
                            className="text-start"
                        />
                        <TextInput
                            id="edit_title"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Enter message title"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="edit_video_url"
                            className="text-start"
                        />
                        <TextInput
                            id="edit_video_url"
                            type="url"
                            className="mt-1 block w-full"
                            value={data.video_url?.toString() ?? ''}
                            onChange={(e) =>
                                setData('video_url', e.target.value)
                            }
                            placeholder="https://..."
                        />
                        <InputError
                            message={errors.video_url}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="edit_content"
                            value="Content / Description"
                            className="text-start"
                        />
                        <textarea
                            id="edit_content"
                            className="mt-1 block min-h-[100px] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="Optional content..."
                        ></textarea>
                        <InputError message={errors.content} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="edit_published_at"
                            value="Published Date"
                            className="text-start"
                        />
                        <TextInput
                            id="edit_published_at"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.published_at}
                            onChange={(e) =>
                                setData('published_at', e.target.value)
                            }
                        />
                        <InputError
                            message={errors.published_at}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <InputLabel
                            htmlFor="edit_is_active"
                            value="Active (Show on Homepage)"
                            className="text-start"
                        />
                        <Toggle
                            onToggle={(value: boolean) =>
                                setData('is_active', value)
                            }
                            id="edit_is_active"
                            checked={data.is_active}
                        />
                        <InputError
                            message={errors.is_active}
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
                            {processing ? 'Updating...' : 'Update Message'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
