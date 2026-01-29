import React from 'react';
import { Head } from '@inertiajs/react';
import AppNavbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import EventsListView from '@/Components/EventView';
import { Event } from '@/features/events/types';
import { PageProps } from '@/types';

interface ViewAllEventProps extends PageProps {
    event: Event[];
}

export default function ViewAllEvent({ event }: ViewAllEventProps) {
    return (
        <>
            <Head title="All Events - Deloitte Digital" />
            
            <AppNavbar />
            
            <EventsListView events={event} />
            
            <Footer />
        </>
    );
}