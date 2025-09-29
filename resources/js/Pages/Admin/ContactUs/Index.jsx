import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "@/Components/ui/button";
import { useDeleteModal } from "@/Components/Admin/useDeleteModal"; // adjust path if needed

dayjs.extend(relativeTime);

const formatDate = (date) => dayjs(date).format("MM-D-YYYY h:mm A");

const ContactUs = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [intervalId, setIntervalId] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(route("contacts.data"));
            setContacts(response.data.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const id = setInterval(fetchData, 5000);
        setIntervalId(id);
        return () => clearInterval(id);
    }, []);

    const filteredItems = contacts.filter(
        (item) =>
            item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email_address
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            (item.organization || "")
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredItems.length / perPage);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const deleteItem = (id) => {
        useDeleteModal(id, "contacts.destroy", () => {
            setContacts((prev) => prev.filter((item) => item.id !== id));
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="ContactUs" />
            <div className="px-4 py-12">
                <div className="w-full mx-auto md:max-w-2xl lg:max-w-7xl">
                    <div className="overflow-auto bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 space-y-2 bg-white rounded-lg shadow-lg">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">
                                Contact Us
                            </h2>

                            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Search..."
                                    className="w-full max-w-xs px-3 py-2 border rounded md:max-w-sm"
                                />
                                <div className="flex items-center">
                                    <label
                                        htmlFor="entries"
                                        className="mr-2 text-sm md:text-base"
                                    >
                                        Show:
                                    </label>
                                    <select
                                        id="entries"
                                        value={perPage}
                                        onChange={(e) =>
                                            setPerPage(Number(e.target.value))
                                        }
                                        className="w-16 px-2 py-2 text-sm border rounded md:w-20"
                                    >
                                        {[5, 10, 20, 50].map((num) => (
                                            <option key={num} value={num}>
                                                {num}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {!loading ? (
                                <>
                                    <div className="hidden md:table w-full overflow-auto min-w-[700px] rounded-lg">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="text-xs font-semibold text-white uppercase bg-gray-100 md:text-sm">
                                                    <th className="px-12 py-2 text-left bg-black rounded-l-full">
                                                        ID
                                                    </th>
                                                    <th className="py-2 text-center bg-black">
                                                        Full Name
                                                    </th>
                                                    <th className="py-2 text-center bg-black">
                                                        Email Address
                                                    </th>
                                                    <th className="py-2 text-center bg-black">
                                                        Organization
                                                    </th>
                                                    <th className="py-2 text-center bg-black">
                                                        Subject
                                                    </th>
                                                    <th className="py-2 text-center bg-black">
                                                        Message
                                                    </th>
                                                    <th className="py-2 text-center bg-black">
                                                        Created At
                                                    </th>
                                                    <th className="px-12 py-2 text-left bg-black rounded-r-full">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-xs font-light text-gray-700 md:text-sm">
                                                {paginatedItems.map(
                                                    (contact) => (
                                                        <tr
                                                            key={contact.id}
                                                            className="border-b border-gray-200"
                                                        >
                                                            <td className="px-3 py-2 md:px-4 md:py-3">
                                                                {contact.id}
                                                            </td>
                                                            <td className="px-3 py-2 md:px-4 md:py-3">
                                                                {
                                                                    contact.full_name
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2 md:px-4 md:py-3">
                                                                {
                                                                    contact.email_address
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2 md:px-4 md:py-3">
                                                                {
                                                                    contact.organization
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2 md:px-4 md:py-3">
                                                                {
                                                                    contact.subject
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2 md:px-4 md:py-3">
                                                                {
                                                                    contact.message
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2 md:px-4 md:py-3">
                                                                {formatDate(
                                                                    contact.created_at
                                                                )}
                                                            </td>
                                                            <td className="px-3 py-2 text-center md:px-4 md:py-3">
                                                                <Button
                                                                    onClick={() =>
                                                                        deleteItem(
                                                                            contact.id
                                                                        )
                                                                    }
                                                                    className="px-2 py-1 text-xs text-white bg-red-500 rounded md:text-sm"
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile View */}
                                    <div className="block w-full md:hidden">
                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                            {paginatedItems.map((contact) => (
                                                <div
                                                    key={contact.id}
                                                    className="p-3 mb-4 border border-gray-300 rounded-lg shadow-sm"
                                                >
                                                    <p>
                                                        <strong>ID:</strong>{" "}
                                                        {contact.id}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Full Name:
                                                        </strong>{" "}
                                                        {contact.full_name}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Email Address:
                                                        </strong>{" "}
                                                        {contact.email_address}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Organization:
                                                        </strong>{" "}
                                                        {contact.organization}
                                                    </p>{" "}
                                                    <p>
                                                        <strong>
                                                            Subject:
                                                        </strong>{" "}
                                                        {contact.subject}
                                                    </p>{" "}
                                                    <p>
                                                        <strong>
                                                            Message:
                                                        </strong>{" "}
                                                        {contact.message}
                                                    </p>{" "}
                                                    <p>
                                                        <strong>
                                                            Created At:
                                                        </strong>{" "}
                                                        {formatDate(
                                                            contact.created_at
                                                        )}
                                                    </p>
                                                    <div className="mt-2 space-x-2 text-center">
                                                        <button
                                                            onClick={() =>
                                                                deleteItem(
                                                                    contact.id
                                                                )
                                                            }
                                                            className="px-2 py-1 text-xs text-white bg-red-500 rounded md:text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="p-3 text-center">
                                    Loading...
                                </div>
                            )}
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1
                                ).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1 text-sm border rounded ${
                                            currentPage === page
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ContactUs;
