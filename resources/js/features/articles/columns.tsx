"use client"

import { Link, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { PencilIcon, Trash2Icon } from "lucide-react"
import { Payment } from "./types"

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "content",
        header: "Content",
    },
    {
        accessorKey: "thumbnail",
        header: "Thumbnail",
        cell: ({ row }) => {
            const thumbnail = row.original.thumbnail;
            const url = thumbnail ? `/storage/${thumbnail}` : "/no-image.png"
            return (
                <img src={url} alt="" className="w-20" />


            )
        }
    },
    {
        accessorKey: "author",
        header: "Author",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            return (
                <div className="flex gap-4">
                    <Link
                        href={`/admin/articles/${row.original.id}/edit`}
                        className="text-blue-600 hover:underline"
                    >
                        <PencilIcon size={15} />
                    </Link>
                    
                    <Link
                        href={route('admin.articles.destroy', row.original.id)}
                        method="delete"
                        as="button"
                        className="text-red-600 hover:underline"
                        onBefore={() => confirm("Apakah kamu yakin??")}
                    >
                        <Trash2Icon size={15} />
                    </Link>
                </div>
            )
        }

    },
]
