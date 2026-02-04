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
import ArticleForm from "@/features/articles/ArticleForm";
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
        'title': article.title,
        'author': article.author,
        'content': article.content,
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
                        Articles

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>

                    <ArticleForm
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
