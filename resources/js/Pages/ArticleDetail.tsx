import Footer from "@/Components/Footer";
import AppNavbar from "@/Components/Navbar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { Payment } from "@/features/articles/types";
import { PageProps } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { Calendar, User, Clock, Share2, Bookmark, ChevronRight, TrendingUp, ChevronLeft } from "lucide-react";

interface ArticleProps extends PageProps {
    article: Payment;
    latestArticles?: Payment[];
}

export default function ArticleDetail() {
    const { article, latestArticles = [] } = usePage<ArticleProps>().props;

    return (
        <>
            <AppNavbar />

            <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-cover bg-center">
                    <img src="/images/article.jpg" className="w-full" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <h2 className="text-5xl lg:text-6xl font-black mb-4 max-w-3xl">
                        AyoDev.id Articles
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Insights and perspectives on digital transformation, technology, and innovation
                    </p>

                </div>
            </div>

            <Breadcrumb className="p-10 bg-transparent">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{article.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8">
                            <div className="relative aspect-video mb-10 rounded-2xl overflow-hidden shadow-2xl">
                                {article.thumbnail ? (

                                    <img
                                        src={`/storage/${article.thumbnail}`}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img src="/images/fallback.jpg" alt="" className="w-full h-full object-cover" />

                                )}
                            </div>

                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-4 py-1.5 bg-orange-500 text-white text-sm font-bold rounded-full uppercase tracking-wide">
                                        Article
                                    </span>
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                    {article.title}
                                </h1>
                                <div className="flex items-center gap-6 text-gray-700 mb-6">
                                    <div className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        <span className="font-semibold">{article.author}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-10  border-b-2 border-gray-200">
                            </div>

                            <article className="prose max-w-3xl">
                                <div
                                    className="text-gray-800 space-y-6 break-words"
                                    style={{
                                        fontFamily: "'Georgia', serif",
                                        fontSize: '1.125rem',
                                        lineHeight: '1.8',
                                        overflowWrap: 'break-word',
                                        wordBreak: 'break-word',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />
                            </article>

                        </div>

                        <div className="lg:col-span-4">
                            <div className="sticky top-6 space-y-8 flex flex-col ">
                                <div className="bg-white rounded-2xl border-2 border-gray-900 p-6 shadow-lg">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-black text-gray-900">
                                            Latest Articles
                                        </h3>
                                        <div className="w-12 h-1 bg-orange-500"></div>
                                    </div>

                                    <div className="space-y-6">
                                        {latestArticles.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="group cursor-pointer pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                                            >
                                                <button onClick={() => router.visit(`/articles/detail/${item.slug}`)} className="flex gap-4">
                                                    <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-rose-100 rounded-xl overflow-hidden flex-shrink-0">
                                                        {item.thumbnail ? (
                                                            <img
                                                                src={`/storage/${item.thumbnail}`}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                            />

                                                        ) : (
                                                            <img src="/images/fallback.jpg" alt="" className="w-full h-full object-cover" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0 items-start flex flex-col">
                                                        <div className="text-xs font-bold text-orange-600 mb-2">
                                                            #{index + 1}
                                                        </div>
                                                        <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-600 flex items-center gap-2">
                                                            <User className="w-3 h-3" />
                                                            {item.author}
                                                        </p>
                                                    </div>
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <button onClick={() => router.visit(route('article.view'))} className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                        View All Articles
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                <Link href={route('home')}>
                                    <Button className="right-0">
                                        <ChevronLeft />
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
        </>
    );
}
