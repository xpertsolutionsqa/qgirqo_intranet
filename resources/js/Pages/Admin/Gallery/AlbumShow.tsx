import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';

interface Photo {
    id: number;
    file_path: string;
    type: 'image' | 'video';
    caption: string | null;
}

interface Album {
    id: number;
    title: string;
    photos: Photo[];
    category: { name: string } | null;
}

export default function AlbumShow({ album }: { album: Album }) {
    const [showUploadModal, setShowUploadModal] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        file: null as File | null,
        caption: '',
    });

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('gallery.store', album.id), {
            onSuccess: () => {
                reset();
                setShowUploadModal(false);
            }
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this photo/video?')) {
            router.delete(route('gallery.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{album.category?.name || 'Album'}</div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            {album.title}
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <SecondaryButton onClick={() => window.history.back()}>Back</SecondaryButton>
                        <PrimaryButton onClick={() => setShowUploadModal(true)}>Upload Media</PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title={`Album: ${album.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {album.photos.map((photo) => (
                            <div key={photo.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                {photo.type === 'video' ? (
                                    <video src={photo.file_path} className="h-full w-full object-cover" />
                                ) : (
                                    <img src={photo.file_path} className="h-full w-full object-cover" />
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                                    <button
                                        onClick={() => handleDelete(photo.id)}
                                        className="bg-red-500 text-white text-[10px] font-bold py-1 px-2 rounded hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                                {photo.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <i className="fa-solid fa-play text-white/50 text-2xl"></i>
                                    </div>
                                )}
                            </div>
                        ))}

                        {album.photos.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-white rounded-lg border-2 border-dashed border-gray-200">
                                <p className="text-gray-500">No media uploaded to this album yet.</p>
                                <button onClick={() => setShowUploadModal(true)} className="text-primary font-bold mt-2 hover:underline">Upload your first photo/video</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal show={showUploadModal} onClose={() => setShowUploadModal(false)}>
                <form onSubmit={handleUpload} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Upload to Album</h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="file" value="Photo or Video (Max 10MB)" />
                        <input
                            type="file"
                            id="file"
                            required
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            onChange={(e) => setData('file', e.target.files ? e.target.files[0] : null)}
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="caption" value="Caption (Optional)" />
                        <input
                            id="caption"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.caption}
                            onChange={(e) => setData('caption', e.target.value)}
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setShowUploadModal(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>Upload</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
