"use client"

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
} from "@/Components/ui/input-group"
import TextareaAutosize from "react-textarea-autosize"
import { useState } from "react";
import { UploadIcon } from 'lucide-react'

export default function ArticlesCreate() {
    const user = usePage().props.auth.user
    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-full mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex items-center">
                        Articles

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>


                    <div className="grid w-full max-w-sm gap-2">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Content
                        </h3>
                        <InputGroup>
                            <TextareaAutosize
                                data-slot="input-group-control"
                                className="flex field-sizing-content min-h-40 w-full resize-none rounded-md bg-transparent px-3
                                py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                                placeholder="Autoresize textarea..."
                            />
                            <InputGroupAddon align="block-end">
                                <InputGroupButton className="ml-auto" size="sm" variant="default">
                                    Submit
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
            </Authenticated>
        </div>
    )
}
