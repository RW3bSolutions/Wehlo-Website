// components/BannerSection.jsx
const BannerSection = ({ src, alt = "", className = "" }) => {
    return (
        <section className={className}>
            <div className="container max-w-screen-xl px-4 pt-8 mx-auto">
                <img src={src} alt={alt} />
            </div>
        </section>
    );
};

export default BannerSection;
