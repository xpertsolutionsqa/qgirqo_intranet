import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CreateNewsModal from './Partials/CreateNewsModal';
import EditNewsModal from './Partials/EditNewsModal';

interface Post {
    id: number;
    title: string;
    content: string;
    category_id: number;
    type: string;
    is_published: boolean;
    created_at: string;
    author?: { name: string };
    category?: { title: string; color: string };
}

export default function News({ posts = [] }: { posts?: Post[] }) {
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
        if (confirm('Are you sure you want to delete this news?')) {
            router.delete(route('news.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        News Management
                    </h2>
                    <PrimaryButton onClick={openCreateModal}>
                        Add News
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="News" />

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
                                                Category
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500 uppercase">
                                                Author
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
                                                    <td
                                                        className="max-w-[300px] overflow-hidden px-6 py-4 font-medium tracking-tight text-ellipsis whitespace-nowrap text-gray-900 uppercase dark:text-gray-100"
                                                        title={post.title}
                                                    >
                                                        {post.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase"
                                                            style={{
                                                                backgroundColor:
                                                                    (post
                                                                        .category
                                                                        ?.color ||
                                                                        '#3b82f6') +
                                                                    '20',
                                                                color:
                                                                    post
                                                                        .category
                                                                        ?.color ||
                                                                    '#3b82f6',
                                                            }}
                                                        >
                                                            {post.category
                                                                ?.title ||
                                                                'General'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {post.is_published ? (
                                                            <span className="flex items-center text-green-600 dark:text-green-400">
                                                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                                                                Published
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                                                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
                                                                Draft
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                        {post.author?.name ||
                                                            'Admin'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                        {post.created_at}
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                        <button
                                                            onClick={() =>
                                                                openEditModal(
                                                                    post,
                                                                )
                                                            }
                                                            className="mr-4 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    post.id,
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="px-6 py-12 text-center text-gray-500 italic dark:text-gray-400"
                                                >
                                                    No news posts available.
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

            <CreateNewsModal
                show={isCreateModalOpen}
                onClose={closeCreateModal}
            />

            <EditNewsModal
                show={isEditModalOpen}
                post={selectedPost}
                onClose={closeEditModal}
            />
        </AuthenticatedLayout>
    );
}
