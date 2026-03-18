import { useState } from 'react';

interface Props {
    src?: string | null;
    alt?: string;
    className?: string;
}

export default function EmployeeAvatar({ src, alt = "Employee", className = "h-[42px] w-[42px]" }: Props) {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
        return <div className={className}></div>;
    }

    return (
        <div className={`shrink-0 overflow-hidden rounded-full border border-black/5 bg-gray-200 ${className}`}>
            <img
                src={src.startsWith('http') ? src : `/storage/${src}`}
                alt={alt}
                className="h-full w-full object-cover"
                onError={() => setHasError(true)}
            />
        </div>
    );
}
