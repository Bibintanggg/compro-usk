import { ScrollArea } from '@/Components/ui/scroll-area';
import { Separator } from '@/Components/ui/separator';
import { Products } from '@/features/products/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import { BookAudioIcon, BoxIcon, Calendars, CheckCheck, LucideLocationEdit, ShoppingBasket, UserCheck2, Users, UsersIcon } from 'lucide-react';
import { Event } from '@/features/events/types';
import { Client } from '@/features/clients/types';

type DashboardProps = PageProps & {
    activeProducts: Products[],
    activeEvents: Event[],
    clientsCustomer: Client[],

    productsCount: number,
    clientCount: number
    eventCount: number
    articleCount: number
}

export default function Dashboard() {
    const user = usePage().props.auth.user
    const { activeProducts, activeEvents, clientsCustomer, productsCount, clientCount, eventCount, articleCount } = usePage<DashboardProps>().props

    return (
        <div className="p-10">
            <AuthenticatedLayout>
                <div className="w-full mx-auto py-10">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex justify-between items-center">
                        Dashboard

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>

                    <div className="flex flex-col gap-5">


                        <div className="flex  gap-6 w-full">

                            <div className="col-span-4 grid grid-cols-2 gap-4 w-full">

                                <div className="bg-[#f7f7f7] h-[11rem] rounded-md p-6 flex flex-col justify-between">
                                    <div className="flex justify-between">
                                        <p className="font-semibold text-xl">Total Products</p>
                                        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                                            <BoxIcon className="text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-6xl">{productsCount}</p>
                                        <p className="text-gray-600">Total Item</p>
                                    </div>
                                </div>

                                <div className="bg-[#f7f7f7] h-[11rem] rounded-md p-6 flex flex-col justify-between">
                                    <div className="flex justify-between">
                                        <p className="font-semibold text-xl">Total Client</p>
                                        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                                            <UsersIcon className="text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-6xl">{clientCount}</p>
                                        <p className="text-gray-600">Total Customer</p>
                                    </div>
                                </div>

                                <div className="bg-[#f7f7f7] h-[11rem] rounded-md p-6 flex flex-col justify-between">
                                    <div className="flex justify-between">
                                        <p className="font-semibold text-xl">Total Event</p>
                                        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                                            <LucideLocationEdit className="text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-6xl">{eventCount}</p>
                                        <p className="text-gray-600">Total Event</p>
                                    </div>
                                </div>

                                <div className="bg-[#f7f7f7] h-[11rem] rounded-md p-6 flex flex-col justify-between">
                                    <div className="flex justify-between">
                                        <p className="font-semibold text-xl">Total Article</p>
                                        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                                            <BookAudioIcon className="text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-6xl">{articleCount}</p>
                                        <p className="text-gray-600">Total Article</p>
                                    </div>
                                </div>

                            </div>

                            <div className="w-full bg-[#f7f7f7] rounded-md flex items-center justify-center text-white">
                                
                            </div>
                        </div>


                        <div className="flex items-start gap-10">

                            <div className="bg-[#f7f7f7] w-96 h-60 rounded-md overflow-hidden flex flex-col">

                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <p className='font-semibold text-xl'>Publish Product</p>
                                        <div className="w-10 h-10 rounded-full flex items-center bg-slate-900 justify-center">
                                            <CheckCheck className='text-white' />
                                        </div>
                                    </div>

                                    <ScrollArea className="h-32 w-full rounded-md border bg-white mt-6">
                                        <div className="p-4">
                                            {activeProducts.map((product: Products, index) => (
                                                <React.Fragment key={product.id}>
                                                    <div className="flex gap-3">
                                                        <p className="text-lg">{index + 1}</p>

                                                        <div className="flex flex-col w-full">
                                                            <div className="flex justify-between items-center">
                                                                <p className="text-lg max-w-[150px] truncate">{product.name}</p>
                                                                <p className="text-xs font-semibold">Rp.{product.price}</p>
                                                            </div>

                                                            <p className="text-xs">{product.description}</p>
                                                        </div>
                                                    </div>

                                                    <Separator className="my-2" />
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>

                            <div className="bg-[#f7f7f7] w-[26rem] h-60 rounded-md overflow-hidden flex flex-col">

                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <p className='font-semibold text-xl'>Publish Events</p>
                                        <div className="w-10 h-10 rounded-full flex items-center bg-slate-900 justify-center">
                                            <Calendars className='text-white' />
                                        </div>
                                    </div>

                                    <ScrollArea className="h-32 w-full rounded-md border bg-white mt-6">
                                        <div className="p-4">
                                            {activeEvents.map((events: Event, index) => (
                                                <React.Fragment key={events.id}>
                                                    <div className="flex gap-3">
                                                        <p className="text-lg">{index + 1}</p>

                                                        <div className="flex flex-col w-full">
                                                            <div className="flex justify-between items-center">
                                                                <p className="text-lg max-w-[150px] truncate font-semibold">{events.name}</p>
                                                            </div>

                                                            <div className="flex items-center justify-between w-full">
                                                                <p className="text-xs max-w-[150px] truncate">{events.location}</p>
                                                                <div className="flex items-center gap-1">
                                                                    <p className="text-xs">{new Date(events.start_date).toLocaleDateString('id-ID')}</p>
                                                                    <p>-</p>
                                                                    <p className="text-xs">{new Date(events.start_date).toLocaleDateString('id-ID')}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Separator className="my-2" />
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>

                            <div className="bg-[#f7f7f7] w-[19rem] h-96 rounded-md overflow-hidden flex flex-col">

                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <p className='font-semibold text-xl'>Customer</p>
                                        <div className="w-10 h-10 rounded-full flex items-center bg-slate-900 justify-center">
                                            <UserCheck2 className='text-white' />
                                        </div>
                                    </div>

                                    <ScrollArea className="h-[17rem] w-full rounded-md border bg-white mt-6">
                                        <div className="p-4">
                                            {clientsCustomer.map((clients: Client, index) => (
                                                <React.Fragment key={clients.id}>
                                                    <div className="flex gap-3">
                                                        <p className="text-lg">{index + 1}</p>

                                                        <div className="flex flex-col w-full items-start">


                                                            <div className="flex gap-3 items-start">
                                                                {clients.logo ? (

                                                                    <img src={`/storage/${clients.logo}`} alt="" className='w-10 h-10 rounded-md' />
                                                                ) : (
                                                                    <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center">
                                                                        <Users className="w-5 h-5 text-gray-500" />
                                                                    </div>
                                                                )}
                                                                <div className="flex flex-col items-start">
                                                                    <p className="text-lg max-w-[150px] truncate font-semibold">{clients.name}</p>
                                                                    <p className="text-sm max-w-[150px] truncate font-normal">{clients.description}</p>
                                                                    <a href={clients.website}
                                                                        target='_blank'
                                                                        className="text-sm max-w-[150px] truncate font-normal text-blue-500">{clients.website}</a>
                                                                </div>
                                                            </div>




                                                        </div>
                                                    </div>

                                                    <Separator className="my-2" />
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </AuthenticatedLayout>
        </div>
    );
}
