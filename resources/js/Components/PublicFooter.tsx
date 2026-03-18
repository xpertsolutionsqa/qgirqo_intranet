import { Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from './Modal';

type LinkItem = {
    label: string;
    url: string;
};

type MenuLink = {
    label: string;
    href: string | LinkItem[];
};

export default function PublicFooter() {
    const currentYear = new Date().getFullYear();
    const [selectedLink, setSelectedLink] = useState<MenuLink | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isComingSoon, setIsComingSoon] = useState(false);

    const menuSections = [
        {
            title: 'Company',
            links: [
                {
                    label: 'HR Services',
                    href: 'https://ent-qa.menaitech.com/QGI/application/hrms/mename/index.php',
                },
                {
                    label: 'IT Services',
                    href: [
                        { label: 'IT Help Desk', url: 'http://sdc.qgirco.com' },
                        {
                            label: 'AZENTIO CORE',
                            url: 'http://prepro-w.qgirco.com/QGIRCO_PPE/',
                        },
                        {
                            label: 'AZENTIO Help Desk',
                            url: 'https://customer.azentio.com/',
                        },
                    ],
                },
                { label: 'Organization Chart', href: '#' },
                { label: 'Policies & Procedures', href: '#' },
                { label: 'Whistle Blowing', href: '#' },
            ],
        },
        {
            title: 'Workspace & Teams',
            links: [
                { label: 'Event Calendar', href: '/company-events' },
                { label: 'Employee Directory', href: '#' },
                { label: 'Learning Resources', href: '#' },
                { label: 'Digital Voices Forum', href: '/forum/digital-voices' },
                { label: 'Forms & Templates', href: '#' },
            ],
        },
        {
            title: 'Community',
            links: [
                { label: 'Promotions & Offers', href: '/exclusive-offers' },
                { label: 'Birthday Calendar', href: '/celebrations' },
                { label: 'Discussion Forum', href: '/forum/discussion' },
                { label: 'Poll', href: '#' },
            ],
        },
        {
            title: 'Media Center',
            links: [
                { label: 'News', href: '#' },
                { label: 'Reports', href: '#' },
                { label: 'Media Gallery', href: '/photo-gallery' },
            ],
        },
    ];

    const handleLinkClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        link: MenuLink,
    ) => {
        if (Array.isArray(link.href)) {
            e.preventDefault();
            setSelectedLink(link);
            setIsComingSoon(false);
            setIsModalOpen(true);
        } else if (link.href === '#') {
            e.preventDefault();
            setSelectedLink(link);
            setIsComingSoon(true);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedLink(null);
            setIsComingSoon(false);
        }, 200);
    };

    return (
        <footer className="bg-primary mt-auto text-white">
            <div className="pt-[30px] pb-[15px]">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {menuSections.map((section, idx) => (
                            <div key={idx}>
                                <h4 className="mb-[10px] font-extrabold text-white">
                                    {section.title}
                                </h4>
                                <ul className="space-y-2 text-sm">
                                    {section.links.map((link, lIdx) => {
                                        const isExternal =
                                            typeof link.href === 'string' &&
                                            link.href.startsWith('http');
                                        const hrefStr =
                                            typeof link.href === 'string'
                                                ? link.href
                                                : '#';

                                        return (
                                            <li key={lIdx}>
                                                <Link
                                                    href={hrefStr}
                                                    onClick={(e: any) =>
                                                        handleLinkClick(e, link)
                                                    }
                                                    target={
                                                        isExternal
                                                            ? '_blank'
                                                            : undefined
                                                    }
                                                    rel={
                                                        isExternal
                                                            ? 'noopener noreferrer'
                                                            : undefined
                                                    }
                                                    className="text-white/85 transition-colors hover:text-white hover:underline"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white py-[15px]">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="text-primary text-sm font-medium">
                        QGIRCO © {currentYear}. All rights reserved.
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-gray-900 text-lg font-bold dark:text-gray-100">
                            {selectedLink?.label}
                        </h2>
                        <button
                            onClick={closeModal}
                            className="text-gray-400 transition-colors hover:text-gray-600"
                        >
                            <i className="fa-solid fa-xmark text-lg"></i>
                        </button>
                    </div>

                    {isComingSoon ? (
                        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 py-8 text-center">
                            <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                <i className="fa-solid fa-hourglass-half animate-pulse text-2xl"></i>
                            </div>
                            <h3 className="mb-1 text-[18px] font-bold text-black">
                                Coming Soon!
                            </h3>
                            <p className="text-sm text-gray-500">
                                This feature is currently under development.{' '}
                                <br />
                                Stay tuned for updates!
                            </p>
                            <button
                                onClick={closeModal}
                                className="bg-primary mt-6 rounded-full px-8 py-2 text-[13px] font-bold text-white transition-all hover:bg-black"
                            >
                                Got it
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {Array.isArray(selectedLink?.href) &&
                                selectedLink.href.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.url}
                                        target={
                                            item.url.startsWith('http')
                                                ? '_blank'
                                                : undefined
                                        }
                                        rel={
                                            item.url.startsWith('http')
                                                ? 'noopener noreferrer'
                                                : undefined
                                        }
                                        className="block rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                                        onClick={closeModal}
                                    >
                                        <div className="text-gray-900 font-medium dark:text-gray-100">
                                            {item.label}
                                        </div>
                                    </a>
                                ))}
                        </div>
                    )}
                </div>
            </Modal>
        </footer>
    );
}

