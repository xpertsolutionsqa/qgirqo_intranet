import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

declare var route: any;

export default function LoginModal({
    show = false,
    onClose = () => { },
}: {
    show: boolean;
    onClose: () => void;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                reset();
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="relative p-8">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-gray-400 hover:text-black transition-colors"
                >
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <div className="mb-8 text-center text-black">
                    <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-qa-muted text-sm">Please login to your employee account</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="modal_email" value="Email" />
                        <TextInput
                            id="modal_email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-gray-200 focus:border-primary focus:ring-primary rounded-lg"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <InputLabel htmlFor="modal_password" value="Password" />
                            <button
                                type="button"
                                className="text-[12px] text-primary font-bold hover:underline"
                                onClick={() => window.location.href = route('password.request')}
                            >
                                Forgot?
                            </button>
                        </div>
                        <TextInput
                            id="modal_password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-gray-200 focus:border-primary focus:ring-primary rounded-lg"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center">
                        <label className="flex items-center cursor-pointer">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600 font-medium">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="pt-2">
                        <PrimaryButton
                            className="w-full justify-center py-3 bg-primary hover:bg-black text-white rounded-xl shadow-lg transition-all font-bold text-[15px]"
                            disabled={processing}
                        >
                            {processing ? 'Logging in...' : 'Log In'}
                        </PrimaryButton>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200"></span>
                        </div>
                        <div className="relative flex justify-center text-[12px] uppercase">
                            <span className="bg-white px-3 text-qa-muted font-bold">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => window.location.href = route('azure.login')}
                        className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-[14px] text-gray-700"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.1562 0.3125H0.3125V10.1562H10.1562V0.3125Z" fill="#F25022" />
                            <path d="M20.6875 0.3125H10.8438V10.1562H20.6875V0.3125Z" fill="#7FBA00" />
                            <path d="M10.1562 10.8438H0.3125V20.6875H10.1562V10.8438Z" fill="#00A4EF" />
                            <path d="M20.6875 10.8438H10.8438V20.6875H20.6875V10.8438Z" fill="#FFB900" />
                        </svg>
                        Sign in with Microsoft
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-[13px] text-qa-muted">
                        Don't have an account? <span className="text-black font-bold">Contact HR Team</span>
                    </p>
                </div>
            </div>
        </Modal>
    );
}
