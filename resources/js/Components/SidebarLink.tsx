import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function SidebarLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'group flex items-center rounded-lg px-4 py-3 text-sm font-medium transition duration-150 ease-in-out ' +
                (active
                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-300') +
                ' ' +
                className
            }
        >
            <span
                className={
                    active
                        ? 'text-primary dark:text-white'
                        : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400'
                }
            >
                {children}
            </span>
        </Link>
    );
}
