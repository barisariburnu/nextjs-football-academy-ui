"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/datatable/data-table-view-options"
import { DataTableFacetedFilter } from "@/components/datatable/data-table-faceted-filter"

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
            <DataTableViewOptions table={table} />
        </div>
    )
} 