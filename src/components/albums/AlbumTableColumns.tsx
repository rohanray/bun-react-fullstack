import type { ColumnDef } from "@tanstack/react-table";
import type { Album } from '@/lib/types/album';
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TableColumnHeader } from "@/components/data-table/TableColumnHeader"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const AlbumTableColumns: ColumnDef<Album>[] = [
    {
        accessorKey: 'id',
        header: () => <TableColumnHeader title="ID" />,
        cell: ({ row }) => (
            <span className="text-sm">{row.getValue('id')}</span>
        ),
    },
    {
        accessorKey: 'title',
        header: () => <TableColumnHeader title="Title" />,
        cell: ({ row }) => (
            <span className="text-sm">{row.getValue('title')}</span>
        ),
    },
    {
        accessorKey: 'userId',
        header: () => <TableColumnHeader title="User ID" />,
        cell: ({ row }) => (
            <span className="text-sm">{row.getValue('userId')}</span>
        ),
    },
    {
        id: 'actions',
        header: () => <TableColumnHeader title="Actions" />,
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Photos</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];