    'use client'

    import {
        Avatar,
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
        Navbar,
        NavbarBrand,
        NavbarCollapse,
        NavbarLink,
        NavbarToggle,
    } from "flowbite-react";
    import { Link, usePage, router } from "@inertiajs/react";
    import {
        NavigationMenu,
        NavigationMenuContent,
        NavigationMenuItem,
        NavigationMenuLink,
        NavigationMenuList,
        NavigationMenuTrigger,
        navigationMenuTriggerStyle,
    } from "@/Components/ui/navigation-menu"
    import { CircleAlertIcon } from "lucide-react"
    import NavigationMenuDemo from "@/features/NavigationMenu";

    export default function AppNavbar() {
        const { auth } = usePage().props as any
        const components: { title: string; href: string; description: string }[] = [
            {
                title: "Alert Dialog",
                href: "/docs/primitives/alert-dialog",
                description:
                    "A modal dialog that interrupts the user with important content and expects a response.",
            },
            {
                title: "Hover Card",
                href: "/docs/primitives/hover-card",
                description:
                    "For sighted users to preview content available behind a link.",
            },
            {
                title: "Progress",
                href: "/docs/primitives/progress",
                description:
                    "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
            },
            {
                title: "Scroll-area",
                href: "/docs/primitives/scroll-area",
                description: "Visually or semantically separates content.",
            },
            {
                title: "Tabs",
                href: "/docs/primitives/tabs",
                description:
                    "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
            },
            {
                title: "Tooltip",
                href: "/docs/primitives/tooltip",
                description:
                    "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
            },
        ]

        return (
            <Navbar fluid rounded className=" bg-[#f7f7f7] sticky top-0 z-50">
                <NavbarBrand href="/">
                    <img src="/images/ayodev.jpg" className="mr-3 w-20 ml-10" />
                    {/* <span className="self-center text-xl font-semibold">
                        PT Deloitte Konsultan ID
                    </span> */}
                </NavbarBrand>

                <div className="flex md:order-2 items-center gap-3">
                    {auth.user ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar
                                    alt="User"
                                    img="/images/avatar.png"
                                    className="object-cover w-full"
                                    rounded
                                />
                            }
                        >
                            <DropdownHeader>
                                <span className="block text-sm">
                                    {auth.user.name}
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    {auth.user.email}
                                </span>
                            </DropdownHeader>

                            <DropdownItem as={Link} href="/admin/dashboard">
                                Dashboard
                            </DropdownItem>

                            <DropdownDivider />

                            <DropdownItem
                                onClick={() => router.post('/logout')}
                                className="text-red-600"
                            >
                                Sign out
                            </DropdownItem>
                        </Dropdown>
                    ) : (
                        <Link
                            href={route('login')}
                            className="px-4 py-2 rounded-md text-lg font-medium hover:bg-gray-100"
                        >
                            Log in
                        </Link>
                    )}

                    <NavbarToggle />
                </div>

                <NavigationMenuDemo/>
            </Navbar>
        )
    }
