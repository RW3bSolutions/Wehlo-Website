import { Link, Head, usePage } from "@inertiajs/react"; // Import usePage
import MainLayout from "@/Layouts/MainLayout";
import { Dot, Calendar, CircleCheckBig } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedButton from "@/components/AnimatedButton";
import { motion, useAnimation } from "motion/react";
import { useHighlightQuery } from "@/hooks/useHighlightQuery";
import BannerCards from "@/components/BannerCards"; // Import BannerCards component

export default function Welcome() {
    const [banners, setBanners] = useState([]);
    const [caseStudies, setCaseStudies] = useState([]);
    const [news, setNews] = useState([]);
    const [isLoadingBanners, setIsLoadingBanners] = useState(true);
    const [isLoadingCaseStudies, setIsLoadingCaseStudies] = useState(true);
    const [isLoadingNews, setIsLoadingNews] = useState(true);

    const { url } = usePage();
    const queryParams = new URLSearchParams(window.location.search);
    const searchQuery = queryParams.get("q");

    const firstHighlightRef = useRef(null);

    const cardText = [
        "Real-Time Weather",
        "Data Analytics & ForeCasting",
        "Smart Alerts & Automated Notifications",
        "Interactive Dashboard & Reporting Tools",
    ];

    const highlightText = (text, query) => {
        const stringText = String(text || "");

        if (!query || query.trim() === "") {
            return stringText;
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
                    ref={firstHighlightRef.current ? null : firstHighlightRef}
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

    // Fetch Banners
    useEffect(() => {
        setIsLoadingBanners(true);
        fetch("/banners/data")
            .then((res) => res.json())
            .then((data) => {
                setBanners(data.data);
                setIsLoadingBanners(false);
            })
            .catch((error) => {
                console.error("Error fetching banners:", error);
                setIsLoadingBanners(false);
            });
    }, []);

    // Fetch Case Studies
    useEffect(() => {
        setIsLoadingCaseStudies(true);
        fetch("/case_study/data")
            .then((res) => res.json())
            .then((data) => {
                setCaseStudies(data.data);
                setIsLoadingCaseStudies(false);
            })
            .catch((error) => {
                console.error("Error fetching case studies:", error);
                setIsLoadingCaseStudies(false);
            });
    }, []);

    // Fetch News
    useEffect(() => {
        setIsLoadingNews(true);
        fetch("/news/data")
            .then((res) => res.json())
            .then((data) => {
                setNews(data.data);
                setIsLoadingNews(false);
            })
            .catch((error) => {
                console.error("Error fetching news:", error);
                setIsLoadingNews(false);
            });
    }, []);

    // Effect to scroll to highlighted element
    useEffect(() => {
        // Only attempt to scroll if data is loaded and a search query exists
        if (
            searchQuery &&
            !isLoadingBanners &&
            !isLoadingCaseStudies &&
            !isLoadingNews
        ) {
            if (firstHighlightRef.current) {
                firstHighlightRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    }, [searchQuery, isLoadingBanners, isLoadingCaseStudies, isLoadingNews]); // Re-run when query or loading states change

    useHighlightQuery(); // <-- This enables highlighting

    return (
        <MainLayout>
            <Head title="Home" />
            <div className="space-y-12">
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {Array.isArray(banners) && banners.length > 0 ? (
                        <Swiper
                            grabCursor={true}
                            loop={true}
                            modules={[Pagination]}
                            slidesPerView={1}
                        >
                            {banners.map((banner, index) => {
                                let descriptionLines = [];

                                if (typeof window !== "undefined") {
                                    const parser = new DOMParser();
                                    const doc = parser.parseFromString(
                                        banner.description,
                                        "text/html"
                                    );
                                    descriptionLines = Array.from(
                                        doc.querySelectorAll("p")
                                    )
                                        .map((p) => p.textContent?.trim())
                                        .filter(Boolean);
                                }

                                return (
                                    <SwiperSlide key={index}>
                                        <div className="relative w-full h-[90vh]">
                                            {/* Banner image */}
                                            <img
                                                className="object-cover w-full h-full brightness-90"
                                                src={banner.image}
                                                alt={`Slide ${index + 1}`}
                                                loading="lazy"
                                            />

                                            {/* Banner text */}
                                            <div className="absolute inset-0 flex flex-col items-start justify-center px-4 text-white top-[15%] md:top-15 md:items-start md:justify-start sm:px-8  md:w-3/4 xl:w-1/2">
                                                {/* Title (line 0) */}
                                                <div className="text-[12px] md:text-sm font-bold mb-2 text-black">
                                                    {banner.title}
                                                </div>

                                                {/* Description lines (line 1 & 2) */}
                                                {descriptionLines
                                                    .slice(0, 2)
                                                    .map((line, i) => {
                                                        let lineClass = "";

                                                        if (i === 0)
                                                            lineClass =
                                                                "xl:text-[60px] lg:text-[40px] md:text-[2rem] font-bold mb-2 md:mb-[2rem] text-blue-700";
                                                        else if (i === 1)
                                                            lineClass =
                                                                "xl:text-[60px] lg:text-[40px] sm:text-4xl md:text-[2rem] font-semibold text-blue-700";

                                                        return (
                                                            <div
                                                                key={i}
                                                                className={
                                                                    lineClass
                                                                }
                                                            >
                                                                {line}
                                                            </div>
                                                        );
                                                    })}
                                            </div>

                                            {/* Floating BannerCards over image */}
                                            <div className="absolute top-1/2 hidden md:top-[70%] lg:top-[80%] left-1/2 transform -translate-x-1/2 flex w-full h-1/2 md:h-screen md:grid-cols-1 md:w-[90%] md:block md:max-w-6xl">
                                                <BannerCards cards={cardText} />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    ) : (
                        <div className="space-y-4">
                            <Skeleton className="w-full h-[50rem] rounded-xl" />
                        </div>
                    )}
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    <div className="container max-w-screen-xl px-4 mx-auto">
                        <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
                            <div className="relative">
                                <img
                                    src="/images/Homepage/img - whatwedo.webp"
                                    alt=""
                                />
                                {/* <div className="absolute -bottom-6 -right-4">
                                    <div className="flex items-center px-6 py-2 space-x-4 bg-blue-600 rounded-xl">
                                        <div>
                                            <img
                                                className="size-12"
                                                src="/images/Homepage/icon - bcase.webp"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col text-white">
                                            <span className="text-4xl">+4</span>
                                            <span className="text-xl">
                                                Years
                                            </span>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="flex flex-col justify-between space-y-8">
                                <div className="space-y-4 ">
                                    <h1 className="text-4xl font-bold text-blue-300 md:text-6xl">
                                        {highlightText(
                                            "Turning Weather Data into Lifesaving Decisions",
                                            searchQuery
                                        )}
                                    </h1>
                                    <p className="text-sm text-left text-black md:text-base">
                                        {highlightText(
                                            "We provide real-time, hyperlocal weather and environmental data to:",
                                            searchQuery
                                        )}
                                    </p>
                                    <ul className="space-y-2 text-sm text-left text-black list-disc list-inside md:text-base">
                                        <li>
                                            {highlightText(
                                                "Empower communities and agencies with actionable insights.",
                                                searchQuery
                                            )}
                                        </li>
                                        <li>
                                            {highlightText(
                                                "Monitor climate, air quality, and water conditions via integrated stations and platforms.",
                                                searchQuery
                                            )}
                                        </li>
                                        <li>
                                            {highlightText(
                                                "Drive disaster resilience and sustainable planning.",
                                                searchQuery
                                            )}
                                        </li>
                                    </ul>
                                    <p className="mt-4 text-sm text-left text-black md:text-base">
                                        {highlightText(
                                            "With a focus on safety, awareness, and sustainability, we aim to support disaster preparedness, environmental protection, and smart planning for a better future.",
                                            searchQuery
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <Link href="/about_us">
                                        <AnimatedButton
                                            text="Get Started"
                                            className="text-blue-600 border border-blue-600 hover:text-white"
                                            bgColor="bg-blue-600"
                                            textColor=""
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <section>
                    <div className="relative">
                        <img
                            className="absolute inset-0 object-cover w-full h-full"
                            src="/images/Homepage/bg cta.webp"
                            alt=""
                        />
                        <div className="container relative max-w-screen-md px-4 py-12 mx-auto">
                            <div className="flex flex-col items-center justify-between space-y-8">
                                <div className="space-y-4 text-center text-white ">
                                    <h1 className="text-3xl font-bold md:text-5xl ">
                                        {highlightText(
                                            "Discover How Our Monitoring Platforms Can Help You",
                                            searchQuery
                                        )}
                                    </h1>
                                    <p className="text-sm md:text-base">
                                        {highlightText(
                                            "Our monitoring platforms provide real-time weather, environmental, and hydromet data to help you make informed decisions. Whether for disaster preparedness, resource management, or environmental protection, explore the solutions that can enhance safety and efficienty.",
                                            searchQuery
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <Link href="/platform">
                                        <AnimatedButton
                                            text="View Platform"
                                            className="text-white bg-blue-600 hover:text-blue-600 "
                                            bgColor="bg-white"
                                            textColor=""
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CASE STUDIES SECTION */}
                <section>
                    <div className="container max-w-screen-xl px-4 mx-auto space-y-8">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div>
                                <div className="space-y-8">
                                    <h1 className="text-4xl font-bold text-[#8bd3cf]">
                                        {highlightText(
                                            "Empowering",
                                            searchQuery
                                        )}
                                        <br />
                                        {highlightText(
                                            "Resilience",
                                            searchQuery
                                        )}
                                    </h1>
                                    <p className="text-sm">
                                        {highlightText(
                                            "Empowering communities with real-time weather and environmental data to support proactive decisions...",
                                            searchQuery
                                        )}
                                    </p>
                                    <div>
                                        <Link href="/cases">
                                            <AnimatedButton
                                                text="View All Case Studies"
                                                className="text-blue-600 border border-blue-600 hover:text-white"
                                                bgColor="bg-blue-600"
                                                textColor=""
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: false }}
                                >
                                    {/* Conditionally render Swiper only when caseStudies data is loaded */}
                                    {!isLoadingCaseStudies &&
                                    Array.isArray(caseStudies) &&
                                    caseStudies.length > 0 ? (
                                        <Swiper
                                            grabCursor={true}
                                            loop={true}
                                            spaceBetween={20}
                                            modules={[Pagination]}
                                            breakpoints={{
                                                0: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,
                                                },
                                                480: {
                                                    slidesPerView: 1.5,
                                                    spaceBetween: 15,
                                                },
                                                640: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 15,
                                                },
                                                768: {
                                                    slidesPerView: 1.5,
                                                    spaceBetween: 20,
                                                },
                                                1024: {
                                                    slidesPerView: 2.5,
                                                    spaceBetween: 20,
                                                },
                                            }}
                                        >
                                            {caseStudies.map((item, index) => (
                                                <SwiperSlide
                                                    key={item.id || index} // Use item.id for a more stable key if available
                                                    className="bg-[#e0f3f2] rounded-2xl h-[32rem] flex flex-col overflow-hidden"
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-[18rem] object-cover rounded-t-2xl"
                                                    />
                                                    <div className="flex flex-col justify-between flex-grow p-4">
                                                        <h1 className="text-lg font-bold text-blue-800 leading-snug min-h-[3.5rem] line-clamp-2">
                                                            {highlightText(
                                                                item.title,
                                                                searchQuery
                                                            )}
                                                        </h1>
                                                        <div className="mt-4">
                                                            <Link
                                                                href={`/cases_details/${item.id}`}
                                                            >
                                                                <button className="font-medium text-blue-600 hover:underline">
                                                                    Read More
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        // Skeleton loader for case studies
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {[...Array(3)].map(
                                                (
                                                    _,
                                                    i // Render 3 skeleton cards
                                                ) => (
                                                    <Skeleton
                                                        key={i}
                                                        className="h-[32rem] w-full rounded-2xl"
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex items-center justify-center">
                    <div className="container max-w-screen-xl  mx-auto bg-[#8bd3cf] bg-opacity-5 border shadow-xl rounded-2xl">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div>
                                <img
                                    className="w-full h-full"
                                    src="/images/Homepage/img - platform.webp"
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col justify-between p-8">
                                <div className="space-y-4 ">
                                    <h1 className="text-4xl font-bold text-blue-700">
                                        {highlightText(
                                            "Investing in Sustainable Monitoring",
                                            searchQuery
                                        )}
                                    </h1>
                                    <p>
                                        {highlightText(
                                            "Preserving our environment starts with understanding it. By providing accurate, real-time weather, environmental, and hydromet data, Wehlo helps safeguard communities and natural resources. This data is vital for proactive decision-making and reducing the impact of climate change.",
                                            searchQuery
                                        )}
                                    </p>
                                    <ul className="space-y-4 text-sm list-inside">
                                        <li className="flex items-center space-x-2">
                                            {" "}
                                            <CircleCheckBig />
                                            <span>
                                                {highlightText(
                                                    "84 Monitoring Projects Completed",
                                                    searchQuery
                                                )}
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            {" "}
                                            <CircleCheckBig />
                                            <span>
                                                {highlightText(
                                                    "2 Communities Empowered with Localized Data",
                                                    searchQuery
                                                )}
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            {" "}
                                            <CircleCheckBig />
                                            <span>
                                                {highlightText(
                                                    "37 Environmental Data Partners",
                                                    searchQuery
                                                )}
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            {" "}
                                            <CircleCheckBig />
                                            <span>
                                                {highlightText(
                                                    "44 Research Papers Published",
                                                    searchQuery
                                                )}
                                            </span>
                                        </li>
                                    </ul>
                                    <div>
                                        <Link href="/platform">
                                            <AnimatedButton
                                                text="View Platform"
                                                className="text-white bg-blue-600 border border-blue-600 hover:text-blue-600"
                                                bgColor="bg-white"
                                                textColor=""
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NEWS SECTION */}
                <section>
                    <div className="container max-w-screen-xl px-4 mx-auto space-y-8">
                        <div className="flex flex-wrap items-center justify-between gap-8">
                            <h1 className="text-5xl font-bold text-blue-700">
                                {highlightText("Latest Articles", searchQuery)}
                            </h1>
                            <Link href="/blogs">
                                <AnimatedButton
                                    text="View All News & Insights"
                                    className="text-blue-600 border border-blue-600 hover:text-white"
                                    bgColor="bg-blue-600"
                                    textColor=""
                                />
                            </Link>
                        </div>
                        <div className="grid items-start grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-4 rounded-2xl">
                            {/* Conditionally render news only when news data is loaded */}
                            {!isLoadingNews &&
                            Array.isArray(news) &&
                            news.length > 0 ? (
                                news.map((item, index) => {
                                    const formattedDate = new Date(
                                        item.created_at
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    });
                                    return (
                                        <motion.div
                                            key={item.id || index} // Use item.id for a more stable key if available
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: index * 0.1,
                                            }}
                                            viewport={{ once: false }}
                                        >
                                            <div className="space-y-4">
                                                <img
                                                    className="rounded-2xl h-[20rem] object-contain w-full"
                                                    src={item.image}
                                                    alt={item.title}
                                                />
                                                <div className="space-y-4">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="bg-[#8bd3cf] text-white p-2 rounded-full">
                                                            <Calendar />
                                                        </div>
                                                        <h1>
                                                            {highlightText(
                                                                formattedDate,
                                                                searchQuery
                                                            )}
                                                        </h1>
                                                    </div>
                                                    <h2 className="text-2xl font-bold">
                                                        {highlightText(
                                                            item.title,
                                                            searchQuery
                                                        )}
                                                    </h2>
                                                    <p>
                                                        {highlightText(
                                                            item.excerpt,
                                                            searchQuery
                                                        )}
                                                    </p>
                                                    <Link
                                                        href={`/blogs_details/${item.id}`}
                                                    >
                                                        <button className="py-2 font-bold border-b-2 border-b-[#8bd3cf]">
                                                            Read More
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                // Skeleton loader for news articles
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {[...Array(4)].map(
                                        (
                                            _,
                                            i // Render 4 skeleton cards
                                        ) => (
                                            <Skeleton
                                                key={i}
                                                className="h-[25rem] w-full rounded-2xl"
                                            />
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
