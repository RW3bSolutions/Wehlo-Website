import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Dot } from "lucide-react";

export default function BlogsDetails({ news }) {
    return (
        <MainLayout>
            <Head title="Blogs" />
            <section>
                <div className="container max-w-screen-xl px-4 pt-8 mx-auto space-y-4">
                    <div className=" rounded-xl">
                        <img
                            className="object-contain w-full object-center h-[30rem] rounded-2xl"
                            src={news.image}
                            alt=""
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-blue-700">
                            {news.title}
                        </h1>

                        <ul className="space-y-2 text-base">
                            <li>
                                <span className="font-bold text-gray-600">
                                    Location:
                                </span>
                                <strong>{news.location}</strong>
                            </li>
                            <li>
                                <span className="font-bold text-gray-600">
                                    Date Published:
                                </span>{" "}
                                <strong>
                                    {new Date(
                                        news.created_at
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                    })}
                                </strong>
                            </li>
                            <li>
                                <span className="font-bold text-gray-700">
                                    Category:
                                </span>{" "}
                                {news.categories && news.categories.length > 0
                                    ? news.categories.map((cat, index) => (
                                          <strong key={cat.id}>
                                              {cat.name}
                                              {index <
                                                  news.categories.length - 1 &&
                                                  " | "}
                                          </strong>
                                      ))
                                    : "Uncategorized"}
                            </li>
                        </ul>

                        <div
                            className="text-base ck-content"
                            dangerouslySetInnerHTML={{
                                __html: news.description,
                            }}
                        />
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
