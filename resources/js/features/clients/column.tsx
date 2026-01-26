"use client"

import { Link, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { PencilIcon, Trash2Icon } from "lucide-react"
import type { Client } from "./types"


export const clientColumn: ColumnDef<Client>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "logo",
        header: "Logo",
        cell: ({ row }) => {
            const logo = row.original.logo;
            const url = logo ? `/storage/${logo}` : "/no-image.png"
            return (
                <img src={url} alt="" className="w-20" />
            )
        }
    },
    {
        accessorKey: "website",
        header: "Website",
        cell: ({ row }) => {
            const website = row.original.website
            const url = website?.startsWith('http') ? website : `https:///${website}`

            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate max-w-[200px] block"
                >
                    {website}
                </a>
            )
        }
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            // console.log(row.original)
            return (
                <div className="flex gap-4">
                    <Link
                        href={`/admin/clients/${row.original.id}/edit`}
                        className="text-blue-600 hover:underline"
                    >
                        <PencilIcon size={15} />
                    </Link>


                    <Link
                        href={`/admin/clients/${row.original.id}`}
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
