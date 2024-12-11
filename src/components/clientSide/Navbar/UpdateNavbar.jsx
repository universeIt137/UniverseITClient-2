import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const galleryTimeoutRef = useRef(null);
    const servicesTimeoutRef = useRef(null);

    const galleryLinks = [
        { title: 'Video Gallery', path: '/video-gallery' },
        { title: 'Image Gallery', path: '/image-gallery' },
    ];

    const servicesLinks = [
        { title: 'Web Development', path: '/web-development' },
        { title: 'App Development', path: '/app-development' },
    ];

    const handleMouseEnter = (setState, timeoutRef) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setState(true);
        }, 100);
    };

    const handleMouseLeave = (setState, timeoutRef) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setState(false);
        }, 100);
    };

    return (
        <div className="fixed w-full z-50 bg-[#027F3D] text-white shadow-md">
            <div className="w-11/12 mx-auto">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="bg-white lg:w-[10%] rounded-md p-1">
                        <NavLink to="/">
                            <img
                                className="lg:w-full w-20 md:rounded-full"
                                src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1731399400/Artboard_2300_zteplb.png"
                                alt="Logo"
                            />
                        </NavLink>
                    </div>

                    {/* Navigation */}
                    <div>
                        <nav className="hidden lg:block">
                            <ul className="flex space-x-8">
                                {/* Gallery Menu */}
                                <li
                                    className="relative group"
                                    onMouseEnter={() =>
                                        handleMouseEnter(setIsGalleryOpen, galleryTimeoutRef)
                                    }
                                    onMouseLeave={() =>
                                        handleMouseLeave(setIsGalleryOpen, galleryTimeoutRef)
                                    }
                                >
                                    <button className="relative text-[18px] font-medium hover:text-white transform scale-100 hover:scale-90 transition-transform duration-300">
                                        Gallery
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    </button>

                                    {isGalleryOpen && (
                                        <div
                                            className="absolute left-0 mt-2 bg-white text-black font-bold rounded-md shadow-lg w-48"
                                            onMouseEnter={() =>
                                                handleMouseEnter(setIsGalleryOpen, galleryTimeoutRef)
                                            }
                                            onMouseLeave={() =>
                                                handleMouseLeave(setIsGalleryOpen, galleryTimeoutRef)
                                            }
                                        >
                                            {galleryLinks.map((link, idx) => (
                                                <NavLink
                                                    key={idx}
                                                    to={link.path}
                                                    className="block px-4 py-2 hover:bg-blue-100 relative group"
                                                >
                                                    {link.title}
                                                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </li>

                                {/* Services Menu */}
                                <li
                                    className="relative group"
                                    onMouseEnter={() =>
                                        handleMouseEnter(setIsServicesOpen, servicesTimeoutRef)
                                    }
                                    onMouseLeave={() =>
                                        handleMouseLeave(setIsServicesOpen, servicesTimeoutRef)
                                    }
                                >
                                    <button className="relative text-[18px] font-medium hover:text-white transform scale-100 hover:scale-90 transition-transform duration-300">
                                        Services
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    </button>

                                    {isServicesOpen && (
                                        <div
                                            className="absolute left-0 mt-2 bg-white text-black font-bold rounded-md shadow-lg w-48"
                                            onMouseEnter={() =>
                                                handleMouseEnter(setIsServicesOpen, servicesTimeoutRef)
                                            }
                                            onMouseLeave={() =>
                                                handleMouseLeave(setIsServicesOpen, servicesTimeoutRef)
                                            }
                                        >
                                            {servicesLinks.map((link, idx) => (
                                                <NavLink
                                                    key={idx}
                                                    to={link.path}
                                                    className="block px-4 py-2 hover:bg-blue-100 relative group"
                                                >
                                                    {link.title}
                                                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
