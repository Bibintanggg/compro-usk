"use client"

import { ColumnDef } from "@tanstack/react-table"
import { PencilIcon, Trash2Icon } from "lucide-react"
export type Payment = {
    id: string
    title: string
    thumbnail: string
    content: string
    author: string
}

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
                    <a href={`/admin/articles/${row.original.id}/edit`} className="text-blue-600 hover:underline"><PencilIcon size={15}/></a>
                    <a href={`/admin/articles/${row.original.id}/delete`} className="text-red-600 hover:underline"><Trash2Icon size={15}/></a>
                </div>
            )
        }
    },
]
