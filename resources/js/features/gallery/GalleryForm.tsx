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

type GalleryFormProps = {
    data: {
        title: string
        image: File | null
    }

    fileName?: string
    errors: Record<string, string>
    processing: boolean
    imagePreview?: string | null

    onChange: (key: string, value: any) => void
    onSubmit: (e: React.FormEvent) => void
    onImageChange: (file: File | null) => void

}

export default function GalleryForm({
    data, fileName, errors, processing, onChange, onSubmit, onImageChange, imagePreview
}: GalleryFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <div className="p-3 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    <div className="flex flex-col items-start w-full gap-4">
                        <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                            <FolderUp />
                            Image Gallery Upload
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
                                        <p className="text-xs text-gray-500">PNG, JPG (MAX. 2mb)</p>
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
                                Title
                            </FieldLabel>
                            <Input
                                value={data.title}
                                onChange={(e) => onChange('title', e.target.value)}
                                type="text"
                                placeholder="Enter your products title"
                            />
                            {errors.title &&
                                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                            }
                            <FieldDescription>
                                Fill your title for the gallery.
                            </FieldDescription>
                        </Field>

                        <blockquote className="mt-6 border-l-2 pl-6 italic font-thin">
                            Reminder, This page will enter the documentation section
                        </blockquote>
                    </div>
                </div>
            </div>
        </form>
    )
}
