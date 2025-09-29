import { Link, Head, usePage } from "@inertiajs/react"; // Import usePage
import MainLayout from "@/Layouts/MainLayout";
import { Dot } from "lucide-react";
import { motion } from "motion/react";
import FeatureCard from "../components/FeatureCard";
import StatCard from "../components/StatCard";
import FeatureBlock from "../components/FeatureBlock";
import React, { useEffect, useRef } from "react"; // Import useEffect and useRef
import { useHighlightQuery } from "@/hooks/useHighlightQuery"; // Import the custom hook

const videoIntroVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

const featureBlockVariants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const founderBlockVariants = {
    hiddenLeft: { opacity: 0, x: 50 },
    hiddenRight: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const statsContainerVariants = {
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const statVariants = {
    hidden: { scale: 0.7, opacity: 0 },
    visible: {
        scale: [1.2, 1],
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            type: "spring",
            bounce: 0.4,
        },
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

const partnerLogos = [
    "4.png",
    "15.png",
    "17.png",
    "18.png",
    "21.png",
    "25.png",
    "26.png",
    "29.png",
    "44 1.png",
    "4.png",
    "15.png",
    "17.png",
    "18.png",
    "21.png",
    "25.png",
    "26.png",
    "29.png",
    "44 1.png",
];

const features = [
    {
        tag: "Our Mission",
        title: "Empowering Communities Through Environmental Intelligence",
        description:
            "Our mission is to strengthen community resilience by providing accessible, localized, and real-time monitoring systems that track weather patterns, environmental conditions, and hydrological changes with precision.",
        image: "/images/About Us/img mission.webp",
        reverse: false,
    },
    {
        tag: "Our Vision",
        title: "A Climate-Smart Nation Built on Accurate and Transparent data",
        description:
            "We envision a future where every city, municipality, and barangay is equipped with knowledge and tools to respond proactively to environmental challenges, powered by localized monitoring systems like WEHLO.",
        image: "/images/About Us/img vision.webp",
        reverse: true,
    },
];

const stats = [
    {
        icon: "/images/About Us/icon100.webp",
        value: "100+",
        label: "Monitoring Stations Deployed",
    },
    {
        icon: "/images/About Us/icon50.webp",
        value: "50+",
        label: "Partner LGUs",
    },
    {
        icon: "/images/About Us/icon50000.webp",
        value: "500,000+",
        label: "People Impacted",
    },
    {
        icon: "/images/About Us/icon247.webp",
        value: "24/7",
        label: "Real-Time Monitoring",
    },
    {
        icon: "/images/About Us/icon experience.png",
        value: "+4",
        label: "Years of Experience",
    },
];

const featureGroups = [
    [
        {
            icon: "/images/About Us/icon temperature.webp",
            title: "Temperature",
            description:
                "Monitor real-time temperature levels to track heat trends, forecast weather changes, and support climate-sensitive planning.",
        },
        {
            icon: "/images/About Us/icon air humid.webp",
            title: "Air Humidity",
            description:
                "Measure atmospheric moisture to assess comfort levels, predict rainfall, and support agricultural and health-related monitoring.",
        },
        {
            icon: "/images/About Us/icon rainfall.webp",
            title: "Rainfall Levels",
            description:
                "Track precipitation in real-time to aid in flood prediction, water resource management, and disaster preparedness.",
        },
        {
            icon: "/images/About Us/icon wind speed.webp",
            title: "Wind Speed & Direction",
            description:
                "Detect wind patterns and speed variations to support early warnings for storms and improve aviation, coastal, and urban planning safety.",
        },
    ],
    [
        {
            icon: "/images/About Us/icon air quality.webp",
            title: "Air Quality Index",
            description:
                "Monitor pollutant levels to evaluate the quality of the air and protect public health through informed environmental actions.",
        },
        {
            icon: "/images/About Us/icon river water.webp",
            title: "River Water Levels",
            description:
                "Track river and stream levels to monitor flood risks, watershed conditions, and ensure timely evacuation during extreme weather events.",
        },
        {
            icon: "/images/About Us/icon 247 monitoring.webp",
            title: "24/7 Real-Time Monitoring",
            description:
                "Access live, localized data anytime—enabling immediate responses and long-term insights for climate resilience and emergency response.",
        },
        {
            icon: "/images/About Us/icon data analytics.webp",
            title: "Data Analysis & Reporting",
            description:
                "Transform raw environmental data into visual insights and downloadable reports for smarter, data-driven decision-making.",
        },
    ],
];

export default function AboutUs() {
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
            <Head title="About Us" />
            <div className="mt-20 space-y-8 ">
                <div className="absolute top-0 right-0 z-0 w-1/2 overflow-hidden">
                    <motion.div
                        className="w-[200%] h-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 60,
                            ease: "linear",
                        }}
                    >
                        <img
                            src="/images/bg element.webp"
                            alt=""
                            className="object-contain w-full h-full"
                        />
                    </motion.div>
                </div>

                {/* Video Intro Section */}
                <motion.section
                    variants={videoIntroVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.4 }}
                    className="container relative max-w-screen-xl px-4 mx-auto"
                >
                    <div className="space-y-6 text-center">
                        <video
                            className="w-full h-full shadow-lg rounded-xl"
                            controls
                            preload="none"
                            loading="lazy"
                            autoPlay
                            muted
                            loop
                        >
                            <source
                                src="/images/Homepage/homevideo.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                        <h1 className="pt-8 text-3xl font-bold">
                            {highlightText(
                                "Pioneering Localized Environmental Monitoring for a Safer Tomorrow",
                                searchQuery
                            )}
                        </h1>
                        <div className="flex justify-center">
                            <p className="max-w-4xl text-sm md:text-base">
                                {highlightText(
                                    "WEHLO is a smart, real-time Weather, Environment, and Hydromet Monitoring System designed to provide accurate, location-specific data that supports climate resilience, disaster preparedness, and informed decision-making. Backed by innovation and driven by public service. WEHLO empowers communities, governments, and organizations with actionable insights-anytime, anywhere.",
                                    searchQuery
                                )}
                            </p>
                        </div>
                    </div>
                </motion.section>
                <div>
                   
                    <motion.section
                        variants={founderBlockVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.6 }}
                        className="container relative max-w-screen-xl px-4 mx-auto"
                    >
                        <div className="flex flex-col items-center justify-center gap-8 py-8">
                            {/* Founder 1 */}
                            <div className="w-full items-center justify-center flex flex-col md:w-1/2 mb-[4rem] md:space-y-12">
                                <img
                                    src="/images/About Us/founders/founder_1.png"
                                    alt="Founder 1"
                                />
                                <div className="flex flex-col items-center justify-center w-full space-y-2 md:flex-wrap">
                                    <div className="text-2xl font-bold text-center border-b-2 border-gray-300">
                                        {highlightText(
                                            "Dr. Francis Aldrine Uy",
                                            searchQuery
                                        )}
                                    </div>
                                    <div className="space-x-2 text-sm font-semibold text-center text-blue-700">
                                        {highlightText("Founder", searchQuery)}
                                    </div>
                                </div>
                            </div>

                            {/* Paragraph */}
                            <div className="text-center flex items-center justify-center w-full mb-[4rem]">
                                {highlightText(
                                    "Developed by Mapua University School of Civil, Environment and Geological Engineering led by Dr. Francis Aldrine Uy and supported by the Department of Science and Technology - Philippine Council for Industry, Energy, and Emerging Technology Research and Development (DOST-PCIEERD), this technology will help urgent the disaster risk reduction and management operations as the country braces for La Niña.",
                                    searchQuery
                                )}
                            </div>

                            {/* Other Founders */}
                            <div className="grid md:grid-cols-3 gap-[3rem] mb-[5rem] items-start w-full">
                                {[2, 3, 4].map((num) => (
                                    <div
                                        key={num}
                                        className="flex flex-col items-center space-y-6 text-center md:-space-y-[4rem]"
                                    >
                                        <img
                                            src={`/images/About Us/founders/founder_${num}.png`}
                                            className="w-full max-w-xs md:h-[600px] h-[300px] object-contain"
                                            alt={`Founder ${num}`}
                                        />
                                        <div className="w-full space-y-3">
                                            <div className="w-full text-2xl font-bold border-b-2">
                                                {highlightText(
                                                    "Dr. Francis Aldrine Uy",
                                                    searchQuery
                                                )}
                                            </div>
                                            <div className="text-blue-700">
                                                {highlightText(
                                                    "Founder",
                                                    searchQuery
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                </div>

                {/* Mission & Vision Section */}
                <div className="container relative max-w-screen-xl px-4 mx-auto space-y-16 overflow-hidden">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={featureBlockVariants}
                            initial={
                                index % 2 === 0 ? "hiddenLeft" : "hiddenRight"
                            }
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            {/* Pass highlightText and searchQuery to FeatureBlock */}
                            <FeatureBlock
                                {...item}
                                highlightText={highlightText}
                                searchQuery={searchQuery}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <motion.section
                    className="container relative max-w-screen-xl p-4 py-8 mx-auto overflow-hidden bg-blue-600 rounded-xl"
                    variants={statsContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                        {stats.map((stat, index) => (
                            <motion.div key={index} variants={statVariants}>
                                {/* Pass highlightText and searchQuery to StatCard */}
                                <StatCard
                                    {...stat}
                                    highlightText={highlightText}
                                    searchQuery={searchQuery}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Feature Groups Section */}
                <div className="container max-w-screen-xl px-4 mx-auto space-y-8 overflow-hidden">
                    <div className="space-y-4 text-center">
                        <h1 className="text-2xl font-bold md:text-4xl">
                            {highlightText(
                                "Precision Monitoring for Weather, Climate, and Beyond",
                                searchQuery
                            )}
                        </h1>
                        <p className="text-sm">
                            {highlightText(
                                "From early warning systems to historical environmental data, WEHLO supports a range of applications:",
                                searchQuery
                            )}
                        </p>
                    </div>

                    {featureGroups.map((group, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                index === 0
                                    ? "items-end justify-end"
                                    : "items-start justify-start"
                            }`}
                        >
                            <div className="grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {group.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        custom={idx}
                                        variants={featureCardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: false, amount: 0.3 }}
                                    >
                                        {/* Pass highlightText and searchQuery to FeatureCard */}
                                        <FeatureCard
                                            {...feature}
                                            highlightText={highlightText}
                                            searchQuery={searchQuery}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Partners & Collaborators Section */}
                <motion.section
                    className="space-y-8 bg-white"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={partnerHeadingVariants}
                >
                    <motion.h1
                        className="text-xl font-bold text-center text-black"
                        variants={partnerHeadingVariants}
                    >
                        {highlightText("Partners & Collaborators", searchQuery)}
                    </motion.h1>

                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-12 w-max"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                duration: 40,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {[...partnerLogos, ...partnerLogos].map(
                                (logo, index) => (
                                    <img
                                        key={index}
                                        src={`/images/About Us/partner logos/${logo}`}
                                        alt={highlightText(
                                            `Partner ${index}`,
                                            searchQuery
                                        )} // Alt text can also be highlighted
                                        className="object-contain size-24"
                                    />
                                )
                            )}
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </MainLayout>
    );
}
