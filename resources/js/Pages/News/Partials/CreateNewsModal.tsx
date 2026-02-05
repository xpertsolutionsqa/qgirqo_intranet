import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import Toggle from '../../../Components/Switch';

interface Props {
    show: boolean;
    onClose: () => void;
}

export default function CreateNewsModal({ show, onClose }: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            title: '',
            content: '',
            is_published: true,
            featured_image: null as File | null,
            category_id: 1,
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('news.store'), {
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
                    Add New News
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create a new news announcement for the intranet.
                </p>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                    <input type="hidden" value={data.category_id} />

                    <div>
                        <InputLabel
                            htmlFor="image"
                            value="Featured Image"
                            className="text-start"
                        />
                        <input
                            id="image"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                            accept="image/*"
                            onChange={(e) =>
                                setData(
                                    'featured_image',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                        />
                        <InputError
                            message={errors.featured_image}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="title"
                            value="Title"
                            className="text-start"
                        />
                        <TextInput
                            id="title"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Enter news title"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="content"
                            value="Full Content"
                            className="text-start"
                        />
                        <textarea
                            id="content"
                            className="mt-1 block min-h-[150px] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="Write the full news content here..."
                        ></textarea>
                        <InputError message={errors.content} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <InputLabel
                            htmlFor="is_published"
                            value="Publised"
                            className="text-start"
                        />
                        <Toggle
                            // label="Published"
                            onToggle={(value: boolean) =>
                                setData('is_published', value)
                            }
                            id="is_published"
                            checked={data.is_published}
                        />
                        <InputError
                            message={errors.is_published}
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
                            {processing ? 'Saving...' : 'Save News'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
