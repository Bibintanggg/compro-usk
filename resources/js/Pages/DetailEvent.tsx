import AppNavbar from '@/Components/Navbar';
import { PageProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Calendar,
    Clock,
    MapPin,
    Share2,
    Bookmark,
    Users,
    CheckCircle2,
    AlertCircle,
    ArrowLeft,
    Navigation,
    Ticket,
    Info,
    MessageCircle,
    Mail
} from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '@/types/formatDate';
import { Event } from '@/features/events/types';
import Footer from '@/Components/Footer';
import { Button } from '@/Components/ui/button';

interface EventDetailProps extends PageProps {
    event: Event;
}

export default function EventDetail() {
    const { event } = usePage<EventDetailProps>().props;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    const today = new Date();
    const daysUntil = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const isUpcoming = startDate > today;
    const isOngoing = today >= startDate && today <= endDate;
    const isPast = today > endDate;

    const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <>
            <Head title={event.name} />
            <AppNavbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
                <div className="relative h-[70vh] overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={`/storage/${event.image}`}
                            alt={event.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                    </div>

                    <div className="absolute top-6 left-6 z-10">
                        <Link
                            href="/event/all"
                            className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Link>
                    </div>

                    <div className="relative h-full flex items-end">
                        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-12">
                            <div className="grid lg:grid-cols-3 gap-8 items-end">
                                <div className="lg:col-span-2 space-y-6">
                                    {isUpcoming && event.is_active && (
                                        <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Event Available
                                        </div>
                                    )}
                                    {isOngoing && (
                                        <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm animate-pulse">
                                            <AlertCircle className="w-4 h-4" />
                                            Happening Now!
                                        </div>
                                    )}
                                    {isPast && (
                                        <div className="inline-flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            Event Ended
                                        </div>
                                    )}

                                    <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-2xl">
                                        {event.name}
                                    </h1>

                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-medium">
                                                {formatDate(event.start_date)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full">
                                            <Clock className="w-4 h-4" />
                                            <span className="font-medium">
                                                {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full">
                                            <MapPin className="w-4 h-4" />
                                            <span className="font-medium">{event.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-1">
                                    <div className="bg-white rounded-3xl p-6 shadow-2xl">
                                        {isUpcoming && daysUntil > 0 && (
                                            <div className="text-center mb-6 pb-6 border-b border-gray-200">
                                                <p className="text-sm text-gray-600 mb-2">Event starts in</p>
                                                <div className="text-4xl font-black text-red-600">
                                                    {daysUntil}
                                                </div>
                                                <p className="text-sm text-gray-600 font-semibold">
                                                    {daysUntil === 1 ? 'Day' : 'Days'}
                                                </p>
                                            </div>
                                        )}

                                        <div className="space-y-3">
                                            {isUpcoming && event.is_active ? (
                                                <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-red-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                                    <Ticket className="w-5 h-5" />
                                                    Register Now
                                                </button>
                                            ) : isPast ? (
                                                <button disabled className="w-full bg-gray-300 text-gray-600 py-4 rounded-2xl font-bold text-lg cursor-not-allowed">
                                                    Event Ended
                                                </button>
                                            ) : (
                                                <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg">
                                                    Join Now
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-3xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                        <Info className="w-5 h-5 text-red-600" />
                                    </div>
                                    About This Event
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                                    {event.description}
                                </p>

                                <div className="">
                                    <div
                                        className="text-sm text-gray-600 leading-relaxed break-all whitespace-normal"
                                        dangerouslySetInnerHTML={{ __html: event.content }}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border border-blue-200">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Date & Time</h3>
                                            <p className="text-sm text-gray-700 font-semibold">
                                                {formatDate(event.start_date)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                to {formatDate(event.end_date)}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Duration: {durationDays} {durationDays === 1 ? 'day' : 'days'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 border border-purple-200">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                                            <p className="text-sm text-gray-700 font-semibold mb-3 break-all whitespace-normal">
                                                {event.location}
                                            </p>
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700"
                                            >
                                                <Navigation className="w-4 h-4" />
                                                Get Directions
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-6 space-y-6">
                                <div className="bg-white rounded-3xl p-6 shadow-sm">
                                    <h3 className="font-bold text-lg mb-4">Organized by</h3>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br  rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                                            <img src="/images/logo.jpg" alt="" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Deloitte Digital</h4>
                                            <p className="text-sm text-gray-600">Event Organizer</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <Button onClick={() => router.visit(route('event.all'))} className='mt-5 w-full'>
                                Back
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {showShareModal && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowShareModal(false)}
                >
                    <div
                        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold">Share Event</h3>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-gray-900">Share on Facebook</span>
                            </button>

                            <button className="w-full flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all">
                                <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-gray-900">Share on Twitter</span>
                            </button>

                            <button className="w-full flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 rounded-2xl transition-all">
                                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-gray-900">Share on WhatsApp</span>
                            </button>

                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600 mb-3">Or copy link</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={window.location.href}
                                        readOnly
                                        className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm"
                                    />
                                    <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all">
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />

        </>
    );
}
