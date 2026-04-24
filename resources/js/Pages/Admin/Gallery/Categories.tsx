import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface Category {
    id: number;
    name: string;
    slug: string;
}

export default function Categories({ categories }: { categories: Category[] }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
    });

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('gallery-categories.store'), {
            onSuccess: () => {
                reset();
                setShowCreateModal(false);
            }
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('gallery-categories.update', editingCategory.id), {
                onSuccess: () => {
                    reset();
                    setShowEditModal(false);
                    setEditingCategory(null);
                }
            });
        }
    };

    const openEdit = (category: Category) => {
        setEditingCategory(category);
        setData('name', category.name);
        setShowEditModal(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            destroy(route('gallery-categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Gallery Categories
                    </h2>
                    <PrimaryButton onClick={() => { reset(); clearErrors(); setShowCreateModal(true); }}>
                        Add Category
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Gallery Categories" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Slug</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {categories.map((category) => (
                                        <tr key={category.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{category.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{category.slug}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <button onClick={() => openEdit(category)} className="mr-3 text-indigo-600 hover:text-indigo-900">Edit</button>
                                                <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {categories.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">No categories found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
                <form onSubmit={submitCreate} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Create New Category</h2>
                    <div className="mt-6">
                        <InputLabel htmlFor="name" value="Category Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setShowCreateModal(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>Save</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
                <form onSubmit={submitEdit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Edit Category</h2>
                    <div className="mt-6">
                        <InputLabel htmlFor="edit_name" value="Category Name" />
                        <TextInput
                            id="edit_name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setShowEditModal(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>Update</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
