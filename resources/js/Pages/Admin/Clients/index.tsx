import { DataTable } from "@/Components/payments/data-table";
import { clientColumn } from "@/features/clients/column";
import { Client } from "@/features/clients/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export default function Clients() {
    const user = usePage().props.auth.user
    const { clients } = usePage().props

    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-full mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex justify-between">
                        Clients

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>

                    <DataTable
                        columns={clientColumn}
                        data={clients as Client[]}
                        filterColumn="name"
                        createHref="/admin/clients/create"
                        filterPlaceholder="Filter Clients..."
                        createLabel="Create new clients" />
                </div>
            </Authenticated>
        </div>
    )
}
