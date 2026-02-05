import React from 'react';

interface OfferCardProps {
    image: string;
    title: string;
    validity: string;
    link_type: string;
    external_link?: string;
    document_path?: string;
}

export default function OfferCard({
    image,
    title,
    validity,
    link_type,
    external_link,
    document_path
}: OfferCardProps) {
    const href = link_type === 'pdf'
        ? `/storage/${document_path}`
        : (link_type === 'external' ? external_link : '#');

    const target = (link_type === 'pdf' || link_type === 'external') ? '_blank' : '_self';

    return (
        <div className="w-full sm:w-1/2 xl:w-1/3 px-3 mb-6">
            <div className="relative flex flex-col h-full rounded-lg border border-black/10 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
                <div className="h-[150px] overflow-hidden rounded-md bg-gray-200">
                    <img src={image} alt="offer pic" className="h-full w-full object-cover" />
                </div>
                <div className="mt-[10px] mb-1 text-sm font-semibold text-black line-clamp-2">{title}</div>
                <div className="mb-2.5 text-xs text-black/70">Valid until {validity}</div>
                <div className="mt-auto text-center">
                    <a
                        href={href}
                        target={target}
                        rel="noopener noreferrer"
                        className="bg-primary inline-flex h-7 min-w-[160px] items-center justify-center rounded-full text-[11px] font-medium text-white transition-colors hover:bg-black"
                    >
                        {link_type === 'pdf' ? 'Open PDF' : 'View Details'}
                    </a>
                </div>
            </div>
        </div>
    );
}
