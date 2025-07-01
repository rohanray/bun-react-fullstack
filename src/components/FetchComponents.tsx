import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Wrapper component to provide custom fallback UI
interface FetchWithFallbackProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export function FetchWithFallback({ children, fallback }: FetchWithFallbackProps) {
    const defaultFallback = (
        <div className="flex justify-center items-center h-32">
            <div className="text-gray-500">Loading...</div>
        </div>
    );

    return (
        <ErrorBoundary>
            <Suspense fallback={fallback || defaultFallback}>
                {children}
            </Suspense>
        </ErrorBoundary>
    );
}
