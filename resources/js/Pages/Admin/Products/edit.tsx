import { Button } from "@/Components/ui/button";
import ProductsForm from "@/features/products/ProductsForm";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import { MoveLeftIcon } from "lucide-react";
import React, { useState } from "react";
import type { Products } from "@/features/products/types";
import { PageProps } from "@/types";

type Props = PageProps & {
    products: Products
}

export default function ProductsEdit() {
    const { products } = usePage<Props>().props
    const { data, setData, put, errors, processing } = useForm({
        'name': products.name,
        'description': products.description,
        'content': products.content,
        'image': null as File | null,
        "price": products.price,
        'is_active': products.is_active,
        'order': products.order
    })

    // const [preview, setPreview] = useState("")
    const [imagePreview, setImagePreview] = React.useState<string | null>(
        products.image ? `/storage/${products.image}` : null
    )

    const handleImageChange = (file: File | null) => {
        setData('image', file)

        if(file) {
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const user = usePage().props.auth.user

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('admin.products.update', products.id))
    }
    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-[150vh] mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex items-center justify-between">
                        Products - Edit

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
                    onImageChange={handleImageChange}
                    imagePreview={imagePreview}
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
