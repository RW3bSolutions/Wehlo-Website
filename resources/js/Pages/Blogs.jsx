import { Link, Head, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Dot, Search, Calendar } from "lucide-react";
import BannerSection from "@/components/BannerSection";
import React, { useEffect, useState, useRef } from "react"; // Import useRef
import { useHighlightQuery } from "@/hooks/useHighlightQuery"; // Import the custom hook

export default function Blogs() {
    const { query } = usePage().props;
    const initialSearch = query?.q || "";

    const [news, setNews] = useState([]);
    const [caseStudies, setCaseStudies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [filteredNews, setFilteredNews] = useState([]);
    const [filteredCaseStudies, setFilteredCaseStudies] = useState([]); // New state for filtered case studies
    const [activeTab, setActiveTab] = useState("news"); // 'news' or 'success-stories'

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

    // Fetch data on component mount
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [newsRes, caseStudyRes] = await Promise.all([
                    fetch("/news/data"),
                    fetch("/case_study/data"),
                ]);

                const newsData = await newsRes.json();
                const caseStudyData = await caseStudyRes.json();

                setNews(newsData.data);
                setCaseStudies(caseStudyData.data);

                // Initial filtering based on initialSearch (from URL)
                const initialFilteredNews = newsData.data.filter((item) =>
                    item.title
                        .toLowerCase()
                        .includes(initialSearch.toLowerCase())
                );
                const initialFilteredCaseStudies = caseStudyData.data.filter(
                    (item) =>
                        item.title
                            .toLowerCase()
                            .includes(initialSearch.toLowerCase()) ||
                        item.location
                            .toLowerCase()
                            .includes(initialSearch.toLowerCase())
                );

                setFilteredNews(initialFilteredNews);
                setFilteredCaseStudies(initialFilteredCaseStudies);

                // Determine active tab based on search results
                if (initialSearch) {
                    if (initialFilteredNews.length > 0) {
                        setActiveTab("news");
                    } else if (initialFilteredCaseStudies.length > 0) {
                        setActiveTab("success-stories");
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllData();
    }, []); // Run only once on mount

    // Effect for filtering based on searchTerm (from input field)
    useEffect(() => {
        const filteredNewsResults = news.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNews(filteredNewsResults);

        const filteredCaseStudyResults = caseStudies.filter(
            (item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCaseStudies(filteredCaseStudyResults);

        // If searchTerm changes, and it's not empty, re-evaluate active tab
        if (searchTerm) {
            if (filteredNewsResults.length > 0) {
                setActiveTab("news");
            } else if (filteredCaseStudyResults.length > 0) {
                setActiveTab("success-stories");
            }
        } else {
            // If search term is cleared, default to news tab
            setActiveTab("news");
        }
    }, [searchTerm, news, caseStudies]); // Depend on searchTerm and original data arrays

    // Effect to scroll to highlighted element
    useEffect(() => {
        // Only attempt to scroll if a search query exists and the DOM has rendered the highlighted content
        // We add a small timeout to ensure DOM updates are complete after tab switch/render
        const timer = setTimeout(() => {
            if (searchTerm && firstHighlightRef.current) {
                firstHighlightRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }, 100); // Small delay to allow DOM to update

        return () => clearTimeout(timer); // Cleanup timeout
    }, [searchTerm, activeTab, filteredNews, filteredCaseStudies]); // Re-run when search term, active tab, or filtered data changes

    useHighlightQuery(); // <-- This enables highlighting

    return (
        <MainLayout>
            <Head title="Blogs" />
            <section>
                <div className="container relative max-w-screen-xl mx-auto">
                    <BannerSection
                        className="object-cover w-full h-full"
                        src="/images/Case Studies/banner.png"
                        alt="Case Studies Banner"
                    />

                    <div className="absolute bottom-0 left-4">
                        <h1 className="text-xs font-bold text-blue-700 md:text-5xl">
                            {highlightText("Blogs &", initialSearch)}
                            <br /> {highlightText("Stories", initialSearch)}
                        </h1>
                        <span className="text-xs">
                            {highlightText("Home / Blogs", initialSearch)}
                        </span>
                    </div>
                </div>
            </section>

            <section>
                <div className="container max-w-screen-xl px-4 py-8 mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="space-y-4 md:col-span-2">
                            <h1 className="text-3xl font-bold text-blue-700">
                                {highlightText(
                                    "Stay Informed. Stay Ahead.",
                                    initialSearch
                                )}
                            </h1>
                            <p>
                                {highlightText(
                                    "Catch the latest updates, expert opinions, and in-depth analyses on weather patterns, environmental monitoring, and innovations from the WEHLO community.",
                                    initialSearch
                                )}
                            </p>
                        </div>

                        <div></div>

                        {/* Tab Navigation */}
                        <div className="md:col-span-3">
                            <div className="flex border-b border-gray-200">
                                <button
                                    className={`px-4 py-2 font-medium ${
                                        activeTab === "news"
                                            ? "text-blue-700 border-b-2 border-blue-700"
                                            : "text-gray-500"
                                    }`}
                                    onClick={() => setActiveTab("news")}
                                >
                                    {highlightText("Blogs", searchTerm)}
                                </button>
                                <button
                                    className={`px-4 py-2 font-medium ${
                                        activeTab === "success-stories"
                                            ? "text-blue-700 border-b-2 border-blue-700"
                                            : "text-gray-500"
                                    }`}
                                    onClick={() =>
                                        setActiveTab("success-stories")
                                    }
                                >
                                    {highlightText(
                                        "Success Stories",
                                        searchTerm
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="md:col-span-2">
                            {activeTab === "news" ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {Array.isArray(filteredNews) &&
                                        filteredNews.map((item, index) => {
                                            const formattedDate = new Date(
                                                item.created_at
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            });

                                            return (
                                                <div key={item.id || index}>
                                                    <div className="bg-[#e0f3f2] rounded-2xl h-full flex flex-col overflow-hidden">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <img
                                                                    className="w-full h-[18rem] object-cover rounded-t-2xl"
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={
                                                                        highlightText(
                                                                            item.title,
                                                                            searchTerm
                                                                        ) ||
                                                                        `News ${
                                                                            index +
                                                                            1
                                                                        }`
                                                                    }
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                            <div className="p-5">
                                                                <span className="text-sm font-semibold text-blue-700">
                                                                    {highlightText(
                                                                        formattedDate,
                                                                        searchTerm
                                                                    )}
                                                                </span>
                                                                <div className="text-lg font-bold text-blue-800 leading-snug min-h-[3.5rem] line-clamp-2 pt-2">
                                                                    {highlightText(
                                                                        item.title,
                                                                        searchTerm
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-4 mx-2">
                                                            <Link
                                                                href={`/blogs_details/${item.slug}`}
                                                            >
                                                                <button className="font-medium text-blue-600 hover:underline">
                                                                    Read More
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    {filteredNews.length === 0 && (
                                        <p className="col-span-2 text-gray-500">
                                            No articles found.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-center">
                                        <div className="max-w-3xl space-y-4 text-center">
                                            <h1 className="text-4xl font-bold">
                                                {highlightText(
                                                    "Real Stories. Real Impact.",
                                                    initialSearch
                                                )}
                                            </h1>
                                            <p>
                                                {highlightText(
                                                    "Explore how local governments, researchers, and communities, are leveraging WEHLO to transform environmental monitoring and disaster preparedness.",
                                                    initialSearch
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {Array.isArray(filteredCaseStudies) &&
                                            filteredCaseStudies.map(
                                                (item, index) => (
                                                    <div
                                                        key={item.id || index}
                                                        className="bg-[#e0f3f2] rounded-2xl h-full flex flex-col overflow-hidden"
                                                    >
                                                        <div className="space-y-4">
                                                            <div>
                                                                <img
                                                                    className="w-full h-[18rem] object-cover rounded-t-2xl"
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={highlightText(
                                                                        item.title,
                                                                        searchTerm
                                                                    )}
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                            <div className="p-4 text-blue-700">
                                                                <span className="text-sm font-semibold text-blue-700 ">
                                                                    {highlightText(
                                                                        "Location:",
                                                                        searchTerm
                                                                    )}{" "}
                                                                    {highlightText(
                                                                        item.location,
                                                                        searchTerm
                                                                    )}
                                                                </span>
                                                                <div className="text-lg font-bold text-blue-800 lending-snug min-h-[3.5rem] line-clamp-2 pt-2">
                                                                    {highlightText(
                                                                        item.title,
                                                                        searchTerm
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="p-4 mx-2">
                                                            <Link
                                                                href={`/cases_details/${item.id}`}
                                                            >
                                                                <button className="text-blue-600">
                                                                    Read More
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        {filteredCaseStudies.length === 0 && (
                                            <p className="col-span-2 text-gray-500">
                                                No success stories found.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div>
                            <div className="bg-[#f1f1f1] p-4 rounded-2xl space-y-4">
                                {/* <h1 className="text-xl font-bold text-blue-700">
                                    {highlightText(
                                        "Search For Anything",
                                        searchTerm
                                    )}
                                </h1>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 placeholder-gray-500 bg-white border border-blue-700 rounded-full"
                                        placeholder="Search here"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                    <div className="absolute text-blue-700 right-4">
                                        <Search />
                                    </div>
                                </div>
                                <hr className="border border-blue-700" /> */}
                                <h1 className="text-2xl font-bold">
                                    {highlightText("Latest", searchTerm)}{" "}
                                    {activeTab === "news"
                                        ? highlightText("Posts", searchTerm)
                                        : highlightText("Stories", searchTerm)}
                                </h1>
                                {Array.isArray(
                                    activeTab === "news" ? news : caseStudies
                                ) &&
                                    (activeTab === "news" ? news : caseStudies)
                                        .slice(0, 3)
                                        .map((item, index) => {
                                            const formattedDate = new Date(
                                                item.created_at || new Date()
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            });

                                            return (
                                                <div key={item.id || index}>
                                                    <Link
                                                        href={`/${
                                                            activeTab === "news"
                                                                ? "blogs_details"
                                                                : "cases_details"
                                                        }/${
                                                            item.id
                                                        }?q=${encodeURIComponent(
                                                            searchTerm
                                                        )}`}
                                                    >
                                                        <div className="grid items-center grid-cols-3 gap-4 mb-4">
                                                            <div>
                                                                <img
                                                                    className="object-contain w-40 h-24 rounded-xl"
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={highlightText(
                                                                        item.title,
                                                                        searchTerm
                                                                    )}
                                                                />
                                                            </div>
                                                            <div className="col-span-2 space-y-2 text-xs lg:text-base line-clamp-2">
                                                                <div className="flex items-center space-x-2">
                                                                    <Calendar className="text-blue-700" />
                                                                    <span className="text-blue-700">
                                                                        {highlightText(
                                                                            formattedDate,
                                                                            searchTerm
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <h1 className="text-lg font-bold text-blue-800 lending-snug min-h-[3.5rem] line-clamp-2">
                                                                    {highlightText(
                                                                        item.title,
                                                                        searchTerm
                                                                    )}
                                                                </h1>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
