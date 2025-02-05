"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Download, SlidersHorizontal } from "lucide-react"
import { DataTableFacetedFilter } from "@/components/datatable/data-table-faceted-filter"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filterableColumns?: {
        id: string
        title: string
        options: {
            label: string
            value: string
            icon?: React.ComponentType<{ className?: string }>
        }[]
    }[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterableColumns = [],
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        enableSorting: true,
        enableRowSelection: true,
    })

    // CSV verilerini oluştur ve indir
    const downloadAsCsv = () => {
        const visibleColumns = table.getAllColumns()
            .filter((column) =>
                column.getIsVisible() &&
                column.id !== "select" &&
                column.id !== "actions"
            )

        const headers = visibleColumns
            .map((column) => {
                const header = column.columnDef.header as string
                return typeof header === "string" ? header : column.id
            })

        const csvData = table.getFilteredRowModel().rows.map((row) => {
            return visibleColumns.map((column) => {
                const cell = row.getAllCells().find(cell => cell.column.id === column.id)
                const value = cell?.getValue()

                if (Array.isArray(value)) {
                    return `"${value.join(", ")}"`
                }
                if (typeof value === "object" && value !== null) {
                    return `"${JSON.stringify(value)}"`
                }
                return typeof value === "string" ? `"${value}"` : value
            })
        })

        const csvContent = [
            headers.join(","),
            ...csvData.map((row) => row.join(",")),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const link = document.createElement("a")
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute("href", url)
            link.setAttribute("download", "veliler.csv")
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="İsme göre filtrele..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    {filterableColumns.length > 0 &&
                        filterableColumns.map((column) => (
                            <DataTableFacetedFilter
                                key={column.id}
                                column={table.getColumn(column.id)}
                                title={column.title}
                                options={column.options}
                            />
                        ))}
                    {table.getSelectedRowModel().rows.length > 0 && (
                        <div className="flex-1 text-sm text-muted-foreground">
                            {table.getSelectedRowModel().rows.length} kayıt seçildi.
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadAsCsv}
                        className="h-8"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        CSV İndir
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                Görünüm
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[150px]">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        column.id !== "select" &&
                                        column.id !== "actions" &&
                                        column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : (
                                                <div className="flex items-center gap-2">
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: " 🔼",
                                                        desc: " 🔽",
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Sonuç bulunamadı.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Toplam {table.getFilteredRowModel().rows.length} kayıttan{" "}
                    {table.getRowModel().rows.length} kayıt gösteriliyor.
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Önceki
                    </Button>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Sayfa {table.getState().pagination.pageIndex + 1} / {" "}
                        {table.getPageCount()}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Sonraki
                    </Button>
                </div>
            </div>
        </div>
    )
} 