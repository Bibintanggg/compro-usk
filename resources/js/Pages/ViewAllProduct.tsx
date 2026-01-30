import AppNavbar from "@/Components/Navbar";
import { Products } from "@/features/products/types";
import { PageProps } from "@/types";
import { usePage, router, Link } from "@inertiajs/react";
import { useState } from "react";
import { Search, SlidersHorizontal, Grid3x3, List, Heart, ShoppingBag, Star, TrendingUp, X, ChevronLeft } from "lucide-react";
import Footer from "@/Components/Footer";
import { Button } from "@/Components/ui/button";

interface ProductsPageProps extends PageProps {
    products: Products[];
}

export default function AllProducts() {
    const { products } = usePage<ProductsPageProps>().props;
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
    const [showFilters, setShowFilters] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Filter & Sort Logic
    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            product.price >= priceRange[0] &&
            product.price <= priceRange[1] &&
            product.is_active
        )

    const handleProductClick = (slug: string) => {
        router.visit(route('product.detail', slug, false));
    };


    return (
        <>
            <AppNavbar />

            <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`,
                    }}></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <h1 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        All Products
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Discover our curated collection of premium products designed for excellence
                    </p>
                </div>
            </div>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-4 z-20">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                />
                            </div>


                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-3 rounded-xl border-2 transition-all ${viewMode === "grid"
                                        ? "border-purple-500 bg-purple-50 text-purple-600"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <Grid3x3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-3 rounded-xl border-2 transition-all ${viewMode === "list"
                                        ? "border-purple-500 bg-purple-50 text-purple-600"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> products
                        </p>
                    </div>

                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleProductClick(product.slug)}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                                >
                                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xl font-bold text-gray-900">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleProductClick(product.slug)}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                                >
                                    <div className="flex gap-6 p-6">
                                        <div className="relative w-48 h-48 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            {product.order > 95 && (
                                                <div className="absolute top-3 left-3 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                                                    NEW
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-600 mb-4 line-clamp-2">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-3xl font-bold text-gray-900">
                                                    {formatPrice(product.price)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                        </div>
                    )}

                </div>
                <Link href={route('home')} className=" flex items-center flex-col">
                    <Button className="right-0">
                        <ChevronLeft />
                        Back
                    </Button>
                </Link>


                <Footer />

            </div>
        </>
    );
}
