import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Toggle from '@/Components/Switch';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface EventPost {
    id: number;
    title: string;
    content: string;
    event_date: string;
    event_time: string;

    event_end_time: string;
    event_venue: string;
    category_id: number;
    is_published: boolean;
}

interface Props {
    event: EventPost | null;
    show: boolean;
    onClose: () => void;
}

export default function EditEventModal({ event, show, onClose }: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            title: event?.title || '',
            content: event?.content || '',
            event_date: event?.event_date || '',
            event_time: event?.event_time || '',
            event_end_time: event?.event_end_time || '',
            event_venue: event?.event_venue || '',
            is_published: event?.is_published ?? true,
            featured_image: null as File | null,
            category_id: event?.category_id || 1,
            _method: 'PUT',
        });

    useEffect(() => {
        if (event) {
            setData({
                title: event.title,
                content: event.content,
                event_date: event.event_date,
                event_time: event.event_time,
                event_venue: event.event_venue,
                is_published: event.is_published,
                featured_image: null,
                category_id: event.category_id,
                _method: 'PUT',
            });
        }
    }, [event]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('events.update', event?.id), {
            onSuccess: () => {
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
                    Edit Event
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Modify the event details.
                </p>

                <form className="mt-6 space-y-4" onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="edit_title" value="Event Title" />
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

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <InputLabel
                                htmlFor="edit_event_date"
                                value="Date"
                            />
                            <TextInput
                                id="edit_event_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.event_date}
                                onChange={(e) =>
                                    setData('event_date', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.event_date}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="edit_event_time"
                                value="Time"
                            />
                            <TextInput
                                id="edit_event_time"
                                type="time"
                                className="mt-1 block w-full"
                                value={data.event_time}
                                onChange={(e) =>
                                    setData('event_time', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.event_time}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="edit_event_end_time"
                                value="End Time"
                            />
                            <TextInput
                                id="edit_event_end_time"
                                type="time"
                                className="mt-1 block w-full"
                                value={data.event_end_time}
                                onChange={(e) =>
                                    setData('event_end_time', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.event_end_time}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="edit_event_venue" value="Venue" />
                        <TextInput
                            id="edit_event_venue"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.event_venue}
                            onChange={(e) =>
                                setData('event_venue', e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.event_venue}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="edit_content"
                            value="Description"
                        />
                        <textarea
                            id="edit_content"
                            className="mt-1 block min-h-[100px] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            required
                        ></textarea>
                        <InputError message={errors.content} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="edit_image"
                            value="Event Banner (Leave blank to keep current)"
                        />
                        <input
                            id="edit_image"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                            accept="image/*"
                            onChange={(e) =>
                                setData(
                                    'featured_image',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                        />
                        <InputError
                            message={errors.featured_image}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <InputLabel value="Published Status" />
                        <Toggle
                            onToggle={(value) => setData('is_published', value)}
                            checked={data.is_published}
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <SecondaryButton
                            onClick={handleClose}
                            disabled={processing}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Event'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
