// components/StatCard.jsx
export default function StatCard({ icon, value, label }) {
    return (
        <div className="flex items-center space-x-4 text-white">
            <img className="object-contain size-20" src={icon} alt={label} />
            <div>
                <span className="text-2xl font-bold">{value}</span>
                <br />
                <span className="text-sm font-semibold">{label}</span>
            </div>
        </div>
    );
}
