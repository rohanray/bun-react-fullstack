import { AlbumTableColumns } from "@/components/albums/AlbumTableColumns";
import { AlbumTableSkeleton } from "@/components/albums/AlbumTableSkeleton";
import { useNavigate, useParams, useQuery } from "@/components/AppRouter";
import { DataTable } from "@/components/data-table/data-table";
import { FetchWithFallback, useFetch } from "@/lib/hooks";
import type { Album } from "@/lib/types";

// Separate component that uses suspense
function AlbumsDataTable() {
    const query = useQuery();
    const apiUrl = `/api/albums?page=${query.page || '1'}&limit=${query.limit || '10'}`;
    const data = useFetch<Album[]>(apiUrl, { suspense: true });

    return <DataTable columns={AlbumTableColumns} data={data.data} />;
}

export function AlbumsTablePage() {
    const params = useParams();
    const query = useQuery();
    const navigate = useNavigate();
    const handleNextPage = () => {
        const currentPage = parseInt(query.page || '1');
        navigate(`/albums/${params.id}?page=${currentPage + 1}&limit=${query.limit || '10'}`);
    };

    console.log('AlbumsTablePage params:', params);
    console.log('AlbumsTablePage query:', query);

    return (
        <div>
            <h4 className="text-xl font-semibold mb-4">
                Albums
            </h4>
            <FetchWithFallback fallback={<AlbumTableSkeleton />} >
                <AlbumsDataTable />
            </FetchWithFallback>
        </div>
    );
}