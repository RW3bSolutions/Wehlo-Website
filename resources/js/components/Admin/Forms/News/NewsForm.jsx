import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@inertiajs/react";
import CKEditor from "@/components/CKEditor";

const NewsForm = ({
    categories = [],
    news = {
        title: "",
        location: "",
        date_implemented: "",
        description: "",
        image: null,
        selected_categories: [], // array of IDs
    },
    isEdit = false,
}) => {
    const { data, setData, post, progress, errors } = useForm({
        title: news.title || "",
        location: news.location || "",
        date_implemented: news.date_implemented || "",
        description: news.description || "",
        image: null,
        categories: Array.isArray(news.selected_categories)
            ? news.selected_categories.map(Number)
            : [],
        ...(isEdit ? { _method: "PUT" } : {}),
    });

    const handleCategoryChange = (categoryId) => {
        const newCategories = data.categories.includes(categoryId)
            ? data.categories.filter((id) => id !== categoryId)
            : [...data.categories, categoryId];
        setData("categories", newCategories);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = isEdit ? "news.update" : "news.store";
        const routeParams = isEdit ? { news: news.id } : {};

        post(route(routeName, routeParams), {
            preserveState: true,
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mt-4">
                <label className="block mb-1 font-semibold">Categories</label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`category-${cat.id}`}
                                checked={data.categories.includes(cat.id)}
                                onChange={() => handleCategoryChange(cat.id)}
                                className="mr-2"
                            />
                            <label htmlFor={`category-${cat.id}`}>
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </div>
                {errors.categories && (
                    <span className="text-sm text-red-500">
                        {errors.categories}
                    </span>
                )}
            </div>

            <div>
                <label>Title</label>
                <Input
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    className="mb-3"
                />
                {errors.title && (
                    <span className="text-sm text-red-500">{errors.title}</span>
                )}
            </div>

            <div>
                <label>Location</label>
                <Input
                    value={data.location}
                    onChange={(e) => setData("location", e.target.value)}
                    className="mb-3"
                />
                {errors.location && (
                    <span className="text-sm text-red-500">
                        {errors.location}
                    </span>
                )}
            </div>

            <div>
                <label>Date Implemented</label>
                <Input
                    type="date"
                    value={data.date_implemented}
                    onChange={(e) =>
                        setData("date_implemented", e.target.value)
                    }
                    className="mb-3"
                />
                {errors.date_implemented && (
                    <span className="text-sm text-red-500">
                        {errors.date_implemented}
                    </span>
                )}
            </div>

            <div>
                <label>Image</label>
                <Input
                    type="file"
                    onChange={(e) => setData("image", e.target.files[0])}
                    className="mb-3"
                />
                {isEdit && news.image && (
                    <img
                        src={news.image}
                        alt="Banner"
                        className="w-32 mt-2 rounded"
                    />
                )}
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
                {errors.image && (
                    <span className="text-sm text-red-500">{errors.image}</span>
                )}
            </div>

            <div>
                <label>Description</label>
                <CKEditor
                    value={data.description}
                    onChange={(val) => setData("description", val)}
                />
                {errors.description && (
                    <span className="text-sm text-red-500">
                        {errors.description}
                    </span>
                )}
            </div>

            <div className="flex gap-2 mt-4">
                {isEdit && (
                    <Link href="/admin/news">
                        <Button>Back</Button>
                    </Link>
                )}
                <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
            </div>
        </form>
    );
};

export default NewsForm;
