const ServiceCard = ({ title, description, vehicles, icon }) => {
    return (
        <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-arl-secondary/10 via-transparent to-arl-primary/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            {/* Icon */}
            <div className="relative w-14 h-14 rounded-2xl bg-arl-secondary/10 flex items-center justify-center text-2xl mb-5">
                {icon}
            </div>

            {/* Title */}
            <h3 className="relative text-xl font-bold text-arl-primary mb-3 leading-snug">
                {title}
            </h3>

            {/* Description */}
            <p className="relative text-sm text-gray-600 leading-relaxed mb-5">
                {description}
            </p>

            {/* Recommended */}
            <p className="relative text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Recommended Vehicles
            </p>

            {/* Tags */}
            <div className="relative flex flex-wrap gap-2">
                {vehicles.map((vehicle, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-arl-primary/5 text-arl-primary border border-arl-primary/10"
                    >
                        {vehicle}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ServiceCard;