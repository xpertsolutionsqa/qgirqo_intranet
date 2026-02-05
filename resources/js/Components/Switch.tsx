import { useEffect, useState } from 'react';

export default function Switch({
    label,
    checked = false,
    onToggle,
    id = 'toggle',
}: {
    label?: string;
    checked?: boolean;
    onToggle: (value: boolean) => void;
    id?: string;
}) {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleToggle = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        if (onToggle) {
            onToggle(newState);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            {label && (
                <span className="text-gray-700 dark:text-gray-300">
                    {label}
                </span>
            )}
            <label
                htmlFor={id}
                className="relative inline-block h-6 w-11 cursor-pointer"
            >
                <input
                    type="checkbox"
                    id={id}
                    className="peer sr-only"
                    checked={isChecked}
                    onChange={handleToggle}
                />
                <div className="h-6 w-11 rounded-full bg-gray-200 transition-colors duration-300 peer-checked:bg-blue-600 dark:bg-gray-700"></div>
                <div className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
            </label>
        </div>
    );
}
