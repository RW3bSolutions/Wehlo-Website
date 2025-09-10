import { Link, Head, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Dot } from "lucide-react";
import { Facebook, Instagram, Linkedin } from "lucide-react"; // Ensure all used icons are imported
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { motion } from "motion/react";
import AnimatedButton from "@/components/AnimatedButton";
import React, { useEffect, useRef } from "react"; // Import useEffect and useRef
import { useHighlightQuery } from "@/hooks/useHighlightQuery"; // Import the custom hook

export default function ContactUs() {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: "",
        email_address: "",
        organization: "",
        subject: "",
        message: "",
    });

    const { url } = usePage(); // Get the current URL from Inertia
    const queryParams = new URLSearchParams(window.location.search);
    const searchQuery = queryParams.get("q"); // Get the 'q' parameter from the URL

    // Ref to store the first highlighted element
    const firstHighlightRef = useRef(null);

    // Function to highlight text
    const highlightText = (text, query) => {
        if (!query || query.trim() === "") {
            return text; // No query, return original text
        }
        const parts = [];
        const regex = new RegExp(`(${query})`, "gi"); // Case-insensitive global search
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            // Add the highlighted match
            parts.push(
                <mark
                    key={match.index} // Use index as key for simplicity, consider a more unique key if list order changes
                    className="px-1 bg-yellow-300 rounded" // Tailwind class for highlighting
                    ref={firstHighlightRef.current ? null : firstHighlightRef} // Assign ref only to the first match
                >
                    {match[0]}
                </mark>
            );
            lastIndex = regex.lastIndex;
        }
        // Add any remaining text after the last match
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }
        return <>{parts}</>;
    };

    useEffect(() => {
        // Scroll to the first highlighted element if it exists
        if (firstHighlightRef.current) {
            firstHighlightRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [searchQuery]); // Re-run effect when searchQuery changes

    useHighlightQuery(); // <-- This enables highlighting

    return (
        <MainLayout>
            <Head title="Contact Us" />
            <div className="space-y-12">
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <motion.img
                            src="/images/bg element.webp"
                            alt=""
                            className="absolute object-cover object-top"
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 60,
                                ease: "linear",
                            }}
                        />
                    </div>
                    <div className="container relative max-w-screen-xl px-4 pt-8 mx-auto">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-4">
                                <div className="flex">
                                    <span className="flex items-center px-4 py-2 space-x-2 text-sm border border-black rounded-full">
                                        <span>
                                            <button className="bg-black rounded-full size-2"></button>
                                        </span>
                                        <span>Contact Info</span>
                                    </span>
                                </div>
                                <h1 className="text-2xl font-bold text-blue-700">
                                    {highlightText(
                                        "Get in Touch with WEHLO",
                                        searchQuery
                                    )}
                                </h1>
                                <p>
                                    {highlightText(
                                        "We're here to answer your questions, discuss partnerships, and support your monitoring needs.",
                                        searchQuery
                                    )}
                                </p>
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <img
                                                src="/images/Contact Us/icon call us.svg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-2 ">
                                            <span className="font-bold ">
                                                {highlightText(
                                                    "Call Us",
                                                    searchQuery
                                                )}
                                            </span>
                                            <span className="text-sm text-blue-700">
                                                {highlightText(
                                                    "+63 912 345 6789",
                                                    searchQuery
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <img
                                                src="/images/Contact Us/icon clock.svg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-2 ">
                                            <span className="font-bold ">
                                                {highlightText(
                                                    "Send Us an Email",
                                                    searchQuery
                                                )}
                                            </span>
                                            <span className="text-sm text-blue-700">
                                                {highlightText(
                                                    "hello@wehlo.ph",
                                                    searchQuery
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <img
                                                src="/images/Contact Us/icon clock.svg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-2 ">
                                            <span className="font-bold ">
                                                {highlightText(
                                                    "Business Hours",
                                                    searchQuery
                                                )}
                                            </span>
                                            <span className="text-sm text-blue-700">
                                                {highlightText(
                                                    "Mon-Fri: 9AM-6PM",
                                                    searchQuery
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <img
                                                src="/images/Contact Us/icon office address.svg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <span className="font-bold ">
                                                {highlightText(
                                                    "Office Address",
                                                    searchQuery
                                                )}
                                            </span>
                                            <span className="text-sm text-blue-700">
                                                {highlightText(
                                                    "123 Climate Tech Park,",
                                                    searchQuery
                                                )}
                                                <br />
                                                {highlightText(
                                                    "Greenbelt City, Philippines",
                                                    searchQuery
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h1 className="font-semibold">
                                        {highlightText(
                                            "Follow Us on Social Media",
                                            searchQuery
                                        )}
                                    </h1>
                                    <ul className="flex items-center space-x-2 text-blue-700 ">
                                        <li>
                                            <div className="p-2 border border-blue-700 rounded-full">
                                                <Facebook />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="p-2 border border-blue-700 rounded-full">
                                                <Instagram />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="p-2 border border-blue-700 rounded-full">
                                                <Linkedin />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="p-2 border border-blue-700 rounded-full">
                                                <Facebook />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="p-2 border border-blue-700 rounded-full">
                                                <Facebook />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="p-4 space-y-4 bg-[#f1f1f1] rounded-xl">
                                <div className="flex">
                                    <span className="flex items-center px-4 py-2 space-x-2 text-sm bg-white border border-black rounded-full">
                                        <span>
                                            <button className="bg-black rounded-full size-2"></button>
                                        </span>
                                        <span>Contact Form</span>
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-blue-700">
                                    {highlightText(
                                        "Send Us a Message",
                                        searchQuery
                                    )}
                                </h1>
                                <p className="">
                                    {highlightText(
                                        "Share your inquiries or feedback using the form below. Our team will respond within 1-2 business days.",
                                        searchQuery
                                    )}
                                </p>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        post(route("store.contacts"), {
                                            preserveScroll: true,
                                            onSuccess: () => {
                                                Swal.fire({
                                                    icon: "success",
                                                    title: "Message Sent!",
                                                    text: "We will get back to you shortly.",
                                                    confirmButtonColor:
                                                        "#3085d6",
                                                });
                                                reset();
                                            },
                                            onError: () => {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Submission Failed",
                                                    text: "Please check the form for errors.",
                                                    confirmButtonColor: "#d33",
                                                });
                                            },
                                        });
                                    }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent placeholder-gray-400 border border-[#00AAFF] rounded-full"
                                            placeholder="Full Name"
                                            value={data.full_name}
                                            onChange={(e) =>
                                                setData(
                                                    "full_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.full_name && (
                                            <div className="text-sm text-red-500">
                                                {errors.full_name}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="email"
                                            className="w-full bg-transparent placeholder-gray-400 border border-[#00AAFF] rounded-full"
                                            placeholder="Email Address"
                                            value={data.email_address}
                                            onChange={(e) =>
                                                setData(
                                                    "email_address",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.email_address && (
                                            <div className="text-sm text-red-500">
                                                {errors.email_address}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent placeholder-gray-400 border border-[#00AAFF] rounded-full"
                                            placeholder="Organization (optional)"
                                            value={data.organization}
                                            onChange={(e) =>
                                                setData(
                                                    "organization",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent placeholder-gray-400 border border-[#00AAFF] rounded-full"
                                            placeholder="Subject"
                                            value={data.subject}
                                            onChange={(e) =>
                                                setData(
                                                    "subject",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.subject && (
                                            <div className="text-sm text-red-500">
                                                {errors.subject}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <textarea
                                            rows={6}
                                            className="w-full bg-transparent placeholder-gray-400 border border-[#00AAFF] rounded-2xl"
                                            placeholder="Message"
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    "message",
                                                    e.target.value
                                                )
                                            }
                                        ></textarea>
                                        {errors.message && (
                                            <div className="text-sm text-red-500">
                                                {errors.message}
                                            </div>
                                        )}
                                    </div>

                                    <AnimatedButton
                                        text={
                                            processing
                                                ? "Sending..."
                                                : "Send Message"
                                        }
                                        className="font-thin text-white bg-blue-600 hover:text-blue-600"
                                        bgColor="bg-white"
                                        textColor=""
                                        disabled={processing}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d73922.90187078266!2d120.93836015231696!3d14.596577749809615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca03571ec38b%3A0x69d1d5751069c11f!2sManila%2C%20Metro%20Manila!5e1!3m2!1sen!2sph!4v1747643378624!5m2!1sen!2sph"
                        className="w-full"
                        height="300"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>

                <section>
                    <div className="container max-w-screen-xl mx-auto">
                        <hr className="border border-black" />
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
