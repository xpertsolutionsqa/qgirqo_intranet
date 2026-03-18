

import { useState } from 'react';
import Modal from './Modal';

type LinkItem = {
    label: string;
    url: string;
};

type QuickLink = {
    label: string | JSX.Element;
    icon: string;
    href: string | LinkItem[];
    subtext?: string;
};

export default function QuickLinks() {
    const [selectedLink, setSelectedLink] = useState<QuickLink | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const links: QuickLink[] = [
        {
            label: 'HR',
            icon: '/assets/img/person-fill-check.svg',
            href: 'https://ent-qa.menaitech.com/QGI/application/hrms/mename/index.php',
        },
        {
            label: 'IT',
            icon: '/assets/img/pc-display.svg',
            href: [
                {
                    label: 'IT Help Desk',
                    url: 'http://sdc.qgirco.com',
                },
                {
                    label: 'AZENTIO CORE',
                    url: 'http://prepro-w.qgirco.com/QGIRCO_PPE/',
                },
                {
                    label: 'AZENTIO Help Desk',
                    url: 'https://customer.azentio.com/',
                },
            ],
            //             IT Help Desk
            // http://sdc.qgirco.com

            // AZENTIO CORE
            // http://prepro-w.qgirco.com/QGIRCO_PPE/

            // AZENTIO Help Desk
            // https://customer.azentio.com/
        },
        {
            label: 'Speak Up',
            icon: '/assets/img/speak-up.svg',
            href: '#',
            subtext: 'It’s 100% Anonymous',
        },
        {
            label: (
                <>
                    Policy &<br />
                    Procedures
                </>
            ),
            icon: '/assets/img/Subtract.svg',
            href: '#',
        },
        {
            label: (
                <>
                    Learning
                    <br />
                    Resources
                </>
            ),
            icon: '/assets/img/book-fill.svg',
            href: '#',
        },
        {
            label: 'Reports',
            icon: '/assets/img/clipboard-data-fill.svg',
            href: '#',
        },
    ];

    const [isComingSoon, setIsComingSoon] = useState(false);

    const handleLinkClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        link: QuickLink,
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
        <>
            <nav
                className="flex flex-col items-center gap-[10px]"
                aria-label="Quick actions"
            >
                {links.map((link, idx) => {
                    const isExternal =
                        typeof link.href === 'string' &&
                        link.href.startsWith('http');
                    const hrefStr =
                        typeof link.href === 'string' ? link.href : '#';

                    return (
                        <a
                            key={idx}
                            href={hrefStr}
                            onClick={(e) => handleLinkClick(e, link)}
                            target={isExternal ? '_blank' : undefined}
                            rel={
                                isExternal ? 'noopener noreferrer' : undefined
                            }
                            className="border-primary hover:bg-primary group flex h-[100px] w-[100px] flex-col items-center justify-center rounded-[12px] border-2 bg-white p-[10px_8px] text-center decoration-0 transition-all duration-300 hover:scale-110 hover:text-white"
                        >
                            <img
                                src={link.icon}
                                alt=""
                                className="mb-[10px] max-h-[32px] max-w-[34px] transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                            />
                            <span className="text-[12px] leading-[15px] font-medium text-black transition-all duration-300 group-hover:text-white">
                                {link.label}
                            </span>
                            {link.subtext && (
                                <small className="mt-0.5 text-[8px] leading-none group-hover:text-white/90">
                                    {link.subtext}
                                </small>
                            )}
                        </a>
                    );
                })}
            </nav>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {selectedLink?.label}
                        </h2>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <i className="fa-solid fa-xmark text-lg"></i>
                        </button>
                    </div>

                    {isComingSoon ? (
                        <div className="py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                                <i className="fa-solid fa-hourglass-half text-2xl animate-pulse"></i>
                            </div>
                            <h3 className="text-[18px] font-bold text-black mb-1">Coming Soon!</h3>
                            <p className="text-sm text-gray-500">
                                This feature is currently under development. <br />
                                Stay tuned for updates!
                            </p>
                            <button
                                onClick={closeModal}
                                className="mt-6 bg-primary text-white px-8 py-2 rounded-full text-[13px] font-bold hover:bg-black transition-all"
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
                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                            {item.label}
                                        </div>
                                    </a>
                                ))}
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}
