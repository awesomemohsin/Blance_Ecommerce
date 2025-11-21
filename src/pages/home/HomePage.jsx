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

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {loading && <Loader />}
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Track />
      <Testimonial />
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
              src={offerImage} // 
              alt="Special Offer"
              className="w-full h-auto rounded-lg shadow-2xl"
              style={{ maxHeight: "90vh", objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
