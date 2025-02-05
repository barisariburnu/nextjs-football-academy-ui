"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { FileDown } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/datatable/data-table-view-options"
import { DataTableFacetedFilter } from "@/components/datatable/data-table-faceted-filter"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    filterableColumns?: {
        id: string
        title: string
        options: {
            label: string
            value: string
            icon?: React.ComponentType<{ className?: string }>
        }[]
    }[]
    searchableColumns?: {
        id: string
        title: string
    }[]
    deletableColumns?: {
        id: string
        title: string
    }[]
}

export function DataTableToolbar<TData>({
    table,
    filterableColumns = [],
    searchableColumns = [],
    deletableColumns = [],
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    const handleExportCSV = () => {
        const headers = table.getAllColumns()
            .filter(column => column.getCanHide())
            .map(column => column.id)
            .join(",")

        const rows = table.getFilteredRowModel().rows
            .map(row => {
                return headers.split(",")
                    .map(header => {
                        const value = row.getValue(header)
                        return typeof value === "string" ? `"${value}"` : value
                    })
                    .join(",")
            })
            .join("\n")

        const csv = `${headers}\n${rows}`
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", "export.csv")
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleExportPDF = async () => {
        await generatePDF(table)
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {searchableColumns.length > 0 &&
                    searchableColumns.map(
                        (column) =>
                            table.getColumn(column.id) && (
                                <Input
                                    key={column.id}
                                    placeholder={`${column.title} ara...`}
                                    value={
                                        (table
                                            .getColumn(column.id)
                                            ?.getFilterValue() as string) ?? ""
                                    }
                                    onChange={(event) =>
                                        table
                                            .getColumn(column.id)
                                            ?.setFilterValue(event.target.value)
                                    }
                                    className="h-8 w-[150px] lg:w-[250px] cursor-pointer"
                                />
                            )
                    )}
                {filterableColumns.length > 0 &&
                    filterableColumns.map(
                        (column) =>
                            table.getColumn(column.id) && (
                                <DataTableFacetedFilter
                                    key={column.id}
                                    column={table.getColumn(column.id)}
                                    title={column.title}
                                    options={column.options}
                                />
                            )
                    )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Filtreleri Temizle
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="flex items-center space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8">
                            <FileDown className="mr-2 h-4 w-4" />
                            Dışa Aktar
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer">
                            CSV İndir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer">
                            PDF İndir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DataTableViewOptions table={table} />
            </div>
        </div>
    )
} 