import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface Reply {
    id: number;
    content: string;
    created_at: string;
    author?: { name: string; profile?: { avatar?: string } };
}

interface Topic {
    id: number;
    title: string;
    content: string;
    slug: string;
    created_at: string;
    author?: { name: string; profile?: { avatar?: string } };
    replies?: Reply[];
}

export default function ForumShow({ topic }: { topic: Topic }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        {topic.title}
                    </h2>
                    <Link
                        href={route('forum.discussion')}
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                        &larr; Back to Forum
                    </Link>
                </div>
            }
        >
            <Head title={topic.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="prose dark:prose-invert max-w-none">
                                {topic.content}
                            </div>

                            <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-700">
                                <h3 className="text-lg font-bold mb-4">Replies</h3>
                                {topic.replies && topic.replies.length > 0 ? (
                                    <div className="space-y-6">
                                        {topic.replies.map((reply) => (
                                            <div key={reply.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="font-bold text-sm">{reply.author?.name || 'Anonymous'}</div>
                                                    <div className="text-xs text-gray-500">{new Date(reply.created_at).toLocaleString()}</div>
                                                </div>
                                                <div className="text-sm">{reply.content}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">No replies yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
