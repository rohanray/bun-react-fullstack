import { Skeleton } from "@/components/ui/skeleton"
import {

    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function AlbumTableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">
                        <Skeleton className="h-4 w-8" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-16" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-20" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-16" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-12" />
                    </TableHead>
                    <TableHead className="w-[100px]">
                        <Skeleton className="h-4 w-16" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton className="h-4 w-6" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-32" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-8" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-8 w-16" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}