// resources/js/Pages/Admin/Banner/Edit.jsx

import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CaseStudyForm from "@/Components/Admin/Forms/CaseStudy/CaseStudyForm";

const Edit = ({ case_study }) => {
    return (
        <AuthenticatedLayout>
            <div className="container max-w-screen-xl mx-auto">
                <div className="p-6">
                    <h2 className="mb-4 text-2xl font-bold">Edit Case Study</h2>
                    <CaseStudyForm case_study={case_study} isEdit={true} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
