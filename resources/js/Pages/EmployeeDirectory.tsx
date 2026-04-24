import PublicHeader from '@/Components/PublicHeader';
import PublicFooter from '@/Components/PublicFooter';
import QuickLinks from '@/Components/QuickLinks';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useCallback } from 'react';

const debounce = (func: Function, wait: number) => {
    let timeout: any;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export default function EmployeeDirectory({ employees, departments, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedDept, setSelectedDept] = useState(filters.department || '');

    const handleSearch = useCallback(
        debounce((value: string) => {
            router.get(
                route('employee.directory'),
                { search: value, department: selectedDept },
                { preserveState: true, replace: true }
            );
        }, 300),
        [selectedDept]
    );

    const handleDeptFilter = (deptId: string) => {
        const newDept = selectedDept === deptId ? '' : deptId;
        setSelectedDept(newDept);
        router.get(
            route('employee.directory'),
            { search, department: newDept },
            { preserveState: true }
        );
    };

    return (
        <div className="flex min-h-screen flex-col bg-white font-sans text-black">
            <Head title="Employee Directory" />
            <PublicHeader />

            <main className="bg-qa-bg py-8">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-6">
                        <div className="flex-grow">
                            <div className="mb-8 overflow-hidden rounded-qa bg-white p-8 shadow-qa">
                                <h1 className="text-3xl font-bold text-black uppercase mb-6">Employee Directory</h1>

                                <div className="flex flex-col md:flex-row gap-4 mb-8">
                                    {/* Search Bar */}
                                    <div className="relative flex-grow">
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                                handleSearch(e.target.value);
                                            }}
                                            placeholder="Search by name, email, department or designation..."
                                            className="w-full h-[50px] border border-gray-200 rounded-lg px-4 pr-12 focus:outline-none focus:border-primary text-sm shadow-sm"
                                        />
                                        <i className="fa-solid fa-magnifying-glass absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    </div>

                                    {/* Dept Dropdown for Mobile or compact view */}
                                    <select
                                        className="h-[50px] border border-gray-200 rounded-lg px-4 focus:border-primary outline-none text-sm bg-white"
                                        value={selectedDept}
                                        onChange={(e) => handleDeptFilter(e.target.value)}
                                    >
                                        <option value="">All Departments</option>
                                        {departments.map((dept: any) => (
                                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Employees Grid */}
                                {employees.data.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {employees.data.map((emp: any) => (
                                            <div key={emp.id} className="bg-qa-bg rounded-lg p-5 border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group">
                                                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-sm group-hover:border-primary transition-colors duration-500 bg-gray-200 flex items-center justify-center">
                                                    {emp.profile?.avatar ? (
                                                        <img src={`/storage/${emp.profile.avatar}`} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <i className="fa-solid fa-user-tie text-4xl text-gray-400"></i>
                                                    )}
                                                </div>
                                                <h3 className="text-[17px] font-bold text-black line-clamp-1">{emp.name}</h3>
                                                <p className="text-[12px] font-bold text-primary uppercase mt-1 line-clamp-1">{emp.profile?.designation?.title || 'Team Member'}</p>
                                                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{emp.profile?.department?.name || 'General'}</p>

                                                <div className="mt-4 pt-4 border-t border-gray-200 w-full flex flex-col gap-2">
                                                    <a href={`mailto:${emp.email}`} className="text-[12px] text-gray-600 hover:text-primary flex items-center justify-center gap-2 font-medium">
                                                        <i className="fa-solid fa-envelope text-[10px]"></i>
                                                        <span className="truncate">{emp.email}</span>
                                                    </a>
                                                    {emp.profile?.phone && (
                                                        <span className="text-[12px] text-gray-600 flex items-center justify-center gap-2 font-medium">
                                                            <i className="fa-solid fa-phone text-[10px]"></i>
                                                            {emp.profile.phone}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                        <div className="text-4xl text-gray-200 mb-4">
                                            <i className="fa-solid fa-users-slash"></i>
                                        </div>
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No employees found matching your search</p>
                                    </div>
                                )}

                                {/* Pagination */}
                                {employees.links && employees.links.length > 3 && (
                                    <div className="mt-12 flex justify-center">
                                        <nav className="flex items-center gap-2">
                                            {employees.links.map((link: any, iNum: number) => {
                                                if (link.label.includes('Previous')) {
                                                    return (
                                                        <Link
                                                            key={iNum}
                                                            href={link.url || '#'}
                                                            className={`h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 transition-all ${!link.url ? 'text-gray-300 pointer-events-none' : 'text-gray-400 hover:border-primary hover:text-primary'}`}
                                                        >
                                                            <i className="fa-solid fa-chevron-left text-xs"></i>
                                                        </Link>
                                                    );
                                                }
                                                if (link.label.includes('Next')) {
                                                    return (
                                                        <Link
                                                            key={iNum}
                                                            href={link.url || '#'}
                                                            className={`h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 transition-all ${!link.url ? 'text-gray-300 pointer-events-none' : 'text-gray-400 hover:border-primary hover:text-primary'}`}
                                                        >
                                                            <i className="fa-solid fa-chevron-right text-xs"></i>
                                                        </Link>
                                                    );
                                                }
                                                return (
                                                    <Link
                                                        key={iNum}
                                                        href={link.url || '#'}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                        className={`h-10 w-10 flex items-center justify-center rounded-lg font-bold transition-all ${link.active
                                                            ? 'bg-primary text-white shadow-md'
                                                            : 'border border-gray-200 text-black hover:border-primary hover:text-primary'
                                                            }`}
                                                    />
                                                );
                                            })}
                                        </nav>
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
