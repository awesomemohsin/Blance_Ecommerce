import { Link, useNavigate } from "react-router-dom";
import AISmartSearch from "../aiSearch/AISmartSearch";
import { useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import myContext from "../../context/myContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const context = useContext(myContext);
    const { darkMode, toggleDarkMode } = context;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 600) setMobileMenuOpen(false);
        };
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const logout = () => {
        localStorage.clear('users');
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const navList = (
        <ul className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-6 text-white font-medium text-sm">
            {[
                { to: '/', label: 'Home' },
                { to: '/allproduct', label: 'All Products' },
            ].map(({ to, label }) => (
                <li key={to}>
                    <Link
                        to={to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="relative group inline-block py-1 text-white/90 hover:text-white transition-colors duration-200"
                    >
                        {label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white rounded-full group-hover:w-full transition-all duration-300" />
                    </Link>
                </li>
            ))}

            {!user && (
                <>
                    <li>
                        <Link to={'/signup'} onClick={() => setMobileMenuOpen(false)}
                            className="relative group inline-block py-1 text-white/90 hover:text-white transition-colors duration-200">
                            Sign up
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white rounded-full group-hover:w-full transition-all duration-300" />
                        </Link>
                    </li>
                    <li>
                        <Link to={'/login'} onClick={() => setMobileMenuOpen(false)}
                            className="relative group inline-block py-1 text-white/90 hover:text-white transition-colors duration-200">
                            Sign in
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white rounded-full group-hover:w-full transition-all duration-300" />
                        </Link>
                    </li>
                </>
            )}

            {user?.role === "user" && (
                <li>
                    <Link to={'/user-dashboard'} onClick={() => setMobileMenuOpen(false)}
                        className="relative group inline-block py-1 text-white/90 hover:text-white transition-colors duration-200">
                        Dashboard
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white rounded-full group-hover:w-full transition-all duration-300" />
                    </Link>
                </li>
            )}

            {user?.role === "admin" && (
                <li>
                    <Link to={'/admin-dashboard'} onClick={() => setMobileMenuOpen(false)}
                        className="relative group inline-block py-1 text-white/90 hover:text-white transition-colors duration-200">
                        Admin
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white rounded-full group-hover:w-full transition-all duration-300" />
                    </Link>
                </li>
            )}

            {user && (
                <li>
                    <button
                        onClick={() => { setMobileMenuOpen(false); setShowLogoutConfirm(true); }}
                        className="relative group inline-block py-1 text-white/90 hover:text-white transition-colors duration-200 focus:outline-none"
                    >
                        Logout
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white rounded-full group-hover:w-full transition-all duration-300" />
                    </button>

                    {showLogoutConfirm && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 shadow-2xl animate-fade-up">
                                <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-7 h-7 text-[#f85606]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Confirm Logout</h3>
                                <p className="text-gray-500 mb-6 text-center text-sm">Are you sure you want to log out of your account?</p>
                                <div className="flex space-x-3">
                                    <button onClick={logout}
                                        className="flex-1 py-2.5 btn-brand text-sm rounded-xl">
                                        Yes, Logout
                                    </button>
                                    <button onClick={() => setShowLogoutConfirm(false)}
                                        className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </li>
            )}

            <li>
                <Link to={'/cart'} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-1 text-white/90 hover:text-white transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Cart
                    {cartItems.length > 0 && (
                        <span className="bg-white text-[#f85606] rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center animate-pulse-glow">
                            {cartItems.length}
                        </span>
                    )}
                </Link>
            </li>
        </ul>
    );

    const HamburgerIcon = ({ isOpen, onClick }) => (
        <button className="lg:hidden text-white focus:outline-none p-1" onClick={onClick}
            aria-label={isOpen ? "Close menu" : "Open menu"}>
            <div className="w-6 flex flex-col items-end justify-center space-y-1.5">
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'w-6 transform rotate-45 translate-y-2' : 'w-6'}`} />
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 w-6' : 'w-4 opacity-100'}`} />
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'w-6 transform -rotate-45 -translate-y-2' : 'w-5'}`} />
            </div>
        </button>
    );

    return (
        <nav className={`navbar-gradient sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-2xl' : 'shadow-lg'}`}>
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between items-center py-3 px-6 space-y-3 lg:space-y-0">
                    {/* Logo + Hamburger */}
                    <div className="flex justify-between items-center w-full lg:w-auto">
                        <Link to={'/'} className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                                <span className="text-white font-black text-sm">E</span>
                            </div>
                            <h2 className="font-extrabold text-white text-xl tracking-tight">
                                Elanzo<span className="text-white/70 font-medium">Hub</span>
                            </h2>
                        </Link>
                        <HamburgerIcon isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
                    </div>

                    {/* Nav items + Search */}
                    <div className={`${mobileMenuOpen ? 'flex' : 'hidden lg:flex'} flex-col lg:flex-row items-center space-y-5 lg:space-y-0 lg:space-x-8 w-full lg:w-auto transition-all duration-300`}>
                        <div className="w-full lg:w-auto order-2 lg:order-1 pb-3 lg:pb-0">
                            {navList}
                        </div>
                        <div className="w-full lg:w-auto order-1 lg:order-2 flex items-center space-x-3">
                            <AISmartSearch />
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
                                aria-label="Toggle Dark Mode"
                            >
                                {darkMode
                                    ? <FaSun className="text-yellow-300" size={16} />
                                    : <FaMoon className="text-white/80" size={16} />
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;