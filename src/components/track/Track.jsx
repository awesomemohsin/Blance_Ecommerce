const features = [
    {
        emoji: "👗",
        gradient: "from-orange-50 to-amber-50",
        iconColor: "#f85606",
        title: "Designed for Everyday Style",
        desc: "Curated collections for modest and contemporary fashion — comfortable fits, versatile looks, and premium fabrics you'll love.",
        stat: "500+",
        statLabel: "Styles available",
    },
    {
        emoji: "✅",
        gradient: "from-rose-50 to-orange-50",
        iconColor: "#ef4444",
        title: "Quality Guaranteed",
        desc: "Every piece is quality-checked for stitching, fabric, and fit — plus a reliable size guide to help you pick with confidence.",
        stat: "4.8★",
        statLabel: "Average rating",
    },
    {
        emoji: "💚",
        gradient: "from-emerald-50 to-teal-50",
        iconColor: "#10b981",
        title: "Ethically Made",
        desc: "Responsible sourcing and fair production practices — crafted with care for people and the planet we all share.",
        stat: "100%",
        statLabel: "Ethically sourced",
    },
];

const Track = () => {
    return (
        <section className="py-20" style={{ background: 'linear-gradient(180deg, #faf9f7 0%, #fff3eb 50%, #faf9f7 100%)' }}>
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-14">
                    <p className="text-xs font-bold tracking-widest uppercase text-[#f85606] mb-2">Our Promise</p>
                    <h2 className="text-3xl font-extrabold text-gray-900 section-title">
                        Why Choose Blance?
                    </h2>
                    <p className="text-gray-500 mt-5 text-sm max-w-md mx-auto">
                        Discover trend-forward styles with comfort, quality, and value
                    </p>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="group card-premium p-8 text-center relative overflow-hidden">
                            {/* Background gradient blob */}
                            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${f.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-500 blur-2xl`} />

                            {/* Icon */}
                            <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${f.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                <span className="text-4xl animate-float" style={{ animationDelay: `${i * 0.4}s` }}>{f.emoji}</span>
                            </div>

                            {/* Stat badge */}
                            <div className="mb-5">
                                <span className="text-3xl font-black" style={{ color: f.iconColor }}>{f.stat}</span>
                                <p className="text-xs text-gray-400 font-medium">{f.statLabel}</p>
                            </div>

                            <h3 className="text-lg font-extrabold text-gray-800 mb-3">{f.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom band */}
                <div className="mt-14 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #c94200 0%, #f85606 50%, #ff8c42 100%)' }}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/20">
                        {[
                            { num: "10K+", label: "Happy Customers" },
                            { num: "500+", label: "Fashion Styles" },
                            { num: "4.8/5", label: "Avg. Rating" },
                            { num: "99%", label: "Satisfaction Rate" },
                        ].map((s, i) => (
                            <div key={i} className="py-6 px-4 text-center text-white">
                                <p className="text-2xl font-black">{s.num}</p>
                                <p className="text-xs text-white/70 font-medium mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Track;