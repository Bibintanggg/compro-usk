import { ColumnDef } from "@tanstack/react-table"
import { Order } from "./types"
import { Badge } from "@/Components/ui/badge"

export const transactionsColumns: ColumnDef<Order>[] = [
    {
        header: "Customer Name",
        accessorFn: (row) => row.payments?.[0]?.customer_name ?? "-",
    },
    {
        header: "Email",
        accessorFn: (row) => row.payments?.[0]?.customer_email ?? "-",
    },
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
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.payments?.[0]?.status ?? "pending";

            const variant =
                status === "success" ? "default" :
                status === "pending" ? "secondary" :
                "destructive";

            return (
                <Badge variant={variant} className="capitalize">
                    {status}
                </Badge>
            );
        },
    },
    {
        header: "Payment Method",
        accessorFn: (row) => row.payments?.[0]?.method ?? "-",
    },
    {
        header: "Order Date",
        accessorFn: (row) =>
            new Date(row.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
    },
]
