import { SendHorizontal } from "lucide-react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Link } from "@inertiajs/react";
import AnimatedButton from "@/components/AnimatedButton";

export default function Footer() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email_address: "",
    });

    // Social media data
    const socialMedia = [
        {
            name: "Facebook",
            url: "https://facebook.com/yourpage",
            icon: "/images/Homepage/icon - socmed/fb.webp",
            alt: "Facebook",
        },
        {
            name: "Twitter",
            url: "https://twitter.com/yourhandle",
            icon: "/images/Homepage/icon - socmed/twitter.webp",
            alt: "Twitter",
        },
        {
            name: "Instagram",
            url: "https://instagram.com/yourprofile",
            icon: "/images/Homepage/icon - socmed/instagram.webp",
            alt: "Instagram",
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/company/yourcompany",
            icon: "/images/Homepage/icon - socmed/linkedin.webp",
            alt: "LinkedIn",
        },
    ];

    return (
        <footer className="text-white ">
            {/* Top CTA Section */}
            <div className="relative mt-8">
                <img
                    className="absolute inset-0 object-cover object-center w-full h-full"
                    src="/images/Platform/bg (2).webp"
                    alt="Weather monitoring technology background"
                />
                <div className="container relative max-w-screen-xl px-4 py-12 mx-auto space-y-12">
                    <h1 className="text-2xl font-bold text-center text-white md:text-4xl">
                        Experience the Power of <br /> Localized Monitoring
                    </h1>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 gap-4 text-base md:grid-cols-2">
                            <div>
                                <Link href="/contact_us">
                                    <AnimatedButton
                                        text="Request a Demo"
                                        className="w-full text-white bg-blue-600 hover:text-blue-600"
                                        bgColor="bg-white"
                                        textColor=""
                                    />
                                </Link>
                            </div>
                            <div>
                                <Link href="/contact_us">
                                    <AnimatedButton
                                        text="Contact Us for Deployment"
                                        className="w-full text-blue-600 bg-white hover:text-white"
                                        bgColor="bg-blue-600"
                                        textColor=""
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative p-4 text-white border-t border-t-white">
                <img
                    src="/images/Homepage/bg footer.webp"
                    className="absolute inset-0 object-cover object-center w-full h-full"
                    alt="Footer background texture"
                />
                <div className="absolute inset-0 w-full h-full bg-black bg-opacity-45"></div>
                <div className="relative w-full py-8 mx-auto space-y-12">
                    <div className="flex flex-wrap items-center justify-between gap-8 mx-6">
                        <div>
                            <img
                                className="object-contain size-24"
                                src="/images/Homepage/logo header.png"
                                alt="WEHLO Logo"
                            />
                        </div>
                        <div>
                            <h1 className="max-w-2xl text-base font-bold md:text-2xl">
                                Providing real-time weather, environmental, and
                                hydromet data to support safer, smarter, and
                                more resilient communities.
                            </h1>
                        </div>
                    </div>
                    <hr className="border border-[#8bd3cf]" />
                    <div className="grid grid-cols-1 gap-8 mx-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Company Links */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold text-[#8bd3cf]">
                                Company
                            </h2>
                            <ul className="space-y-3 text-lg">
                                <li>
                                    <Link
                                        href="/about_us"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact_us"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blogs"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blogs"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        Success Stories
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Products Links */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold text-[#8bd3cf]">
                                Products
                            </h2>
                            <ul className="space-y-3 text-lg">
                                <li>
                                    <Link
                                        href="/platform"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        Platform Overview
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/platform"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        Weather Stations
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/platform"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        Sensors
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/platform"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        Hydromet Platforms
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Solutions Links */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold text-[#8bd3cf]">
                                Solutions
                            </h2>
                            <ul className="space-y-3 text-lg">
                                <li>
                                    <Link
                                        href="/#"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        Environmental Monitoring
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        Monitoring Software
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        Government Solutions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#"
                                        className="hover:text-[#8bd3cf] transition-colors duration-200"
                                    >
                                        Research Platforms
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media & Newsletter */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-[#8bd3cf]">
                                Connect With Us
                            </h2>

                            {/* Social Media Icons */}
                            <div className="flex flex-wrap gap-4">
                                {socialMedia.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group"
                                        aria-label={`Visit our ${social.name} page`}
                                    >
                                        <img
                                            className="object-contain w-10 h-10 transition-all duration-300 hover:scale-110"
                                            src={social.icon}
                                            alt={social.alt}
                                        />
                                        <span className="absolute px-2 py-1 mb-2 text-xs text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100 whitespace-nowrap">
                                            {social.name}
                                        </span>
                                    </a>
                                ))}
                            </div>

                            {/* Newsletter Form */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    post(route("store.newsletter"), {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            Swal.fire({
                                                icon: "success",
                                                title: "Thanks for subscribing!",
                                                text: "You'll now receive our latest updates.",
                                                confirmButtonColor: "#3085d6",
                                            });
                                            reset();
                                        },
                                        onError: () => {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Subscription Failed",
                                                text: "Please check your email and try again.",
                                                confirmButtonColor: "#d33",
                                            });
                                        },
                                    });
                                }}
                                className="mt-6"
                            >
                                <label
                                    htmlFor="email"
                                    className="block mb-3 text-lg font-medium"
                                >
                                    Newsletter Signup
                                </label>
                                <div className="relative flex w-full">
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email_address}
                                        onChange={(e) =>
                                            setData(
                                                "email_address",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Your email address"
                                        className="flex-1 px-4 py-[11px] text-base text-gray-900 bg-white rounded-l-lg rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        aria-label="Email address for newsletter"
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="absolute right-0 px-6 py-3 text-base font-medium text-white transition-colors bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        aria-label="Subscribe to newsletter"
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center"></span>
                                        ) : (
                                            "Subscribe"
                                        )}
                                    </button>
                                </div>
                                {errors.email_address && (
                                    <p className="mt-2 text-sm text-red-300">
                                        {errors.email_address}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="relative py-4 text-center text-white bg-blue-600">
                <div className="container max-w-screen-xl px-4 mx-auto">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div>
                            <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                                <li>
                                    <Link
                                        href="/#"
                                        className="transition-colors duration-200 hover:underline"
                                    >
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#"
                                        className="transition-colors duration-200 hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#"
                                        className="transition-colors duration-200 hover:underline"
                                    >
                                        Cookie Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm md:text-base">
                                Copyright &copy; {new Date().getFullYear()}{" "}
                                WEHLO. Designed & developed by{" "}
                                <a
                                    href="https://rwebsolutions.com.ph/"
                                    className="font-bold transition-colors duration-200 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    R Web Solutions Corp
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
