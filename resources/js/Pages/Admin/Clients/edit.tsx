import { Button } from "@/Components/ui/button";
import ClientForm from "@/features/clients/ClientForm";
import { Client } from "@/features/clients/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { MoveLeftIcon } from "lucide-react";
import React from "react";

type Props = PageProps & {
    clients: Client
}

export default function ClientEdit() {
    const user = usePage().props.auth.user
    const { clients } = usePage<Props>().props
    const { data, setData, put, errors, processing } = useForm({
        'name': clients.name,
        'description': clients.description,
        'logo': null as File | null,
        'website': clients.website
    })

    const [imagePreview, setImagePreview] = React.useState<string|null>(
        clients.logo ?  `/storage/${clients.logo}` : null
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('admin.clients.update', clients.id))
    }

    const handleImageChange = (file: File | null) => {
        setData('logo', file)

        if(file) {
            setImagePreview(URL.createObjectURL(file))
        }
    }
    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-[150vh] mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex items-center justify-between">
                        Events - Edit

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>
                </div>

                <ClientForm
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
