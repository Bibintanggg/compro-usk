import { ScrollArea } from '@/Components/ui/scroll-area';
import { Separator } from '@/Components/ui/separator';
import { Products } from '@/features/products/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { BookAudioIcon, BoxIcon, Calendars, CheckCheck, LucideLocationEdit, ShoppingBasket, UserCheck2, Users, UsersIcon, ArrowUpRight, Activity, TrendingUp, Clock } from 'lucide-react';
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
        <AuthenticatedLayout>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap');

                * {
                    font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                .fade-in {
                    animation: fadeIn 0.6s ease-out forwards;
                    opacity: 0;
                }

                .fade-in-1 { animation-delay: 0.05s; }
                .fade-in-2 { animation-delay: 0.1s; }
                .fade-in-3 { animation-delay: 0.15s; }
                .fade-in-4 { animation-delay: 0.2s; }

                @keyframes fadeIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                }

                .card {
                    background: white;
                    border: 1px solid #E8E8E8;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .card:hover {
                    border-color: #D0D0D0;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
                }

                .stat-card {
                    position: relative;
                    overflow: hidden;
                }

                .stat-card::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 3px;
                    height: 100%;
                    background: #000;
                    transform: scaleY(0);
                    transition: transform 0.3s ease;
                }

                .stat-card:hover::after {
                    transform: scaleY(1);
                }

                .list-item {
                    transition: all 0.2s ease;
                    border-left: 2px solid transparent;
                }

                .list-item:hover {
                    background: #FAFAFA;
                    border-left-color: #000;
                    padding-left: 1.25rem;
                }

                .text-balance {
                    text-wrap: balance;
                }

                .number {
                    font-variant-numeric: tabular-nums;
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.25rem 0.75rem;
                    font-size: 0.75rem;
                    font-weight: 500;
                    border-radius: 100px;
                    background: #F5F5F5;
                    color: #404040;
                }

                .divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #E8E8E8 50%, transparent);
                }
            `}</style>

            <div className="min-h-screen bg-[#FAFAFA]">
                <div className="max-w-[1400px] mx-auto px-6 py-8">

                    <div className="mb-12 fade-in">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <p className="text-sm text-gray-500 mb-3 font-medium">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                                <h1 className="text-5xl font-semibold text-gray-900 mb-2">
                                    Welcome back, {user.name.split(' ')[0]}
                                </h1>
                                <p className="text-gray-600">
                                    Here's an overview of your business performance
                                </p>
                            </div>
                        </div>
                        <div className="divider"></div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <div className="card stat-card rounded-lg p-6 fade-in fade-in-1">
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center">
                                    <BoxIcon className="w-5 h-5 text-white" strokeWidth={2} />
                                </div>
                                <span className="badge">Active</span>
                            </div>
                            <div>
                                <p className="text-4xl font-semibold text-gray-900 mb-2 number">
                                    {productsCount}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Products in inventory
                                </p>
                            </div>
                        </div>

                        <div className="card stat-card rounded-lg p-6 fade-in fade-in-2">
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center">
                                    <UsersIcon className="w-5 h-5 text-white" strokeWidth={2} />
                                </div>
                                <span className="badge">Growing</span>
                            </div>
                            <div>
                                <p className="text-4xl font-semibold text-gray-900 mb-2 number">
                                    {clientCount}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Active clients
                                </p>
                            </div>
                        </div>

                        <div className="card stat-card rounded-lg p-6 fade-in fade-in-3">
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center">
                                    <Calendars className="w-5 h-5 text-white" strokeWidth={2} />
                                </div>
                                <span className="badge">Upcoming</span>
                            </div>
                            <div>
                                <p className="text-4xl font-semibold text-gray-900 mb-2 number">
                                    {eventCount}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Scheduled events
                                </p>
                            </div>
                        </div>

                        <div className="card stat-card rounded-lg p-6 fade-in fade-in-4">
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center">
                                    <BookAudioIcon className="w-5 h-5 text-white" strokeWidth={2} />
                                </div>
                                <span className="badge">Published</span>
                            </div>
                            <div>
                                <p className="text-4xl font-semibold text-gray-900 mb-2 number">
                                    {articleCount}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Articles published
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4">

                        <div className="col-span-5 card rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Products
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            Currently available
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-500 number">
                                        {activeProducts.length} items
                                    </div>
                                </div>
                            </div>

                            <ScrollArea className="h-[450px]">
                                <div className="p-4">
                                    {activeProducts.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-80 text-center">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                                <BoxIcon className="w-6 h-6 text-gray-400" strokeWidth={2} />
                                            </div>
                                            <p className="text-sm text-gray-500">No products available</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {activeProducts.map((product: Products, index) => (
                                                <div
                                                    key={product.id}
                                                    className="list-item p-4 rounded-lg"
                                                >
                                                    <div className="flex items-start justify-between gap-4 mb-2">
                                                        <h4 className="text-base font-medium text-gray-900 flex-1">
                                                            {product.name}
                                                        </h4>
                                                        <span className="text-sm font-semibold text-gray-900 number whitespace-nowrap">
                                                            Rp {product.price.toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                                        {product.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>

                        <div className="col-span-4 card rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Events
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            Coming soon
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-500 number">
                                        {activeEvents.length} scheduled
                                    </div>
                                </div>
                            </div>

                            <ScrollArea className="h-[450px]">
                                <div className="p-4">
                                    {activeEvents.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-80 text-center">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                                <Calendars className="w-6 h-6 text-gray-400" strokeWidth={2} />
                                            </div>
                                            <p className="text-sm text-gray-500">No upcoming events</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {activeEvents.map((event: Event) => (
                                                <div
                                                    key={event.id}
                                                    className="list-item p-4 rounded-lg"
                                                >
                                                    <h4 className="text-base font-medium text-gray-900 mb-2">
                                                        {event.name}
                                                    </h4>
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span className="truncate">{event.location}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Clock className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                                                            <span>
                                                                {new Date(event.start_date).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>

                        <div className="col-span-3 card rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Clients
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        Top customers
                                    </p>
                                </div>
                            </div>

                            <ScrollArea className="h-[450px]">
                                <div className="p-4">
                                    {clientsCustomer.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-80 text-center">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                                <Users className="w-6 h-6 text-gray-400" strokeWidth={2} />
                                            </div>
                                            <p className="text-sm text-gray-500">No clients yet</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {clientsCustomer.map((client: Client) => (
                                                <div
                                                    key={client.id}
                                                    className="list-item p-4 rounded-lg"
                                                >
                                                    <div className="flex gap-3 items-start">
                                                        {client.logo ? (
                                                            <img
                                                                src={`/storage/${client.logo}`}
                                                                alt={client.name}
                                                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                                <Users className="w-5 h-5 text-gray-400" strokeWidth={2} />
                                                            </div>
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-medium text-gray-900 truncate mb-1">
                                                                {client.name}
                                                            </h4>
                                                            {client.description && (
                                                                <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                                                                    {client.description}
                                                                </p>
                                                            )}
                                                            {client.website && (
                                                                <a
                                                                    href={client.website}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-gray-900 hover:text-gray-600 flex items-center gap-1 group transition-colors"
                                                                >
                                                                    <span>Visit website</span>
                                                                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
