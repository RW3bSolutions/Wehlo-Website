import React from "react";
import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout"; // Assuming you have a MainLayout component
import { Users, DollarSign, Activity, BarChart } from "lucide-react"; // Example icons

/**
 * Dashboard Component
 *
 * This component represents a typical dashboard page in a React Inertia application.
 * It includes a main layout, a page title, and sections for displaying summary data
 * and recent activities.
 *
 * @param {object} props - The component props.
 * @param {object} props.auth - Authentication data, typically shared by Inertia.
 * @param {object} props.auth.user - The authenticated user object.
 */
export default function Dashboards({ auth }) {
    return (
        <MainLayout>
            {/* Set the page title for Inertia */}
            <Head title="Dashboard" />

            {/* Coming Soon Section */}
            <section className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                <div className="p-8 text-center">
                    <h1 className="mb-4 text-5xl font-extrabold text-blue-700 dark:text-blue-400 animate-pulse">
                        Coming Soon!
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300">
                        We're working hard to bring you exciting new features.
                        Please check back later.
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/" // Assuming a route named 'dashboard' exists
                            className="inline-flex items-center px-6 py-3 text-base font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Go Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
