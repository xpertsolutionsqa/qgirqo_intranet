import { useState, useEffect, useRef } from 'react';
import Modal from '@/Components/Modal';
import { User } from '@/interfaces/EmployeeProfile';

interface SearchResult {
    id: string | number;
    type: 'employee' | 'eom' | 'promotion' | 'event';
    title: string;
    subtitle: string;
    image?: string;
    date?: string;
    meta?: any;
}

interface Props {
    show: boolean;
    onClose: () => void;
    onAction: (type: string, data: any) => void;
}

export default function GlobalSearch({ show, onClose, onAction }: Props) {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const tabs = [
        { id: 'all', label: 'All Results' },
        // { id: 'employee', label: 'Employees' },
        { id: 'eom', label: 'Employees of the Quarter' },
        { id: 'promotion', label: 'Promotions' },
        { id: 'event', label: 'Events' },
    ];

    const fetchResults = async (searchQuery: string, tab: string) => {
        if (searchQuery.length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&type=${tab}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            fetchResults(query, activeTab);
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query, activeTab]);

    useEffect(() => {
        if (show) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery('');
            setActiveTab('all');
            setResults([]);
        }
    }, [show]);

    return (
        <Modal show={show} onClose={onClose} maxWidth="xl">
            <div className="flex flex-col h-[550px] overflow-hidden bg-white dark:bg-gray-800">
                {/* Search Input Area */}
                <div className="relative p-4 border-b border-gray-100 dark:border-gray-700">
                    <i className="fa-solid fa-magnifying-glass absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary text-gray-900 dark:text-white placeholder-gray-400 transition-all font-medium"
                        placeholder="Search for employees, events, promotions..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Tabs */}
                <div className="flex px-4 gap-1 border-b border-gray-50 dark:border-gray-700 overflow-x-auto scrollbar-hide">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-all ${activeTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-center text-gray-400">
                            <i className="fa-solid fa-spinner fa-spin text-3xl mb-4"></i>
                            <p className="font-medium">Searching...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="space-y-2">
                            {results.map((result: SearchResult) => (
                                <div
                                    key={`${result.type}-${result.id}`}
                                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-qa-bg transition-all border border-transparent hover:border-primary/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
                                            {result.image ? (
                                                <img src={result.image} alt={result.title} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-bold uppercase">
                                                    {result.title.charAt(0)}
                                                </div>
                                            )}
                                            <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${result.type === 'employee' ? 'bg-green-500' :
                                                result.type === 'eom' ? 'bg-orange-500' :
                                                    result.type === 'promotion' ? 'bg-purple-500' : 'bg-blue-500'
                                                }`}></div>
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{result.title}</h4>
                                            <p className="text-[11px] text-gray-500 font-medium">{result.subtitle}</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {result.meta?.canWish && (
                                            <button
                                                onClick={() => onAction('wish', result.meta)}
                                                className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                                            >
                                                Send Wish
                                            </button>
                                        )}
                                        {result.meta?.canCongratulate && (
                                            <button
                                                onClick={() => onAction('congratulate', result.meta)}
                                                className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                                            >
                                                Congratulate
                                            </button>
                                        )}
                                        {result.meta?.canAddCalendar && (
                                            <button
                                                className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                                            >
                                                Add to Calendar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : query.length >= 2 ? (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                            <i className="fa-solid fa-face-frown text-4xl text-gray-200 mb-4"></i>
                            <p className="text-gray-400 font-medium">No matches found for "{query}"</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-center text-gray-300">
                            <i className="fa-solid fa-keyboard text-4xl mb-4"></i>
                            <p className="font-medium">Type at least 2 characters to search...</p>
                        </div>
                    )}
                </div>

                {/* Footer Tips */}
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center px-6">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Search v1.0</p>
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                            <kbd className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-1 rounded shadow-sm font-sans">ESC</kbd> to close
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
