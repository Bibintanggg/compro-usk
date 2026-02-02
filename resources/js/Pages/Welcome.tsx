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
            <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]" />

                <div className="container mx-auto px-6 lg:px-16 py-20 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                        <span className="text-sm font-medium text-blue-700">Digital Innovation Partner</span>
                                    </div>

                                    <h1 className="text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                                        Transform Your
                                        <br />
                                        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                            Digital Future
                                        </span>
                                    </h1>

                                    <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                                        AyoDev.id combines strategy, creativity, and technology to deliver transformative digital experiences.
                                    </p>
                                </div>

                                <div className="flex items-center gap-12 pt-4">
                                    <div className="space-y-1">
                                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                            100+
                                        </div>
                                        <div className="text-sm text-slate-500 font-medium">Trusted Clients</div>
                                    </div>
                                    <div className="w-px h-12 bg-slate-200" />
                                    <div className="space-y-1">
                                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                            6+
                                        </div>
                                        <div className="text-sm text-slate-500 font-medium">Digital Solutions</div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-3xl blur-2xl opacity-20" />
                                <div className="relative aspect-[4/4] rounded-3xl overflow-hidden ">
                                    <img
                                        src="/images/avatar.png"
                                        alt="Digital Innovation"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#FAFAFA] py-32" id="profile">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="max-w-7xl mx-auto">

                        <div className="grid lg:grid-cols-2 gap-16 items-start mb-40">
                            <div className="lg:sticky lg:top-32 space-y-8">
                                <div className="space-y-4">
                                    <div className="inline-block">
                                        <span className="text-xs font-medium tracking-[0.4em] uppercase text-slate-400">
                                            01 — About
                                        </span>
                                    </div>
                                    <h2 className="text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
                                        Who We Are
                                    </h2>
                                </div>
                            </div>

                            <div className="space-y-16">
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src="/images/tech-about.jpg"
                                        // alt="About Deloitte Digital"
                                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-8">
                                    <p className="text-2xl lg:text-3xl leading-[1.4] text-slate-800">
                                        <span className="font-medium">AyoDev.id</span> is a technology service company focused on delivering reliable digital solutions, from website development to custom technology services tailored to business needs.
                                    </p>

                                    <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                                        We help businesses and organizations build functional, scalable, and user-friendly digital products that support growth and efficiency.
                                    </p>

                                    <div className="pt-4 pl-6 border-l-[3px] border-slate-900">
                                        <p className="text-base text-slate-700 italic">
                                            Turning ideas into digital solutions through technology and thoughtful design.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-16 items-start" id="visi">
                            <div className="space-y-16 lg:order-2">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src="/images/tech-about-right.jpg"
                                        alt="Our Vision"
                                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            <div className="lg:sticky lg:top-32 space-y-12 lg:order-1">
                                <div className="space-y-4">
                                    <span className="text-xs font-medium tracking-[0.4em] uppercase text-slate-400">
                                        02 — Vision
                                    </span>
                                    <p className="text-xl lg:text-2xl text-slate-800 leading-relaxed">
                                        To become a trusted technology partner that helps businesses grow through reliable, innovative, and user-focused digital solutions.
                                    </p>
                                </div>

                                <div className="h-px bg-slate-200" />

                                <div className="space-y-6">
                                    <span className="text-xs font-medium tracking-[0.4em] uppercase text-slate-400">
                                        Mission
                                    </span>
                                    <ul className="space-y-5 text-lg text-slate-700">
                                        <ul className="space-y-5 text-lg text-slate-700">
                                            <li className="flex items-start gap-4">
                                                <span className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-medium">
                                                    1
                                                </span>
                                                <span>Provide high-quality website and digital development services tailored to each client’s needs.</span>
                                            </li>

                                            <li className="flex items-start gap-4">
                                                <span className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-medium">
                                                    2
                                                </span>
                                                <span>Design and build user-friendly, scalable, and efficient digital products.</span>
                                            </li>

                                            <li className="flex items-start gap-4">
                                                <span className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-medium">
                                                    3
                                                </span>
                                                <span>Support long-term business growth through technology, collaboration, and continuous improvement.</span>
                                            </li>
                                        </ul>

                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bg-white py-24 md:py-32" id="client">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 mb-24">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-[1px] bg-black"></div>
                                    <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-light">
                                        Clients
                                    </span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-light leading-[0.95] tracking-tight">
                                    Trusted By
                                    <br />
                                    <span className="font-normal">Growing Businesses</span>
                                </h2>
                            </div>
                            <div className="flex items-end lg:justify-end">
                                <p className="text-base md:text-lg text-neutral-500 max-w-md leading-relaxed font-light">
                                    We collaborate with startups, small businesses, and organizations to build reliable digital solutions that support their growth.
                                </p>
                            </div>
                        </div>

                        {clients.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-neutral-200">
                                {clients.map((client) => (
                                    <a
                                        key={client.id}
                                        href={client.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative bg-white p-10 md:p-12 hover:bg-black transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>

                                        <div className="relative z-10 h-full flex flex-col justify-between min-h-[280px]">
                                            <div className="flex-1 flex items-center justify-center mb-8">
                                                {client.logo ? (
                                                    <img
                                                        src={`/storage/${client.logo}`}
                                                        className="w-32 h-32 rounded-md object-cover opacity-50 group-hover:opacity-100 transition-all duration-500 "
                                                        alt={client.name}
                                                    />
                                                ) : (
                                                    <Users className="w-16 h-16 text-neutral-300 group-hover:text-white transition-colors duration-500" />
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm tracking-wide text-neutral-900 group-hover:text-white transition-colors duration-500">
                                                    {client.name}
                                                </h4>
                                                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed group-hover:text-neutral-300 transition-colors duration-500">
                                                    {client.description}
                                                </p>
                                            </div>

                                            {/* Arrow Icon */}
                                            <div className="absolute top-8 right-8">
                                                <ArrowUpRight className="w-5 h-5 text-neutral-300 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <EmptyFallback
                                title='No Client Yet'
                                icon={<Users />}
                                href='product.view'
                                label='Lets Buy Our Products !'
                            />
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 md:py-24" id="product">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="mb-16">
                            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-[1px] bg-black"></div>
                                        <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                                            Products
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight">
                                        Our
                                        <br />
                                        <span className="font-normal">Products</span>
                                    </h2>
                                </div>
                                <div className="flex flex-col justify-end space-y-3">
                                    <p className="text-xl text-neutral-500 leading-relaxed font-light">
                                        Explore our digital services, from website development to custom technology solutions built to support your business growth.
                                    </p>
                                    <div className="flex gap-4 text-[15px] tracking-wider text-neutral-400">
                                        <span>{products.filter(p => p.is_active).length} Active Services</span>
                                        <span>•</span>
                                        <span>Trusted by {clients.length} clients</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Products Masonry Grid */}
                        {products.length > 0 ? (
                            <>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {products.filter((product) => product.is_active).map((product: Products, index: number) => (
                                        <Link
                                            key={product.id}
                                            href={route('product.detail', product.slug)}
                                            className="group relative bg-white border border-neutral-200 overflow-hidden hover:border-black transition-all duration-300"
                                        >
                                            {/* Image */}
                                            <div className={`relative overflow-hidden bg-neutral-50 ${index === 0 || index === 3 ? 'aspect-[8/5]' : 'aspect-[5/2]'
                                                }`}>
                                                    {product.image ? (

                                                        <img
                                                        src={`/storage/${product.image}`}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                    ):(
                                                        <img src="/images/fallback.jpg" alt="" />
                                                    )}

                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                {/* Index Number */}
                                                <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] text-white/60 font-light">
                                                    {String(index + 1).padStart(2, '0')}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 space-y-4">
                                                <div className="space-y-2">
                                                    <h3 className="text-lg md:text-xl font-light text-neutral-900 group-hover:text-neutral-600 transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                                                        {product.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                                                    <span className="text-base font-light text-neutral-900">
                                                        {formatPrice(product.price)}
                                                    </span>
                                                    <div className="flex items-center gap-2 text-xs tracking-wider text-neutral-400">
                                                        <span className="group-hover:text-neutral-900 transition-colors">EXPLORE</span>
                                                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* View All Button */}
                                <div className="mt-12 flex justify-center">
                                    <Link
                                        href="/products/all"
                                        className="group/all inline-flex items-center gap-3 border border-neutral-200 px-8 py-3 hover:border-black transition-all duration-300"
                                    >
                                        <span className="text-xs tracking-wider text-neutral-900">VIEW ALL PRODUCTS</span>
                                        <ArrowUpRight className="w-3 h-3 text-neutral-900 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <EmptyFallback
                                title='No Product Found !'
                                icon={<BoxIcon />}
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* Articles Section - Magazine Style */}
            <section className="bg-neutral-50 py-32" id="article">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-20">
                            <span className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-6 block">
                                04 / Insights
                            </span>
                            <div className="grid lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-5">
                                    <h2 className="text-6xl font-light leading-tight">
                                        Latest
                                        <br />
                                        <span className="font-medium">Articles</span>
                                    </h2>
                                </div>
                                <div className="lg:col-span-7 flex items-end">
                                    <div className="space-y-4">
                                        <p className="text-lg text-neutral-600">
                                            Stories, learnings, and practical tips from our journey building websites and digital products.
                                        </p>

                                        <span className="text-sm text-neutral-500">{articles.length} Articles Published</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {articles.length > 0 ? (
                            <div className="space-y-8">
                                {articles.map((article: Article, index: number) => (
                                    <Link
                                        key={article.id}
                                        href={`/articles/detail/${article.slug}`}
                                        className="group block"
                                    >
                                        <div className="grid lg:grid-cols-12 gap-8 bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                                            <div className="lg:col-span-5 relative h-80 overflow-hidden">
                                                {article.thumbnail ? (
                                                    <img
                                                    src={`/storage/${article.thumbnail}`}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />

                                                ):(
                                                    <img src="/images/fallback.jpg" alt="" />
                                                )}
                                            </div>

                                            <div className="lg:col-span-7 p-12 flex flex-col justify-center">
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                                                        <span>{article.author}</span>
                                                    </div>

                                                    <h3 className="text-3xl font-light text-neutral-900 group-hover:text-neutral-600 transition-colors">
                                                        {article.title}
                                                    </h3>

                                                    <p className="text-neutral-600 leading-relaxed line-clamp-3">
                                                        {article.content}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-neutral-900 group-hover:gap-4 transition-all">
                                                        <span className="text-sm font-medium">Read More</span>
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <EmptyFallback
                                title='No Article Found !'
                                icon={<Newspaper />}
                            />
                        )}

                        <div className="text-center mt-16">
                            <Link
                                href="/articles/all"
                                className="inline-flex items-center gap-2 border-2 border-neutral-900 text-neutral-900 px-10 py-4 rounded-full hover:bg-neutral-900 hover:text-white transition-all"
                            >
                                View All Articles
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-32" id="gallery">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-20">
                            <span className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-6 block">
                                05 / Gallery
                            </span>
                            <div className="grid lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-5">
                                    <h2 className="text-6xl font-light leading-tight">
                                        Our
                                        <br />
                                        <span className="font-medium">Work</span>
                                    </h2>
                                </div>
                                <div className="lg:col-span-7 flex items-end">
                                    <p className="text-lg text-neutral-600">
                                        A curated collection showcasing our best work and memorable moments.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {gallery.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                                            className={`${gridClass} group relative rounded-xl overflow-hidden cursor-pointer h-64`}
                                        >
                                            {item.image ? (
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />

                                            ):(
                                                <img src="/images/fallback.jpg" alt="" />
                                            )}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-6">
                                                <h3 className="text-white text-lg font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <EmptyFallback
                                title='No Gallery Found !'
                                icon={<PictureInPicture />}
                            />
                        )}

                        <div className="text-center mt-16">
                            <Link
                                href="/gallery/all"
                                className="inline-flex items-center gap-2 border-2 border-neutral-900 text-neutral-900 px-10 py-4 rounded-full hover:bg-neutral-900 hover:text-white transition-all"
                            >
                                View Full Gallery
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 md:py-20" id="event">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12">
                            <div className="grid lg:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-[1px] bg-black"></div>
                                        <span className="text-[15px] tracking-[0.2em] uppercase text-neutral-400">
                                            Events
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-5xl font-light leading-tight tracking-tight">
                                        Upcoming
                                        <br />
                                        <span className="font-normal">Events</span>
                                    </h2>
                                </div>
                                <div className="flex flex-col justify-end space-y-2">
                                    <p className="text-xl text-neutral-500 leading-relaxed font-light">
                                        Stay updated with our upcoming events, workshops, and online sessions where we share insights about web development and digital solutions.
                                    </p>
                                    <span className="text-[15px] text-neutral-400 tracking-wider">{events.length} Upcoming Events</span>
                                </div>
                            </div>
                        </div>

                        {events.length > 0 ? (
                            <>
                                <div className="space-y-6">
                                    {events.map((event: Event, index: number) => (
                                        <Link
                                            key={event.id}
                                            href={`/event/${event.slug}`}
                                            className="group block"
                                        >
                                            <div className="grid lg:grid-cols-12 gap-6 border border-neutral-200 hover:border-black transition-all duration-300 overflow-hidden">
                                                <div className="lg:col-span-2 bg-neutral-50 p-6 flex flex-col items-center justify-center text-center border-r border-neutral-200 group-hover:bg-black transition-colors duration-300">
                                                    <div className="space-y-1">
                                                        <div className="text-3xl font-light text-neutral-900 group-hover:text-white transition-colors">
                                                            {new Date(event.start_date).getDate()}
                                                        </div>
                                                        <div className="text-[10px] tracking-wider uppercase text-neutral-400 group-hover:text-white/60 transition-colors">
                                                            {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="lg:col-span-4 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-neutral-100">
                                                    {event.image ? (
                                                        <img
                                                            src={`/storage/${event.image}`}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <img src="/images/fallback.jpg" alt="Fallback" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                    )}
                                                </div>

                                                <div className="lg:col-span-6 p-6 flex flex-col justify-center space-y-4">
                                                    <div className="flex flex-wrap items-center gap-3 text-[15px] text-black/60">
                                                        <div className="flex items-center gap-1.5">
                                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>{event.location}</span>
                                                        </div>
                                                        <span>•</span>
                                                    </div>

                                                    <h3 className="text-lg md:text-2xl font-light text-neutral-900 group-hover:text-neutral-600 transition-colors leading-snug">
                                                        {event.name}
                                                    </h3>

                                                    <p className="text-[15px] text-neutral-500 leading-relaxed line-clamp-2">
                                                        {event.description}
                                                    </p>

                                                    <div className="flex items-center justify-between pt-2">
                                                        <div className="flex items-center gap-1.5 text-[10px] tracking-wider text-neutral-900">
                                                            <span className="group-hover:text-neutral-600 transition-colors">VIEW DETAILS</span>
                                                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* View All Button */}
                                <div className="mt-8 flex justify-center">
                                    <Link
                                        href="/event/all"
                                        className="group/all inline-flex items-center gap-2 border border-neutral-200 px-6 py-2.5 hover:border-black transition-all duration-300"
                                    >
                                        <span className="text-[10px] tracking-wider text-neutral-900">VIEW ALL EVENTS</span>
                                        <ArrowUpRight className="w-3 h-3 text-neutral-900 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <EmptyFallback
                                title='No Upcoming Events'
                                icon={<Calendar />}
                            />
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-white py-32" id="contact">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-20">
                            <span className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-6 block">
                                07 / Contact
                            </span>
                            <div className="grid lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-5">
                                    <h2 className="text-6xl font-light leading-tight">
                                        Let's
                                        <br />
                                        <span className="font-medium">Connect</span>
                                    </h2>
                                </div>
                                <div className="lg:col-span-7 flex items-end">
                                    <p className="text-lg text-neutral-600">
                                        Ready to transform your business? We'd love to hear from you.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-16">
                            <LeafletMap />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="group bg-neutral-50 rounded-2xl p-10 hover:bg-neutral-900 transition-all duration-500">
                                <Mail className="w-10 h-10 text-neutral-900 group-hover:text-white mb-6 transition-colors" />
                                <h3 className="text-xl font-light mb-2 text-neutral-900 group-hover:text-white transition-colors">
                                    Email Us
                                </h3>
                                <p className="text-sm text-neutral-500 group-hover:text-neutral-400 mb-4 transition-colors">
                                    We'll respond within 24 hours
                                </p>
                                <a
                                    href="mailto:hello@deloittedigital.com"
                                    className="text-neutral-900 group-hover:text-white   font-light break-all transition-colors"
                                >
                                    hello@ayodev.id
                                </a>
                            </div>

                            <div className="group bg-neutral-50 rounded-2xl p-10 hover:bg-neutral-900 transition-all duration-500">
                                <Phone className="w-10 h-10 text-neutral-900 group-hover:text-white mb-6 transition-colors" />
                                <h3 className="text-xl font-light mb-2 text-neutral-900 group-hover:text-white transition-colors">
                                    Call Us
                                </h3>
                                <p className="text-sm text-neutral-500 group-hover:text-neutral-400 mb-4 transition-colors">
                                    Monday to Friday, 9am-6pm
                                </p>
                                <a
                                    href="tel:+6285717943270"
                                    className="text-neutral-900 group-hover:text-white font-light transition-colors"
                                >
                                    +62 857-1794-3270
                                </a>
                            </div>

                            <div className="group bg-neutral-50 rounded-2xl p-10 hover:bg-neutral-900 transition-all duration-500">
                                <MapPin className="w-10 h-10 text-neutral-900 group-hover:text-white mb-6 transition-colors" />
                                <h3 className="text-xl font-light mb-2 text-neutral-900 group-hover:text-white transition-colors">
                                    Visit Us
                                </h3>
                                <p className="text-sm text-neutral-500 group-hover:text-neutral-400 mb-4 transition-colors">
                                    Come say hello
                                </p>
                                <p className="text-neutral-900 group-hover:text-white font-light text-sm transition-colors">
                                    B7, Jl. Cipinang Pulo No.19, RT.7/RW.14, North Cipinang Besar, Jatinegara, East Jakarta City, Jakarta 13410
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-20 pt-16 border-t border-neutral-200">
                            <p className="text-sm text-neutral-500 mb-6">Follow Us</p>
                            <div className="flex gap-4 justify-center">
                                <a
                                    href="#"
                                    className="w-12 h-12 border border-neutral-300 rounded-full flex items-center justify-center hover:bg-neutral-900 hover:border-neutral-900 hover:text-white transition-all"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 border border-neutral-300 rounded-full flex items-center justify-center hover:bg-neutral-900 hover:border-neutral-900 hover:text-white transition-all"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a
                                    target="_blank"
                                    href="https://www.instagram.com/bintang.ydha_"
                                    className="w-12 h-12 border border-neutral-300 rounded-full flex items-center justify-center hover:bg-neutral-900 hover:border-neutral-900 hover:text-white transition-all"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
