"use client"

import { Link, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { PencilIcon, Trash2Icon } from "lucide-react"
import type { Gallery } from "./types"


export const galleryColumns: ColumnDef<Gallery>[] = [
    {
        accessorKey: "title",
        header: "Title",
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
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            return (
                <div className="flex gap-4">
                    <Link
                        href={`/admin/gallery/${row.original.id}/edit`}
                        className="text-blue-600 hover:underline"
                    >
                        <PencilIcon size={15} />
                    </Link>

                    <Link
                        href={route('admin.gallery.destroy', row.original.id)}
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
