import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div className="p-10">
            <AuthenticatedLayout>
                <Head title="Dashboard" />

            </AuthenticatedLayout>
        </div>
    );
}
