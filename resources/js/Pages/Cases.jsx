import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Dot } from "lucide-react";
import BannerSection from "@/components/BannerSection";
import React, { useEffect, useState } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import { useHighlightQuery } from "@/hooks/useHighlightQuery";

export default function Cases() {
    const [caseStudies, setCaseStudies] = useState([]);

    useEffect(() => {
        fetch("/case_study/data")
            .then((res) => res.json())
            .then((data) => setCaseStudies(data.data)); // assuming same format
    }, []);

    useHighlightQuery(); // <-- This enables highlighting

    return (
        <MainLayout>
            <Head title="Cases Study" />
            <section>
                <div className="container relative max-w-screen-xl mx-auto">
                    <BannerSection
                        src="/images/Case Studies/banner.png"
                        alt="Case Studies Banner"
                    />

                    <div className="absolute bottom-0 left-4">
                        <h1 className="text-[xs] font-bold text-blue-700 lg:text-5xl">
                            Case <br /> Studies
                        </h1>
                        <span className="text-[5px] lg:text-xs">
                            Home/Case Studies
                        </span>
                    </div>
                </div>
            </section>

            <section>
                <div className="container max-w-screen-xl px-4 py-8 mx-auto">
                    <div className="flex items-center justify-center ">
                        <div className="max-w-3xl space-y-4 text-center">
                            <h1 className="text-4xl font-bold">
                                Real Stories. Real Impact.
                            </h1>
                            <p>
                                Explore how local governments, researchers, and
                                communities, are leveraging WEHLO to transform
                                environmental monitoring and disaster
                                preparedness.
                            </p>
                            <div className="flex justify-center">
                                <div className="grid max-w-lg grid-cols-1 gap-4 text-base md:grid-cols-2">
                                    <div>
                                        <Link href="/about_us">
                                            <AnimatedButton
                                                text="Read Success Stories"
                                                className="w-full text-white bg-blue-600 border border-blue-600 hover:text-blue-600"
                                                bgColor="bg-white"
                                                textColor=""
                                            />
                                        </Link>
                                    </div>
                                    <div>
                                        <Link href="/contact_us">
                                            <AnimatedButton
                                                text="Submit Your Experience"
                                                className="w-full text-blue-600 bg-white border border-blue-600 hover:text-white"
                                                bgColor="bg-blue-600"
                                                textColor=""
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container max-w-screen-xl px-4 mx-auto">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {Array.isArray(caseStudies) &&
                            caseStudies.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-[#f1f1f1] gap-8 grid grid-cols-1 items-center p-4 rounded-2xl h-full"
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <img
                                                className="w-full rounded-2xl h-[20rem] object-contain"
                                                src={item.image}
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <span className="text-sm">
                                                Location: {item.location}
                                            </span>
                                            <div className="text-xl font-bold">
                                                {item.title}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link
                                            href={`/cases_details/${item.id}`}
                                        >
                                            <AnimatedButton
                                                text="Read Full Case Study"
                                                className="text-blue-600 bg-transparent border border-blue-600 hover:text-white"
                                                bgColor="bg-blue-600"
                                                textColor=""
                                            />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
