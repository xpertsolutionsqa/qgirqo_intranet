import Modal from '@/Components/Modal';
import dayjs from 'dayjs';

interface Props {
    show: boolean;
    onClose: () => void;
    user: any;
}

export default function EmployeeProfileModal({ show, onClose, user }: Props) {
    if (!user) return null;

    const profile = user.profile || {};

    const rows = [
        { label: 'Employee ID', value: profile.employee_id },
        { label: 'Department', value: profile.department?.name },
        { label: 'Designation', value: profile.designation?.title },
        { label: 'Email', value: user.email },
        { label: 'Phone', value: profile.phone },
        { label: 'Joining Date', value: profile.joining_date ? dayjs(profile.joining_date).format('DD MMM YYYY') : '' },
        { label: 'Date of Birth', value: profile.dob ? dayjs(profile.dob).format('DD MMM YYYY') : '' },
    ];

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">My Profile</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>

                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    {profile.avatar ? (
                        <img
                            src={`/storage/${profile.avatar}`}
                            alt={user.name}
                            className="w-16 h-16 rounded-full object-cover border border-gray-200"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-gray-200 shrink-0">
                            <span className="text-xl font-bold text-primary">
                                {user.name?.charAt(0)?.toUpperCase()}
                            </span>
                        </div>
                    )}
                    <div>
                        <h3 className="text-base font-bold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500 text-start">{profile.designation?.title || 'Employee'}</p>
                    </div>
                </div>

                {/* Info Rows */}
                <div className="space-y-3">
                    {rows.map(({ label, value }) =>
                        value ? (
                            <div key={label} className="flex justify-between text-sm">
                                <span className="text-gray-500">{label}</span>
                                <span className="font-medium text-gray-900">{value}</span>
                            </div>
                        ) : null
                    )}
                </div>
            </div>
        </Modal>
    );
}
