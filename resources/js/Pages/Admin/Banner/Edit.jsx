// resources/js/Pages/Admin/Banner/Edit.jsx

import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BannerForm from "@/components/Admin/Forms/Banner/BannerForm";

const Edit = ({ banner }) => {
    return (
        <AuthenticatedLayout>
            <div className="container max-w-screen-xl mx-auto">
                <div className="p-6">
                    <h2 className="mb-4 text-2xl font-bold">Edit Banner</h2>
                    <BannerForm banner={banner} isEdit={true} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
