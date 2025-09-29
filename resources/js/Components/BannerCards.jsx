export default function BannerCards({ cards }) {
    return (
        <div className="grid grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 md:grid-cols-4">
            {cards.map((text, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center p-4 text-center transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-xl"
                >
                    <h3 className="text-base font-medium text-blue-700 sm:text-lg md:text-xl">
                        {text}
                    </h3>
                </div>
            ))}
        </div>
    );
}
