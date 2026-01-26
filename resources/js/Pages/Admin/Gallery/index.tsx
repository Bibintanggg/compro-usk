import { DataTable } from "@/Components/payments/data-table";
import { galleryColumns } from "@/features/gallery/column";
import type { Gallery } from "@/features/gallery/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export default function Gallery() {
    const user = usePage().props.auth.user
    const { gallery } = usePage().props

    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-full mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex justify-between">
                        Gallery

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>
                </div>

                <DataTable
                    columns={galleryColumns}
                    data={gallery as Gallery[]}
                    filterColumn="name"
                    createHref="/admin/gallery/create"
                    filterPlaceholder="Filter Clients..."
                    createLabel="Create new gallery" />
            </Authenticated>
        </div>
    )
}
