import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Calendar, MapPin, Clock, Grid3x3, List, Search, Filter } from 'lucide-react';
import { Event } from '@/features/events/types';
import { Button } from './ui/button';

interface EventsListViewProps {
    events: Event[];
}

const EventsListView: React.FC<EventsListViewProps> = ({ events }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase(),
            year: date.getFullYear(),
            fullDate: date.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        };
    };

    const isEventActive = (event: Event) => {
        const now = new Date();
        const endDate = new Date(event.end_date);
        return event.is_active && endDate >= now;
    };

    const activeEvents = events.filter(isEventActive);
    const upcomingEvents = activeEvents.filter(e => new Date(e.start_date) > new Date());
    const ongoingEvents = activeEvents.filter(e => {
        const now = new Date();
        return new Date(e.start_date) <= now && new Date(e.end_date) >= now;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">All Events</h1>
                            <p className="text-sm text-gray-600 mt-1">
                                {activeEvents.length} events available
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'grid'
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <Grid3x3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'list'
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeEvents.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Calendar className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Available</h3>
                        <p className="text-gray-600">Check back soon for upcoming events!</p>
                    </div>
                ) : (
                    <>
                        {viewMode === 'grid' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeEvents.map((event) => {
                                    const startDate = formatDate(event.start_date);
                                    const isOngoing = ongoingEvents.some(e => e.id === event.id);

                                    return (
                                        <Link
                                            key={event.id}
                                            href={`/event/${event.slug}`}
                                            className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                                        >
                                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                                <img
                                                    src={`/storage/${event.image}`}
                                                    alt={event.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />

                                                <div className="absolute top-3 left-3 bg-white rounded-lg px-3 py-2 shadow-md">
                                                    <p className="text-2xl font-bold text-gray-900 leading-none">{startDate.day}</p>
                                                    <p className="text-xs font-semibold text-orange-600 uppercase">{startDate.month}</p>
                                                </div>

                                                {isOngoing && (
                                                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                        Live
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                                    {event.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {event.description}
                                                </p>

                                                <div className="space-y-2">
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                                                        <span>{startDate.fullDate}</span>
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                                        <span className="truncate">{event.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}

                        {viewMode === 'list' && (
                            <div className="space-y-4">
                                {activeEvents.map((event) => {
                                    const startDate = formatDate(event.start_date);
                                    const endDate = formatDate(event.end_date);
                                    const isOngoing = ongoingEvents.some(e => e.id === event.id);

                                    return (
                                        <Link
                                            key={event.id}
                                            href={`/events/${event.slug}`}
                                            className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                                        >
                                            <div className="flex flex-col md:flex-row">
                                                <div className="relative md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden bg-gray-100">
                                                    <img
                                                        src={`/storage/${event.image}`}
                                                        alt={event.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />

                                                    <div className="absolute top-3 left-3 bg-white rounded-lg px-3 py-2 shadow-md">
                                                        <p className="text-2xl font-bold text-gray-900 leading-none">{startDate.day}</p>
                                                        <p className="text-xs font-semibold text-orange-600 uppercase">{startDate.month}</p>
                                                    </div>

                                                    {isOngoing && (
                                                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                            Live
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1 p-6">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                                                                {event.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                                                {event.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-4 text-sm">
                                                        <div className="flex items-center text-gray-700">
                                                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                                            <span>{startDate.day} {startDate.month} - {endDate.day} {endDate.month} {endDate.year}</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-700">
                                                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4">
                                                        <span className="inline-block bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                                                            View Details →
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
                <Button onClick={() => router.visit(route('home'))} className='mt-5 w-full'>
                Back
            </Button>
            </div>
        </div>
    );
};

export default EventsListView;