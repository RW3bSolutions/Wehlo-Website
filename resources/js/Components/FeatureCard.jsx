// components/FeatureCard.jsx
export default function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-4 border-2 border-[#8bd3cf] rounded-lg h-[13rem]">
            <div className="flex items-center space-x-4">
                <img
                    className="object-contain size-14"
                    src={icon}
                    alt={title}
                />
                <div className="text-xl font-bold">{title}</div>
            </div>
            <p className="mt-2 text-sm">{description}</p>
        </div>
    );
}
