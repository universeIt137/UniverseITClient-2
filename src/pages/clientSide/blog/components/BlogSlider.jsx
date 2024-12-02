import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';


const BlogSlider = ({ blog }) => {




   

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        AOS.init({ duration: 200, once: false });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % blog?.images?.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [blog?.images]);

    useEffect(() => {
        AOS.refreshHard();
    }, [currentIndex]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative lg:mt-0 overflow-hidden">
            {/* Slides Container */}
            <div
                className="flex transition-transform duration-700 "
                style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
            >
                {blog?.images &&
                    blog?.images?.map((slide, index) => (
                        <div
                            key={index}
                            className="lg:w-screen  w-screen h-[40vh] lg:h-[82vh] flex-shrink-0 relative "
                            style={{
                                backgroundImage: `url(${slide})`,
                                backgroundSize: 'cover', // Updated to cover full width
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}
                        >

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                        </div>
                    ))}
            </div>

            








            
        </div>
    );
};

export default BlogSlider;