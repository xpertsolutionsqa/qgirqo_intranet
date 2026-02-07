

export default function QuickLinks() {
    const links = [
        {
            label: 'HR',
            icon: '/assets/img/person-fill-check.svg',
            href: 'https://ent-qa.menaitech.com/QGI/application/hrms/mename/index.php',
        },
        {
            label: 'IT',
            icon: '/assets/img/pc-display.svg',
            href: 'http://sdc.qgirco.com',
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

    return (
        <nav
            className="flex flex-col items-center gap-[10px]"
            aria-label="Quick actions"
        >
            {links.map((link, idx) => (
                <a
                    key={idx}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                        link.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
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
            ))}
        </nav>
    );
}
