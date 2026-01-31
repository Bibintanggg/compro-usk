import FormEvent from "@/features/events/EventForm";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import type { Event } from "@/features/events/types";
import React from "react";
import { Button } from "@/Components/ui/button";
import { MoveLeftIcon } from "lucide-react";

type Props = PageProps & {
    events: Event
}

export default function EventsEdit() {
    const { events } = usePage<Props>().props
    const user = usePage().props.auth.user

    const { data, setData, put, processing, errors } = useForm({
        'name': events.name,
        'description': events.description,
        'content': events.content,
        'image': null as File | null,
        'location': events.location,
        'start_date': events.start_date,
        'end_date': events.end_date,
        'is_active': events.is_active
    })

    const [imagePreview, setImagePreview] = React.useState<string | null>(
        events.image ? `/storage/${events.image}` : null
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('admin.events.update', events.id))
    }

    const handleImageChange = (file: File | null) => {
        setData('image', file)

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

                <FormEvent
                    data={data}
                    errors={errors}
                    processing={processing}
                    onChange={setData}
                    onSubmit={handleSubmit}
                    onImageChange={handleImageChange}
                    imagePreview={imagePreview}
                />

                <div className="relative mx-auto py-10 w-[150vh]">
                    <a href="/admin/events" className="absolute top-0 right-0">
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
