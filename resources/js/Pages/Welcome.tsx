import AppNavbar from '@/Components/Navbar';
import { Client } from '@/features/clients/types';
import { Products } from '@/features/products/types';
import { PageProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
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
import { ArrowUpRight, ArrowUpRightIcon, BoxIcon, Calendar, Clock, Instagram, Linkedin, Mail, MapMinus, MapPin, Newspaper, Phone, PictureInPicture, Twitter, Users } from 'lucide-react';
import { Card, CardContent } from "@/Components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel"
import React from 'react';
import { Article } from '@/types/article';
import { Gallery } from '@/features/gallery/types';
import { Event } from '@/features/events/types';
import { formatDate } from '@/types/formatDate';
import LeafletMap from '@/Components/LeafletMap';
import { Button } from '@/Components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/Components/ui/empty';
import EmptyFallback from '@/Components/EmptyFallback';
import Footer from '@/Components/Footer';

interface WelcomeProps extends PageProps {
    products: Products[]
    clients: Client[],
    articles: Article[],
    gallery: Gallery[],
    events: Event[]
}

export default function Welcome() {
    const { products, clients, articles, gallery, events } = usePage<WelcomeProps>().props

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };
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
                            <h1 className="text-7xl font-extrabold tracking-tight text-white/80">
                                Deloitte Digital
                            </h1>
                            <p className="mt-6 font-medium">
                                We help organizations transform their business through innovative digital solutions and human-centered design.
                            </p>
                        </div>

                        <div className="flex gap-10 text-white">
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

            <div className="p-10" id='profile'>
                <h2 className="scroll-m-20 border-b-2 border-black pb-3 text-5xl font-semibold tracking-tight first:mt-0 mx-auto max-w-xl flex justify-center">
                    About Us
                </h2>

                <div className="flex flex-col -space-y-10">

                    <div className='p-24 flex items-start justify-between gap-32'>
                        <img src="/images/tech-about.jpg" alt="" className='w-full h-96 object-cover' />

                        <div className="flex items-start flex-col space-y-40">
                            <h4 data-aos="fade-up" className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                Deloitte Digital is part of block <span className='italic'>&quot; Deloitte &quot;</span>, delivering end-to-end digital transformation by combining deep industry insight, innovative technology, and human-centered design. We help organizations create meaningful digital experiences and sustainable business growth.
                            </h4>

                            <blockquote data-aos="fade-left" className="mt-6 border-l-2 pl-6 italic">
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

                    <div className='p-24 flex items-start justify-between gap-32' id='visi'>
                        {/* <img src="/images/tech-about.jpg" alt="" className='w-full h-96 object-cover' /> */}

                        <div className="flex items-end flex-col text-right">
                            <h2 data-aos="fade-up" className="scroll-m-20 border-b pb-2 text-3xl text-right font-semibold tracking-tight first:mt-0 ">
                                Vision & Mission
                            </h2>

                            <blockquote data-aos="fade-up" className="mt-6 border-l-2 pl-6 italic">
                                To be a trusted digital partner that helps organizations shape the future through meaningful, human-centered digital transformation.
                            </blockquote>

                            <h2 data-aos="fade-up" data-aos-duration="1000" className="scroll-m-20 border-b pb-2 text-3xl text-right font-semibold tracking-tight first:mt-0 mt-5 ">
                                Mission
                            </h2>

                            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                                <li data-aos="fade-left" data-aos-duration="1500">Deliver impactful digital solutions</li>
                                <li data-aos="fade-left" data-aos-duration="2000">Create human-centric experiences</li>
                                <li data-aos="fade-left" data-aos-duration="2500">Drive sustainable business growth</li>
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

                <div className="flex items-center justify-center flex-col" id='client'>

                    <h2 data-aos="fade-up" data-aos-duration="1000" className="scroll-m-20 border-b-2 border-black pb-3 text-5xl font-semibold tracking-tight first:mt-0 mx-auto max-w-xl flex justify-center">
                        Our Clients
                    </h2>


                    <p data-aos="fade-up" data-aos-duration="1500" className="leading-7 [&:not(:first-child)]:mt-6 max-w-lg text-center">
                        We partner with leading organizations across industries to deliver impactful and measurable digital transformation.
                    </p>
                </div>

                {clients.length > 0 ? (
                    <div className="grid px-10 gap-4 p-12" data-aos="fade-up" data-aos-duration="1500">
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

                                                <p className="text-zinc-400 text-sm truncate">
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
                ) : (
                    <div data-aos="fade-up" data-aos-duration="2000">

                        <EmptyFallback
                            title='No Client Yet'
                            icon={<Users />}
                            href='product.view'
                            label='Lets Buy Our Products !' />
                    </div>
                )}


                <div className="mt-36" id='product'>

                    <h2 data-aos="fade-up" className="scroll-m-20 border-b-2 border-black pb-3 text-5xl font-semibold tracking-tight first:mt-0 mx-auto max-w-xl flex justify-center">
                        Products
                    </h2>

                    <div className="text-center mt-6 mb-8">
                        <p data-aos="fade-up" data-aos-duration="1000" className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover our innovative digital solutions designed to transform your business and drive sustainable growth.
                        </p>

                        <div className="flex items-center justify-center gap-8 mt-6">
                            <div className="flex items-center gap-2">
                                <span data-aos="fade-up" data-aos-duration="1500" className="text-sm font-medium text-gray-700">
                                    {products.filter(p => p.is_active).length} Active Products
                                </span>
                            </div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <span className="text-sm text-gray-500" data-aos="fade-up" data-aos-duration="2000">Trusted by {clients.length} clients</span>
                        </div>
                    </div>

                    {products.length > 0 ? (

                        <div className="grid grid-cols-4 auto-rows-[200px] gap-4 p-4">
                            {products.filter((product) => product.is_active)
                                .map((product: Products, index: number) => {
                                    const gridClass = (() => {
                                        const pattern = index % 6;
                                        switch (pattern) {
                                            case 0:
                                                return "col-span-1 row-span-1";
                                            case 1:
                                                return "col-span-1 row-span-1";
                                            case 2:
                                                return "col-span-2 row-span-1";
                                            case 3:
                                                return "col-span-2 row-span-1";
                                            case 4:
                                                return "col-span-1 row-span-1";
                                            case 5:
                                                return "col-span-1 row-span-1";
                                            default:
                                                return "col-span-1 row-span-1";
                                        }
                                    })();

                                    return (
                                        <div
                                            key={product.id}
                                            className={`${gridClass} relative rounded-2xl overflow-hidden group cursor-pointer`}
                                        >
                                            <div className="absolute inset-0">
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                                            </div>

                                            <div className="relative h-full p-6 flex flex-col justify-between text-white">
                                                <div>
                                                    <h2 className="text-2xl font-bold truncate">
                                                        {product.name}
                                                    </h2>
                                                    <h3 className="text-sm font-light mb-1 opacity-90">
                                                        {product.description}
                                                    </h3>
                                                </div>

                                                <div className="flex justify-between items-center">

                                                    <Link href={route('product.detail', product.slug)}
                                                        className="bg-white text-black px-6 py-2 rounded-full font-medium text-sm w-fit hover:bg-gray-100 transition-colors">
                                                        Browse
                                                    </Link>

                                                    <h3 className="text-xl font-semibold mb-1 opacity-90">
                                                        {formatPrice(product.price)}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                        </div>
                    ) : (
                        <div data-aos="fade-up" data-aos-duration="1500">
                            <EmptyFallback
                                title='No Product Found !'
                                icon={<BoxIcon />} />
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link
                            href="/products/all"
                            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            View All Product
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>


                <div className="mt-36 px-12">
                    <div className="max-w-4xl mx-auto text-center mb-12">

                        <h2 data-aos="fade-up" className="text-5xl font-semibold tracking-tight mb-4" id='article'>
                            Latest Articles
                        </h2>
                        <div className="w-24 h-1 bg-black mx-auto mb-6" data-aos="fade-up" data-aos-duration="1000"></div>

                        <p data-aos="fade-up" data-aos-duration="1500" className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Deep insights, case studies, and thought leadership from our team of digital transformation experts
                        </p>

                        <div className="flex items-center justify-center gap-8 mt-8">
                            <div className="flex items-center gap-2">
                                <span data-aos="fade-up" data-aos-duration="1500" className="text-sm font-medium text-gray-700">
                                    {articles.length} Articles Published
                                </span>
                            </div>

                        </div>
                    </div>

                    {articles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                            {articles.map((article: Article, index: number) => {
                                const isLarge = index % 4 === 0;

                                return (
                                    <Link
                                        key={article.id}
                                        href={`/articles/detail/${article.slug}`}
                                        className={`group ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
                                    >
                                        <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                            {isLarge && (
                                                <div className="absolute top-4 left-4 z-10 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                    Article
                                                </div>
                                            )}

                                            <img
                                                src={`/storage/${article.thumbnail}`}
                                                alt={article.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                            <div className="relative h-full p-6 flex flex-col justify-end text-white">
                                                <h3 className={`font-bold mb-2 group-hover:text-purple-400 transition-colors ${isLarge ? 'text-3xl' : 'text-xl'}`}>
                                                    {article.title}
                                                </h3>

                                                {isLarge && (
                                                    <p className="text-gray-200 mb-4 line-clamp-3">
                                                        {article.content}
                                                    </p>
                                                )}

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                                                            {article.author.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-sm text-gray-300">
                                                            {article.author}
                                                        </span>
                                                    </div>

                                                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div data-aos="fade-up" data-aos-duration="1500">

                            <EmptyFallback
                                title='No Article Found !'
                                icon={<Newspaper />} />
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link
                            href="/articles/all"
                            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            View All Articles
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="mt-36 px-12">
                    <div className="max-w-4xl mx-auto text-center mb-12">

                        <h2 data-aos="fade-up" data-aos-duration="1000" className="text-5xl font-semibold tracking-tight mb-4" id='gallery'>
                            Gallery
                        </h2>
                        <div data-aos="fade-up" data-aos-duration="1500" className="w-24 h-1 bg-black mx-auto mb-6"></div>

                        <p data-aos="fade-up" data-aos-duration="2000" className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            A curated collection showcasing our best work and memorable moments
                        </p>
                    </div>

                    {gallery.length > 0 ? (
                        <div className="grid grid-cols-4 auto-rows-[200px] gap-4">
                            {gallery.map((item: Gallery, index: number) => {
                                const gridClass = (() => {
                                    const pattern = index % 8;
                                    switch (pattern) {
                                        case 0: return "col-span-2 row-span-2";
                                        case 1: return "col-span-1 row-span-1";
                                        case 2: return "col-span-1 row-span-1";
                                        case 3: return "col-span-2 row-span-1";
                                        case 4: return "col-span-1 row-span-2";
                                        case 5: return "col-span-1 row-span-1";
                                        case 6: return "col-span-2 row-span-1";
                                        case 7: return "col-span-1 row-span-1";
                                        default: return "col-span-1 row-span-1";
                                    }
                                })();

                                return (
                                    <div
                                        key={item.id}
                                        className={`${gridClass} relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300`}
                                    >
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h3 className="text-white text-lg font-semibold">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    ) : (
                        <div data-aos="fade-up" data-aos-duration="1500">

                            <EmptyFallback
                                title='No Gallery Found !'
                                icon={<PictureInPicture />} />
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link
                            href="/gallery/all"
                            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            View Our Documentary
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>



                </div>

                <div className="mt-36 px-12">
                    <div className="max-w-4xl mx-auto text-center mb-12">

                        <h2 data-aos="fade-up" className="text-5xl font-semibold tracking-tight mb-4" id='event'>
                            Upcoming Events
                        </h2>
                        <div className="w-24 h-1 bg-black mx-auto mb-6" data-aos="fade-up" data-aos-duration="1000"></div>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-duration="1500">
                            Join us at our upcoming events, workshops, and networking opportunities
                        </p>

                        <div className="flex items-center justify-center gap-8 mt-8">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700" data-aos="fade-up" data-aos-duration="2000">
                                    {events.filter(e => e.is_active && new Date(e.start_date) > new Date()).length} Upcoming Events
                                </span>
                            </div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <span className="text-sm text-gray-500" data-aos="fade-up" data-aos-duration="2500">Register Now</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {(() => {
                                const upcomingEvents = events
                                    .filter(e => e.is_active && new Date(e.start_date) > new Date())
                                    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

                                if (upcomingEvents.length === 0) {
                                    return (
                                        <div className="bg-gray-50 rounded-3xl p-12 text-center">
                                            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Upcoming Events</h3>
                                            <p className="text-gray-500">Check back soon for new events!</p>
                                        </div>
                                    );
                                }

                                const closestEvent = upcomingEvents[0];
                                const startDate = new Date(closestEvent.start_date);
                                const endDate = new Date(closestEvent.end_date);
                                const today = new Date();
                                const daysUntil = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                                return (
                                    <Link
                                        href={`/event/${closestEvent.slug}`}
                                        className="group block h-full"
                                    >
                                        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                                            {/* Image */}
                                            <div className="relative h-80 overflow-hidden">
                                                <img
                                                    src={`/storage/${closestEvent.image}`}
                                                    alt={closestEvent.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                                <div className="absolute bottom-6 left-6 bg-white rounded-2xl p-5 shadow-2xl">
                                                    <p className="text-5xl font-bold text-red-600 leading-none">
                                                        {startDate.getDate()}
                                                    </p>
                                                    <p className="text-sm font-semibold text-gray-600 mt-1">
                                                        {startDate.toLocaleDateString('en-US', { month: 'long' })}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {startDate.getFullYear()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-8">

                                                <h3 className="text-3xl font-bold mb-3 group-hover:text-red-600 transition-colors">
                                                    {closestEvent.name}
                                                </h3>

                                                <p className="text-gray-600 mb-6 line-clamp-2">
                                                    {closestEvent.description}
                                                </p>

                                                <div className="space-y-3 mb-6">
                                                    <div className="flex items-center gap-3 text-gray-700">
                                                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <Clock className="w-5 h-5 text-red-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Duration</p>
                                                            <p className="font-semibold">
                                                                {formatDate(closestEvent.start_date)} - {formatDate(closestEvent.end_date)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 text-gray-700">
                                                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <MapPin className="w-5 h-5 text-red-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Location</p>
                                                            <p className="font-semibold">{closestEvent.location}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Link href={route('event.detail', closestEvent.slug)}>
                                                    <button className="w-full flex items-center justify-center gap-4 bg-red-600 text-white py-4 rounded-xl ...">
                                                        See Detail
                                                        <ArrowUpRight className="w-5 h-5" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })()}
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                                <h3 className="font-bold text-lg mb-1">Other Events</h3>
                                <p className="text-sm text-gray-600">More events coming up</p>
                            </div>

                            <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                {(() => {
                                    const upcomingEvents = events
                                        .filter(e => e.is_active && new Date(e.start_date) > new Date())
                                        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
                                        .slice(1);

                                    if (upcomingEvents.length === 0) {
                                        return (
                                            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                                                <p className="text-sm text-gray-500">No other events scheduled yet</p>
                                            </div>
                                        );
                                    }

                                    return upcomingEvents.map((event: Event) => {
                                        const startDate = new Date(event.start_date);
                                        const today = new Date();
                                        const daysUntil = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                                        return (
                                            <Link
                                                key={event.id}
                                                href={`/event/${event.slug}`}
                                                className="group block"
                                            >
                                                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300">
                                                    <div className="flex gap-3 p-3">
                                                        <div className="bg-red-50 rounded-lg p-3 text-center flex-shrink-0">
                                                            <p className="text-2xl font-bold text-red-600 leading-none">
                                                                {startDate.getDate()}
                                                            </p>
                                                            <p className="text-xs font-semibold text-gray-600 mt-1">
                                                                {startDate.toLocaleDateString('en-US', { month: 'short' })}
                                                            </p>
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-bold text-sm mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
                                                                {event.name}
                                                            </h4>

                                                            <div className="space-y-1 mb-2">
                                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                                    <Clock className="w-3 h-3 text-red-500 flex-shrink-0" />
                                                                    <span className="truncate">
                                                                        In {daysUntil} {daysUntil === 1 ? 'day' : 'days'}
                                                                    </span>
                                                                </div>

                                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                                    <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
                                                                    <span className="truncate">{event.location}</span>
                                                                </div>
                                                            </div>

                                                            <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                                {formatDate(event.start_date)}
                                                            </span>
                                                        </div>

                                                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0 mt-1" />
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    });
                                })()}
                            </div>

                            {events.filter(e => e.is_active && new Date(e.start_date) > new Date()).length > 1 && (
                                <Link
                                    href="/event/all"
                                    className="block w-full bg-gray-900 text-white py-3 rounded-xl font-semibold text-center hover:bg-gray-800 transition-colors"
                                >
                                    View All Events
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="mt-36">
                        <div className="max-w-4xl mx-auto text-center mb-12 px-12">

                            <h2 className="text-5xl font-semibold tracking-tight mb-4" id='contact' data-aos="fade-up">
                                Contact Us
                            </h2>
                            <div className="w-24 h-1 bg-black mx-auto mb-6" data-aos="fade-up" data-aos-duration="1500"></div>

                            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-duration="2000">
                                Ready to transform your business? We'd love to hear from you.
                            </p>
                        </div>

                        <div className="relative h-96 bg-gray-200 mb-12">
                            <LeafletMap />
                        </div>

                        <div className="px-12 pb-20">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white hover:scale-105 transition-transform duration-300">
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                        <Mail className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                                    <p className="text-blue-100 text-sm mb-4">
                                        We'll respond within 24 hours
                                    </p>
                                    <a href="mailto:hello@deloittedigital.com" className="text-white font-semibold hover:underline break-all">
                                        hello@deloittedigital.com
                                    </a>
                                </div>

                                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white hover:scale-105 transition-transform duration-300">
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                        <Phone className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Call Us</h3>
                                    <p className="text-green-100 text-sm mb-4">
                                        Monday to Friday, 9am-6pm
                                    </p>
                                    <a href="tel:+1234567890" className="text-white font-semibold hover:underline">
                                        +62 857-1794-3270
                                    </a>
                                </div>

                                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-white hover:scale-105 transition-transform duration-300">
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                                    <p className="text-purple-100 text-sm mb-4">
                                        Come say hello at our office
                                    </p>
                                    <p className="text-white font-semibold">
                                        The Plaza Office Tower, 32nd Floor, Jl. M.H. Thamrin Kav 28-30, RT.9/RW.5, <br />Gondangdia, Menteng, RT.9/RW.5, Gondangdia, Kec. Menteng, Kota Jakarta
                                    </p>
                                </div>
                            </div>

                            <div className="text-center mt-12">
                                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                                <div className="flex gap-4 justify-center">
                                    <a href="#" className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        <Linkedin className="w-6 h-6 text-white" />
                                    </a>
                                    <a href="#" className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-blue-400 transition-colors">
                                        <Twitter className="w-6 h-6 text-white" />
                                    </a>
                                    <a target='_blank' href="https://www.instagram.com/bintang.ydha_" className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-pink-600 transition-colors">
                                        <Instagram className="w-6 h-6 text-white" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <Footer />
        </>
    );
}
