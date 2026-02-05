import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreatePhotoModal from '@/Pages/Gallery/Partials/CreatePhotoModal';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Photo {
    id: number;
    file_path: string;
    caption: string | null;
    created_at: string;
}

interface PaginatedPhotos {
    data: Photo[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function Index({ photos }: { photos: PaginatedPhotos }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    const handleDelete = (photoId: number) => {
        if (confirm('Are you sure you want to delete this photo?')) {
            router.delete(route('gallery.destroy', photoId));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Gallery
                    </h2>
                    <PrimaryButton onClick={() => setShowCreateModal(true)}>
                        Upload Photo
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Gallery" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {!photos ||
                            !photos.data ||
                            photos.data.length === 0 ? (
                                <div className="py-12 text-center">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No photos yet. Upload your first photo!
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                        {photos.data.map((photo) => (
                                            <div
                                                key={photo.id}
                                                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
                                                onClick={() =>
                                                    setSelectedPhoto(photo)
                                                }
                                            >
                                                <img
                                                    src={photo.file_path}
                                                    alt={
                                                        photo.caption ||
                                                        'Gallery photo'
                                                    }
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                                                    <div className="absolute right-0 bottom-0 left-0 p-3">
                                                        {photo.caption && (
                                                            <p className="mb-2 text-sm text-white">
                                                                {photo.caption}
                                                            </p>
                                                        )}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(
                                                                    photo.id,
                                                                );
                                                            }}
                                                            className="rounded bg-red-500 px-3 py-1 text-xs text-white transition-colors hover:bg-red-600"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {photos?.last_page > 1 && (
                                        <div className="mt-6 flex justify-center gap-2">
                                            {photos.links.map(
                                                (link: any, index: number) => (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            link.url &&
                                                            router.visit(
                                                                link.url,
                                                            )
                                                        }
                                                        disabled={!link.url}
                                                        className={`rounded px-3 py-1 text-sm ${
                                                            link.active
                                                                ? 'bg-indigo-600 text-white'
                                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                                                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox for viewing photo */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <div className="relative max-h-[90vh] max-w-[90vw]">
                        <img
                            src={selectedPhoto.file_path}
                            alt={selectedPhoto.caption || 'Gallery photo'}
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                        />
                        {selectedPhoto.caption && (
                            <p className="mt-4 text-center text-white">
                                {selectedPhoto.caption}
                            </p>
                        )}
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute -top-10 right-0 text-3xl text-white hover:text-gray-300"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <CreatePhotoModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            />
        </AuthenticatedLayout>
    );
}
