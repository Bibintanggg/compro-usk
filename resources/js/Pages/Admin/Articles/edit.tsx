import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
} from "@/Components/ui/input-group"
import TextareaAutosize from "react-textarea-autosize"
import React, { ChangeEvent, useEffect, useState } from "react";
import { MoveLeftIcon, UploadIcon } from 'lucide-react'
import { FileInput, Label } from "flowbite-react";
import { Field, FieldDescription, FieldLabel } from "@/Components/ui/field"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button";
// import { Article } from "@/types/article";

type Article = {
    id: number;
    title: string;
    author: string;
    content: string;
    thumbnail: string | null;
};

type Props = PageProps & {
    article: Article;
};

export default function ArticlesEdit() {
    const user = usePage().props.auth.user
    const { article } = usePage<Props>().props;

    const pageProps = usePage<Props>().props
    console.log("testing", pageProps)
    console.log("testing", article)
    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [fileName, setFileName] = useState<string>("")
    const [preview, setPreview] = useState<string>("")

    const { data, setData, put, processing, errors, reset } = useForm({
        'title': "",
        'author': "",
        'content': "",
        'thumbnail': null as File | null,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('admin.articles.update', article.id))
    }

    useEffect(() => {
        if (article?.thumbnail) {
            setData({
                title: article.title,
                author: article.author,
                content: article.content,
                thumbnail: null,
            })
            setPreview(`/storage/${article.thumbnail}`)
        }
    }, [article])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        setThumbnail(file)

        if (file) {
            setFileName(file.name)
            setData("thumbnail", file)
            setPreview(URL.createObjectURL(file))
        } else {
            setFileName("")
            setData("thumbnail", null)
            setPreview("")
        }
    }

    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-[150vh] mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex items-center justify-between">
                        Articles - Edit

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="p-3 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                                <div className="flex flex-col items-start w-full gap-4">
                                    <h3 className="text-2xl font-semibold tracking-tight">
                                        Thumbnail Upload
                                    </h3>
                                    <div className="flex flex-col items-center w-full gap-4">

                                        <Label
                                            htmlFor="dropzone-file"
                                            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                                        >
                                            {preview ? (
                                                <img src={preview} alt="" />
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
                                                onChange={handleFileChange}

                                            />
                                        </Label>

                                        {fileName && (
                                            <div className="text-xl flex items-center justify-center text-center">
                                                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
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
                                        <FieldLabel htmlFor="input-field-title" className="text-2xl font-semibold">Title</FieldLabel>
                                        <Input
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
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
                                        <FieldLabel htmlFor="input-field-author" className="text-2xl font-semibold">Author</FieldLabel>
                                        <Input
                                            value={data.author}
                                            onChange={(e) => setData('author', e.target.value)}
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
                                        <h3 className="text-2xl font-semibold tracking-tight">
                                            Content
                                        </h3>
                                        <InputGroup>
                                            <TextareaAutosize
                                                data-slot="input-group-control"
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
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

                    <div className="relative py-10">
                        <a href="/admin/articles">
                            <Button className="mt-2 absolute right-0">
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
