// resources/js/Components/Admin/Forms/Banner/CategoryForm.jsx

import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@inertiajs/react";

const CategoryForm = ({ category = { name: "" }, isEdit = false }) => {
    const { data, setData, post, errors } = useForm({
        name: category.name,
        ...(isEdit ? { _method: "PUT" } : {}),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = isEdit ? "category.update" : "category.store";
        const routeParams = isEdit ? { category: category.id } : {};

        post(route(routeName, routeParams), {
            preserveState: true,
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label>Category Name</label>
                <Input
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="mb-3"
                />
                {errors.name && (
                    <span className="text-sm text-red-500">{errors.name}</span>
                )}
            </div>

            <div className="flex gap-2 mt-4">
                {isEdit && (
                    <Link href="/admin/category">
                        <Button>Back</Button>
                    </Link>
                )}
                <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
            </div>
        </form>
    );
};

export default CategoryForm;
