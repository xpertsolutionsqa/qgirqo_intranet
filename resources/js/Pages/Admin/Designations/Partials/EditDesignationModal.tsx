import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

interface Props {
    show: boolean;
    onClose: () => void;
    designation: any;
}

export default function EditDesignationModal({ show, onClose, designation }: Props) {
    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        title: '',
    });

    useEffect(() => {
        if (designation) {
            setData('title', designation.title);
        }
    }, [designation]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.designations.update', designation.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose}>
            <form onSubmit={submit} className="p-6 text-sm">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Edit Designation
                </h2>

                <div className="mt-6 font-bold uppercase tracking-widest text-[#aaa]">
                    Basic Information
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="title" value="Designation Title" />
                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('title', e.target.value)}
                        required
                    />
                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                    <PrimaryButton className="ms-3" disabled={processing}>
                        Update Designation
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
