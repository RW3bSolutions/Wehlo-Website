// resources/js/Components/Admin/Forms/Banner/BannerForm.jsx

import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CKEditor from "@/components/CKEditor";
import { Link } from "@inertiajs/react";

const BannerForm = ({
    banner = { title: "", description: "", image: null },
    isEdit = false,
}) => {
    const { data, setData, post, progress, errors } = useForm({
        title: banner.title,
        description: banner.description,
        image: null,
        ...(isEdit ? { _method: "PUT" } : {}),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = isEdit ? "banner.update" : "banner.store";
        const routeParams = isEdit ? { banner: banner.id } : {};

        post(route(routeName, routeParams), {
            preserveState: true,
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label>Sub-title</label>
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
                <label>Title</label>
                <CKEditor
                    value={data.description}
                    onChange={(val) => setData("description", val)} // ✅ Updated
                />
                {errors.description && (
                    <span className="text-sm text-red-500">
                        {errors.description}
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
                {isEdit && banner.image && (
                    <img
                        src={banner.image}
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

            <div className="flex gap-2 mt-4">
                {isEdit && (
                    <Link href="/admin/banner">
                        <Button>Back</Button>
                    </Link>
                )}
                <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
            </div>
        </form>
    );
};

export default BannerForm;
