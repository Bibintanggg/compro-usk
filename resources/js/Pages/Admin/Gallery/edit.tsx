import { Button } from "@/Components/ui/button";
import ClientForm from "@/features/clients/ClientForm";
import GalleryForm from "@/features/gallery/GalleryForm";
import { Gallery } from "@/features/gallery/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { MoveLeftIcon } from "lucide-react";
import React from "react";

type Props = PageProps & {
    gallery: Gallery
}

export default function GalleryEdit() {
    const user = usePage().props.auth.user
    const { gallery } = usePage<Props>().props

    const { data, setData, put, errors, processing } = useForm({
        'title': gallery.title,
        'image': null as File | null,
    })

    const [imagePreview, setImagePreview] = React.useState<string|null>(
        gallery.image ?  `/storage/${gallery.image}` : null
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('admin.gallery.update', gallery.id))
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
                        Gallery - Edit

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
                    <a href="/admin/clients" className="absolute top-0 right-0">
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
