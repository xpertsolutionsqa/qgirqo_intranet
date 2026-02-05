import React from 'react';
import OfferCard from './OfferCard';

interface Promotion {
    id: number;
    title: string;
    featured_image?: string;
    start_date?: string;
    end_date?: string;
    link_type: string;
    external_link?: string;
    document_path?: string;
}

interface Props {
    promotions: Promotion[];
}

export default function PromotionGrid({ promotions = [] }: Props) {
    return (
        <div className="w-full lg:w-2/3" data-aos="fade-up">
            {/* Top blue bar heading */}
            <div className="mb-7 bg-primary rounded-qa p-[9px_14px] text-center text-[20px] font-bold text-white uppercase tracking-wide">
                All Promotions & Offers
            </div>
            {/* Promotions grid */}
            <div className="mt-[-1.5rem]">
                <div className="flex flex-wrap -mx-3 items-stretch">
                    {promotions.length > 0 ? (
                        promotions.map((offer) => (
                            <OfferCard
                                key={offer.id}
                                image={offer.featured_image ? `/storage/${offer.featured_image}` : 'assets/img/Rectangle-1384-1.jpg'}
                                title={offer.title}
                                validity={offer.end_date || 'Ongoing'}
                                link_type={offer.link_type}
                                external_link={offer.external_link}
                                document_path={offer.document_path}
                            />
                        ))
                    ) : (
                        <div className="w-full px-3 py-12 text-center text-gray-500">
                            No promotions found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
