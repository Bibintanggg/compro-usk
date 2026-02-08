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
import { BookCopyIcon, ImagesIcon, LocationEditIcon, Signature, Users, UserSquareIcon } from "lucide-react"

export default function NavigationMenuDemo() {
    // Smooth scroll handler
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault()

        const element = document.getElementById(targetId)
        if (element) {
            // Get the navbar height to offset
            const navbarHeight = 80 // Adjust this based on your navbar height
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }

    return (
        <NavigationMenu className="relative z-[99999vh]">
            <NavigationMenuList className="gap-2">

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/" className="bg-transparent">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <a
                            className="bg-transparent cursor-pointer"
                            href="#profile"
                            onClick={(e) => handleScroll(e, 'profile')}
                        >
                            About Us
                        </a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <a
                            className="bg-transparent cursor-pointer"
                            href="#product"
                            onClick={(e) => handleScroll(e, 'product')}
                        >
                            Products
                        </a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <a
                            className="bg-transparent cursor-pointer"
                            href="#media"
                            onClick={(e) => handleScroll(e, 'media')}
                        >
                            Media
                        </a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <a
                            href="#contact"
                            className="bg-transparent cursor-pointer"
                            onClick={(e) => handleScroll(e, 'contact')}
                        >
                            Contact Me
                        </a>
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
    targetId,
    icon,
    onScroll,
}: {
    children: React.ReactNode
    targetId: string
    icon: React.ReactNode
    onScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void
}) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    href={`#${targetId}`}
                    onClick={(e) => onScroll(e, targetId)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                    {icon}
                    {children}
                </a>
            </NavigationMenuLink>
        </li>
    )
}
