import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CKEditor from "@/components/CKeditor";
import { Link } from "@inertiajs/react";

const CaseStudyForm = ({
    case_study = {
        title: "",
        location: "",
        date_implemented: "",
        partner: "",
        duration: "",
        description: "",
        image: null,
    },
    isEdit = false,
}) => {
    const { data, setData, post, progress, errors } = useForm({
        title: case_study.title,
        location: case_study.location,
        date_implemented: case_study.date_implemented,
        partner: case_study.partner,
        duration: case_study.duration,
        description: case_study.description,
        image: null,
        ...(isEdit ? { _method: "PUT" } : {}),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = isEdit ? "case_study.update" : "case_study.store";
        const routeParams = isEdit ? { case_study: case_study.id } : {};

        post(route(routeName, routeParams), {
            preserveState: true,
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    type="date" // ✅ updated here
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
                <label>Partner</label>
                <Input
                    value={data.partner}
                    onChange={(e) => setData("partner", e.target.value)}
                    className="mb-3"
                />
                {errors.partner && (
                    <span className="text-sm text-red-500">
                        {errors.partner}
                    </span>
                )}
            </div>

            <div>
                <label>Duration</label>
                <Input
                    value={data.duration}
                    onChange={(e) => setData("duration", e.target.value)}
                    className="mb-3"
                />
                {errors.duration && (
                    <span className="text-sm text-red-500">
                        {errors.duration}
                    </span>
                )}
            </div>

            <div>
                <label>Description</label>
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
                {isEdit && case_study.image && (
                    <img
                        src={case_study.image}
                        alt="case_study"
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
                    <Link href="/admin/case_study">
                        <Button>Back</Button>
                    </Link>
                )}
                <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
            </div>
        </form>
    );
};

export default CaseStudyForm;
