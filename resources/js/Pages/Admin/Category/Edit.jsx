// resources/js/Pages/Admin/Banner/Edit.jsx

import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CategoryForm from "@/Components/Admin/Forms/Category/CategoryForm";

const Edit = ({ category }) => {
    return (
        <AuthenticatedLayout>
            <div className="container max-w-screen-xl mx-auto">
                <div className="p-6">
                    <h2 className="mb-4 text-2xl font-bold">Edit Category</h2>
                    <CategoryForm category={category} isEdit={true} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
