import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface Post {
    id: number;
    title: string;
    summary: string;
    link_type: 'none' | 'external' | 'pdf';
    external_link?: string;
    document_path?: string;
    category_id: number;
    is_published: boolean;
}

interface Category {
    id: number;
    title: string;
}

export default function EditPromotionModal({
    show,
    onClose,
    post,
    categories,
}: {
    show: boolean;
    onClose: () => void;
    post: Post | null;
    categories: Category[];
}) {
    const { data, setData, post: submitPost, processing, errors, reset, clearErrors } =
        useForm({
            title: '',
            summary: '',
            category_id: '',
            link_type: 'none' as 'none' | 'external' | 'pdf',
            external_link: '',
            document: null as File | null,
            featured_image: null as File | null,
            is_published: true,
            _method: 'PUT',
        });

    useEffect(() => {
        if (post) {
            setData({
                title: post.title,
                summary: post.summary || '',
                category_id: String(post.category_id),
                link_type: post.link_type,
                external_link: post.external_link || '',
                document: null,
                featured_image: null,
                is_published: !!post.is_published,
                _method: 'PUT',
            });
        }
    }, [post]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        submitPost(route('promotions.update', post?.id), {
            onSuccess: () => {
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
                    Edit Promotion/Offer
                </h2>

                <div className="mt-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="edit_title" value="Title" />
                        <TextInput
                            id="edit_title"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="edit_summary" value="Short Description/Validity" />
                        <textarea
                            id="edit_summary"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            rows={2}
                            value={data.summary}
                            onChange={(e) => setData('summary', e.target.value)}
                        />
                        <InputError message={errors.summary} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="edit_category_id" value="Category" />
                        <select
                            id="edit_category_id"
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
                        <InputLabel htmlFor="edit_link_type" value="Action Type" />
                        <select
                            id="edit_link_type"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            value={data.link_type}
                            onChange={(e) => setData('link_type', e.target.value as any)}
                        >
                            <option value="none">No Action</option>
                            <option value="external">Website Link</option>
                            <option value="pdf">Open PDF Document</option>
                        </select>
                        <InputError message={errors.link_type} className="mt-2" />
                    </div>

                    {data.link_type === 'external' && (
                        <div>
                            <InputLabel htmlFor="edit_external_link" value="Website URL" />
                            <TextInput
                                id="edit_external_link"
                                type="url"
                                className="mt-1 block w-full"
                                value={data.external_link || ''}
                                onChange={(e) => setData('external_link', e.target.value)}
                                required
                            />
                            <InputError message={errors.external_link} className="mt-2" />
                        </div>
                    )}

                    {data.link_type === 'pdf' && (
                        <div>
                            <InputLabel htmlFor="edit_document" value="Upload New PDF (Leave blank to keep current)" />
                            {post?.document_path && (
                                <p className="mb-2 text-xs text-gray-500 italic">Current: {post.document_path}</p>
                            )}
                            <input
                                id="edit_document"
                                type="file"
                                accept="application/pdf"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('document', e.target.files ? e.target.files[0] : null)}
                            />
                            <InputError message={errors.document} className="mt-2" />
                        </div>
                    )}

                    <div>
                        <InputLabel htmlFor="edit_featured_image" value="Featured Image (Banner)" />
                        <input
                            id="edit_featured_image"
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full"
                            onChange={(e) => setData('featured_image', e.target.files ? e.target.files[0] : null)}
                        />
                        <InputError message={errors.featured_image} className="mt-2" />
                    </div>

                    <div className="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                            checked={data.is_published}
                            onChange={(e) => setData('is_published', e.target.checked)}
                        />
                        <label className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Published
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                    <PrimaryButton className="ml-3" disabled={processing}>
                        Update Promotion
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
