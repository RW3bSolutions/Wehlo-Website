// resources/js/Pages/Banners/Create.jsx
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NewsForm from "@/Components/Admin/Forms/News/NewsForm";

const CreateNews = ({ categories }) => {
    return (
        <AuthenticatedLayout>
            <div className="container max-w-screen-xl mx-auto">
                <div className="p-6">
                    <h2 className="mb-4 text-2xl font-bold">Create News</h2>
                    <NewsForm categories={categories} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateNews;
