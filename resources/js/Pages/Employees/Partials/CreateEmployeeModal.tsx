import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

interface Props {
    show: boolean;
    onClose: () => void;
    departments: { id: number; name: string }[];
    designations: { id: number; title: string }[];
    roles: { id: number; name: string }[];
}

export default function CreateEmployeeModal({
    show,
    onClose,
    departments,
    designations,
    roles,
}: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            email: '',
            password: '',
            role: 'employee',
            department_id: '',
            designation_id: '',
            employee_id: '',
            phone: '',
            dob: '',
            joining_date: '',
            emergency_contact: '',
            avatar: null as File | null,
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('employees.store'), {
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
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Add New Employee
                </h2>

                <form className="mt-6 space-y-4" onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="avatar" value="Profile Photo" />
                        <input
                            id="avatar"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                            accept="image/*"
                            onChange={(e) =>
                                setData(
                                    'avatar',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                        />
                        <InputError message={errors.avatar} className="mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="name" value="Full Name" />
                            <TextInput
                                id="name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value="Email Address" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                className="mt-1 block w-full"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="role" value="Access Role" />
                            <select
                                id="role"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                value={data.role}
                                onChange={(e) =>
                                    setData('role', e.target.value)
                                }
                                required
                            >
                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.role}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel
                                htmlFor="employee_id"
                                value="Employee ID"
                            />
                            <TextInput
                                id="employee_id"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.employee_id}
                                onChange={(e) =>
                                    setData('employee_id', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.employee_id}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="department_id"
                                value="Department"
                            />
                            <select
                                id="department_id"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                value={data.department_id}
                                onChange={(e) =>
                                    setData('department_id', e.target.value)
                                }
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.department_id}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel
                                htmlFor="designation_id"
                                value="Designation"
                            />
                            <select
                                id="designation_id"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                value={data.designation_id}
                                onChange={(e) =>
                                    setData('designation_id', e.target.value)
                                }
                                required
                            >
                                <option value="">Select Designation</option>
                                {designations.map((des) => (
                                    <option key={des.id} value={des.id}>
                                        {des.title}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.designation_id}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="phone" value="Phone Number" />
                            <TextInput
                                id="phone"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel
                                htmlFor="joining_date"
                                value="Joining Date"
                            />
                            <TextInput
                                id="joining_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.joining_date}
                                onChange={(e) =>
                                    setData('joining_date', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.joining_date}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="dob" value="Date of Birth" />
                            <TextInput
                                id="dob"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.dob}
                                onChange={(e) => setData('dob', e.target.value)}
                            />
                            <InputError message={errors.dob} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <SecondaryButton
                            onClick={handleClose}
                            disabled={processing}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Employee'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
