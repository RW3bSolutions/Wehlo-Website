import * as React from "react";
import {
    House,
    Flag,
    Contact,
    Proportions,
    BriefcaseBusiness,
    Newspaper,
    Mails,
} from "lucide-react";
import { usePage } from "@inertiajs/react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.

export function AppSidebar({ ...props }) {
    const { props: pageProps } = usePage();

    const data = {
        user: {
            name: pageProps.auth.user.name,
            email: pageProps.auth.user.email,
            avatar: "/avatars/shadcn.jpg", // Replace or make dynamic if needed
        },
        projects: [
            {
                name: "Dashboard",
                url: "/dashboard",
                icon: House,
            },
            {
                name: "Banner",
                url: "/admin/banner",
                icon: Flag,
            },

            {
                name: "Contact Us",
                url: "/admin/contacts",
                icon: Contact,
            },
            {
                name: "Newsletter",
                url: "/admin/newsletter",
                icon: Mails,
            },
            {
                name: "Category",
                url: "/admin/category",
                icon: Proportions,
            },
            {
                name: "Case Study",
                url: "/admin/case_study",
                icon: BriefcaseBusiness,
            },
            {
                name: "News",
                url: "/admin/news",
                icon: Newspaper,
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
