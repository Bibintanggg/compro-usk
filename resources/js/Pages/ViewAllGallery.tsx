import AppNavbar from '@/Components/Navbar';
import type { Gallery } from '@/features/gallery/types';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, X, Download, Share2 } from 'lucide-react';
import { useState } from 'react';

interface GalleryPageProps extends PageProps {
    gallery: Gallery[];
}

export default function Gallery() {
    const { gallery } = usePage<GalleryPageProps>().props;
    const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

    const getBentoClass = (index: number) => {
        const pattern = index % 8;
        switch (pattern) {
            case 0: return "md:col-span-2 md:row-span-2";
            case 1: return "md:col-span-1 md:row-span-1";
            case 2: return "md:col-span-1 md:row-span-2";
            case 3: return "md:col-span-2 md:row-span-1";
            case 4: return "md:col-span-1 md:row-span-1";
            case 5: return "md:col-span-1 md:row-span-2";
            case 6: return "md:col-span-2 md:row-span-1";
            case 7: return "md:col-span-1 md:row-span-1";
            default: return "md:col-span-1 md:row-span-1";
        }
    };

    return (
        <>
            <Head title="Gallery" />
            <AppNavbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                        <div className="text-center">
                            <h1
                                data-aos="fade-up"
                                className="text-5xl md:text-6xl font-bold mb-4"
                            >
                                Our Gallery
                            </h1>
                            <div
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                className="w-24 h-1 bg-white mx-auto mb-6"
                            ></div>
                            <p
                                data-aos="fade-up"
                                data-aos-duration="1500"
                                className="text-lg text-gray-300 max-w-2xl mx-auto"
                            >
                                A curated collection showcasing our best work, memorable moments, and creative excellence
                            </p>
                            <div className="mt-8 flex items-center justify-center gap-6">
                                <div className="text-center">
                                    <p className="text-3xl font-bold">{gallery.length}</p>
                                    <p className="text-sm text-gray-400">Total Images</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
                        {gallery.map((item: Gallery, index: number) => (
                            <div
                                key={item.id}
                                className={`${getBentoClass(index)} relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300`}
                                onClick={() => setSelectedImage(item)}
                            >
                                <img
                                    src={`/storage/${item.image}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex justify-end gap-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">

                                    </div>

                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-white text-xl font-bold drop-shadow-lg mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/80 text-sm">
                                            Click to view full size
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-colors duration-300 pointer-events-none" />
                            </div>
                        ))}
                    </div>

                    {gallery.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Images Yet</h3>
                            <p className="text-gray-500">Check back soon for amazing content!</p>
                        </div>
                    )}
                </div>

                <div className="text-center pb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        Back to Home
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    <div
                        className="relative max-w-5xl max-h-[90vh] w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={`/storage/${selectedImage.image}`}
                            alt={selectedImage.title}
                            className="w-full h-full object-contain rounded-lg"
                        />

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                            <h3 className="text-white text-2xl font-bold mb-2">
                                {selectedImage.title}
                            </h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
