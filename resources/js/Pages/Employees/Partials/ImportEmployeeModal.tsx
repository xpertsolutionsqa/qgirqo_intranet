import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';

interface Props {
    show: boolean;
    onClose: () => void;
}

export default function ImportEmployeeModal({ show, onClose }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            file: null as File | null,
        });

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setData('file', e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setData('file', e.target.files[0]);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // NOTE: The endpoint route('employees.import') will be implemented later.
        // For now, this is just the frontend representation.
        post(route('employees.import'), {
            onSuccess: () => {
                reset();
                onClose();
            },
            forceFormData: true,
        });
    };

    const handleClose = () => {
        clearErrors();
        reset();
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Import Employees
                </h2>

                <form className="space-y-4" onSubmit={submit}>
                    <div
                        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${dragActive
                            ? 'border-primary bg-primary/5 dark:border-primary dark:bg-primary/10'
                            : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-400 mb-3"></i>
                            {data.file ? (
                                <p className="mb-2 text-sm text-primary font-medium dark:text-primary">
                                    {data.file.name}
                                </p>
                            ) : (
                                <>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold text-primary">Click to select</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        XLSX, XLS, CSV
                                    </p>
                                </>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept=".xlsx, .xls, .csv"
                            onChange={handleChange}
                        />
                    </div>
                    <InputError message={errors.file} className="mt-2 text-center" />

                    <div className="flex items-center justify-end mt-6">
                        <SecondaryButton
                            onClick={handleClose}
                            disabled={processing}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            className="ml-3"
                            disabled={processing || !data.file}
                        >
                            {processing ? 'Importing...' : 'Import Employees'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
