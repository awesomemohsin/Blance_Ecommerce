import { useContext, useState, useEffect } from "react";
import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import ChatBot from "../../components/chatbot/ChatBot";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { X } from "lucide-react";

import offerImage from "../../assets/Gemini_Generated_Image_nton55nton55nton.png";

const HomePage = () => {
  const context = useContext(myContext);
  const { loading } = context;
  const [showPopup, setShowPopup] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);

  useEffect(() => {
    // Force-hide the loader after 2s (so screenshots/bots never capture it)
    const loaderTimer = setTimeout(() => setHideLoader(true), 2000);
    // Show popup after 5 seconds
    const popupTimer = setTimeout(() => setShowPopup(true), 5000);

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(popupTimer);
    };
  }, []);

  return (
    <Layout>
      {loading && !hideLoader && <Loader />}
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Track />
      <Testimonial />

      {/* Developer Credit Section */}
      <section className="py-10" style={{ background: 'linear-gradient(135deg, #1c1b22 0%, #2d1a0e 100%)' }}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2">Crafted with ❤️</p>
          <p className="text-white/70 text-sm mb-3">
            ©<span className="text-white font-bold">Elanzo</span> — Designed and Copyright by
          </p>
          <a
            href="https://md-mohsin.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #f85606, #ff8c42)', boxShadow: '0 4px 18px rgba(248,86,6,0.35)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
            </svg>
            Md Mohsin
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      <ChatBot />

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative max-w-lg w-full">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute -top-2 -right-2 z-10 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <X size={20} className="text-gray-600 dark:text-gray-300" />
            </button>

            {/* Popup Image */}
            <img
              src={offerImage}
              alt="Special Offer"
              className="w-full h-auto rounded-t-lg shadow-2xl"
              style={{ maxHeight: "80vh", objectFit: "contain" }}
            />

            {/* Copyright strip inside popup */}
            <div
              className="rounded-b-lg py-4 px-5 text-center"
              style={{ background: 'linear-gradient(135deg, #1c1b22 0%, #2d1a0e 100%)' }}
            >
              <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-1.5">Crafted with ❤️</p>
              <p className="text-white/70 text-xs mb-3">
                ©<span className="text-white font-bold"> Elanzo</span> — Designed and Copyright by
              </p>
              <a
                href="https://md-mohsin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #f85606, #ff8c42)', boxShadow: '0 4px 18px rgba(248,86,6,0.35)' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                Md Mohsin
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
