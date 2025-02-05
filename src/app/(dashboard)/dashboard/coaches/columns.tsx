"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header"
import { DataTableRowActions } from "@/components/datatable/data-table-row-actions"

export type Coach = {
    id: string
    name: string
    email: string
    phone: string
    age: number
    position: string
    status: "active" | "inactive"
}

export const columns: ColumnDef<Coach>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="İsim" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="E-posta" />
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Telefon" />
        ),
    },
    {
        accessorKey: "age",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Yaş" />
        ),
    },
    {
        accessorKey: "position",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Pozisyon" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Durum" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string

            return (
                <Badge
                    variant={status === "active" ? "default" : "secondary"}
                >
                    {status === "active" ? "Aktif" : "Pasif"}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
] 