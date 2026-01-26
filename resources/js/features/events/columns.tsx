"use client"

import { Link, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { PencilIcon, Trash2Icon } from "lucide-react"
import { Event } from "./types"


export const eventColumns: ColumnDef<Event>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "content",
        header: "Content",
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.original.image;
            const url = image ? `/storage/${image}` : "/no-image.png"
            return (
                <img src={url} alt="" className="w-20" />
            )
        }
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "start_date",
        header: "Start Date",
        cell: ({ row }) => {
            const start_date = row.original.start_date
            return (
                start_date ? start_date.slice(0, 10) : "-"
            )
        }
    },
    {
        accessorKey: "end_date",
        header: "End Date",
        cell: ({ row }) => {
            const end_date = row.original.end_date
            return (
                end_date ? end_date.slice(0, 10) : "-"
            )
        }

    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
            const is_active = row.original.is_active

            return (
                <>
                    <span>
                        {is_active ? "Publish" : "Draft"}
                    </span>
                </>
            )
        }
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            return (
                <div className="flex gap-4">
                    <Link
                        href={`/admin/events/${row.original.id}/edit`}
                        className="text-blue-600 hover:underline"
                    >
                        <PencilIcon size={15} />
                    </Link>

                    <Link
                        href={route('admin.articles.destroy', row.original.id)}
                        method="delete"
                        as="button"
                        className="text-red-600 hover:underline"
                    >
                        <Trash2Icon size={15} />
                    </Link>
                </div>
            )
        }

    },
]
