// components/FeatureBlock.jsx
export default function FeatureBlock({
    tag,
    title,
    description,
    image,
    reverse = false,
}) {
    return (
        <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
            <div
                className={`space-y-4 ${reverse ? "md:order-2" : "md:order-1"}`}
            >
                <div className="flex">
                    <span className="flex items-center px-4 py-2 space-x-2 text-sm border border-[#479295] rounded-full">
                        <span>
                            <button className="bg-[#479295] rounded-full size-2"></button>
                        </span>
                        <span>{tag}</span>
                    </span>
                </div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p>{description}</p>
            </div>
            <div className={`${reverse ? "md:order-1" : "md:order-2"}`}>
                <img src={image} alt={tag} />
            </div>
        </div>
    );
}
