import { Button } from "@/Components/ui/button";
import GalleryForm from "@/features/gallery/GalleryForm";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import { MoveLeftIcon } from "lucide-react";
import React from "react";

export default function GalleryCreate() {
    const user = usePage().props.auth.user
    const [imagePreview, setImagePreview] = React.useState<string|null>(null)

    const {data, setData, post, processing, errors } = useForm({
        'title': "",
        'image': null as File | null
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('admin.gallery.store'))
    }

    const handleImageChange = (file: File | null) => {
        setData('image', file)
        if(file) {
            setImagePreview(URL.createObjectURL(file))
        } else {
            setImagePreview(null)
        }
    }
    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-[150vh] mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex items-center justify-between">
                        Gallery - Create

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>
                </div>

                <GalleryForm
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
