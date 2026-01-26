"use client"

import * as React from "react"
import { Link } from "@inertiajs/react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/Components/ui/navigation-menu"
import { CircleAlertIcon } from "lucide-react"

export default function NavigationMenuDemo() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                        Media
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="bg-white shadow-md rounded-md">
                        <ul className="p-2 space-y-1">
                            <NavItem icon={<CircleAlertIcon size={16} />} href="#">
                                Article
                            </NavItem>
                            <NavItem icon={<CircleAlertIcon size={16} />} href="#">
                                Gallery
                            </NavItem>
                            <NavItem icon={<CircleAlertIcon size={16} />} href="#">
                                Events
                            </NavItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
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
