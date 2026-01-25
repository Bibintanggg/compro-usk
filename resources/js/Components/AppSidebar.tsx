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
} from "./ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { usePage } from "@inertiajs/react"
import { Calendar1Icon } from "lucide-react"
import { Users } from "lucide-react"
import { Images } from "lucide-react"

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
        url: "/admin/products",
        icon: Package2,
    },
    {
        title: "Event",
        url: "/admin/events",
        icon: Calendar1Icon ,
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
                    <SidebarGroupLabel className="text-xl font-semibold text-center mx-auto mt-2 mb-5">PT. Deloitte</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span className="text-lg">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
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
                    <DropdownMenuItem>
                        <span>Sign out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Sidebar>
    )
}
