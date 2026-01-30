import { ColumnDef } from "@tanstack/react-table"
import { Order } from "./types"

export const transactionsColumns: ColumnDef<Order>[] = [
    {
        header: "Product",
        accessorFn: (row) => row.product?.name ?? "-",
    },
    {
        header: "Total Price",
        accessorFn: (row) =>
            `Rp ${row.price.toLocaleString("id-ID")}`,
    },
    {
        header: "Payment Status",
        accessorFn: (row) =>
            row.payments?.[0]?.status ?? "No Payment",
    },
    {
        header: "Method",
        accessorFn: (row) =>
            row.payments?.[0]?.method ?? "-",
    },
    {
        header: "Date",
        accessorFn: (row) =>
            new Date(row.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
    }
]
