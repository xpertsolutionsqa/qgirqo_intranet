import { Link } from '@inertiajs/react';

export default function PublicFooter() {
    const currentYear = new Date().getFullYear();

    const menuSections = [
        {
            title: 'Company',
            links: [
                { label: 'HR Services', href: '#' },
                { label: 'IT Services', href: '#' },
                { label: 'Organization Chart', href: '#' },
                { label: 'Policies & Procedures', href: '#' },
                { label: 'Whistle Blowing', href: '#' },
            ],
        },
        {
            title: 'Workspace & Teams',
            links: [
                { label: 'Event Calendar', href: '#' },
                { label: 'Employee Directory', href: '#' },
                { label: 'Learning Resources', href: '#' },
                { label: 'Digital Voices Forum', href: '#' },
                { label: 'Forms & Templates', href: '#' },
            ],
        },
        {
            title: 'Community',
            links: [
                { label: 'Promotions & Offers', href: '#' },
                { label: 'Birthday Calendar', href: '#' },
                { label: 'Discussion Forum', href: '#' },
                { label: 'Poll', href: '#' },
            ],
        },
        {
            title: 'Media Center',
            links: [
                { label: 'News', href: '#' },
                { label: 'Reports', href: '#' },
                { label: 'Media Gallery', href: '#' },
            ],
        },
    ];

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
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <Link
                                                href={link.href}
                                                className="text-white/85 transition-colors hover:text-white hover:underline"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
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
        </footer>
    );
}
