import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import ProductsForm from "@/features/products/ProductsForm";
import React from "react";
import { Button } from "@/Components/ui/button";
import { MoveLeftIcon } from "lucide-react";

export default function ProductsCreate() {
    const user = usePage().props.auth.user

    const { data, setData, processing, errors, post } = useForm({
        'name': "",
        'description': '',
        'content': "",
        'image': "",
        "price": 0,
        'is_active': true,
        'order': 0
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('admin.products.store'))
    }

    const fileName = data.image
    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-[150vh] mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex items-center justify-between">
                        Products - Create

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>
                </div>

                <ProductsForm
                    data={data}
                    errors={errors}
                    processing={processing}
                    onChange={setData}
                    onSubmit={handleSubmit}
                />

                <div className="relative mx-auto py-10 w-[150vh]">
                    <a href="/admin/products" className="absolute top-0 right-0">
                        <Button className="mt-2">
                            <MoveLeftIcon className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </a>
                </div>
            </Authenticated>
        </div>
    )
}
