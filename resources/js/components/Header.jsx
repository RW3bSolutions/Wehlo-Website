// src/Components/Header.jsx
import { Link, router, usePage } from "@inertiajs/react";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import SearchModal from "@/components/SearchModal";
import GoogleTranslate from "@/components/GoogleTranslate"; // Import the headless GoogleTranslate
import LanguageSelector from "@/components/LanguageSelector"; // Import the new LanguageSelector

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isGoogleTranslateScriptLoaded, setIsGoogleTranslateScriptLoaded] =
        useState(false);

    // Ref to hold the function exposed by GoogleTranslate to change language
    const translateFunctionRef = useRef(null);

    const openSearchModal = () => setIsSearchModalOpen(true);
    const closeSearchModal = () => setIsSearchModalOpen(false);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        console.log(
            "Search form submitted (via old handler, modal handles actual search)."
        );
    }, []);

    const { url } = usePage();

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    const handleGoogleTranslateScriptLoaded = useCallback((loaded) => {
        setIsGoogleTranslateScriptLoaded(loaded);
    }, []);

    // This function will be passed to LanguageSelector to trigger translation
    const handleLanguageChange = useCallback((langCode) => {
        if (translateFunctionRef.current) {
            translateFunctionRef.current(langCode);
        } else {
            console.warn("Google Translate function not available yet.");
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [mobileMenuOpen]);

    // This useEffect is for handling the Google Translate toolbar's padding.
    // It should ideally be managed within the GoogleTranslate component itself
    // if possible, or by observing the specific iframe.
    useEffect(() => {
        const googleTranslateBarHeight = 20; // Adjust if the Google bar is taller
        const htmlElement = document.documentElement;
        const bodyElement = document.body;

        // Check for the Google Translate banner frame directly
        const translateBar = document.querySelector(".goog-te-banner-frame");

        if (translateBar && translateBar.style.display !== "none") {
            bodyElement.style.paddingTop = `${googleTranslateBarHeight}px`;
            htmlElement.classList.add("google-translate-active");
        } else {
            bodyElement.style.paddingTop = "";
            htmlElement.classList.remove("google-translate-active");
        }

        return () => {
            bodyElement.style.paddingTop = "";
            htmlElement.classList.remove("google-translate-active");
        };
    }, [isGoogleTranslateScriptLoaded]); // Re-run when script loaded status changes

    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-white">
            {/* The headless GoogleTranslate component is rendered once and unconditionally here */}
            {/* It initializes the actual Google Translate widget in a hidden div */}
            <GoogleTranslate
                onScriptLoaded={handleGoogleTranslateScriptLoaded}
                setTranslateFunctionRef={translateFunctionRef}
            />

            <nav
                className={`container flex items-center p-2 justify-between mx-auto space-x-8 text-sm md:justify-center lg:space-x-6`}
            >
                {/* Left section */}
                <div className="flex items-center space-x-4 lg:space-x-8">
                    <Link href="/">
                        <img
                            className="block object-contain md:hidden size-14 lg:size-18"
                            src="/images/Homepage/logo header.png"
                            alt="Logo"
                        />
                    </Link>
                    {/* Desktop menu */}
                    <ul className="items-center hidden space-x-8 md:flex lg:space-x-8">
                        <li className="cursor-pointer">
                            {!isSearchModalOpen ? (
                                <Search
                                    size={20}
                                    className="text-gray-700 transition duration-200 hover:text-blue-600"
                                    onClick={openSearchModal}
                                    aria-label="Open search"
                                />
                            ) : (
                                <X
                                    size={20}
                                    className="text-gray-700 transition duration-200 cursor-pointer hover:text-blue-600"
                                    onClick={closeSearchModal}
                                    aria-label="Close search"
                                />
                            )}
                        </li>
                        <li>
                            <Link
                                href="/"
                                className={clsx(
                                    (/^\/(\?q=.*)?$/.test(url) &&
                                        "text-blue-600 font-semibold border-b-2 border-blue-700") ||
                                        "hover:font-bold hover:text-blue-600"
                                )}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about_us"
                                className={clsx(
                                    (/^\/about_us(\?q=.*)?$/.test(url) &&
                                        "text-blue-600 font-semibold border-b-2 border-blue-700") ||
                                        "hover:font-bold hover:text-blue-600"
                                )}
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/platform"
                                className={clsx(
                                    (/^\/platform(\?q=.*)?$/.test(url) &&
                                        "text-blue-600 font-semibold border-b-2 border-blue-700") ||
                                        "hover:font-bold hover:text-blue-600"
                                )}
                            >
                                Features
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Center logo for desktop */}
                <div className="hidden md:block">
                    <Link href="/">
                        <img
                            className="object-contain mx-6 size-14 lg:size-20"
                            src="/images/Homepage/logo header.png"
                            alt="Logo"
                        />
                    </Link>
                </div>

                {/* Right section */}
                <div className="flex items-center space-x-2 lg:space-x-4">
                    <ul className="items-center hidden space-x-8 md:flex lg:space-x-8">
                        <li>
                            <Link
                                href="/blogs"
                                className={clsx(
                                    (/^\/blogs(\?q=.*)?$/.test(url) &&
                                        "text-blue-600 font-semibold border-b-2 border-blue-700") ||
                                        "hover:font-bold hover:text-blue-600"
                                )}
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact_us"
                                className={clsx(
                                    (/^\/contact_us(\?q=.*)?$/.test(url) &&
                                        "text-blue-600 font-semibold border-b-2 border-blue-700") ||
                                        "hover:font-bold hover:text-blue-600"
                                )}
                            >
                                Contact Us
                            </Link>
                        </li>
                        {/* Desktop Language Selector with Skeleton */}
                        <li className="flex items-center justify-center">
                            <div
                                className={clsx(
                                    "relative flex items-center justify-center w-24 h-6",
                                    "hidden md:block" // Visible only on desktop
                                )}
                            >
                                {!isGoogleTranslateScriptLoaded && (
                                    <div className="absolute inset-0 bg-gray-200 rounded-md animate-pulse" />
                                )}
                                <LanguageSelector
                                    onLanguageChange={handleLanguageChange}
                                    isGoogleTranslateScriptLoaded={
                                        isGoogleTranslateScriptLoaded
                                    }
                                />
                            </div>
                        </li>
                    </ul>
                    {/* Mobile Menu/X Toggle */}
                    <div className="md:hidden">
                        {mobileMenuOpen ? (
                            <X
                                size={24}
                                className="text-gray-700 transition duration-200 cursor-pointer hover:text-blue-600"
                                onClick={toggleMobileMenu}
                                aria-label="Close mobile menu"
                            />
                        ) : (
                            <Menu
                                size={24}
                                className="text-gray-700 transition duration-200 cursor-pointer hover:text-blue-600"
                                onClick={toggleMobileMenu}
                                aria-label="Open mobile menu"
                            />
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
                <div className="px-4 pb-4 bg-white md:hidden">
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="/"
                                className={clsx(
                                    (/^\/(\?q=.*)?$/.test(url) &&
                                        "text-blue-600 font-semibold border-b-2 border-blue-700") ||
                                        "hover:font-bold hover:text-blue-600"
                                )}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about_us"
                                className={clsx(
                                    (/^\/about_us(\?q=.*)?$/.test(url) &&
                                        "text-blue-600 font-semibold border-b-2 border-blue-700") ||
                                        "hover:font-bold hover:text-blue-600"
                                )}
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/platform"
                                className={clsx(
                                    (/^\/platform(\?q=.*)?$/.test(url) &&
                                        "text-blue-600 font-semibold border-b-2 border-blue-700") ||
                                        "hover:font-bold hover:text-blue-600"
                                )}
                            >
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/blogs"
                                className={clsx(
                                    (/^\/blogs(\?q=.*)?$/.test(url) &&
                                        "text-blue-600 font-semibold border-b-2 border-blue-700") ||
                                        "hover:font-bold hover:text-blue-600"
                                )}
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact_us"
                                className={clsx(
                                    (/^\/contact_us(\?q=.*)?$/.test(url) &&
                                        "text-blue-600 font-semibold border-b-2 border-blue-700") ||
                                        "hover:font-bold hover:text-blue-600"
                                )}
                            >
                                Contact Us
                            </Link>
                        </li>
                        {/* Mobile Language Selector with Skeleton */}
                        <li className="flex justify-center mt-4">
                            <div
                                className={clsx(
                                    "relative flex items-center justify-center w-24 h-6",
                                    "md:hidden" // Visible only on mobile
                                )}
                            >
                                {!isGoogleTranslateScriptLoaded && (
                                    <div className="absolute inset-0 bg-gray-200 rounded-md animate-pulse" />
                                )}
                                <LanguageSelector
                                    onLanguageChange={handleLanguageChange}
                                    isGoogleTranslateScriptLoaded={
                                        isGoogleTranslateScriptLoaded
                                    }
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            )}

            {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
        </header>
    );
}
