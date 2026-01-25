"use client"

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
} from "@/Components/ui/input-group"
import TextareaAutosize from "react-textarea-autosize"
import React, { ChangeEvent, useEffect, useState } from "react";
import { MoveLeftIcon, UploadIcon } from 'lucide-react'
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button";
import FormEvent from "@/features/events/EventForm";

export default function EventCreate() {
    const { data, setData, processing, errors, post } = useForm({
        'title': '',
        'description': '',
        'content': '',
        'image': null as File | null,
        'location': '',
        'start_date': '',
        'end_date': '',
        'is_active': true
    })

    const user = usePage().props.auth.user
    const fileName = data.image

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('admin.events.store'))
    }

    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-[150vh] mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex items-center justify-between">
                        Events

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>

                    <FormEvent
                        data={data}
                        errors={errors}
                        processing={processing}
                        onChange={setData}
                        onSubmit={handleSubmit}
                        fileName={fileName}
                    />

                    <div className="relative mx-auto py-10 w-[150vh]">
                        <a href="/admin/articles" className="absolute top-0 right-0">
                            <Button className="mt-2">
                                <MoveLeftIcon className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                        </a>
                    </div>

                </div>
            </Authenticated>
        </div>
    )
}
