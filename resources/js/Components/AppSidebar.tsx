import { Calendar, ChevronUp, Home, Inbox, Package2, Paperclip, Search, Settings, User2 } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "./ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { router, usePage } from "@inertiajs/react"
import { Calendar1Icon } from "lucide-react"
import { Users } from "lucide-react"
import { Images } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

const items = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Home,
    },
    {
        title: "Articles",
        url: "/admin/articles",
        icon: Paperclip,
    },
    {
        title: "Products",
        icon: Package2,
        children: [
            {
                title: "All Products",
                url: "/admin/products",
            },
            {
                title: "Transactions",
                url: "/admin/products/transactions",
            },
        ],
    },
    {
        title: "Event",
        url: "/admin/events",
        icon: Calendar1Icon,
    },
    {
        title: "Clients",
        url: "/admin/clients",
        icon: Users,
    },
    {
        title: "Gallery",
        url: "/admin/gallery",
        icon: Images,
    },
]

export function AppSidebar() {
    const user = usePage().props.auth.user;

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <img src="/images/logo.jpg" className="w-24 rounded-lg mx-auto mt-4" />
                    <SidebarGroupLabel className="text-lg font-semibold text-center mx-auto mt-2 mb-5">AyoDev.id</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                if (item.children) {
                                    return (
                                        <Collapsible
                                            key={item.title}
                                            defaultOpen={false}
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton>
                                                        <item.icon />
                                                        <span className="text-lg">{item.title}</span>
                                                        <ChevronUp className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>

                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.children.map((child) => (
                                                            <SidebarMenuSubItem key={child.title}>
                                                                <SidebarMenuButton asChild>
                                                                    <a href={child.url}>{child.title}</a>
                                                                </SidebarMenuButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    )
                                }

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span className="text-lg">{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="p-6 text-lg font-medium">
                        <User2 /> {user.name}
                        <ChevronUp className="ml-auto " />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                >
                    <DropdownMenuItem onClick={() => router.post('/logout')} className="cursor-pointer">
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Sidebar>
    )
}
