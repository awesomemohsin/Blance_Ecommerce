import { Carousel, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import heroImage  from "../../assets/hero.png";
import heroImage1 from "../../assets/hero1.png";
import heroImage2 from "../../assets/hero2.png";

const slides = [
  {
    image: heroImage,
    tag: "New Arrivals",
    headline: "Discover Your Perfect Style",
    sub: "Trend-forward fashion crafted for every occasion",
    cta: "Shop Now",
    ctaPath: "/allproduct",
  },
  {
    image: heroImage1,
    tag: "Modest Wear",
    headline: "Elegance Meets Comfort",
    sub: "Premium fabrics, timeless designs for the modern wardrobe",
    cta: "Explore Collection",
    ctaPath: "/allproduct?category=Modest%20Wear",
  },
  {
    image: heroImage2,
    tag: "Seasonal Picks",
    headline: "Style for Every Season",
    sub: "Curated looks that keep you ahead of every trend",
    cta: "View Picks",
    ctaPath: "/allproduct?category=Seasonal%20%26%20Occasion",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-4 pb-2">
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[280px] sm:h-[380px] md:h-[480px] lg:h-[580px] rounded-3xl overflow-hidden shadow-2xl">
          <Carousel
            autoplay
            autoplayDelay={6000}
            loop
            className="rounded-3xl h-full"
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="!absolute top-1/2 left-4 -translate-y-1/2 bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 transition-all duration-300 !rounded-full"
              >
                <ArrowLeftIcon strokeWidth={2.5} className="w-5 h-5 text-white" />
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="!absolute top-1/2 right-4 -translate-y-1/2 bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 transition-all duration-300 !rounded-full"
              >
                <ArrowRightIcon strokeWidth={2.5} className="w-5 h-5 text-white" />
              </IconButton>
            )}
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`block h-2 cursor-pointer rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "w-8 bg-[#f85606]"
                        : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}
          >
            {slides.map((slide, idx) => (
              <div key={idx} className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className="h-full w-full object-cover"
                />

                {/* Multi-layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/65 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-end">
                  <div className="mr-8 sm:mr-14 lg:mr-20 max-w-xl animate-fade-up text-right">
                    {/* Tag pill */}
                    <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#f85606] text-white shadow-lg">
                      {slide.tag}
                    </span>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-xl">
                      {slide.headline}
                    </h1>

                    {/* Sub */}
                    <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-8 max-w-sm leading-relaxed">
                      {slide.sub}
                    </p>

                    {/* CTA */}
                    <div className="flex justify-end">
                    <button
                      onClick={() => navigate(slide.ctaPath)}
                      className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#f85606] hover:bg-[#c94200] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {slide.cta}
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Trust bar below hero */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: "🚚", label: "Free Delivery", sub: "On orders over ৳999" },
            { icon: "🔄", label: "Easy Returns", sub: "7-day hassle-free" },
            { icon: "🛡️", label: "Secure Payment", sub: "100% protected" },
            { icon: "⭐", label: "Premium Quality", sub: "Certified fabrics" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-orange-50 hover:border-[#f85606]/20 hover:shadow-md transition-all duration-200">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-xs font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
