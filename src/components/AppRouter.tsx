import { useState, useEffect, type ReactNode } from 'react';

interface Route {
  path: string;
  component: ReactNode | ((params: RouteParams) => ReactNode);
  title: string;
}

interface RouteParams {
  params: Record<string, string>;
  query: Record<string, string>;
  searchParams: URLSearchParams;
}

interface RouterProps {
  routes: Route[];
  defaultRoute?: string;
}

// Helper function to match dynamic routes
function matchRoute(routePath: string, currentPath: string): { isMatch: boolean; params: Record<string, string> } {
  const routeParts = routePath.split('/');
  const currentParts = currentPath.split('/');

  if (routeParts.length !== currentParts.length) {
    return { isMatch: false, params: {} };
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const currentPart = currentParts[i];

    if (routePart.startsWith(':')) {
      // Dynamic parameter (e.g., :id)
      const paramName = routePart.slice(1);
      params[paramName] = currentPart;
    } else if (routePart !== currentPart) {
      // Static part doesn't match
      return { isMatch: false, params: {} };
    }
  }

  return { isMatch: true, params };
}

// Helper function to parse query parameters
function parseQuery(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const query: Record<string, string> = {};

  params.forEach((value, key) => {
    query[key] = value;
  });

  return query;
}

export function AppRouter({ routes, defaultRoute = '/' }: RouterProps) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(window.location.search);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(window.location.search);

      // Dispatch custom event to notify hooks
      window.dispatchEvent(new CustomEvent('routechange'));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const url = new URL(path, window.location.origin);
    window.history.pushState({}, '', url.pathname + url.search);
    setCurrentPath(url.pathname);
    setSearchParams(url.search);

    // Dispatch custom event to notify hooks
    window.dispatchEvent(new CustomEvent('routechange'));
  };

  // Make navigate function available globally for navigation
  (window as any).navigate = navigate;

  // Find matching route with support for dynamic parameters
  let matchedRoute: Route | undefined;
  let routeParams: Record<string, string> = {};

  for (const route of routes) {
    const { isMatch, params } = matchRoute(route.path, currentPath);
    if (isMatch) {
      matchedRoute = route;
      routeParams = params;
      break;
    }
  }

  // If no route matches, try default route
  if (!matchedRoute) {
    matchedRoute = routes.find(route => route.path === defaultRoute);
  }

  if (!matchedRoute) {
    return <div>Page not found</div>;
  }

  // Prepare route parameters object
  const query = parseQuery(searchParams);
  const urlSearchParams = new URLSearchParams(searchParams);

  const routeParamsObj: RouteParams = {
    params: routeParams,
    query,
    searchParams: urlSearchParams
  };

  // Store route params globally for hooks
  (window as any).currentRouteParams = routeParamsObj;

  // Render component (support both static components and function components)
  if (typeof matchedRoute.component === 'function') {
    return <>{matchedRoute.component(routeParamsObj)}</>;
  } else {
    return <>{matchedRoute.component}</>;
  }
}

export function Link({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    (window as any).navigate?.(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} >
      {children}
    </a>
  );
}

// Custom hooks for accessing route data
export function useParams(): Record<string, string> {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleRouteChange = () => {
      forceUpdate({});
    };

    window.addEventListener('routechange', handleRouteChange);
    return () => window.removeEventListener('routechange', handleRouteChange);
  }, []);

  return (window as any).currentRouteParams?.params || {};
}

export function useQuery(): Record<string, string> {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleRouteChange = () => {
      forceUpdate({});
    };

    window.addEventListener('routechange', handleRouteChange);
    return () => window.removeEventListener('routechange', handleRouteChange);
  }, []);

  return (window as any).currentRouteParams?.query || {};
}

export function useSearchParams(): URLSearchParams {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleRouteChange = () => {
      forceUpdate({});
    };

    window.addEventListener('routechange', handleRouteChange);
    return () => window.removeEventListener('routechange', handleRouteChange);
  }, []);

  return (window as any).currentRouteParams?.searchParams || new URLSearchParams();
}

export function useNavigate() {
  return (path: string) => {
    (window as any).navigate?.(path);
  };
}
