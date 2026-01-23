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
import { FileInput, Label } from "flowbite-react";
import { Field, FieldDescription, FieldLabel } from "@/Components/ui/field"
import { Input } from "@/Components/ui/input"

export default function ArticlesCreate() {
    const user = usePage().props.auth.user
    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-[150vh] mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex items-center justify-between">
                        Articles

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>

                    <div className="p-3 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                            <div className="flex flex-col items-start w-full gap-4">
                                <h3 className="text-2xl font-semibold tracking-tight">
                                    Thumbnail Upload
                                </h3>
                                <Label
                                    htmlFor="dropzone-file"
                                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                                >
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <svg className="mb-4 h-8 w-8 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <FileInput id="dropzone-file" className="hidden" />
                                </Label>
                            </div>

                            <div className="flex flex-col gap-6 w-full">

                                <Field>
                                    <FieldLabel htmlFor="input-field-title" className="text-2xl font-semibold">Title</FieldLabel>
                                    <Input
                                        id="input-field-title"
                                        type="text"
                                        placeholder="Enter your article title"
                                    />
                                    <FieldDescription>
                                        Fill your title for the article.
                                    </FieldDescription>
                                </Field>

                                <div className="grid w-full max-w-full gap-2">
                                    <h3 className="text-2xl font-semibold tracking-tight">
                                        Content
                                    </h3>
                                    <InputGroup>
                                        <TextareaAutosize
                                            data-slot="input-group-control"
                                            className="flex field-sizing-content min-h-24 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base outline-none"
                                            placeholder="Fill the content..."
                                        />

                                    </InputGroup>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </Authenticated>
        </div>
    )
}
