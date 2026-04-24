import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import dayjs from 'dayjs';

interface Album {
    id: number;
    title: string;
    cover_image: string | null;
    event_date: string | null;
    category: { name: string } | null;
    photos_count: number;
}

interface Category {
    id: number;
    name: string;
}

export default function Albums({ albums, categories }: { albums: Album[], categories: Category[] }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingAlbum, setEditingAlbum] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        category_id: '',
        event_date: '',
        description: '',
        cover_image: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAlbum) {
            router.post(route('albums.update', editingAlbum.id), {
                _method: 'put',
                title: data.title,
                category_id: data.category_id,
                event_date: data.event_date,
                description: data.description,
                cover_image: data.cover_image,
            }, {
                onSuccess: () => {
                    reset();
                    setShowEditModal(false);
                    setEditingAlbum(null);
                }
            });
        } else {
            post(route('albums.store'), {
                onSuccess: () => {
                    reset();
                    setShowCreateModal(false);
                }
            });
        }
    };

    const openEdit = (album: any) => {
        setEditingAlbum(album);
        setData({
            title: album.title,
            category_id: album.category_id || '',
            event_date: album.event_date ? dayjs(album.event_date).format('YYYY-MM-DD') : '',
            description: album.description || '',
            cover_image: null,
        });
        setShowEditModal(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this album? All photos inside will be lost.')) {
            destroy(route('albums.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Albums Management
                    </h2>
                    <PrimaryButton onClick={() => setShowCreateModal(true)}>
                        Create Album
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Gallery Albums" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {albums.map((album) => (
                            <div key={album.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-200 group">
                                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                    {album.cover_image ? (
                                        <img src={`/storage/${album.cover_image}`} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                            No Cover
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-[10px] font-bold">
                                        {album.photos_count} Photos
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 truncate">{album.title}</h3>
                                    <div className="flex items-center justify-between mt-1 mb-4">
                                        <span className="text-[11px] font-bold text-primary uppercase">{album.category?.name || 'Uncategorized'}</span>
                                        <span className="text-[11px] text-gray-500">{album.event_date ? dayjs(album.event_date).format('MMM YYYY') : 'No Date'}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route('albums.show', album.id)}
                                            className="flex-1 text-center bg-gray-50 hover:bg-gray-100 py-2 rounded text-xs font-bold text-gray-700 transition-colors border border-gray-100"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => openEdit(album)}
                                            className="px-3 bg-indigo-50 hover:bg-indigo-100 py-2 rounded text-xs font-bold text-indigo-700 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(album.id)}
                                            className="px-3 bg-red-50 hover:bg-red-100 py-2 rounded text-xs font-bold text-red-600 transition-colors"
                                        >
                                            <i className="fa-regular fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {albums.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-white rounded-lg border-2 border-dashed border-gray-200">
                                <p className="text-gray-500">No albums created yet.</p>
                                <button onClick={() => setShowCreateModal(true)} className="text-primary font-bold mt-2 hover:underline">Create your first album</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Create New Gallery Album</h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="title" value="Album Title" />
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

                    <div className="mt-4">
                        <InputLabel htmlFor="category_id" value="Category" />
                        <select
                            id="category_id"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.category_id} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="event_date" value="Event Date" />
                        <TextInput
                            id="event_date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.event_date}
                            onChange={(e) => setData('event_date', e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="cover_image" value="Cover Image" />
                        <input
                            type="file"
                            id="cover_image"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            onChange={(e) => setData('cover_image', e.target.files ? e.target.files[0] : null)}
                        />
                        <InputError message={errors.cover_image} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setShowCreateModal(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>Create Album</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
                <form onSubmit={submit} className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-medium text-gray-900">Edit Album</h2>
                        {editingAlbum?.cover_image && (
                            <img src={`/storage/${editingAlbum.cover_image}`} className="h-10 w-10 rounded object-cover" />
                        )}
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="edit_title" value="Album Title" />
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

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_category_id" value="Category" />
                        <select
                            id="edit_category_id"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.category_id} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_event_date" value="Event Date" />
                        <TextInput
                            id="edit_event_date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.event_date}
                            onChange={(e) => setData('event_date', e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_cover_image" value="Update Cover Image (Optional)" />
                        <input
                            type="file"
                            id="edit_cover_image"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            onChange={(e) => setData('cover_image', e.target.files ? e.target.files[0] : null)}
                        />
                        <InputError message={errors.cover_image} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setShowEditModal(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>Update Album</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
