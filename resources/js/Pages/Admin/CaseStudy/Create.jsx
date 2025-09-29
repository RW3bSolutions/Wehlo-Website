// resources/js/Pages/Banners/Create.jsx
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CaseStudyForm from "@/Components/Admin/Forms/CaseStudy/CaseStudyForm";

const CreateCaseStudy = () => {
    return (
        <AuthenticatedLayout>
            <div className="container max-w-screen-xl mx-auto">
                <div className="p-6">
                    <h2 className="mb-4 text-2xl font-bold">
                        Create Case Study
                    </h2>
                    <CaseStudyForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateCaseStudy;
