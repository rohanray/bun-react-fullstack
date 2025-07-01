import { AppRouter, Link, useParams, useQuery, useNavigate } from "@/components/AppRouter";
import "@/index.css";

// This file demonstrates how to use the AppRouter with dynamic parameters and query strings.

// Example component that uses dynamic parameters within hooks
function VideoComments() {
    const params = useParams(); // { videoId: "2" }
    const query = useQuery();   // { page: "1", limit: "10" }
    const navigate = useNavigate();

    const handleNextPage = () => {
        const currentPage = parseInt(query.page || '1');
        navigate(`/videos/${params.videoId}/comments?page=${currentPage + 1}&limit=${query.limit || '10'}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Example component using hook based parsing of parameters & query strings within target component
            </h1>
            <h3 className="text-lg font-semibold mb-2">
                [Recommended approach for most cases]
            </h3>
            <br />
            <h1>Comments for Video: <strong>{params.videoId}</strong></h1>
            <p>Page: <strong>{query.page || '1'}</strong>, Limit: <strong>{query.limit || '10'}</strong></p>
            <br />
            <button onClick={handleNextPage} className="bg-blue-500 text-white px-4 py-2 rounded">
                Next Page
            </button>
            <br />
            <br />
            <strong>Example url:</strong> <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">/videos/123/comments?page=1&limit=10</code>
            <br />
            <blockquote className="mt-6 border-l-2 pl-6">
                <p className="mt-4">
                    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{`<VideoComments />`}</code>
                    component uses <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">useParams</code> and
                    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">useQuery</code> hooks to access
                    the video ID and query parameters directly within target component.
                    <br />
                    It also includes a button to navigate to the next page of comments.
                    <br />
                    <br />
                    <strong>Note:</strong> The video ID is required, while the page and limit query parameters are optional.
                    If not provided, they default to '1' and '10' respectively.
                    <br />
                </p>
            </blockquote>
        </div>
    );
}

// Example component using route parameters directly
function VideoDetails({ params, query }: { params: Record<string, string>; query: Record<string, string> }) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Example component using path parameters and query string as props
            </h1>
            <h1>Video Details for ID: <strong>{params.videoId}</strong></h1>
            <p>Foo: <strong>{query.foo || 'overview'}</strong></p>
            <br />
            <strong>URL:</strong> <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">/videos/123?foo=bar</code>
            <br />
            <blockquote className="mt-6 border-l-2 pl-6">
                <p className="mt-4">
                    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{`<VideoDetails params={params} query={query} />`}</code>
                    component receives the video ID <code className="bg-muted px-[0.3rem] py-[0.2rem] font-mono">(123)</code> as a path parameter
                    and <code className="bg-muted px-[0.3rem] py-[0.2rem] font-mono">(foo)</code> as a query string.
                    <br />
                    <br />
                    Both are parsed as props and can be used directly in the component.
                    <br />
                    <br />
                    <strong>Note:</strong> The video ID is required, while the foo query parameter
                    is optional and defaults to 'overview' if not provided.
                    <br />
                </p>
            </blockquote>
        </div>
    );
}

// Example routes configuration
const routes = [
    {
        path: '/',
        title: 'Home',
        component: <div>Home Page</div>
    },
    {
        path: '/videos/:videoId',
        title: 'Video Details',
        component: ({ params, query }: any) => <VideoDetails params={params} query={query} />
    },
    {
        path: '/videos/:videoId/comments',
        title: 'Video Comments',
        component: <VideoComments />
    },
    {
        path: '/channels/:channelId',
        title: 'Channel Details',
        component: ({ params }: any) => (
            <div className="p-4">
                <h1>Channel: {params.channelId}</h1>
            </div>
        )
    }
];

// Example usage with navigation links
export function RouterExampleApp() {
    return (
        <div>
            <nav className="p-4 bg-gray-100">
                <Link to="/" className="mr-4 text-blue-600 hover:underline">Home</Link>
                <Link to="/videos/123?foo=bar" className="mr-4 text-blue-600 hover:underline">Video 123</Link>
                <Link to="/videos/123/comments?page=1&limit=20" className="mr-4 text-blue-600 hover:underline">Comments</Link>
                <Link to="/channels/channel456" className="text-blue-600 hover:underline">Channel 456</Link>
            </nav>

            <main>
                <AppRouter routes={routes} defaultRoute="/" />
            </main>
        </div>
    );
}

/*
Example URL patterns that now work:

1. Static routes:
   - /
   - /videos

2. Dynamic parameters:
   - /videos/123 → params: { videoId: "123" }
   - /videos/456/comments → params: { videoId: "456" }
   - /channels/channel789 → params: { channelId: "channel789" }

3. Query parameters:
   - /videos?page=2&limit=10 → query: { page: "2", limit: "10" }
   - /videos/123?tab=details → params: { videoId: "123" }, query: { tab: "details" }
   - /videos/123/comments?page=1&limit=20 → params: { videoId: "123" }, query: { page: "1", limit: "20" }

4. Combined:
   - /videos/123/comments?page=2&limit=50&sort=newest
     → params: { videoId: "123" }
     → query: { page: "2", limit: "50", sort: "newest" }
*/
