import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Dot } from "lucide-react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function CasesDetails({ cases }) {
    const slides = [
        "/images/Homepage/1.webp",
        "/images/Homepage/2.webp",
        "/images/Homepage/3.webp",
        "/images/Homepage/4.webp",
        "/images/Homepage/5.webp",
    ];
    return (
        <MainLayout>
            <Head title="Cases Study" />
            <section>
                <div className="container max-w-screen-xl px-4 pt-8 mx-auto space-y-4">
                    <div className=" rounded-xl">
                        <img
                            className="object-contain w-full  h-[30rem] rounded-2xl"
                            src={cases.image}
                            alt=""
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-blue-700">
                            {cases.title}
                        </h1>

                        <h1 className="text-2xl font-bold ">
                            Project Overview
                        </h1>
                        <ul className="space-y-2 text-base">
                            <li className="space-x-2">
                                <span className="text-black ">Location:</span>
                                <strong>{cases.location}</strong>
                            </li>
                            <li className="space-x-2">
                                <span className="text-black ">
                                    Date Published:
                                </span>
                                <strong>
                                    {new Date(
                                        cases.created_at
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                    })}
                                </strong>
                            </li>
                            <li className="space-x-2">
                                <span className="text-black ">
                                    Client/Partner:
                                </span>
                                <strong>{cases.partner}</strong>
                            </li>
                            <li className="space-x-2">
                                <span className="text-black ">Duration:</span>
                                <strong>{cases.duration}</strong>
                            </li>
                        </ul>

                        <div
                            className="text-base ck-content"
                            dangerouslySetInnerHTML={{
                                __html: cases.description,
                            }}
                        />
                    </div>
                </div>
            </section>
            <section>
                <div className="container pt-8 ml-auto">
                    <Swiper
                        grabCursor={true}
                        loop={true}
                        spaceBetween={20}
                        modules={[Pagination]}
                        className="mySwiper"
                        breakpoints={{
                            0: {
                                slidesPerView: 1, // for very small screens
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
                                slidesPerView: 2.5,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3.5,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {slides.map((src, index) => (
                            <SwiperSlide key={index}>
                                <div>
                                    <div>
                                        <img
                                            className="w-full rounded-xl"
                                            src={src}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </MainLayout>
    );
}
