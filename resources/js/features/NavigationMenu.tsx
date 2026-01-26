"use client"

import * as React from "react"
import { Link } from "@inertiajs/react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuViewport,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/Components/ui/navigation-menu"
import { BookCopyIcon, CircleAlertIcon, ImagesIcon, LocationEditIcon, Signature, Users, UserSquareIcon } from "lucide-react"

export default function NavigationMenuDemo() {
    return (
        <NavigationMenu className="relative z-[99999vh]">
            <NavigationMenuList className="gap-2">

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/" className="bg-transparent">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                        About Us
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="bg-white shadow-md rounded-md">
                        <ul className="p-2 space-y-1">
                            <NavItem icon={<UserSquareIcon size={16} />} href="#">
                                Profile
                            </NavItem>
                            <NavItem icon={<Signature size={16} />} href="#">
                                Vision
                            </NavItem>
                            <NavItem icon={<Users size={16} />} href="#">
                                Clients
                            </NavItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/" className="bg-transparent">Products</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem value="media">
                    <NavigationMenuTrigger className="bg-transparent">
                        Media
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="bg-white shadow-md rounded-md">
                        <ul className="p-2 space-y-1">
                            <NavItem icon={<BookCopyIcon size={16} />} href="#">
                                Article
                            </NavItem>
                            <NavItem icon={<ImagesIcon size={16} />} href="#">
                                Gallery
                            </NavItem>
                            <NavItem icon={<LocationEditIcon size={16} />} href="#">
                                Events
                            </NavItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/" className="bg-transparent">Contact Me</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
            <div className="absolute left-0 top-full z-50">
                <NavigationMenuViewport className="bg-white shadow-md rounded-md" />
            </div>
        </NavigationMenu>
    )
}

function NavItem({
    children,
    href,
    icon,
}: {
    children: React.ReactNode
    href: string
    icon: React.ReactNode
}) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                >
                    {icon}
                    {children}
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
