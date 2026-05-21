/* eslint-disable react/no-unescaped-entities */

const testimonials = [
    {
        name: "Maya Islam",
        role: "Fashion Enthusiast",
        avatar: "https://abayaandgown.com/wp-content/uploads/2023/08/Borkha-Unlimited-Hijab1.jpg",
        quote: "Elanzo makes shopping modest fashion effortless. The abayas fit beautifully and the fabric quality is premium — I feel confident every time I step out!",
        rating: 5,
        tag: "Modest Wear",
    },
    {
        name: "Tahmina Rahman",
        role: "University Student",
        avatar: "https://laz-img-sg.alicdn.com/p/0dbea0b9e33f8333b33b1e7aa8d7a442.jpg",
        quote: "I love Elanzo's new arrivals — stylish, modest, and affordable. The tailoring is on point and the size guide is spot on for me.",
        rating: 4,
        tag: "New Arrivals",
    },
    {
        name: "Md Moynul Islam",
        role: "Style Advocate",
        avatar: "https://cdn.pixabay.com/photo/2022/03/16/17/08/boy-7072850_640.jpg",
        quote: "Fast delivery, easy returns, and great fits — Elanzo has become my go-to for everyday fashion. The styles are trendy yet modest.",
        rating: 5,
        tag: "Everyday Style",
    },
];

const StarRow = ({ rating }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
            <svg
                key={i}
                className={`w-4 h-4 ${i <= rating ? 'text-amber-400' : 'text-gray-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const Testimonial = () => {
    return (
        <section className="py-20 section-warm-bg">
            <div className="container px-4 mx-auto">
                {/* Heading */}
                <div className="text-center mb-14">
                    <p className="text-xs font-bold tracking-widest uppercase text-[#f85606] mb-2">Customer Love</p>
                    <h2 className="text-3xl font-extrabold text-gray-900 section-title">
                        Customer Stories
                    </h2>
                    <p className="text-gray-500 mt-5 text-sm max-w-md mx-auto">
                        Real experiences from our fashion community
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="group card-premium p-8 relative overflow-hidden">
                            {/* Decorative blob */}
                            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                                style={{ background: 'radial-gradient(circle, #fff3eb, transparent)' }} />

                            {/* Large quote mark */}
                            <div className="absolute top-5 right-6 text-6xl leading-none font-serif text-[#f85606]/10 select-none group-hover:text-[#f85606]/20 transition-colors duration-300">
                                "
                            </div>

                            {/* Tag */}
                            <span className="inline-block mb-5 px-3 py-1 rounded-full text-xs font-bold text-[#f85606] bg-orange-50 border border-orange-100">
                                {t.tag}
                            </span>

                            {/* Stars */}
                            <StarRow rating={t.rating} />

                            {/* Quote */}
                            <p className="text-gray-600 my-5 text-sm leading-relaxed italic">
                                "{t.quote}"
                            </p>

                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-orange-100 via-orange-200 to-transparent mb-5" />

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-[#f85606]/20 group-hover:ring-[#f85606]/40 transition-all duration-300"
                                        src={t.avatar}
                                    />
                                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                                    <p className="text-xs text-gray-400">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA banner */}
                <div className="mt-14 text-center">
                    <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-8 py-5 shadow-md border border-orange-50">
                        <div className="flex -space-x-2">
                            {testimonials.map((t, i) => (
                                <img key={i} src={t.avatar} alt={t.name}
                                    className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                            ))}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-gray-800">Join 10,000+ happy shoppers</p>
                            <p className="text-xs text-gray-400">Rated 4.8/5 by our community</p>
                        </div>
                        <div className="flex gap-0.5 ml-2">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;