// resources/js/Pages/Admin/Banner/Edit.jsx

import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NewsForm from "@/components/Admin/Forms/News/NewsForm";

const Edit = ({ news, categories }) => {
    return (
        <AuthenticatedLayout>
            <div className="container max-w-screen-xl mx-auto">
                <div className="p-6">
                    <h2 className="mb-4 text-2xl font-bold">Edit News</h2>
                    <NewsForm
                        categories={categories}
                        news={news}
                        isEdit={true}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
