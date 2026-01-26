'use client'

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
} from "@/Components/ui/input-group"
import TextareaAutosize from "react-textarea-autosize"
import React, { ChangeEvent, useEffect, useState } from "react";
import { BadgePercent, Captions, ChartArea, Folder, FolderUp, Hash, MoveLeftIcon, PaintBucket, PencilLine, UploadIcon } from 'lucide-react'
import { FileInput, Label } from "flowbite-react";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/Components/ui/field"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Switch } from "@/Components/ui/switch"

type ProductsFormProps = {
    data: {
        name: string
        description: string
        content: string
        image: File | null
        price: number
        is_active: boolean
        order: number
    }

    fileName?: string
    errors: Record<string, string>
    processing: boolean
    imagePreview?: string | null

    onChange: (key: string, value: any) => void
    onSubmit: (e: React.FormEvent) => void
    onImageChange: (file: File | null) => void

}

export default function ProductsForm({
    data, fileName, errors, processing, onChange, onSubmit, onImageChange, imagePreview
}: ProductsFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <div className="p-3 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    <div className="flex flex-col items-start w-full gap-4">
                        <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                            <FolderUp />
                            Image Product Upload
                        </h3>
                        <div className="flex flex-col items-center w-full gap-4">

                            <Label
                                htmlFor="dropzone-file"
                                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-64 w-full object-cover rounded-lg"
                                    />
                                ) : (

                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <svg className="mb-4 h-8 w-8 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                )}
                                <FileInput
                                    id="dropzone-file"
                                    className="hidden"
                                    onChange={(e) =>
                                        onImageChange(e.target.files?.[0] ?? null)
                                    }

                                />
                            </Label>

                            {fileName && (
                                <div className="text-xl flex items-center justify-center text-center">
                                    <h3 className="scroll-m-20 text-sm font-semibold tracking-tight">
                                        Selected File : {fileName}
                                    </h3>
                                </div>
                            )}

                            {errors.image &&
                                <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                            }
                        </div>


                        <div className="flex justify-between w-full">
                            <Button className="mt-2" type="submit" disabled={processing}>
                                <UploadIcon className="mr-2 h-4 w-4" />
                                Submit
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 w-full">

                        <Field>
                            <FieldLabel htmlFor="input-field-name" className="text-2xl font-semibold flex items-center">
                                <Captions />
                                Name
                            </FieldLabel>
                            <Input
                                value={data.name}
                                onChange={(e) => onChange('name', e.target.value)}
                                type="text"
                                placeholder="Enter your products name"
                            />
                            {errors.name &&
                                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                            }
                            <FieldDescription>
                                Fill your name for the products.
                            </FieldDescription>
                        </Field>

                        <div className="flex justify-between items-center gap-10">
                            <Field>
                                <FieldLabel htmlFor="input-field-price" className="text-2xl font-semibold flex items-center">
                                    <BadgePercent />
                                    Price
                                </FieldLabel>
                                <Input
                                    value={data.price}
                                    onChange={(e) => onChange('price', e.target.value)}
                                    type="text"
                                    placeholder="Enter your product price.."
                                />
                                {errors.price &&
                                    <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                                }
                                <FieldDescription>
                                    Fill your price for the products.
                                </FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="input-field-price" className="text-2xl font-semibold flex items-center">
                                    <Hash />
                                    Order
                                </FieldLabel>
                                <Input
                                    value={data.order}
                                    onChange={(e) => onChange('order', e.target.value)}
                                    type="text"
                                    placeholder="Enter your product order.."
                                />
                                {errors.order &&
                                    <p className="mt-2 text-sm text-red-600">{errors.order}</p>
                                }
                                <FieldDescription>
                                    Fill your order for the products.
                                </FieldDescription>
                            </Field>
                        </div>


                        <Field orientation="horizontal" className="max-w-xl mt-2">
                            <FieldContent>
                                <FieldLabel htmlFor="switch-focus-mode" className="text-2xl font-semibold flex items-center">
                                    <ChartArea />
                                    Products Status
                                </FieldLabel>
                                <FieldDescription>
                                    Click here to activate your product on the homepage
                                </FieldDescription>
                            </FieldContent>
                            <Switch
                                id="switch-focus-mode"
                                checked={data.is_active}
                                onCheckedChange={(value) => onChange('is_active', value)} />
                        </Field>

                        <div className="grid w-full max-w-full gap-2">
                            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                                <PaintBucket />
                                Content
                            </h3>
                            <InputGroup>
                                <TextareaAutosize
                                    data-slot="input-group-control"
                                    value={data.content}
                                    onChange={(e) => onChange('content', e.target.value)}
                                    className="flex field-sizing-content min-h-24 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base outline-none"
                                    placeholder="Fill the content..."
                                />

                            </InputGroup>
                            {errors.content &&
                                <p className="mt-2 text-sm text-red-600">{errors.content}</p>
                            }
                        </div>

                        <div className="grid w-full max-w-full gap-2">
                            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                                <PencilLine />
                                Description
                            </h3>
                            <InputGroup>
                                <TextareaAutosize
                                    data-slot="input-group-control"
                                    value={data.description}
                                    onChange={(e) => onChange('description', e.target.value)}
                                    className="flex field-sizing-description min-h-24 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base outline-none"
                                    placeholder="Fill the description..."
                                />

                            </InputGroup>
                            {errors.description &&
                                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </form>
    )
}
