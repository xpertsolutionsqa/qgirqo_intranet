import PublicHeader from '@/Components/PublicHeader';
import PublicFooter from '@/Components/PublicFooter';
import QuickLinks from '@/Components/QuickLinks';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function WinnerArchive({ winnersGrouped, years, filters }: any) {
    return (
        <div className="flex min-h-screen flex-col bg-white font-sans text-black">
            <Head title="Employee of the Quarter Archive" />
            <PublicHeader />

            <main className="bg-qa-bg py-8">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-6">
                        <div className="flex-grow">
                            <div className="mb-8 overflow-hidden rounded-qa bg-white p-8 shadow-qa">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-black capatilize">Winners Archive</h1>
                                        <p className="text-gray-500 font-medium mt-1">Celebrating excellence over the years</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href="/"
                                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold text-gray-700 transition-all uppercase"
                                        >
                                            <i className="fa-solid fa-arrow-left me-2"></i>
                                            Back Home
                                        </Link>
                                    </div>
                                </div>

                                {Object.keys(winnersGrouped).length > 0 ? (
                                    Object.keys(winnersGrouped).sort((a, b) => parseInt(b) - parseInt(a)).map(year => (
                                        <div key={year} className="mb-12 last:mb-0">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="h-px flex-grow bg-gray-100"></div>
                                                <h2 className="text-4xl font-black text-gray-200 italic tracking-tighter">{year}</h2>
                                                <div className="h-px flex-grow bg-gray-100"></div>
                                            </div>

                                             <div className="space-y-12">
                                                {Object.keys(winnersGrouped[year]).sort().map(category => (
                                                    <div key={category}>
                                                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-black uppercase tracking-widest mb-6 border border-primary/10">
                                                            {category}
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                            {winnersGrouped[year][category].map((winner: any) => (
                                                                <div key={winner.id} className="bg-qa-bg rounded-xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                                                                    {/* Background decoration */}
                                                                    <div className="absolute -right-4 -top-4 text-gray-100/50 text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
                                                                        <i className="fa-solid fa-trophy"></i>
                                                                    </div>

                                                                    <div className="flex items-center gap-4 mb-6 relative">
                                                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 shrink-0">
                                                                            {winner.user.profile?.avatar ? (
                                                                                <img src={`/storage/${winner.user.profile.avatar}`} className="w-full h-full object-cover" />
                                                                            ) : (
                                                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                                                    <i className="fa-solid fa-user text-2xl"></i>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="font-bold text-lg leading-tight line-clamp-1">{winner.user.name}</h3>
                                                                            <p className="text-[11px] font-bold text-primary uppercase tracking-wider">{winner.user.profile?.designation?.title || 'Team Member'}</p>
                                                                            {winner.user.profile?.department?.name && (
                                                                                <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">{winner.user.profile.department.name}</p>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-4">
                                                                        {winner.featured_image && (
                                                                            <div className="rounded-lg overflow-hidden h-40 bg-gray-100 border border-gray-100">
                                                                                <img src={`/storage/${winner.featured_image}`} className="w-full h-full object-cover" />
                                                                            </div>
                                                                        )}

                                                                        <div>
                                                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Award Category</div>
                                                                            <div className="font-bold text-gray-800 flex items-center gap-2">
                                                                                <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                                                                                {winner.category || winner.title || 'Star Performer'}
                                                                            </div>
                                                                        </div>

                                                                        {winner.reason && (
                                                                            <div className="pt-3 border-t border-gray-100">
                                                                                <p className="text-xs text-gray-500 italic leading-relaxed line-clamp-3">"{winner.reason}"</p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-32 bg-gray-50 rounded-qa border-2 border-dashed border-gray-200">
                                        <div className="text-5xl text-gray-200 mb-4">
                                            <i className="fa-solid fa-award"></i>
                                        </div>
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No archived winners found</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-[100px] shrink-0">
                            <div className="sticky top-24">
                                <QuickLinks />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
