import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'text-primary focus:ring-primary dark:focus:ring-primary rounded border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-offset-gray-800 ' +
                className
            }
        />
    );
}
