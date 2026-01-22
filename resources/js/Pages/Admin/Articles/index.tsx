import { columns, Payment } from "@/Components/payments/columns";
import { DataTable } from "@/Components/payments/data-table";
import { Field, FieldDescription, FieldLabel } from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect } from "react";

async function getData(): Promise<Payment[]> {
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
    ]
}
export default function Article() {
    const [data, setData] = React.useState<Payment[]>([])

    useEffect(() => {
        getData().then(setData)
    }, [])
    return (
        <div className="p-10">
            <Authenticated>
                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={data} />
                </div>
            </Authenticated>
        </div>
    )
}