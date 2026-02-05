import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

interface Category {
    id: number;
    title: string;
}

export default function CreatePromotionModal({
    show,
    onClose,
    categories,
}: {
    show: boolean;
    onClose: () => void;
    categories: Category[];
}) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            title: '',
            summary: '',
            category_id: '',
            link_type: 'none' as 'none' | 'external' | 'pdf',
            external_link: '',
            document: null as File | null,
            featured_image: null as File | null,
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('promotions.store'), {
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
                    Add New Promotion/Offer
                </h2>

                <div className="mt-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="summary" value="Short Description/Validity" />
                        <textarea
                            id="summary"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            rows={2}
                            value={data.summary}
                            onChange={(e) => setData('summary', e.target.value)}
                        />
                        <InputError message={errors.summary} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="category_id" value="Category" />
                        <select
                            id="category_id"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.category_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="link_type" value="Action Type (What happens on click?)" />
                        <select
                            id="link_type"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            value={data.link_type}
                            onChange={(e) => setData('link_type', e.target.value as any)}
                        >
                            {/* <option value="none">No Action</option> */}
                            <option value="external">Website Link</option>
                            <option value="pdf">Open PDF Document</option>
                        </select>
                        <InputError message={errors.link_type} className="mt-2" />
                    </div>

                    {data.link_type === 'external' && (
                        <div>
                            <InputLabel htmlFor="external_link" value="Website URL" />
                            <TextInput
                                id="external_link"
                                type="url"
                                className="mt-1 block w-full"
                                placeholder="https://..."
                                value={data.external_link}
                                onChange={(e) => setData('external_link', e.target.value)}
                                required
                            />
                            <InputError message={errors.external_link} className="mt-2" />
                        </div>
                    )}

                    {data.link_type === 'pdf' && (
                        <div>
                            <InputLabel htmlFor="document" value="Upload PDF Document" />
                            <input
                                id="document"
                                type="file"
                                accept="application/pdf"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('document', e.target.files ? e.target.files[0] : null)}
                                required
                            />
                            <InputError message={errors.document} className="mt-2" />
                        </div>
                    )}

                    <div>
                        <InputLabel htmlFor="featured_image" value="Featured Image (Banner)" />
                        <input
                            id="featured_image"
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full"
                            onChange={(e) => setData('featured_image', e.target.files ? e.target.files[0] : null)}
                        />
                        <InputError message={errors.featured_image} className="mt-2" />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                    <PrimaryButton className="ml-3" disabled={processing}>
                        Create Promotion
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
