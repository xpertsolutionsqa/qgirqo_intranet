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
    role: any;
}

export default function EditRoleModal({ show, onClose, role }: Props) {
    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
    });

    useEffect(() => {
        if (role) {
            setData('name', role.name);
        }
    }, [role]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.roles.update', role.id), {
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
                    Edit Role
                </h2>

                <div className="mt-6 font-bold uppercase tracking-widest text-[#aaa]">
                    Basic Information
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Role Name" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                    <PrimaryButton className="ms-3" disabled={processing}>
                        Update Role
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
