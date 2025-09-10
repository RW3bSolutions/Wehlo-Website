// resources/js/Pages/Banners/Create.jsx
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BannerForm from "@/Components/Admin/Forms/Banner/BannerForm";

const CreateBanner = () => {
    return (
        <AuthenticatedLayout>
            <div className="container max-w-screen-xl mx-auto">
                <div className="p-6">
                    <h2 className="mb-4 text-2xl font-bold">Create Banner</h2>
                    <BannerForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateBanner;
