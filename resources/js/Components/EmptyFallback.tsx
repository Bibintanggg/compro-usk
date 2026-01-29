import { Users } from "lucide-react";
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";
import { Button } from "./ui/button";
import { router } from "@inertiajs/react";
import React from "react";

type EmptyProps = {
    title: string
    icon: React.ReactNode
    href?: string
    label?: string
}
export default function EmptyFallback({
    title, icon, href, label
}: EmptyProps) {
    return (
        <>
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        {icon}
                    </EmptyMedia>
                    <EmptyTitle>{title}</EmptyTitle>
                </EmptyHeader>
                {href && label && (
                    <EmptyContent className="flex-row justify-center gap-2">
                        <Button onClick={() => router.visit(route(href))}>
                            {label}
                        </Button>
                    </EmptyContent>
                )}  
            </Empty>
        </>
    )
}