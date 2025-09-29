import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen ">
            <Header />

            <main className="flex-grow pt-[5rem] ">{children}</main>

            <Footer />
        </div>
    );
}
