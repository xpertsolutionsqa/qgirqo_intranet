import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CreatePromotionModal from './Partials/CreatePromotionModal';
import EditPromotionModal from './Partials/EditPromotionModal';
// import CreatePromotionModal from './Partials/CreatePromotionModal';
// import EditPromotionModal from './Partials/EditPromotionModal';

interface Post {
    id: number;
    title: string;
    summary: string;
    link_type: 'none' | 'external' | 'pdf';
    external_link?: string;
    document_path?: string;
    category_id: number;
    is_published: boolean;
    created_at: string;
    author?: { name: string };
    category?: { title: string; color: string };
}

interface Category {
    id: number;
    title: string;
}

export default function Promotions({ posts = [], categories = [] }: { posts?: Post[], categories: Category[] }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openEditModal = (post: Post) => {
        setSelectedPost(post);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedPost(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this promotion?')) {
            router.delete(route('promotions.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Promotions & Offers Management
                    </h2>
                    <PrimaryButton onClick={openCreateModal}>
                        Add Promotion
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Promotions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto text-sm">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Link/Doc
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-right font-medium tracking-wider text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {posts.length > 0 ? (
                                            posts.map((post) => (
                                                <tr
                                                    key={post.id}
                                                    className="transition hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                >
                                                    <td className="px-6 py-4 font-medium tracking-tight text-gray-900 dark:text-gray-100">
                                                        {post.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-indigo-700 uppercase">
                                                            {post.category?.title || 'Offer'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {post.link_type === 'pdf' ? (
                                                            <span className="text-red-500">
                                                                <i className="fa-solid fa-file-pdf mr-1"></i> PDF
                                                            </span>
                                                        ) : post.link_type === 'external' ? (
                                                            <span className="text-blue-500">
                                                                <i className="fa-solid fa-link mr-1"></i> Ext. Link
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400">None</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {post.is_published ? (
                                                            <span className="text-green-600">Published</span>
                                                        ) : (
                                                            <span className="text-yellow-600">Draft</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                        {post.created_at}
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                        <button
                                                            onClick={() => openEditModal(post)}
                                                            className="mr-4 text-blue-600 hover:text-blue-900"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(post.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
                                                    No promotions available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreatePromotionModal
                show={isCreateModalOpen}
                onClose={closeCreateModal}
                categories={categories}
            />

            <EditPromotionModal
                show={isEditModalOpen}
                post={selectedPost}
                onClose={closeEditModal}
                categories={categories}
            />
        </AuthenticatedLayout>
    );
}
