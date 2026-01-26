import AppNavbar from '@/Components/Navbar';
import { Client } from '@/features/clients/types';
import { Products } from '@/features/products/types';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
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
import { ArrowUpRight, Users } from 'lucide-react';
import { Card, CardContent } from "@/Components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel"
import React from 'react';

interface WelcomeProps extends PageProps {
    products: Products[]
    clients: Client[]
}

export default function Welcome() {
    // const handleImageError = () => {
    //     document
    //         .getElementById('screenshot-container')
    //         ?.classList.add('!hidden');
    //     document.getElementById('docs-card')?.classList.add('!row-span-1');
    //     document
    //         .getElementById('docs-card-content')
    //         ?.classList.add('!flex-row');
    //     document.getElementById('background')?.classList.add('!hidden');
    // };

    const { products, clients } = usePage<WelcomeProps>().props

    return (
        <>
            <AppNavbar />
            <div className="w-full mx-auto relative">
                <img
                    src="/images/background.jpg"
                    alt=""
                    className="w-full h-[29rem] object-cover opacity-75"
                />

                <div className="absolute inset-0 flex items-center justify-between px-28">

                    <div className="flex flex-col space-y-8 max-w-xl">
                        <div className='space-y-1'>
                            <h1 className="text-7xl font-extrabold tracking-tight text-black">
                                Deloitte Digital
                            </h1>
                            <p className="mt-6 font-medium">
                                We help organizations transform their business through innovative digital solutions and human-centered design.
                            </p>
                        </div>

                        <div className="flex gap-10">
                            <div className="bg-[#f7f7f7]/40 w-52 h-[7rem] rounded-sm flex flex-col justify-center backdrop-blur-lg">
                                <p className="text-5xl font-semibold text-center">100+</p>
                                <p className="text-base font-semibold text-center">Clients</p>
                            </div>

                            <div className="bg-[#f7f7f7]/40 w-52 h-[7rem] rounded-sm flex flex-col justify-center backdrop-blur-lg">
                                <p className="text-5xl font-semibold text-center">6+</p>
                                <p className="text-base font-semibold text-center">Products</p>
                            </div>
                        </div>
                    </div>

                    <img
                        src="/images/avatar.png"
                        alt=""
                        className="h-[29rem] object-cover "
                    />
                </div>
            </div>

            <div className="p-10">
                <h2 className="scroll-m-20 border-b-2 border-black pb-3 text-5xl font-semibold tracking-tight first:mt-0 mx-auto max-w-xl flex justify-center">
                    About Us
                </h2>

                <div className="flex flex-col -space-y-10">

                    <div className='p-24 flex items-start justify-between gap-32'>
                        <img src="/images/tech-about.jpg" alt="" className='w-full h-96 object-cover' />

                        <div className="flex items-start flex-col space-y-40">
                            <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                Deloitte Digital is part of block <span className='italic'>&quot; Deloitte &quot;</span>, delivering end-to-end digital transformation by combining deep industry insight, innovative technology, and human-centered design. We help organizations create meaningful digital experiences and sustainable business growth.
                            </h4>

                            <blockquote className="mt-6 border-l-2 pl-6 italic">
                                Backed by Deloitte’s global network and proven expertise.
                            </blockquote>

                            {/* <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5">
                            What We Do ??
                        </h4>

                        <blockquote className="mt-6 border-l-2 pl-6 italic">
                            We work at the intersection of strategy, creativity, and technology to solve complex business challenges and deliver measurable impact.
                        </blockquote>

                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                            <li>Digital Strategy & Transformation</li>
                            <li>Experience Design (UX/UI & CX)</li>
                            <li>Enterprise & Cloud Solutions</li>
                            <li>Data, Analytics & AI</li>
                            <li>Digital Product Development</li>
                        </ul> */}
                        </div>
                    </div>

                    <div className='p-24 flex items-start justify-between gap-32 '>
                        {/* <img src="/images/tech-about.jpg" alt="" className='w-full h-96 object-cover' /> */}

                        <div className="flex items-end flex-col text-right">
                            <h2 className="scroll-m-20 border-b pb-2 text-3xl text-right font-semibold tracking-tight first:mt-0 ">
                                Vision & Mission
                            </h2>

                            <blockquote className="mt-6 border-l-2 pl-6 italic">
                                To be a trusted digital partner that helps organizations shape the future through meaningful, human-centered digital transformation.
                            </blockquote>

                            <h2 className="scroll-m-20 border-b pb-2 text-3xl text-right font-semibold tracking-tight first:mt-0 mt-5 ">
                                Mission
                            </h2>

                            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                                <li>Deliver impactful digital solutions</li>
                                <li>Create human-centric experiences</li>
                                <li>Drive sustainable business growth</li>
                            </ul>

                            {/* <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5">
                            What We Do ??
                        </h4>

                        <blockquote className="mt-6 border-l-2 pl-6 italic">
                            We work at the intersection of strategy, creativity, and technology to solve complex business challenges and deliver measurable impact.
                        </blockquote>

                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                            <li>Digital Strategy & Transformation</li>
                            <li>Experience Design (UX/UI & CX)</li>
                            <li>Enterprise & Cloud Solutions</li>
                            <li>Data, Analytics & AI</li>
                            <li>Digital Product Development</li>
                        </ul> */}
                        </div>

                        <img src="/images/tech-about-right.jpg" alt="" className='w-[30rem] h-[19rem] object-cover' />

                    </div>
                </div>

                <h2 className="scroll-m-20 border-b-2 border-black pb-3 text-5xl font-semibold tracking-tight first:mt-0 mx-auto max-w-xl flex justify-center">
                    Our Clients
                </h2>

                <div className="grid px-10 gap-4 p-10 ">
                    <Carousel
                        opts={{ align: "start" }}
                        className="w-full"
                    >
                        <CarouselContent>

                            {clients.map((client) => (
                                <CarouselItem
                                    key={client.id}
                                    className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                                >
                                    <a
                                        href={client.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative bg-zinc-900 rounded-2xl p-8 hover:bg-zinc-800 transition-all duration-300 block"
                                    >
                                        <div className="mb-6">
                                            {client.logo ? (
                                                <img
                                                    src={`/storage/${client.logo}`}
                                                    className="w-20 h-20 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <Users className="w-10 h-10 text-gray-500" />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div className="flex items-start justify-between gap-4">
                                                <h4 className="text-xl font-semibold text-white">
                                                    {client.name}
                                                </h4>
                                                <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-all" />
                                            </div>

                                            <p className="text-zinc-400 text-sm">
                                                {client.description}
                                            </p>
                                        </div>

                                        <div className="absolute inset-0 rounded-2xl border border-zinc-800 group-hover:border-zinc-700 transition-colors" />
                                    </a>
                                </CarouselItem>
                            ))}

                        </CarouselContent>

                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

            </div>


        </>
    );
}
