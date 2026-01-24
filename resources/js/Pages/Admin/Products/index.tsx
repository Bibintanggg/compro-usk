import { DataTable } from "@/Components/payments/data-table";
import { articleColumns } from "@/features/products/column";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export default function Products() {
    const products = {
        id: 1,
        name: "Premium Hoodie",
        slug: "premium-hoodie",
        description: "Hoodie nyaman dengan bahan premium",
        content: "Hoodie ini terbuat dari cotton fleece, cocok untuk daily wear.",
        image: "/images/products/hoodie.jpg",
        price: 299000,
        is_active: true,
        order: 1,
    }

    const user = usePage().props.auth.user
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
                    <DataTable
                    columns={articleColumns}
                    data={products}
                    filterColumn="name"
                    filterPlaceholder="Filter Products"
                    createHref="/admin/products/create"
                    createLabel="Create new products"/>
                </div>
            </Authenticated>
        </div>
    )
}
