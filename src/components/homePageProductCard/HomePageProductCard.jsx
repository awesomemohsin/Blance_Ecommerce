import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const HomePageProductCard = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllProduct } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const serializeItem = (item) => ({
        ...item,
        time: item.time ? new Date(item.time.seconds * 1000).toISOString() : null,
    });

    const addCart = (item) => {
        dispatch(addToCart(serializeItem(item)));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(serializeItem(item)));
        toast.success("Removed from cart");
    };

    const renderPrice = (product) => {
        if (product.offer?.isActive) {
            const currentDate = new Date();
            const validUntil = product.offer.validUntil ? new Date(product.offer.validUntil) : null;
            if (!validUntil || currentDate <= validUntil) {
                return (
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-2xl font-extrabold text-gray-900">
                            ৳{product.offer.discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                            ৳{product.price}
                        </span>
                        <span className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">
                            -{product.offer.discountPercentage}%
                        </span>
                    </div>
                );
            }
        }
        return (
            <span className="text-2xl font-extrabold text-gray-900">৳{product.price}</span>
        );
    };

    const renderStars = (rating) => {
        const stars = [];
        const rounded = Math.round(rating * 2) / 2;
        for (let i = 1; i <= 5; i++) {
            if (i <= rounded)          stars.push(<FaStar key={i} className="text-amber-400 w-3.5 h-3.5" />);
            else if (i - 0.5 === rounded) stars.push(<FaStarHalfAlt key={i} className="text-amber-400 w-3.5 h-3.5" />);
            else                       stars.push(<FaRegStar key={i} className="text-amber-300 w-3.5 h-3.5" />);
        }
        return stars;
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <section className="py-16 section-accent-bg">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-12">
                    <p className="text-xs font-bold tracking-widest uppercase text-[#f85606] mb-2">Handpicked For You</p>
                    <h2 className="text-3xl font-extrabold text-gray-900 section-title">
                        Bestselling Products
                    </h2>
                    <p className="text-gray-500 mt-5 text-sm max-w-md mx-auto">
                        Discover the latest trends in fashion with our curated collections
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {getAllProduct && getAllProduct.length > 0 ? (
                        getAllProduct.slice(0, 8).map((item, index) => {
                            const { id, title, price, productImageUrl, description = '', category = '', offer = {}, reviews = [] } = item;
                            const inCart = cartItems.some((p) => p.id === item.id);
                            const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

                            return (
                                <div
                                    key={index}
                                    className="group card-premium flex flex-col overflow-hidden"
                                    style={{ animationDelay: `${index * 60}ms` }}
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden bg-gray-50" style={{ height: '260px' }}>
                                        <img
                                            onClick={() => navigate(`/productinfo/${id}`)}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                                            src={productImageUrl}
                                            alt={title}
                                        />

                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Badges */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                                            {category && (
                                                <span className="bg-white/90 backdrop-blur-sm text-[#f85606] text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-orange-100">
                                                    {category}
                                                </span>
                                            )}
                                        </div>
                                        {offer?.isActive && (
                                            <div className="absolute top-3 right-3">
                                                <span className="offer-badge shadow-lg">OFFER</span>
                                            </div>
                                        )}

                                        {/* Quick view overlay */}
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <button
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                className="bg-white text-gray-800 text-xs font-bold px-5 py-2 rounded-full shadow-xl hover:bg-[#f85606] hover:text-white transition-colors duration-200 whitespace-nowrap"
                                            >
                                                Quick View →
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-[#f85606] uppercase tracking-wide mb-1">Blance</p>
                                            <h3
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                className="text-base font-bold text-gray-800 mb-1.5 line-clamp-2 cursor-pointer hover:text-[#f85606] transition-colors duration-200 leading-snug"
                                            >
                                                {title}
                                            </h3>
                                            {description && (
                                                <p className="text-gray-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                                                    {description}
                                                </p>
                                            )}

                                            {/* Stars + count */}
                                            <div className="flex items-center gap-1.5 mb-3">
                                                <div className="flex">{renderStars(avgRating)}</div>
                                                <span className="text-xs text-gray-400">({reviews.length})</span>
                                            </div>

                                            {/* Price */}
                                            <div className="mb-4">{renderPrice(item)}</div>
                                        </div>

                                        {/* Cart Button */}
                                        {inCart ? (
                                            <button
                                                onClick={() => deleteCart(item)}
                                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold text-sm transition-all duration-200 border border-red-100 hover:border-red-200"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Remove from Cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => addCart(item)}
                                                className="w-full flex items-center justify-center gap-2 py-2.5 btn-brand text-sm"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                                </svg>
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-[#f85606]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <p className="text-gray-500 font-medium">No products available at the moment</p>
                            <p className="text-gray-400 text-sm mt-1">Check back soon for new arrivals!</p>
                        </div>
                    )}
                </div>

                {/* View All CTA */}
                {getAllProduct && getAllProduct.length > 0 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate('/allproduct')}
                            className="inline-flex items-center gap-2 px-8 py-3.5 btn-brand text-sm"
                        >
                            View All Products
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HomePageProductCard;