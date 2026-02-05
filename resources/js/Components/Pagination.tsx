import { Link } from '@inertiajs/react';

interface Props {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export default function Pagination({ links }: Props) {
    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap items-center justify-center space-x-1 py-4">
            {links.map((link, idx) => {
                if (link.url === null) {
                    return (
                        <div
                            key={idx}
                            className="mr-1 mb-1 rounded border px-4 py-3 text-sm leading-4 text-gray-400 dark:border-gray-700"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                return (
                    <Link
                        key={idx}
                        className={`focus:border-primary focus:text-primary mr-1 mb-1 rounded border px-4 py-3 text-sm leading-4 transition duration-150 ease-in-out hover:bg-white dark:border-gray-700 dark:hover:bg-gray-800 ${
                            link.active
                                ? 'bg-primary border-primary text-white hover:text-gray-900 dark:text-white dark:hover:text-gray-800'
                                : 'text-gray-700 dark:text-gray-400'
                        }`}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}
