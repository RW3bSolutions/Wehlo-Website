// resources/js/Pages/Banners/Create.jsx
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CategoryForm from "@/Components/Admin/Forms/Category/CategoryForm";

const CreateCategory = () => {
    return (
        <AuthenticatedLayout>
            <div className="container max-w-screen-xl mx-auto">
                <div className="p-6">
                    <h2 className="mb-4 text-2xl font-bold">Create Category</h2>
                    <CategoryForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateCategory;
