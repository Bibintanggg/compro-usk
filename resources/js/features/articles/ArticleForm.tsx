'use client'

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
} from "@/Components/ui/input-group"
import TextareaAutosize from "react-textarea-autosize"
import React, { ChangeEvent, useEffect, useState } from "react";
import { Captions, FolderUp, MoveLeftIcon, PaintBucket, UploadIcon, UserStar } from 'lucide-react'
import { FileInput, Label } from "flowbite-react";
import { Field, FieldDescription, FieldLabel } from "@/Components/ui/field"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button";

type ArticleFormProps = {
    data: {
        title: string
        author: string
        content: string
        thumbnail: File | null
    }
    errors: Record<string, string>
    processing: boolean

    onChange: (key: string, value: any) => void
    onSubmit: (e: React.FormEvent) => void
    fileName?: string
}
export default function ArticleForm({
    data, errors, processing, onChange, onSubmit, fileName
}: ArticleFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <div className="p-3 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    <div className="flex flex-col items-start w-full gap-4">
                        <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                            <FolderUp/>
                            Thumbnail Upload
                        </h3>
                        <div className="flex flex-col items-center w-full gap-4">

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
                                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 2mb)</p>
                                </div>
                                <FileInput
                                    id="dropzone-file"
                                    className="hidden"
                                    onChange={(e) => onChange('thumbnail', e.target.files?.[0] ?? null)}
                                />
                            </Label>

                            {fileName && (
                                <div className="text-xl flex items-center justify-center text-center">
                                    <h3 className="scroll-m-20 text-sm font-semibold tracking-tight">
                                        Selected File : {fileName}
                                    </h3>
                                </div>
                            )}

                            {errors.thumbnail &&
                                <p className="mt-2 text-sm text-red-600">{errors.thumbnail}</p>
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
                            <FieldLabel htmlFor="input-field-title" className="text-2xl font-semibold flex items-center">
                                <Captions/>
                                Title
                            </FieldLabel>
                            <Input
                                value={data.title}
                                onChange={(e) => onChange('title', e.target.value)}
                                type="text"
                                placeholder="Enter your article title"
                            />
                            {errors.title &&
                                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                            }
                            <FieldDescription>
                                Fill your title for the article.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="input-field-author" className="text-2xl font-semibold flex items-center">
                                <UserStar/>
                                Author
                            </FieldLabel>
                            <Input
                                value={data.author}
                                onChange={(e) => onChange('author', e.target.value)}
                                type="text"
                                placeholder="Enter your article author"
                            />
                            {errors.author &&
                                <p className="mt-2 text-sm text-red-600">{errors.author}</p>
                            }
                            <FieldDescription>
                                Fill your author for the article.
                            </FieldDescription>
                        </Field>

                        <div className="grid w-full max-w-full gap-2">
                            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                                <PaintBucket/>
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

                    </div>
                </div>
            </div>

        </form>
    )
}
