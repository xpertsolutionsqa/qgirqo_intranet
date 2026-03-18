import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CreatePhotoModal({
    show = false,
    onClose,
}: {
    show: boolean;
    onClose: () => void;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null as File | null,
        caption: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('gallery.store'), {
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
                    Upload Media
                </h2>

                <div className="mt-6">
                    <InputLabel htmlFor="file" value="Photo or Video" />

                    <input
                        id="file"
                        type="file"
                        accept="image/*,video/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-black"
                        onChange={(e) =>
                            setData('file', e.target.files?.[0] || null)
                        }
                        required
                    />

                    <InputError message={errors.file} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="caption" value="Caption (Optional)" />

                    <TextInput
                        id="caption"
                        type="text"
                        name="caption"
                        value={data.caption}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('caption', e.target.value)}
                    />

                    <InputError message={errors.caption} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </button>

                    <PrimaryButton disabled={processing}>Upload</PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
