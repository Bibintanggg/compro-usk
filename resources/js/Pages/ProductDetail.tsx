import AppNavbar from "@/Components/Navbar";
import { Products } from "@/features/products/types";
import { PageProps } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Heart, Share2, Star, ShoppingBag, TrendingUp, ArrowRight } from "lucide-react";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import Footer from "@/Components/Footer";

interface ProductProps extends PageProps {
    product: Products;
    relatedProducts?: Products[];
}

export default function ProductDetail() {
    const { product, relatedProducts } = usePage<ProductProps>().props;
    const [quantity, setQuantity] = useState(1);

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

            <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-cover bg-center">
                    <img src="/images/product.jpg" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-semibold tracking-wider uppercase text-yellow-400">Trending Now</span>
                    </div>
                    <h2 className="text-5xl lg:text-6xl font-black mb-4 max-w-3xl">
                        Deloitte Digital Products
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Digital solutions designed to drive business impact and innovation
                    </p>

                </div>
            </div>

            <Breadcrumb className="p-10 bg-[#f7f7f7]">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-5 space-y-4">
                            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden group shadow-lg">
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                <div className="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity shadow">
                                    <img
                                        src={`/storage/${product.image}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 bg-white rounded-2xl p-8 shadow-lg">
                            <div className="mb-6">
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                                    {product.name}
                                </h1>
                                <p className="text-base text-gray-600">{product.description}</p>
                            </div>

                            {/* <div className="flex items-center gap-2 mb-6">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">(4.8 / 128 reviews)</span>
                            </div> */}
                            <p className="text-xl text-gray-600 mb-5">Stock Available : {product.order}</p>
                            <div className="mb-8 pb-8 border-b border-gray-200">
                                <p className="text-4xl font-bold text-gray-900">
                                    {formatPrice(product.price)}
                                </p>
                            </div>

                            {/* <div className="mb-8">
                                <label className="text-sm font-semibold text-gray-900 block mb-4">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-gray-900 transition-colors font-semibold"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-semibold w-16 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        disabled={quantity >=  product.order}
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-gray-900 transition-colors font-semibold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div> */}

                            <div className="space-y-3 mb-8">
                                <button onClick={() => router.visit(route('product.checkout', product.slug))}
                                    className="w-full border-2 border-black text-black py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                                    Buy Now
                                </button>
                            </div>

                            <div className="border-t border-gray-200 pt-8">
                                <div className="flex gap-8 mb-6 border-b border-gray-200">
                                    <button
                                        className={`pb-4 font-semibold transition-colors relative border-b-2 border-black`}
                                    >
                                        Product Details
                                    </button>
                                </div>
                                <div className="prose prose-sm max-w-none">
                                    <p className="text-gray-700 leading-relaxed">
                                        {product.content}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Another Product</h3>
                                    <button onClick={() => router.visit(route('product.view'))} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                        View All
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {relatedProducts?.slice(3).filter(e => e.is_active).map((item) => (
                                        <div
                                            key={item.id}
                                            className="group cursor-pointer border border-gray-200 rounded-xl p-3 hover:border-gray-400 hover:shadow-md transition-all"
                                        >
                                            <button className="w-full flex gap-4" onClick={() => router.visit(route('product.detail', item.id))}>
                                                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={`/storage/${item.image}`}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 w-full text-start">
                                                    <h4 className="font-semibold max-w-2xl text-gray-900 text-sm mb-1 truncate">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-xs  text-gray-600 mb-2 line-clamp-2  ">
                                                        {item.description}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-bold text-gray-900 text-sm">
                                                            {formatPrice(item.price)}
                                                        </p>
                                                        <div className="flex">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Star
                                                                    key={star}
                                                                    className="w-3 h-3 fill-yellow-400 text-yellow-400"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        </>
    );
}
