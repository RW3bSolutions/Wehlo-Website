import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search } from "lucide-react";
import { Link } from "@inertiajs/react";

// SearchModal component
export default function SearchModal({ onClose }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const modalRef = useRef(null); // ✅ Modal ref

    // ✅ Close modal on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    // Debounce search input to prevent excessive API calls
    const debouncedSearch = useCallback(
        debounce((query) => {
            fetchSearchResults(query);
        }, 500), // 500ms debounce time
        []
    );

    // Effect to trigger search when searchQuery changes
    useEffect(() => {
        if (searchQuery.trim() === "") {
            // If query is empty, fetch all results
            fetchSearchResults("");
            //debouncedSearch(searchQuery);
        } else {
            //setSearchResults([]); // Clear results when input is empty
            debouncedSearch(searchQuery);
        }
    }, [searchQuery, debouncedSearch]);

    // Function to fetch search results from the Laravel backend
    const fetchSearchResults = async (query) => {
        setIsLoading(true);
        setError(null);
        try {
            // Construct the API URL. Replace with your actual Laravel backend URL.
            const apiUrl = `${
                window.location.origin
            }/api/pages/search?query=${encodeURIComponent(query)}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setSearchResults(data.pages || []); // Ensure data.pages is an array
        } catch (err) {
            console.error("Failed to fetch search results:", err);
            setError("Failed to load search results. Please try again.");
            setSearchResults([]); // Clear results on error
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input change for the search field
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        // Modal Overlay
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-gray-800 bg-opacity-75 font-inter">
            {/* Modal Content */}
            <div
                ref={modalRef}
                className={`relative flex flex-col w-full max-w-3xl max-h-screen p-6 transition-all duration-300 ease-out transform rounded-2xl  ${
                    searchQuery.length <= 0
                        ? "scale-95 bg-white shadow-lg opacity-100 h-fit animate-fade-in" // <-- for empty
                        : "scale-100 bg-white shadow-xl opacity-100 animate-scale-in h-[80%]" // <-- when typing
                }`}
            >
                {/* Close Button */}
                <div class="border-b-2 my-2">
                    <div class="flex gap-2 w-full mx-20 my-1">
                        <div class="my-2">
                            <Search />
                        </div>

                        {/* Search Input Field */}
                        <div className="w-3/4 truncate">
                            <input
                                type="text"
                                placeholder="Search pages, titles, subtitles, or content..."
                                className="w-full !border-none focus:!outline-none focus:!ring-0 focus:!border-none"
                                value={searchQuery}
                                onChange={handleInputChange}
                                aria-label="Search input"
                            />
                        </div>

                        {/* <div class="w-12 h-12 hover:bg-red-600 hover:border group rounded-full items-center justify-center flex hover:text-white">
                            <button
                                onClick={onClose}
                                className=""
                                aria-label="Close search modal"
                            >
                                <div class="text-2xl ">&times;</div>
                            </button>
                        </div> */}
                    </div>
                </div>

                {/* Search Results Area */}
                <div className="flex-grow pr-2 mx-6 overflow-y-auto custom-scrollbar">
                    {isLoading && (
                        <div className="flex items-center justify-center h-full">
                            <div className="w-12 h-12 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                            <p className="ml-4 text-lg text-gray-600">
                                Loading results...
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 text-lg text-center text-red-600">
                            {error}
                        </div>
                    )}

                    {!isLoading &&
                        !error &&
                        searchResults.length === 0 &&
                        searchQuery.trim() !== "" && (
                            <div className="mt-4 text-lg text-center text-gray-500">
                                No results found for "{searchQuery}".
                            </div>
                        )}

                    {!isLoading &&
                        !error &&
                        searchResults.length === 0 &&
                        searchQuery.trim() === "" && (
                            <div className="mt-4 text-lg text-center text-gray-500">
                                Start typing to search, or see all pages listed
                                below.
                            </div>
                        )}

                    {!isLoading && !error && searchResults.length > 0 && (
                        <div className="mx-8 my-4 space-y-6">
                            {/* <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                                Pages
                            </h2> */}
                            {searchResults.map((result, index) => (
                                <Link
                                    href={`${
                                        result.link
                                    }?q=${encodeURIComponent(searchQuery)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" hover:min-h-[0.2rem] line-clamp-2 hover:line-clamp-none"
                                    onClick={onClose} // Close modal when a result is clicked
                                >
                                    <div
                                        key={index}
                                        className="transition-colors duration-300 ease-in border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:bg-blue-200"
                                    >
                                        <div class="pr-4 pl-4 pt-2">
                                            <h3 className="mb-1 text-xl font-bold text-blue-700">
                                                {/* Updated link to include query parameter */}
                                                <Link
                                                    href={`${
                                                        result.link
                                                    }?q=${encodeURIComponent(
                                                        searchQuery
                                                    )}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                    onClick={onClose} // Close modal when a result is clicked
                                                >
                                                    {result.title}
                                                </Link>
                                            </h3>
                                            <p className="mb-1 ml-4 text-lg font-semibold text-gray-700">
                                                {result.subtitle}
                                            </p>
                                            <p className="ml-8 text-gray-600">
                                                {result.content}
                                            </p>
                                            <p className="mt-2 ml-8 text-sm text-gray-500">
                                                {/* Updated link to include query parameter */}
                                                {/* <a
                                            href={`${
                                                result.link
                                            }?q=${encodeURIComponent(
                                                searchQuery
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                            onClick={onClose} // Close modal when a result is clicked
                                        >
                                            {result.link}?q=
                                            {encodeURIComponent(searchQuery)}
                                        </a> */}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Simple debounce function to limit API calls
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}
