"use client"

import {
    ColumnDef,
    flexRender,
    getPaginationRowModel,
    ColumnFiltersState,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
// import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import React from "react"
import { PlusIcon, ChevronLeft, ChevronRight } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filterColumn?: string
    filterPlaceholder?: string
    createHref?: string
    createLabel?: string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterColumn,
    filterPlaceholder = "Filter...",
    createHref,
    createLabel
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        }
    })

    return (
        <div className="w-full">
            <style>{`
                .table-row {
                    transition: all 0.2s ease;
                    border-bottom: 1px solid #F5F5F5;
                }

                .table-row:hover {
                    background: #FAFAFA;
                }

                .pagination-btn {
                    transition: all 0.2s ease;
                }

                .pagination-btn:hover:not(:disabled) {
                    background: #F5F5F5;
                    border-color: #D0D0D0;
                }

                .pagination-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .filter-input {
                    transition: all 0.2s ease;
                }

                .filter-input:focus {
                    border-color: #000;
                    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
                }

                .create-btn {
                    transition: all 0.2s ease;
                    background: #000;
                    color: white;
                }

                .create-btn:hover {
                    background: #1a1a1a;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
            `}</style>

            {(filterColumn || createHref) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    {filterColumn ? (
                        <div className="flex-1 max-w-sm">
                            <Input
                                placeholder={filterPlaceholder}
                                value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                                }
                                className="filter-input h-10 border-gray-200 focus:outline-none"
                            />
                        </div>
                    ) : (
                        <div></div>
                    )}

                    {createHref && createLabel && (
                        <a href={createHref}>
                            <button className="create-btn px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2">
                                <PlusIcon className="w-4 h-4" strokeWidth={2.5} />
                                {createLabel}
                            </button>
                        </a>
                    )}
                </div>
            )}

            <div className="w-full overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-b border-gray-200 hover:bg-transparent"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-xs font-semibold text-gray-600 uppercase tracking-wider py-4"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
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
                                    className="table-row"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="py-4 text-sm text-gray-700"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-32 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <svg
                                            className="w-12 h-12 mb-3 text-gray-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        <p className="text-sm font-medium">No results found</p>
                                        <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                    {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length
                    )}{' '}
                    of {table.getFilteredRowModel().rows.length} results
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="pagination-btn px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                        Previous
                    </button>

                    <div className="flex items-center gap-1 px-3">
                        <span className="text-sm font-medium text-gray-900">
                            {table.getState().pagination.pageIndex + 1}
                        </span>
                        <span className="text-sm text-gray-500">of</span>
                        <span className="text-sm text-gray-500">
                            {table.getPageCount()}
                        </span>
                    </div>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="pagination-btn px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
    )
}
