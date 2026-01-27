import AppNavbar from "@/Components/Navbar";
import { Payment } from "@/features/articles/types";
import { PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { Users } from "lucide-react";

interface ArticleProps extends PageProps {
    article: Payment[]
}
export default function ViewAllArticles() {
    const { article } = usePage<ArticleProps>().props

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
                        Deloitte Digital Articles
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Insights and perspectives on digital transformation, technology, and innovation
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 p-14">
                {article.map((item: Payment, index: number) => {
                    const pattern = index % 6;

                    const gridClass = (() => {
                        switch (pattern) {
                            case 0:
                                return "col-span-4 row-span-2 h-96";
                            case 1:
                                return "col-span-1 row-span-1 h-72";
                            default:
                                return "col-span-1 row-span-1 h-72";
                        }
                    })();

                    return (
                        <div
                            key={item.id}
                            className={`${gridClass} group relative overflow-hidden rounded-xl cursor-pointer`}
                        >
                            <img
                                src={`/storage/${item.thumbnail}`}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500
                                group-hover:opacity-90"
                            />

                            <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-gray-200 text-sm">
                                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/90">
                                            <Users className="text-black w-4 h-4" />
                                        </div>
                                        {item.author}
                                    </div>

                                    <p className="text-xl font-semibold text-white leading-snug">
                                        {item.title}
                                    </p>
                                </div>

                                <button onClick={() => router.visit(route('article.detail', item.id))}
                                    className="mt-4 w-fit flex items-center gap-2 bg-white text-black text-sm font-semibold px-4 py-2 rounded-full
                                        opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                    Read Article
                                    <span className="text-lg">→</span>
                                </button>
                            </div>
                        </div>

                    );
                })}
            </div>

        </>
    )
}
