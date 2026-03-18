import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { User } from '@/interfaces/EmployeeProfile';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Props {
    show: boolean;
    onClose: () => void;
    user: User | null;
    type: 'birthday' | 'anniversary' | 'eom';
    customTitle?: string;
}

export default function WishModal({ show, onClose, user, type, customTitle }: Props) {
    const [alreadyWished, setAlreadyWished] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        to_user_id: '',
        type: type,
        message: '',
    });

    useEffect(() => {
        if (user && show) {
            setData((prev) => ({
                ...prev,
                to_user_id: user.id.toString(),
                type: type,
            }));

            // Check if already wished
            const checkStatus = async () => {
                try {
                    const res = await fetch(`/api/wishes/check?to_user_id=${user.id}&type=${type}`);
                    const result = await res.json();
                    setAlreadyWished(result.already_wished);
                } catch (e) {
                    console.error("Check status failed", e);
                }
            };
            checkStatus();
        } else if (!show) {
            setAlreadyWished(false);
            reset('message');
        }
    }, [user, type, show]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.message.trim()) return;

        post('/api/wishes', {
            preserveScroll: true,
            onSuccess: () => {
                reset('message');
                onClose();
            },
        });
    };


    if (!user) return null;

    const title = type === 'birthday'
        ? `Wish Happy Birthday to ${user.name}`
        : type === 'anniversary'
            ? `Congratulate ${user.name} on Work Anniversary`
            : customTitle
                ? `Congratulate ${user.name} for ${customTitle}`
                : `Congratulate ${user.name} for Professional Excellence`;

    const placeholder = type === 'birthday'
        ? 'Write your birthday wish...'
        : 'Write your congratulations...';

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <form onSubmit={handleSubmit} className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>

                <div className="mb-4">
                    {alreadyWished ? (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-qa flex items-center gap-3">
                            <i className="fa-solid fa-circle-check text-green-500 text-lg"></i>
                            <span className="text-sm font-semibold">You have already sent a wish to {user.name} for today! ✨</span>
                        </div>
                    ) : (
                        <textarea
                            className="w-full rounded-qa border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            rows={4}
                            placeholder={placeholder}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            required
                        ></textarea>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <SecondaryButton onClick={onClose} disabled={processing}>
                        Cancel
                    </SecondaryButton>
                    {!alreadyWished && (
                        <PrimaryButton type="submit" disabled={processing || !data.message.trim()}>
                            {processing ? 'Sending...' : 'Send Message'}
                        </PrimaryButton>
                    )}
                </div>
            </form>
        </Modal>
    );
}
