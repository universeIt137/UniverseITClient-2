import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const BackendSlider = ({ blog }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        AOS.init({ duration: 200, once: true });
    }, []);

    useEffect(() => {
        // Prevent errors when blog or blog.images is undefined
        if (blog?.images?.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % blog.images.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [blog?.images]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    if (!blog?.images || blog.images.length === 0) {
        // Render fallback UI when no images are provided
        return (
            <div className="flex justify-center items-center h-[40vh] lg:h-[82vh] bg-gray-200">
                <p className="text-gray-500">No images available</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden">
            {/* Slides Container */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {blog.images.map((slide, index) => (
                    <div
                        key={index}
                        className="w-full h-[40vh] lg:h-[82vh] flex-shrink-0 relative"
                        style={{
                            backgroundImage: `url(${slide})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {blog.images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? "bg-white" : "bg-gray-400"
                        }`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default BackendSlider;
