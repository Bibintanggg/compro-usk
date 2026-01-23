import { columns, Payment } from "@/Components/payments/columns";
import { DataTable } from "@/Components/payments/data-table";
import { Field, FieldDescription, FieldLabel } from "@/Components/ui/field";
// import { Input } from "@/Components/ui/input";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Article() {
    const user = usePage().props.auth.user
    const [data, setData] = React.useState<Payment[]>([])
    const { articles } = usePage().props

    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-full mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex justify-between">
                        Articles

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>
                    <DataTable columns={columns} data={articles as Payment[]} />
                </div>
            </Authenticated>
        </div>
    )
}
