import { useState, useEffect, useRef, useMemo } from 'react';
import type { ReactNode } from 'react';

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

interface UseFetchOptions {
    immediate?: boolean; // Whether to fetch immediately on mount
    suspense?: boolean; // Whether to use Suspense for loading states
    fallback?: ReactNode; // Custom loading component for Suspense mode
}

// For Suspense mode - returns data directly (no loading/error states)
interface UseFetchSuspenseResult<T> {
    data: T;
    refetch: () => void;
}

// Simple cache for Suspense promises and data
const suspenseCache = new Map<string, { data?: any; promise?: Promise<any>; error?: Error }>();

// Function overloads for different return types
export function useFetch<T>(
    url: string,
    options: UseFetchOptions & { suspense: true }
): UseFetchSuspenseResult<T>;

export function useFetch<T>(
    url: string,
    options?: UseFetchOptions & { suspense?: false }
): UseFetchResult<T>;

export function useFetch<T>(
    url: string,
    options: UseFetchOptions = { immediate: true, suspense: false }
): UseFetchResult<T> | UseFetchSuspenseResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(!options.suspense);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (): Promise<T> => {
        if (!options.suspense) {
            setLoading(true);
            setError(null);
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            // Always set data for both modes
            setData(result);

            // Cache the result for Suspense mode
            if (options.suspense) {
                suspenseCache.set(url, { data: result });
            }

            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';

            if (options.suspense) {
                suspenseCache.set(url, { error: err as Error });
                throw err; // Let Error Boundary handle it
            } else {
                setError(errorMessage);
                setData(null);
                throw err;
            }
        } finally {
            if (!options.suspense) {
                setLoading(false);
            }
        }
    };

    const refetch = () => {
        if (options.suspense) {
            suspenseCache.delete(url); // Clear cache to force refetch
        }
        setData(null); // Clear current data
        return fetchData();
    };

    // Suspense mode logic
    if (options.suspense) {
        const cached = suspenseCache.get(url);

        // If we have cached data, return it
        if (cached?.data !== undefined) {
            return { data: cached.data as T, refetch };
        }

        // If there's a cached error, throw it
        if (cached?.error) {
            throw cached.error;
        }

        // If there's a cached promise, throw it to suspend
        if (cached?.promise) {
            throw cached.promise;
        }

        // If immediate fetch is disabled, return null data
        if (options.immediate === false) {
            return { data: null as T, refetch };
        }

        // Create and cache a new promise
        const promise = fetchData();
        suspenseCache.set(url, { promise });
        throw promise;
    }

    // Traditional mode logic
    useEffect(() => {
        if (options.immediate) {
            fetchData().catch(() => {
                // Error is already handled in fetchData
            });
        }
    }, [url, options.immediate]);

    return {
        data,
        loading,
        error,
        refetch
    };
}


