import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer-gradient text-white">
            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #f85606, #ff8c42)' }}>
                            <span className="text-white font-black text-base">B</span>
                        </div>
                        <div>
                            <p className="font-extrabold text-white text-lg leading-none">BlanceHub</p>
                            <p className="text-white/40 text-xs mt-0.5">Fashion for everyone</p>
                        </div>
                    </div>

                    {/* Copyright */}
                    <p className="text-white/40 text-sm text-center">
                        © {currentYear} Blance — Copyright by{" "}
                        <a
                            href="https://md-mohsin.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f85606] hover:text-[#ff8c42] transition-colors font-semibold underline underline-offset-2"
                        >
                            Md Mohsin
                        </a>
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {[
                            {
                                label: "Facebook",
                                icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
                                filled: true,
                            },
                            {
                                label: "Twitter",
                                icon: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />,
                                filled: true,
                            },
                            {
                                label: "Instagram",
                                icon: (
                                    <>
                                        <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                                    </>
                                ),
                                filled: false,
                            },
                            {
                                label: "LinkedIn",
                                icon: (
                                    <>
                                        <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                        <circle cx={4} cy={4} r={2} stroke="none" />
                                    </>
                                ),
                                filled: true,
                            },
                        ].map(({ label, icon, filled }) => (
                            <a
                                key={label}
                                href="#"
                                aria-label={label}
                                className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#f85606] flex items-center justify-center transition-all duration-200 group"
                            >
                                <svg
                                    fill={filled ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={filled ? 2 : 2}
                                    className="w-4 h-4 text-white/60 group-hover:text-white transition-colors"
                                    viewBox="0 0 24 24"
                                >
                                    {icon}
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom strip */}
                <div className="mt-8 pt-6 border-t border-white/8 flex flex-wrap gap-4 justify-center text-xs text-white/30">
                    {["Privacy Policy", "Terms of Service", "Return Policy", "Contact Us"].map((link) => (
                        <Link key={link} to="/" className="hover:text-[#f85606] transition-colors">{link}</Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;