"use client"

import { ColumnDef } from "@tanstack/react-table"
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
  },
  {
    accessorKey: "author",
    header: "Author",
  },
]