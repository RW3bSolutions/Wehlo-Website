import { Link, Head, usePage } from "@inertiajs/react"; // Import usePage
import MainLayout from "@/Layouts/MainLayout";
import { Dot } from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useRef } from "react"; // Import useEffect and useRef
import AnimatedButton from "@/components/AnimatedButton";
// Assuming FeatureCard, StatCard, FeatureBlock are in ../components/
// If they are not, you might need to adjust the import paths.
import FeatureCard from "../components/FeatureCard";
// StatCard and FeatureBlock are not directly used in the provided Platform.jsx,
// but keeping them imported as they might be in a full project structure.
// import StatCard from "../components/StatCard";
// import FeatureBlock from "../components/FeatureBlock";
import { useHighlightQuery } from "@/hooks/useHighlightQuery"; // Import the custom hook

const featureBlockVariants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};
const featureCardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
    }),
};

const partnerHeadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const features = [
    {
        title: "Real-Time Monitoring",
        desc: "Live data from localized stations available 24/7.",
    },
    {
        title: "Interactive Dashboard",
        desc: "Customizable interface with visual charts and data layers.",
    },
    {
        title: "Automated Alerts & Notifications",
        desc: "Set thresholds and receive alerts for flood risks, air quality drops, and more.",
    },

    {
        title: "Data Export & Reporting Tools",
        desc: "Generated automated downloadable reports for compliance or presentation.",
    },
    {
        title: "Multi-Device Access",
        desc: "Works seamlessly across desktops, tablets, and mobile.",
    },
    {
        title: "Sensor Integration",
        desc: "Connects to multiple sensors-temperature, humidity, rainfall, AQI, river levels, wind data, etc.",
    },
];
const screenshots = [
    "/images/Platform/platform screenshots/1.png",
    "/images/Platform/platform screenshots/2.png",
    "/images/Platform/platform screenshots/3.png",
    "/images/Platform/platform screenshots/4.png",
    "/images/Platform/platform screenshots/5.png",
    "/images/Platform/platform screenshots/6.png",
    "/images/Platform/platform screenshots/7.png",
    "/images/Platform/platform screenshots/8.png",
    "/images/Platform/platform screenshots/9.png",
    "/images/Platform/platform screenshots/10.png",
    "/images/Platform/platform screenshots/11.png",
];

export default function Platform() {
    const { url } = usePage(); // Get the current URL from Inertia
    const queryParams = new URLSearchParams(window.location.search);
    const searchQuery = queryParams.get("q"); // Get the 'q' parameter from the URL

    // Ref to store the first highlighted element
    const firstHighlightRef = useRef(null);

    // Function to highlight text
    const highlightText = (text, query) => {
        const stringText = String(text || ""); // Ensure text is a string

        if (!query || query.trim() === "") {
            return stringText; // No query, return original text
        }
        const parts = [];
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(${escapedQuery})`, "gi");
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(stringText)) !== null) {
            if (match.index > lastIndex) {
                parts.push(stringText.substring(lastIndex, match.index));
            }
            parts.push(
                <mark
                    key={match.index}
                    className="px-1 bg-yellow-300 rounded"
                    ref={firstHighlightRef.current ? null : firstHighlightRef} // Assign ref only to the first match
                >
                    {match[0]}
                </mark>
            );
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < stringText.length) {
            parts.push(stringText.substring(lastIndex));
        }
        return <>{parts}</>;
    };

    useEffect(() => {
        // Scroll to the first highlighted element if it exists
        if (searchQuery && firstHighlightRef.current) {
            firstHighlightRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [searchQuery]); // Re-run effect when searchQuery changes

    useHighlightQuery(); // <-- This enables highlighting

    return (
        <MainLayout>
            <Head title="Platform" />
            <div className="space-y-8">
                <section>
                    <div className="container max-w-screen-xl px-4 pt-8 mx-auto space-y-8">
                        {/* Headline */}
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold text-blue-700 md:text-3xl">
                                {highlightText(
                                    "A Smarter Way to Monitor the Environment - All in One Platform",
                                    searchQuery
                                )}
                            </h1>
                            <p>
                                {highlightText(
                                    "Access real-time, reliable environmental data and analytics—anytime, anywhere.",
                                    searchQuery
                                )}
                            </p>
                        </div>

                        {/* Ticker 1: Left to Right */}
                        <div className="overflow-hidden">
                            <motion.div
                                className="flex gap-4 w-max"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    duration: 40,
                                    ease: "linear",
                                    repeat: Infinity,
                                }}
                            >
                                {[...screenshots, ...screenshots].map(
                                    (src, index) => (
                                        <img
                                            key={`top-${index}`}
                                            src={src}
                                            alt={highlightText(
                                                `Screenshot ${index + 1}`,
                                                searchQuery
                                            )}
                                            className="object-contain h-48"
                                        />
                                    )
                                )}
                            </motion.div>
                        </div>

                        {/* Ticker 2: Right to Left (inverted) */}
                        <div className="overflow-hidden">
                            <motion.div
                                className="flex gap-4 w-max"
                                animate={{ x: ["-50%", "0%"] }}
                                transition={{
                                    duration: 40,
                                    ease: "linear",
                                    repeat: Infinity,
                                }}
                            >
                                {[...screenshots, ...screenshots].map(
                                    (src, index) => (
                                        <img
                                            key={`bottom-${index}`}
                                            src={src}
                                            alt={highlightText(
                                                `Screenshot ${index + 1}`,
                                                searchQuery
                                            )}
                                            className="object-contain h-48"
                                        />
                                    )
                                )}
                            </motion.div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center">
                            <div className="grid grid-cols-1 gap-4 text-base md:grid-cols-2">
                                <div>
                                    <Link href="/dashboards">
                                        <AnimatedButton
                                            text="Explore the Dashboard"
                                            className="w-full text-white bg-blue-600 border border-blue-600 hover:text-blue-600"
                                            bgColor="bg-white"
                                            textColor=""
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/contact_us">
                                        <AnimatedButton
                                            text="Request a Demo"
                                            className="w-full text-blue-600 bg-white border border-blue-600 hover:text-white"
                                            bgColor="bg-blue-600"
                                            textColor=""
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container max-w-screen-xl px-4 mx-auto">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <motion.div
                                className="space-y-4"
                                variants={partnerHeadingVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="flex">
                                    <span className="flex items-center px-4 py-2 space-x-2 text-sm border border-black rounded-full">
                                        <span>
                                            <button className="bg-black rounded-full size-2"></button>
                                        </span>
                                        <span>
                                            {highlightText(
                                                "Core Features",
                                                searchQuery
                                            )}
                                        </span>
                                    </span>
                                </div>
                                <h1 className="text-2xl font-bold text-blue-700 lg:text-4xl">
                                    {highlightText(
                                        "Key Capabilities at Your Fingertips",
                                        searchQuery
                                    )}
                                </h1>
                            </motion.div>

                            {features.map((item, i) => (
                                <React.Fragment key={i}>
                                    <motion.div
                                        className={`bg-white border border-[#479295] rounded-xl flex flex-col justify-between p-4 h-[12rem] ${
                                            i === 1 || i === 4 ? "md:-mt-4" : ""
                                        }`}
                                        custom={i}
                                        variants={featureCardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: false, amount: 0.3 }}
                                    >
                                        <h1 className="text-lg font-bold lg:text-xl">
                                            {highlightText(
                                                item.title,
                                                searchQuery
                                            )}
                                        </h1>
                                        <p className="text-sm lg:text-base">
                                            {highlightText(
                                                item.desc,
                                                searchQuery
                                            )}
                                        </p>
                                    </motion.div>

                                    {i === 2 && <div></div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container relative max-w-screen-xl mx-auto overflow-hidden">
                        <img
                            className="absolute inset-0 w-full h-full"
                            src="/images/Platform/bg (1).webp"
                            alt=""
                        />
                        <div className="relative flex justify-center p-8">
                            <div className="w-full max-w-4xl space-y-8">
                                <div>
                                    <div className="flex items-center justify-center">
                                        <div className="space-y-4">
                                            <div className="flex justify-center">
                                                <span className="flex items-center px-4 py-2 space-x-2 text-sm border border-black rounded-full">
                                                    <span>
                                                        <button className="bg-black rounded-full size-2"></button>
                                                    </span>
                                                    <span>
                                                        {highlightText(
                                                            "Use Cases",
                                                            searchQuery
                                                        )}
                                                    </span>
                                                </span>
                                            </div>
                                            <div>
                                                <h1 className="text-2xl font-bold text-blue-700">
                                                    {highlightText(
                                                        "Designed for Real-World Impact",
                                                        searchQuery
                                                    )}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-white space-y-14">
                                    {/* Disaster Preparedness */}
                                    <motion.div
                                        variants={featureBlockVariants}
                                        initial={"hiddenLeft"}
                                        whileInView="visible"
                                        viewport={{
                                            once: false,
                                            amount: 0.3,
                                        }}
                                        transition={{
                                            duration: 0.7,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <div className="max-w-xl py-4 bg-blue-700 rounded-xl ">
                                            <div className="relative p-4">
                                                <div className="absolute -left-4 -top-0 md:-left-[8rem] md:-top-[8rem]">
                                                    <motion.img
                                                        src="/images/Platform/uc 1.webp"
                                                        alt=""
                                                        className="object-contain size-[8rem] md:size-[20rem] pointer-events-none"
                                                        animate={{
                                                            y: [0, -10, 0], // vertical float
                                                        }}
                                                        transition={{
                                                            duration: 4,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex justify-end ">
                                                    <div className="max-w-[10rem] md:max-w-xs space-y-4">
                                                        <h1 className="text-base font-bold md:text-xl">
                                                            {highlightText(
                                                                "Disaster Preparedness",
                                                                searchQuery
                                                            )}
                                                        </h1>
                                                        <p className="text-xs md:text-sm">
                                                            {highlightText(
                                                                "Real-time alerts and historical data for flood-prone communities",
                                                                searchQuery
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Agriculture Support */}
                                    <motion.div
                                        variants={featureBlockVariants}
                                        initial={"hiddenRight"}
                                        whileInView="visible"
                                        viewport={{
                                            once: false,
                                            amount: 0.3,
                                        }}
                                        transition={{
                                            duration: 0.7,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <div className="flex justify-end ">
                                            <div className="w-full max-w-xl py-4 bg-blue-700 rounded-xl">
                                                <div className="relative p-4">
                                                    <div className="absolute -left-4 -top-0 md:-left-[8rem] md:-top-[8rem]">
                                                        <motion.img
                                                            src="/images/Platform/uc 2.webp"
                                                            alt=""
                                                            className="object-contain size-[8rem] md:size-[20rem] pointer-events-none"
                                                            animate={{
                                                                y: [0, -10, 0], // vertical float
                                                            }}
                                                            transition={{
                                                                duration: 4,
                                                                repeat: Infinity,
                                                                ease: "easeInOut",
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-end ">
                                                        <div className="max-w-[10rem] md:max-w-xs space-y-4">
                                                            <h1 className="text-base font-bold md:text-xl">
                                                                {highlightText(
                                                                    "Agriculture Support",
                                                                    searchQuery
                                                                )}
                                                            </h1>
                                                            <p className="text-xs md:text-sm">
                                                                {highlightText(
                                                                    "Help farmers make informed decisions based on humidity, rainfall, temperature",
                                                                    searchQuery
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Environmental Policy Making */}
                                    <motion.div
                                        variants={featureBlockVariants}
                                        initial={"hiddenLeft"}
                                        whileInView="visible"
                                        viewport={{
                                            once: false,
                                            amount: 0.3,
                                        }}
                                        transition={{
                                            duration: 0.7,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <div className="max-w-xl py-4 bg-blue-700 rounded-xl">
                                            <div className="relative p-4">
                                                <div className="absolute -left-4 -top-0 md:-left-[8rem] md:-top-[8rem]">
                                                    <motion.img
                                                        src="/images/Platform/uc 3.webp"
                                                        alt=""
                                                        className="object-contain size-[8rem] md:size-[20rem] pointer-events-none"
                                                        animate={{
                                                            y: [0, -10, 0], // vertical float
                                                        }}
                                                        transition={{
                                                            duration: 4,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex justify-end ">
                                                    <div className="max-w-[10rem] md:max-w-xs space-y-4">
                                                        <h1 className="text-base font-bold md:text-xl">
                                                            {highlightText(
                                                                "Environmental Policy Making",
                                                                searchQuery
                                                            )}
                                                        </h1>
                                                        <p className="text-xs md:text-sm">
                                                            {highlightText(
                                                                "Enable LGUs to create data-driven climate action strategies.",
                                                                searchQuery
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Educational & Research Tool */}
                                    <motion.div
                                        variants={featureBlockVariants}
                                        initial={"hiddenRight"}
                                        whileInView="visible"
                                        viewport={{
                                            once: false,
                                            amount: 0.3,
                                        }}
                                        transition={{
                                            duration: 0.7,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <div className="flex justify-end ">
                                            <div className="w-full max-w-xl py-4 bg-blue-700 rounded-xl">
                                                <div className="relative p-4">
                                                    <div className="absolute -left-4 -top-0 md:-left-[8rem] md:-top-[8rem]">
                                                        <motion.img
                                                            src="/images/Platform/uc 4.webp"
                                                            alt=""
                                                            className="object-contain size-[8rem] md:size-[20rem] pointer-events-none"
                                                            animate={{
                                                                y: [0, -10, 0], // vertical float
                                                            }}
                                                            transition={{
                                                                duration: 4,
                                                                repeat: Infinity,
                                                                ease: "easeInOut",
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-end ">
                                                        <div className="space-y-4 max-w-[10rem] md:max-w-xs ">
                                                            <h1 className="text-base font-bold md:text-xl">
                                                                {highlightText(
                                                                    "Educational & Research Tool",
                                                                    searchQuery
                                                                )}
                                                            </h1>
                                                            <p className="text-xs md:text-sm">
                                                                {highlightText(
                                                                    "For universities and researchers needing accurate weather and environment data.",
                                                                    searchQuery
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
