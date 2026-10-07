import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useMemo, useState } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { useSearchParams } from "react-router-dom";


const AllProduct = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const context = useContext(myContext);
    const {getAllProduct} = context;

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Filters state
    const initialCategory = searchParams.get('category') || '';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const prices = useMemo(() => {
        const vals = (getAllProduct || [])
            .map(p => Number(p.price) || 0)
            .filter(n => !Number.isNaN(n));
        const min = vals.length ? Math.min(...vals) : 0;
        const max = vals.length ? Math.max(...vals) : 0;
        return { min, max };
    }, [getAllProduct]);
    const [maxPrice, setMaxPrice] = useState(prices.max);
    const [sortBy, setSortBy] = useState('none'); // 'price_asc' | 'price_desc' | 'none'

    // Keep URL in sync when category changes
    useEffect(() => {
        const next = new URLSearchParams(searchParams);
        if (selectedCategory) next.set('category', selectedCategory);
        else next.delete('category');
        setSearchParams(next, { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);

    // Update maxPrice when product list changes
    useEffect(() => {
        setMaxPrice(prices.max);
    }, [prices.max]);

    // Unique categories from products
    const categoryOptions = useMemo(() => {
        const set = new Set();
        (getAllProduct || []).forEach(p => p?.category && set.add(p.category));
        return Array.from(set);
    }, [getAllProduct]);

    // Derived filtered + sorted list
    const filteredSorted = useMemo(() => {
        const items = (getAllProduct || [])
            .filter(p => !selectedCategory || p.category === selectedCategory)
            .filter(p => {
                const price = Number(p.price) || 0;
                return price <= (Number(maxPrice) || 0) && price >= (Number(prices.min) || 0);
            });
        if (sortBy === 'price_asc') return [...items].sort((a, b) => (Number(a.price)||0) - (Number(b.price)||0));
        if (sortBy === 'price_desc') return [...items].sort((a, b) => (Number(b.price)||0) - (Number(a.price)||0));
        return items;
    }, [getAllProduct, selectedCategory, maxPrice, sortBy, prices.min]);

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart")
    }

    // Persist cart in localStorage
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (_) {
            // ignore storage errors
        }
    }, [cartItems]);

    return (
        <Layout>
            <div className="bg-gradient-to-b from-green-50 dark:from-gray-900 to-transparent py-8 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-400 transition-colors duration-300">Our Products</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300"> Discover the latest trends in fashion with our curated collections</p>
                    </div>

                    {/* Filters + Products Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Sidebar Filters */}
                        <aside className="lg:col-span-3">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 mb-5 transition-colors duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-300">Categories</h3>
                                <button
                                    className={`block w-full text-left px-3 py-2 rounded-lg mb-2 ${!selectedCategory ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'} transition-colors duration-300`}
                                    onClick={() => setSelectedCategory('')}
                                >All Categories</button>
                                {categoryOptions.map((cat) => (
                                    <button
                                        key={cat}
                                        className={`block w-full text-left px-3 py-2 rounded-lg mb-2 ${selectedCategory === cat ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'} transition-colors duration-300`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >{cat}</button>
                                ))}
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 mb-5 transition-colors duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-300">Price (৳)</h3>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">Up to: <span className="font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">৳{maxPrice || 0}</span></div>
                                <input
                                    type="range"
                                    min={prices.min}
                                    max={prices.max}
                                    value={maxPrice || 0}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full accent-green-600 dark:accent-green-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">
                                    <span>৳{prices.min || 0}</span>
                                    <span>৳{prices.max || 0}+</span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 transition-colors duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-300">Sort by</h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-100 dark:focus:ring-green-800 transition-colors duration-300"
                                >
                                    <option value="none">Default</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                </select>
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredSorted.map((item, index) => {
                                const { id, title, price, productImageUrl, description = '', category = '' } = item;
                                return (
                                    <div key={index} className="group">
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                                            {/* Image Container */}
                                            <div className="relative overflow-hidden">
                                                <img
                                                    onClick={() => navigate(`/productinfo/${id}`)}
                                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                                    src={productImageUrl}
                                                    alt={title}
                                                />
                                                {/* Category Tag */}
                                                {category && (
                                                    <span className="absolute top-4 left-4 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs px-3 py-1 rounded-full capitalize transition-colors duration-300">
                                                        {category}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <div className="mb-4">
                                                    <h2 className="text-sm text-green-600 dark:text-green-500 font-medium mb-1 transition-colors duration-300">
                                                        Blance
                                                    </h2>
                                                    <h3 
                                                        onClick={() => navigate(`/productinfo/${id}`)}
                                                        className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 cursor-pointer hover:text-green-600 dark:hover:text-green-500 transition-colors duration-300"
                                                    >
                                                        {title}
                                                    </h3>
                                                    {description && (
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3 transition-colors duration-300">
                                                            {description}
                                                        </p>
                                                    )}
                                                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                                                        ৳{price}
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <div className="flex justify-center">
                                                    {cartItems.some((p) => p.id === item.id) ? (
                                                        <button
                                                            onClick={() => deleteCart(item)}
                                                            className="w-full bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 py-2.5 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                            Remove from Cart
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => addCart(item)}
                                                            className="w-full bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-600 dark:text-green-400 py-2.5 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                                            </svg>
                                                            Add to Cart
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AllProduct;