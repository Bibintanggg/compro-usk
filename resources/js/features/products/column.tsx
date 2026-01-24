"use client"

import { Link, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { PencilIcon, Trash2Icon } from "lucide-react"
import { Products } from "./types"


export const articleColumns: ColumnDef<Products>[] = [
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
        // cell: ({ row }) => {
        //     const thumbnail = row.original.image;
        //     const url = thumbnail ? `/storage/${images}` : "/no-image.png"
        //     return (
        //         <img src={url} alt="" className="w-20" />


        //     )
        // }
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "is_active",
        header: "Status",
    },
    {
        accessorKey: "order",
        header: "Order",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            return (
                <div className="flex gap-4">
                    <Link
                        href={`/admin/products/${row.original.id}/edit`}
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
