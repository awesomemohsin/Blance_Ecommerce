import { useNavigate } from "react-router";

const category = [
    { image: 'https://cdn-icons-png.flaticon.com/256/892/892458.png',    name: "Men's Fashion" },
    { image: 'https://cdn-icons-png.flaticon.com/256/2978/2978194.png',  name: "Women's Fashion" },
    { image: 'https://cdn-icons-png.flaticon.com/256/3069/3069170.png',  name: 'Kids & Baby' },
    { image: 'https://cdn-icons-png.flaticon.com/256/2965/2965877.png',  name: 'Modest Wear' },
    { image: 'https://cdn-icons-png.flaticon.com/256/3531/3531800.png',  name: 'Ethnic & Traditional' },
    { image: 'https://cdn-icons-png.flaticon.com/256/2978/2978194.png',  name: 'Dresses' },
    { image: 'https://cdn-icons-png.flaticon.com/256/892/892721.png',    name: 'Tops & Shirts' },
    { image: 'https://cdn-icons-png.flaticon.com/256/892/892735.png',    name: 'Jeans & Trousers' },
    { image: 'https://cdn-icons-png.flaticon.com/256/892/892495.png',    name: 'Outerwear & Jackets' },
    { image: 'https://cdn-icons-png.flaticon.com/256/2965/2965567.png',  name: 'Activewear' },
    { image: 'https://cdn-icons-png.flaticon.com/256/2829/2829036.png',  name: 'Loungewear & Sleepwear' },
    { image: 'https://cdn-icons-png.flaticon.com/256/892/892651.png',    name: 'Footwear' },
    { image: 'https://cdn-icons-png.flaticon.com/256/3111/3111605.png',  name: 'Bags & Backpacks' },
    { image: 'https://cdn-icons-png.flaticon.com/256/1250/1250615.png',  name: 'Accessories' },
    { image: 'https://cdn-icons-png.flaticon.com/256/1785/1785363.png',  name: 'Jewelry & Watches' },
    { image: 'https://cdn-icons-png.flaticon.com/256/4151/4151526.png',  name: 'Seasonal & Occasion' },
];

const Category = () => {
    const navigate = useNavigate();

    return (
        <section className="py-12 section-warm-bg">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-10">
                    <p className="text-xs font-bold tracking-widest uppercase text-[#f85606] mb-2">Browse by Category</p>
                    <h2 className="text-3xl font-extrabold text-gray-900 section-title">
                        Explore Fashion
                    </h2>
                    <p className="text-gray-500 mt-5 text-sm">Everything you love, all in one place</p>
                </div>

                {/* Category Grid */}
                <div className="flex overflow-x-auto lg:overflow-visible hide-scroll-bar pb-2">
                    <div className="flex lg:flex-wrap lg:justify-center gap-4 min-w-max lg:min-w-0 w-full">
                        {category.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/allproduct?category=${encodeURIComponent(item.name)}`)}
                                className="group cursor-pointer flex flex-col items-center flex-shrink-0"
                                style={{ animationDelay: `${index * 40}ms` }}
                            >
                                {/* Icon container */}
                                <div className="category-pill w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center p-4 mb-3 relative overflow-hidden">
                                    {/* Subtle brand glow on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: 'radial-gradient(circle at center, rgba(248,86,6,0.08) 0%, transparent 70%)' }} />
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-10 h-10 lg:w-14 lg:h-14 object-contain transition-transform duration-300 group-hover:scale-110 relative z-10"
                                    />
                                </div>

                                {/* Label */}
                                <p className="text-xs lg:text-sm font-semibold text-gray-600 text-center group-hover:text-[#f85606] transition-colors duration-200 max-w-[80px] leading-tight">
                                    {item.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Category;