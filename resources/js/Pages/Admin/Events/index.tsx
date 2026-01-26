import { DataTable } from "@/Components/payments/data-table";
import { eventColumns } from "@/features/events/columns";
import { Event } from "@/features/events/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Article } from "@/types/article";
import { usePage } from "@inertiajs/react";

export default function Events() {
    const user = usePage().props.auth.user
    const { events } = usePage().props

    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-full mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex justify-between">
                        Events

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>
                </div>

                <DataTable
                    columns={eventColumns}
                    data={events as Event[]}
                    filterColumn="name"
                    createHref="/admin/events/create"
                    createLabel="Create new events" />
            </Authenticated>
        </div>
    )
}
