import { AlbumTableColumns } from "@/components/albums/AlbumTableColumns";
import { AlbumTableSkeleton } from "@/components/albums/AlbumTableSkeleton";
import { useNavigate, useParams, useQuery } from "@/components/AppRouter";
import { DataTable } from "@/components/data-table/data-table";
import { FetchWithFallback, useFetch } from "@/lib/hooks";
import type { Album } from "@/lib/types";

export function AlbumsTablePage() {
        const params = useParams();
        const query = useQuery();  
        const navigate = useNavigate();
        // console.log(params);
        // console.log(query);
        // console.log(navigate);

    const data = useFetch<Album[]>('/api/albums?page=1&limit=1', { suspense: true });
    return (
        <div>
            <h4 className="text-xl font-semibold mb-4">
                Albums
            </h4>
            <FetchWithFallback fallback={<AlbumTableSkeleton />} >
                <DataTable columns={AlbumTableColumns} data={data.data} />
            </FetchWithFallback>
        </div>
    );
}